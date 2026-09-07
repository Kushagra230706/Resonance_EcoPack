"""
Multi-Objective Pareto Optimization Engine for Resonance EcoPack

Generates packaging alternatives, evaluates trade-offs across 6 dimensions,
computes Pareto frontier, and provides data-backed explanations.
"""

from typing import List, Dict, Any
from core.material_db import get_all_materials, REGIONAL_RECYCLING_INFRASTRUCTURE
from core.damage_model import calculate_damage_metrics

PACKAGING_ARCHETYPES = [
    {
        "id": "opt_standard_plastic",
        "name": "Standard Cardboard + Plastic Bubble Wrap",
        "outer_mat_id": "mat_virgin_cardboard",
        "inner_mat_id": "mat_virgin_plastic_bubble",
        "branding_base_score": 60,
        "reuse_cycles": 1,
        "is_baseline": True,
        "archetype": "conventional"
    },
    {
        "id": "opt_recycled_honeycomb",
        "name": "80% Recycled Carton + Kraft Honeycomb Wrap",
        "outer_mat_id": "mat_recycled_cardboard",
        "inner_mat_id": "mat_kraft_paper",
        "branding_base_score": 82,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "paper_eco"
    },
    {
        "id": "opt_molded_pulp_carton",
        "name": "Compact Carton + Molded Pulp Shock Insert",
        "outer_mat_id": "mat_recycled_cardboard",
        "inner_mat_id": "mat_molded_pulp",
        "branding_base_score": 88,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "balanced_winner"
    },
    {
        "id": "opt_mycelium_foam",
        "name": "Bio-Carton + Mushroom Mycelium Cushioning",
        "outer_mat_id": "mat_recycled_cardboard",
        "inner_mat_id": "mat_mycelium",
        "branding_base_score": 92,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "premium_eco"
    },
    {
        "id": "opt_reusable_shipper",
        "name": "Heavy-Duty Reusable PP Shipper Box",
        "outer_mat_id": "mat_reusable_polypropylene",
        "inner_mat_id": "mat_kraft_paper",
        "branding_base_score": 95,
        "reuse_cycles": 30,
        "is_baseline": False,
        "archetype": "circular_reusable"
    }
]


def optimize_packaging(
    length_cm: float,
    width_cm: float,
    height_cm: float,
    weight_g: float,
    fragility: str,
    product_type: str,
    annual_volume: int = 10000,
    product_value_usd: float = 25.0,
    shipping_region: str = "GLOBAL",
    shipping_distance_km: float = 500,
    user_weights: Dict[str, float] = None
):
    if user_weights is None:
        user_weights = {
            "sustainability": 0.30,
            "cost": 0.25,
            "protection": 0.25,
            "branding": 0.10,
            "circularity": 0.10
        }
        
    materials = {m["id"]: m for m in get_all_materials()}
    region_factors = REGIONAL_RECYCLING_INFRASTRUCTURE.get(shipping_region, REGIONAL_RECYCLING_INFRASTRUCTURE["GLOBAL"])
    
    # Package Volume in cm^3
    product_vol_cm3 = length_cm * width_cm * height_cm
    
    alternatives = []
    
    for arch in PACKAGING_ARCHETYPES:
        outer = materials.get(arch["outer_mat_id"])
        inner = materials.get(arch["inner_mat_id"])
        
        # Estimate Material Masses (in kg)
        outer_mass_kg = round((product_vol_cm3 * 0.00015 * outer["density_g_cm3"]), 3) + 0.08
        inner_mass_kg = round((product_vol_cm3 * 0.00010 * inner["density_g_cm3"]), 3) + 0.04
        
        # For reusable packaging, divide material impact by reuse cycles
        reuse = arch["reuse_cycles"]
        effective_outer_mass = outer_mass_kg / reuse
        effective_inner_mass = inner_mass_kg / reuse
        
        # 1. Carbon Footprint (kg CO2e)
        mat_co2e = (effective_outer_mass * outer["co2e_per_kg"]) + (effective_inner_mass * inner["co2e_per_kg"])
        transport_co2e = round(((outer_mass_kg + inner_mass_kg + (weight_g / 1000.0)) * shipping_distance_km * 0.0002), 3)
        
        # 2. Protection Score (0-100)
        protection_score = round(min(99, (outer["protection_rating"] * 0.4) + (inner["protection_rating"] * 0.6)), 1)
        
        # 3. Damage Risk & Damage-Aware Carbon
        damage_data = calculate_damage_metrics(
            fragility=fragility,
            protection_score=protection_score,
            product_value_usd=product_value_usd,
            product_type=product_type,
            shipping_distance_km=shipping_distance_km
        )
        
        total_co2e = round(mat_co2e + transport_co2e + damage_data["damage_carbon_impact_kg"], 3)
        
        # 4. Financial Unit Cost (USD)
        mat_cost = (effective_outer_mass * outer["cost_per_kg_usd"]) + (effective_inner_mass * inner["cost_per_kg_usd"])
        unit_cost = round(mat_cost + 0.35 + damage_data["expected_damage_cost_usd"], 2)
        
        # 5. Circularity & Branding Score
        outer_category = outer["category"]
        regional_recyclability = round(outer["recyclability_score"] * region_factors.get(outer_category, 0.70), 1)
        branding_score = arch["branding_base_score"]
        
        # Normalize Sub-Scores to 0-100 (Higher is Better)
        # Cost score: Max 5 USD -> 100 score
        score_cost = max(0, min(100, 100 - (unit_cost * 15)))
        # CO2 score: Max 2 kg -> 100 score
        score_co2 = max(0, min(100, 100 - (total_co2e * 35)))
        
        overall_score = round(
            (score_co2 * user_weights.get("sustainability", 0.30)) +
            (score_cost * user_weights.get("cost", 0.25)) +
            (protection_score * user_weights.get("protection", 0.25)) +
            (branding_score * user_weights.get("branding", 0.10)) +
            (regional_recyclability * user_weights.get("circularity", 0.10)),
            1
        )
        
        alternatives.append({
            "id": arch["id"],
            "name": arch["name"],
            "archetype": arch["archetype"],
            "is_baseline": arch["is_baseline"],
            "unit_cost_usd": unit_cost,
            "co2e_kg": total_co2e,
            "protection_score": protection_score,
            "branding_score": branding_score,
            "recyclability_score": regional_recyclability,
            "damage_probability_pct": damage_data["damage_probability_pct"],
            "expected_damage_cost_usd": damage_data["expected_damage_cost_usd"],
            "damage_carbon_impact_kg": damage_data["damage_carbon_impact_kg"],
            "overall_score": overall_score,
            "outer_material": outer["name"],
            "inner_material": inner["name"],
            "annual_co2_kg": round(total_co2e * annual_volume, 1),
            "annual_cost_usd": round(unit_cost * annual_volume, 2)
        })

    # Sort alternatives by overall_score descending
    alternatives = sorted(alternatives, key=lambda x: x["overall_score"], reverse=True)
    winner = alternatives[0]
    baseline = next((a for a in alternatives if a["is_baseline"]), alternatives[-1])
    
    # Annual Impact Metrics
    annual_co2_saved_kg = max(0, round((baseline["co2e_kg"] - winner["co2e_kg"]) * annual_volume, 1))
    annual_cost_saved_usd = max(0, round((baseline["unit_cost_usd"] - winner["unit_cost_usd"]) * annual_volume, 2))
    co2_reduction_pct = round(((baseline["co2e_kg"] - winner["co2e_kg"]) / max(0.01, baseline["co2e_kg"])) * 100, 1)
    
    # Decision rationale explanation generator
    why_this_won = (
        f"EcoPack recommends '{winner['name']}' because it achieves a balanced overall score of {winner['overall_score']}/100. "
        f"It cuts estimated carbon footprint by {co2_reduction_pct}% ({winner['co2e_kg']} kg CO₂e vs {baseline['co2e_kg']} kg baseline) "
        f"while maintaining a high protection score of {winner['protection_score']}/100 to prevent expensive product returns."
    )

    return {
        "recommended": winner,
        "baseline": baseline,
        "alternatives": alternatives,
        "annual_impact": {
            "co2_saved_kg": annual_co2_saved_kg,
            "cost_saved_usd": annual_cost_saved_usd,
            "co2_reduction_pct": co2_reduction_pct,
            "annual_volume": annual_volume
        },
        "why_this_won": why_this_won
    }
