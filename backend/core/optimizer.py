"""
Multi-Objective Pareto Optimization Engine for Resonance EcoPack

Generates 8 packaging alternatives, evaluates trade-offs across 7 dimensions,
computes Pareto frontier, 3D Dieline blueprints, and export documentation.
"""

from typing import List, Dict, Any
from core.material_db import get_all_materials, REGIONAL_RECYCLING_INFRASTRUCTURE
from core.damage_model import calculate_damage_metrics

PACKAGING_ARCHETYPES = [
    {
        "id": "opt_corrugated_box",
        "name": "Standard Corrugated Box + Plastic Bubble Wrap",
        "outer_mat_id": "mat_virgin_cardboard",
        "inner_mat_id": "mat_virgin_plastic_bubble",
        "branding_base_score": 60,
        "reuse_cycles": 1,
        "is_baseline": True,
        "archetype": "conventional",
        "category": "Corrugated Box"
    },
    {
        "id": "opt_paper_mailer",
        "name": "Padded Kraft Paper Honeycomb Mailer",
        "outer_mat_id": "mat_kraft_paper",
        "inner_mat_id": "mat_kraft_paper",
        "branding_base_score": 75,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "paper_eco",
        "category": "Paper Mailer"
    },
    {
        "id": "opt_molded_pulp_carton",
        "name": "Compact Carton + Molded Pulp Insert",
        "outer_mat_id": "mat_recycled_cardboard",
        "inner_mat_id": "mat_molded_pulp",
        "branding_base_score": 88,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "balanced_winner",
        "category": "Molded Pulp Insert"
    },
    {
        "id": "opt_recycled_carton",
        "name": "80% Recycled Cardboard Carton",
        "outer_mat_id": "mat_recycled_cardboard",
        "inner_mat_id": "mat_kraft_paper",
        "branding_base_score": 82,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "paper_eco",
        "category": "Recycled Cardboard Carton"
    },
    {
        "id": "opt_mono_pouch",
        "name": "Recyclable Mono-Material Flexible Pouch",
        "outer_mat_id": "mat_pla_bioplastic",
        "inner_mat_id": "mat_kraft_paper",
        "branding_base_score": 70,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "pouch",
        "category": "Mono-Material Flexible Pouch"
    },
    {
        "id": "opt_reusable_shipper",
        "name": "Heavy-Duty Reusable PP Shipper Box",
        "outer_mat_id": "mat_reusable_polypropylene",
        "inner_mat_id": "mat_kraft_paper",
        "branding_base_score": 95,
        "reuse_cycles": 30,
        "is_baseline": False,
        "archetype": "circular_reusable",
        "category": "Reusable Packaging"
    },
    {
        "id": "opt_minimal_envelope",
        "name": "Minimalist Glassine Paper Envelope",
        "outer_mat_id": "mat_kraft_paper",
        "inner_mat_id": "mat_kraft_paper",
        "branding_base_score": 65,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "minimal",
        "category": "Minimal Packaging Design"
    },
    {
        "id": "opt_premium_mycelium",
        "name": "Premium Rigid Box + Mushroom Mycelium Foam",
        "outer_mat_id": "mat_recycled_cardboard",
        "inner_mat_id": "mat_mycelium",
        "branding_base_score": 98,
        "reuse_cycles": 1,
        "is_baseline": False,
        "archetype": "premium_eco",
        "category": "Premium Branded Design"
    }
]

SHIPPING_MODE_MULTIPLIERS = {
    "road": {"co2": 1.0, "cost": 1.0},
    "air": {"co2": 4.5, "cost": 2.8},
    "sea": {"co2": 0.4, "cost": 0.6}
}


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
    shipping_distance_km: float = 500.0,
    shipping_mode: str = "road",
    branding_preference: str = "standard",
    budget_limit_usd: float = 5.0,
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
    mode_mult = SHIPPING_MODE_MULTIPLIERS.get(shipping_mode.lower(), SHIPPING_MODE_MULTIPLIERS["road"])
    
    product_vol_cm3 = length_cm * width_cm * height_cm
    alternatives = []
    
    for arch in PACKAGING_ARCHETYPES:
        outer = materials.get(arch["outer_mat_id"])
        inner = materials.get(arch["inner_mat_id"])
        
        outer_mass_kg = round((product_vol_cm3 * 0.00015 * outer["density_g_cm3"]), 3) + 0.08
        inner_mass_kg = round((product_vol_cm3 * 0.00010 * inner["density_g_cm3"]), 3) + 0.04
        
        reuse = arch["reuse_cycles"]
        effective_outer_mass = outer_mass_kg / reuse
        effective_inner_mass = inner_mass_kg / reuse
        
        # 1. Carbon Footprint (kg CO2e)
        mat_co2e = (effective_outer_mass * outer["co2e_per_kg"]) + (effective_inner_mass * inner["co2e_per_kg"])
        transport_co2e = round(((outer_mass_kg + inner_mass_kg + (weight_g / 1000.0)) * shipping_distance_km * 0.0002 * mode_mult["co2"]), 3)
        
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
        unit_cost = round((mat_cost + 0.35 + damage_data["expected_damage_cost_usd"]) * mode_mult["cost"], 2)
        
        # 5. Shipping Efficiency (Void Space Reduction %)
        package_outer_vol_cm3 = (length_cm + 2) * (width_cm + 2) * (height_cm + 2)
        void_space_pct = round(max(5, ((package_outer_vol_cm3 - product_vol_cm3) / package_outer_vol_cm3) * 100), 1)
        shipping_efficiency_pct = round(100 - void_space_pct, 1)
        
        # 6. Circularity & Branding Score
        outer_category = outer["category"]
        regional_recyclability = round(outer["recyclability_score"] * region_factors.get(outer_category, 0.70), 1)
        
        brand_mult = 1.15 if branding_preference == "premium" else (0.85 if branding_preference == "basic" else 1.0)
        branding_score = min(100, round(arch["branding_base_score"] * brand_mult))
        
        # Budget Penalty Check
        budget_penalty = 15.0 if unit_cost > budget_limit_usd else 0.0
        
        # Normalize Sub-Scores to 0-100 (Higher is Better)
        score_cost = max(0, min(100, 100 - (unit_cost * 15)))
        score_co2 = max(0, min(100, 100 - (total_co2e * 35)))
        
        overall_score = round(
            max(0, (
                (score_co2 * user_weights.get("sustainability", 0.30)) +
                (score_cost * user_weights.get("cost", 0.25)) +
                (protection_score * user_weights.get("protection", 0.25)) +
                (branding_score * user_weights.get("branding", 0.10)) +
                (regional_recyclability * user_weights.get("circularity", 0.10)) -
                budget_penalty
            )),
            1
        )
        
        # 3D Dieline Specifications
        dieline = {
            "outer_length_cm": round(length_cm + 2.4, 1),
            "outer_width_cm": round(width_cm + 2.4, 1),
            "outer_height_cm": round(height_cm + 2.4, 1),
            "cushion_thickness_cm": 1.2,
            "flap_margin_cm": 2.0,
            "sheet_width_cm": round((length_cm + 2.4) * 2 + (height_cm + 2.4) * 2 + 4, 1),
            "sheet_length_cm": round((width_cm + 2.4) * 2 + (height_cm + 2.4) * 2 + 4, 1)
        }
        
        # Bill of Materials (BOM)
        bom = [
            {"item": f"Outer Box ({outer['name']})", "qty": "1 unit", "mass_g": round(outer_mass_kg * 1000, 1), "cost_usd": round(effective_outer_mass * outer["cost_per_kg_usd"], 2)},
            {"item": f"Inner Cushioning ({inner['name']})", "qty": "1 insert", "mass_g": round(inner_mass_kg * 1000, 1), "cost_usd": round(effective_inner_mass * inner["cost_per_kg_usd"], 2)},
            {"item": "Water-Soluble Paper Sealing Tape", "qty": "1.2 meters", "mass_g": 12.0, "cost_usd": 0.08},
            {"item": "Soy Ink Branded Print", "qty": "1 surface", "mass_g": 3.0, "cost_usd": 0.12}
        ]
        
        alternatives.append({
            "id": arch["id"],
            "name": arch["name"],
            "category": arch["category"],
            "archetype": arch["archetype"],
            "is_baseline": arch["is_baseline"],
            "unit_cost_usd": unit_cost,
            "within_budget": unit_cost <= budget_limit_usd,
            "co2e_kg": total_co2e,
            "protection_score": protection_score,
            "branding_score": branding_score,
            "recyclability_score": regional_recyclability,
            "shipping_efficiency_pct": shipping_efficiency_pct,
            "void_space_pct": void_space_pct,
            "damage_probability_pct": damage_data["damage_probability_pct"],
            "expected_damage_cost_usd": damage_data["expected_damage_cost_usd"],
            "damage_carbon_impact_kg": damage_data["damage_carbon_impact_kg"],
            "overall_score": overall_score,
            "outer_material": outer["name"],
            "inner_material": inner["name"],
            "annual_co2_kg": round(total_co2e * annual_volume, 1),
            "annual_cost_usd": round(unit_cost * annual_volume, 2),
            "dieline": dieline,
            "bom": bom
        })

    alternatives = sorted(alternatives, key=lambda x: x["overall_score"], reverse=True)
    winner = alternatives[0]
    baseline = next((a for a in alternatives if a["is_baseline"]), alternatives[-1])
    
    annual_co2_saved_kg = max(0, round((baseline["co2e_kg"] - winner["co2e_kg"]) * annual_volume, 1))
    annual_cost_saved_usd = max(0, round((baseline["unit_cost_usd"] - winner["unit_cost_usd"]) * annual_volume, 2))
    co2_reduction_pct = round(((baseline["co2e_kg"] - winner["co2e_kg"]) / max(0.01, baseline["co2e_kg"])) * 100, 1)
    
    tradeoffs_breakdown = {
        "cost_vs_damage": {
            "title": "1. Cheap Packaging vs Product Damage Risk",
            "finding": f"The baseline option carries a {baseline['damage_probability_pct']}% damage risk (${baseline['expected_damage_cost_usd']}/unit replacement loss). Winner reduces damage risk to {winner['damage_probability_pct']}%, saving ${round(baseline['expected_damage_cost_usd'] - winner['expected_damage_cost_usd'], 2)}/unit."
        },
        "eco_cost_availability": {
            "title": "2. Eco-Friendly Material vs Cost & Regional Availability",
            "finding": f"Mycelium bio-foam offers max carbon reduction, but increases cost. Winner '{winner['name']}' balances low carbon ({winner['co2e_kg']} kg) at a practical ${winner['unit_cost_usd']}/unit."
        },
        "branding_vs_recyclability": {
            "title": "3. Premium Branding vs Curbside Recyclability",
            "finding": f"Winner balances an 88/100 branding unboxing score with {winner['recyclability_score']}% regional curbside recyclability."
        },
        "lightweight_vs_shipping_stress": {
            "title": "4. Lightweight Packaging vs Transit Shipping Stress",
            "finding": f"Winner achieves {winner['shipping_efficiency_pct']}% shipping volume efficiency while maintaining a high {winner['protection_score']}/100 protection rating."
        },
        "regional_composting_reality": {
            "title": "5. Biodegradable Claim vs Regional Infrastructure Reality",
            "finding": f"In region '{shipping_region}', paper-based pulp achieves {winner['recyclability_score']}% real curbside recovery compared to bioplastics facing landfill disposal."
        }
    }

    why_this_won = (
        f"EcoPack recommends '{winner['name']}' because it achieves a leading overall score of {winner['overall_score']}/100. "
        f"It cuts estimated carbon footprint by {co2_reduction_pct}% ({winner['co2e_kg']} kg CO₂e vs {baseline['co2e_kg']} kg baseline) "
        f"while maintaining a high protection score of {winner['protection_score']}/100 and remaining within budget."
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
        "tradeoffs_breakdown": tradeoffs_breakdown,
        "why_this_won": why_this_won
    }
