"""
Damage Risk & Carbon Accounting Model for Resonance EcoPack

Calculates:
1. Product damage probability based on product fragility vs package protection.
2. Financial damage cost (Probability * Product Value).
3. Damage-induced carbon footprint (Probability * (Product Carbon + Reshipping Carbon)).
"""

FRAGILITY_MULTIPLIER = {
    "low": 0.02,
    "medium": 0.05,
    "high": 0.12,
    "very_high": 0.25
}

PRODUCT_TYPE_CARBON_ESTIMATE_KG = {
    "cosmetics": 2.5,
    "fragile_glass": 4.0,
    "electronics": 15.0,
    "apparel": 3.0,
    "food": 1.5,
    "default": 5.0
}


def calculate_damage_metrics(
    fragility: str,
    protection_score: float,
    product_value_usd: float,
    product_type: str = "default",
    shipping_distance_km: float = 500
):
    """
    Computes damage probability, damage cost, and damage-induced CO2e emissions.
    """
    base_fragility = FRAGILITY_MULTIPLIER.get(fragility.lower(), 0.08)
    
    # Cushioning effectiveness reduces damage risk exponentially
    protection_factor = max(0.1, 1.0 - (protection_score / 100.0))
    
    damage_probability = round(min(0.35, base_fragility * protection_factor * 2.5), 4)
    
    # Financial Risk
    expected_damage_cost_usd = round(damage_probability * product_value_usd, 2)
    
    # Embedded Product Carbon
    product_carbon_kg = PRODUCT_TYPE_CARBON_ESTIMATE_KG.get(
        product_type.lower(),
        PRODUCT_TYPE_CARBON_ESTIMATE_KG["default"]
    )
    
    # Reshipping transport carbon (approx 0.0002 kg CO2e per kg-km)
    reshipping_carbon_kg = round(0.5 + (shipping_distance_km * 0.0003), 2)
    
    # Expected Damage Carbon Impact
    damage_carbon_impact_kg = round(
        damage_probability * (product_carbon_kg + reshipping_carbon_kg), 3
    )
    
    return {
        "damage_probability_pct": round(damage_probability * 100, 2),
        "expected_damage_cost_usd": expected_damage_cost_usd,
        "damage_carbon_impact_kg": damage_carbon_impact_kg,
        "product_embedded_carbon_kg": product_carbon_kg
    }
