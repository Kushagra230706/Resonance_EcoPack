"""
Material Database for Resonance EcoPack
Provides comprehensive emission factors, cost per kg, density, strength,
recyclability, compostability, and regional compliance factors.
"""

MATERIALS_DB = [
    {
        "id": "mat_virgin_cardboard",
        "name": "Virgin Corrugated Board",
        "category": "paper",
        "density_g_cm3": 0.55,
        "co2e_per_kg": 1.25,        # kg CO2e / kg material
        "cost_per_kg_usd": 1.10,     # USD / kg
        "protection_rating": 78,     # 0 - 100
        "recyclability_score": 85,   # 0 - 100
        "compostability": "industrial",
        "water_resistance": 35,      # 0 - 100
        "printability_score": 90,    # 0 - 100
        "recycled_content_pct": 0,
        "description": "High-strength virgin corrugated cardboard ideal for heavy packaging."
    },
    {
        "id": "mat_recycled_cardboard",
        "name": "Recycled Cardboard (80% PCR)",
        "category": "paper",
        "density_g_cm3": 0.50,
        "co2e_per_kg": 0.68,
        "cost_per_kg_usd": 0.95,
        "protection_rating": 72,
        "recyclability_score": 95,
        "compostability": "home",
        "water_resistance": 30,
        "printability_score": 82,
        "recycled_content_pct": 80,
        "description": "Eco-friendly post-consumer recycled cardboard with low carbon footprint."
    },
    {
        "id": "mat_molded_pulp",
        "name": "Molded Paper Pulp Insert",
        "category": "paper",
        "density_g_cm3": 0.35,
        "co2e_per_kg": 0.45,
        "cost_per_kg_usd": 1.30,
        "protection_rating": 92,
        "recyclability_score": 98,
        "compostability": "home",
        "water_resistance": 40,
        "printability_score": 60,
        "recycled_content_pct": 100,
        "description": "100% recycled molded pulp providing superior impact shock absorption."
    },
    {
        "id": "mat_kraft_paper",
        "name": "Kraft Paper Honeycomb",
        "category": "paper",
        "density_g_cm3": 0.25,
        "co2e_per_kg": 0.82,
        "cost_per_kg_usd": 1.40,
        "protection_rating": 85,
        "recyclability_score": 95,
        "compostability": "home",
        "water_resistance": 25,
        "printability_score": 75,
        "recycled_content_pct": 70,
        "description": "Lightweight honeycomb paper wrap designed to replace plastic bubble wrap."
    },
    {
        "id": "mat_virgin_plastic_bubble",
        "name": "LDPE Plastic Bubble Wrap",
        "category": "plastic",
        "density_g_cm3": 0.03,
        "co2e_per_kg": 2.85,
        "cost_per_kg_usd": 2.20,
        "protection_rating": 80,
        "recyclability_score": 30,
        "compostability": "none",
        "water_resistance": 98,
        "printability_score": 20,
        "recycled_content_pct": 0,
        "description": "Conventional single-use plastic bubble cushioning with poor recycling rates."
    },
    {
        "id": "mat_pla_bioplastic",
        "name": "PLA Cornstarch Bioplastic Mailer",
        "category": "bioplastic",
        "density_g_cm3": 1.24,
        "co2e_per_kg": 1.45,
        "cost_per_kg_usd": 3.10,
        "protection_rating": 65,
        "recyclability_score": 10,
        "compostability": "industrial",
        "water_resistance": 85,
        "printability_score": 85,
        "recycled_content_pct": 0,
        "description": "Plant-based bio-polybag compostable in industrial facilities."
    },
    {
        "id": "mat_mycelium",
        "name": "Mushroom Mycelium Foam",
        "category": "organic",
        "density_g_cm3": 0.18,
        "co2e_per_kg": 0.25,
        "cost_per_kg_usd": 3.80,
        "protection_rating": 94,
        "recyclability_score": 100,
        "compostability": "home",
        "water_resistance": 50,
        "printability_score": 40,
        "recycled_content_pct": 100,
        "description": "Bio-fabricated mushroom root material that naturally degrades in soil within 45 days."
    },
    {
        "id": "mat_reusable_polypropylene",
        "name": "Rigid Reusable Polypropylene Box",
        "category": "reusable",
        "density_g_cm3": 0.90,
        "co2e_per_kg": 2.10,
        "cost_per_kg_usd": 4.50,
        "protection_rating": 98,
        "recyclability_score": 80,
        "compostability": "none",
        "water_resistance": 100,
        "printability_score": 95,
        "recycled_content_pct": 50,
        "description": "Heavy-duty returnable shipping container engineered for 50+ reuse cycles."
    }
]

REGIONAL_RECYCLING_INFRASTRUCTURE = {
    "US": {"paper": 0.90, "plastic": 0.15, "bioplastic": 0.10, "organic": 0.70, "reusable": 0.60},
    "EU": {"paper": 0.95, "plastic": 0.40, "bioplastic": 0.35, "organic": 0.85, "reusable": 0.80},
    "IN": {"paper": 0.80, "plastic": 0.25, "bioplastic": 0.05, "organic": 0.50, "reusable": 0.75},
    "SEA": {"paper": 0.75, "plastic": 0.20, "bioplastic": 0.05, "organic": 0.40, "reusable": 0.65},
    "GLOBAL": {"paper": 0.85, "plastic": 0.25, "bioplastic": 0.15, "organic": 0.60, "reusable": 0.70}
}


def get_all_materials():
    return MATERIALS_DB


def get_material_by_id(mat_id: str):
    for m in MATERIALS_DB:
        if m["id"] == mat_id:
            return m
    return None
