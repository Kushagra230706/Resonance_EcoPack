"""
Material Database for Resonance EcoPack
Provides comprehensive emission factors, cost per kg, density, strength,
recyclability, compostability, and regional compliance factors loaded from materials.csv.
"""

import os
import csv
from typing import List, Dict, Any, Optional

CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "materials.csv")

RAW_MATERIALS_LIST = [
    {
        "id": "mat_virgin_cardboard",
        "name": "Virgin Corrugated Board",
        "category": "paper",
        "density_g_cm3": 0.55,
        "co2e_per_kg": 0.801,
        "cost_per_kg_usd": 1.10,
        "protection_rating": 70,
        "recyclability_score": 85,
        "compostability": "industrial",
        "water_resistance": 30,
        "printability_score": 90,
        "recycled_content_pct": 0.0,
        "source_confidence": "Medium (UK/Global benchmark ADEME/DEFRA)",
        "emission_source": "https://www.carbonfact.com/blog/knowledge/yawa-recycled-packaging",
        "description": "Virgin corrugated board benchmark (0.801 kg CO2e/kg)."
    },
    {
        "id": "mat_recycled_cardboard",
        "name": "Recycled Corrugated Board",
        "category": "paper",
        "density_g_cm3": 0.50,
        "co2e_per_kg": 0.70,
        "cost_per_kg_usd": 0.51,
        "protection_rating": 65,
        "recyclability_score": 95,
        "compostability": "home",
        "water_resistance": 25,
        "printability_score": 85,
        "recycled_content_pct": 80.0,
        "source_confidence": "Medium (DEFRA / Carbonfact 2026)",
        "emission_source": "https://knjtradelink.com/blog/kraft-paper-price-per-kg-in-india-2026/",
        "description": "80% Post-consumer recycled kraft/corrugated board (0.70 kg CO2e/kg)."
    },
    {
        "id": "mat_kraft_paper",
        "name": "Kraft Paper",
        "category": "paper",
        "density_g_cm3": 0.35,
        "co2e_per_kg": 1.56,
        "cost_per_kg_usd": 0.68,
        "protection_rating": 60,
        "recyclability_score": 95,
        "compostability": "home",
        "water_resistance": 20,
        "printability_score": 85,
        "recycled_content_pct": 70.0,
        "source_confidence": "High (Verified CarbonCloud benchmark)",
        "emission_source": "https://apps.carboncloud.com/climatehub/product-reports/id/6767336971874",
        "description": "Uncoated kraft paper & paperboard (1.56 kg CO2e/kg)."
    },
    {
        "id": "mat_molded_pulp",
        "name": "Molded Paper Pulp",
        "category": "paper",
        "density_g_cm3": 0.35,
        "co2e_per_kg": 1.12,
        "cost_per_kg_usd": 1.30,
        "protection_rating": 65,
        "recyclability_score": 98,
        "compostability": "home",
        "water_resistance": 25,
        "printability_score": 65,
        "recycled_content_pct": 100.0,
        "source_confidence": "High (Verified CarbonCloud benchmark)",
        "emission_source": "https://apps.carboncloud.com/climatehub/product-reports/id/10317021719035",
        "description": "100% Recycled molded pulp cushioning/insert (1.12 kg CO2e/kg)."
    },
    {
        "id": "mat_honeycomb_paper",
        "name": "Honeycomb Paper Wrap",
        "category": "paper",
        "density_g_cm3": 0.25,
        "co2e_per_kg": 0.85,
        "cost_per_kg_usd": 1.45,
        "protection_rating": 75,
        "recyclability_score": 95,
        "compostability": "home",
        "water_resistance": 20,
        "printability_score": 70,
        "recycled_content_pct": 70.0,
        "source_confidence": "Medium (Converted honeycomb structure)",
        "emission_source": "Global prototype benchmark",
        "description": "Cellular expanding paper wrap replacing plastic bubble film."
    },
    {
        "id": "mat_paper_tape",
        "name": "Water-Activated Paper Tape",
        "category": "paper",
        "density_g_cm3": 0.40,
        "co2e_per_kg": 0.90,
        "cost_per_kg_usd": 1.20,
        "protection_rating": 55,
        "recyclability_score": 90,
        "compostability": "home",
        "water_resistance": 35,
        "printability_score": 90,
        "recycled_content_pct": 50.0,
        "source_confidence": "Medium (Product specific paper backing)",
        "emission_source": "Global paper tape benchmark",
        "description": "Natural starch adhesive paper sealing tape."
    },
    {
        "id": "mat_pla_bioplastic",
        "name": "PLA Cornstarch Bioplastic",
        "category": "bioplastic",
        "density_g_cm3": 1.24,
        "co2e_per_kg": 1.45,
        "cost_per_kg_usd": 3.10,
        "protection_rating": 60,
        "recyclability_score": 10,
        "compostability": "industrial",
        "water_resistance": 70,
        "printability_score": 85,
        "recycled_content_pct": 0.0,
        "source_confidence": "High (NatureWorks Ingeo 4043D technical dataset)",
        "emission_source": "https://plastics-database.org/grade/natureworks-ingeo-4043d",
        "description": "Plant-based PLA bioplastic film (1.45 kg CO2e/kg, 1.24 g/cm3)."
    },
    {
        "id": "mat_recycled_pet",
        "name": "Recycled PET (rPET Film)",
        "category": "plastic",
        "density_g_cm3": 1.39,
        "co2e_per_kg": 1.72,
        "cost_per_kg_usd": 2.40,
        "protection_rating": 80,
        "recyclability_score": 90,
        "compostability": "none",
        "water_resistance": 90,
        "printability_score": 90,
        "recycled_content_pct": 100.0,
        "source_confidence": "High (Verified CarbonCloud benchmark)",
        "emission_source": "https://apps.carboncloud.com/climatehub/product-reports/id/3213687275485",
        "description": "100% Post-consumer recycled PET film (1.72 kg CO2e/kg)."
    },
    {
        "id": "mat_virgin_plastic_bubble",
        "name": "LDPE Plastic Bubble Wrap / Mailer",
        "category": "plastic",
        "density_g_cm3": 0.922,
        "co2e_per_kg": 1.92,
        "cost_per_kg_usd": 2.20,
        "protection_rating": 65,
        "recyclability_score": 30,
        "compostability": "none",
        "water_resistance": 95,
        "printability_score": 85,
        "recycled_content_pct": 0.0,
        "source_confidence": "Medium (BAFA Climatiq & LyondellBasell ASTM D1505)",
        "emission_source": "https://www.climatiq.io/data/emission-factor/d6d49547-7084-445c-b722-778d0655fd0a",
        "description": "Single-use LDPE bubble wrap/mailer (1.92 kg CO2e/kg)."
    },
    {
        "id": "mat_mycelium",
        "name": "Mushroom Mycelium Bio-Foam",
        "category": "organic",
        "density_g_cm3": 0.18,
        "co2e_per_kg": -1.305,
        "cost_per_kg_usd": 3.80,
        "protection_rating": 60,
        "recyclability_score": 100,
        "compostability": "home",
        "water_resistance": 30,
        "printability_score": 40,
        "recycled_content_pct": 100.0,
        "source_confidence": "Low (Myco cradle-to-gate carbon negative audit)",
        "emission_source": "https://www.myco.cz/en/blog/myco-packaging-has-a-negative-carbon-footprint/",
        "description": "Carbon-negative mushroom root bio-foam (-1.305 kg CO2e/kg)."
    },
    {
        "id": "mat_glassine_paper",
        "name": "Glassine Specialty Paper",
        "category": "paper",
        "density_g_cm3": 0.65,
        "co2e_per_kg": 1.10,
        "cost_per_kg_usd": 1.80,
        "protection_rating": 50,
        "recyclability_score": 95,
        "compostability": "home",
        "water_resistance": 55,
        "printability_score": 85,
        "recycled_content_pct": 50.0,
        "source_confidence": "Medium (Specialty calendered paper)",
        "emission_source": "Global specialty paper benchmark",
        "description": "Smooth, translucent moisture/grease-resistant paper envelope."
    },
    {
        "id": "mat_alu_laminate",
        "name": "Aluminum Foil Laminate (PET/Alu/PE)",
        "category": "plastic",
        "density_g_cm3": 1.45,
        "co2e_per_kg": 7.55,
        "cost_per_kg_usd": 4.20,
        "protection_rating": 75,
        "recyclability_score": 15,
        "compostability": "none",
        "water_resistance": 100,
        "printability_score": 90,
        "recycled_content_pct": 0.0,
        "source_confidence": "High (Verified CarbonCloud benchmark)",
        "emission_source": "https://apps.carboncloud.com/climatehub/product-reports/id/1874461722934",
        "description": "High-barrier multi-layer laminate (7.55 kg CO2e/kg)."
    },
    {
        "id": "mat_water_ink",
        "name": "Water-Based Flexo Ink",
        "category": "ink",
        "density_g_cm3": 1.0,
        "co2e_per_kg": 1.80,
        "cost_per_kg_usd": 3.50,
        "protection_rating": 10,
        "recyclability_score": 90,
        "compostability": "industrial",
        "water_resistance": 40,
        "printability_score": 90,
        "recycled_content_pct": 0.0,
        "source_confidence": "High (Flexographic printing benchmark)",
        "emission_source": "Commercial paper flexo print benchmark",
        "description": "Non-toxic water-based printing ink compatible with paper recycling."
    },
    {
        "id": "mat_soy_ink",
        "name": "Soy-Based Vegetable Ink",
        "category": "ink",
        "density_g_cm3": 1.0,
        "co2e_per_kg": 1.20,
        "cost_per_kg_usd": 4.00,
        "protection_rating": 10,
        "recyclability_score": 95,
        "compostability": "home",
        "water_resistance": 45,
        "printability_score": 95,
        "recycled_content_pct": 0.0,
        "source_confidence": "Medium (Bio-based binder formulation)",
        "emission_source": "Commercial soy ink print benchmark",
        "description": "Bio-based soy vegetable ink with superior deinking recyclability."
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
        "source_confidence": "High (ISO 14040 Verified Returnable Box)",
        "emission_source": "Returnable shipper LCA benchmark",
        "description": "Heavy-duty returnable shipping container engineered for 30+ reuse cycles."
    }
]

REGIONAL_RECYCLING_INFRASTRUCTURE = {
    "US": {"paper": 0.90, "plastic": 0.15, "bioplastic": 0.10, "organic": 0.70, "reusable": 0.60},
    "EU": {"paper": 0.95, "plastic": 0.40, "bioplastic": 0.35, "organic": 0.85, "reusable": 0.80},
    "IN": {"paper": 0.80, "plastic": 0.25, "bioplastic": 0.05, "organic": 0.50, "reusable": 0.75},
    "SEA": {"paper": 0.75, "plastic": 0.20, "bioplastic": 0.05, "organic": 0.40, "reusable": 0.65},
    "ME": {"paper": 0.70, "plastic": 0.15, "bioplastic": 0.35, "organic": 0.35, "reusable": 0.50},
    "GLOBAL": {"paper": 0.85, "plastic": 0.25, "bioplastic": 0.15, "organic": 0.60, "reusable": 0.70}
}


def load_materials_from_csv() -> List[Dict[str, Any]]:
    if not os.path.exists(CSV_PATH):
        return RAW_MATERIALS_LIST

    materials = []
    try:
        with open(CSV_PATH, mode="r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            for row in reader:
                name = row.get("material", "").strip()
                if not name:
                    continue

                def safe_float(val, default=0.0):
                    try:
                        return float(val)
                    except (ValueError, TypeError):
                        return default

                ef_val = safe_float(row.get("emission_factor_value"), 1.0)
                
                # Check for average cost if min/max available or single cost_value
                cost_min = safe_float(row.get("cost_min"), None)
                cost_max = safe_float(row.get("cost_max"), None)
                if cost_min is not None and cost_max is not None:
                    # INR to USD conversion ~83 INR/USD
                    avg_inr = (cost_min + cost_max) / 2.0
                    cost_usd = round(avg_inr / 83.0, 2)
                else:
                    cost_usd = safe_float(row.get("cost_value"), 1.50)

                rec_min = safe_float(row.get("recycled_content_min"), None)
                rec_max = safe_float(row.get("recycled_content_max"), None)
                if rec_min is not None and rec_max is not None:
                    recycled_pct = round((rec_min + rec_max) / 2.0, 1)
                else:
                    recycled_pct = safe_float(row.get("recycled_content_value"), 0.0)

                water_res = safe_float(row.get("water_resistance_value"), 50.0)
                strength_val = safe_float(row.get("strength_rating_value"), 65.0)

                ID_MAP = {
                    "virgin corrugated board": "mat_virgin_cardboard",
                    "recycled corrugated board": "mat_recycled_cardboard",
                    "kraft paper": "mat_kraft_paper",
                    "molded pulp": "mat_molded_pulp",
                    "honeycomb paper": "mat_honeycomb_paper",
                    "paper tape": "mat_paper_tape",
                    "pla bioplastic": "mat_pla_bioplastic",
                    "recycled pet": "mat_recycled_pet",
                    "ldpe mailer": "mat_virgin_plastic_bubble",
                    "mycelium packaging": "mat_mycelium",
                    "glassine paper": "mat_glassine_paper",
                    "aluminum foil laminate": "mat_alu_laminate",
                    "water-based ink": "mat_water_ink",
                    "soy-based ink": "mat_soy_ink",
                    "reusable polypropylene box": "mat_reusable_polypropylene"
                }
                mat_id = ID_MAP.get(name.lower().strip(), "mat_" + name.lower().replace(" ", "_").replace("-", "_"))

                comp = row.get("compostability_value", "").lower()
                if "home" in comp or "generally yes" in comp:
                    compost_type = "home"
                elif "industrial" in comp:
                    compost_type = "industrial"
                else:
                    compost_type = "none"

                mat_entry = {
                    "id": mat_id,
                    "name": name,
                    "category": "paper" if "paper" in name.lower() or "board" in name.lower() or "pulp" in name.lower() or "tape" in name.lower() else ("bioplastic" if "pla" in name.lower() else ("organic" if "mycelium" in name.lower() else "plastic")),
                    "density_g_cm3": safe_float(row.get("density_value"), 0.50) or 0.50,
                    "co2e_per_kg": ef_val,
                    "cost_per_kg_usd": cost_usd if cost_usd > 0 else 1.20,
                    "protection_rating": strength_val,
                    "recyclability_score": 95 if "yes" in row.get("recyclability_value", "").lower() else (30 if "limited" in row.get("recyclability_value", "").lower() else 15),
                    "compostability": compost_type,
                    "water_resistance": water_res,
                    "printability_score": 90 if "high" in row.get("print_compatibility_value", "").lower() else 65,
                    "recycled_content_pct": recycled_pct,
                    "source_confidence": f"{row.get('emission_factor_confidence', 'Medium')} ({row.get('emission_factor_region', 'Global')} benchmark)",
                    "emission_source": row.get("emission_factor_source") or "DEFRA / CarbonCloud / ADEME",
                    "description": f"{name} database factor ({ef_val} kg CO2e/kg)."
                }
                materials.append(mat_entry)
    except Exception as e:
        print(f"Note loading CSV materials: {e}")

    return materials if materials else RAW_MATERIALS_LIST


MATERIALS_DB = load_materials_from_csv()


def get_all_materials() -> List[Dict[str, Any]]:
    return MATERIALS_DB


def get_material_by_id(mat_id: str) -> Optional[Dict[str, Any]]:
    for m in MATERIALS_DB:
        if m["id"] == mat_id:
            return m
    if "plastic_bubble" in mat_id or "ldpe" in mat_id:
        for m in MATERIALS_DB:
            if "ldpe" in m["id"] or "bubble" in m["name"].lower() or "ldpe" in m["name"].lower():
                return m
    if "cardboard" in mat_id or "corrugated" in mat_id:
        for m in MATERIALS_DB:
            if ("recycled" in mat_id and "recycled" in m["name"].lower()) or ("virgin" in mat_id and "virgin" in m["name"].lower()):
                return m
    for m in RAW_MATERIALS_LIST:
        if m["id"] == mat_id:
            return m
    return MATERIALS_DB[0] if MATERIALS_DB else None
