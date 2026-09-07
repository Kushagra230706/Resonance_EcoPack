"""
Green Claims Validator Module for Resonance EcoPack

Evaluates marketing claims (e.g. "100% biodegradable", "Zero Waste", "Plastic-Free")
against greenwashing risks, regulatory compliance (FTC / EU Green Claims Directive),
and provides accurate, certifiable alternative phrasing.
"""

RISKY_KEYWORDS = {
    "100% biodegradable": {
        "risk_level": "HIGH",
        "reason": "Without specified timeframes or disposal conditions (industrial vs home compost), this claim risks regulatory penalties under EU Green Claims Directive.",
        "standards": ["ASTM D6400", "EN 13432"],
        "alternatives": [
            "Made from certified compostable material (ASTM D6400). Best disposed in industrial composting facilities.",
            "Decomposes up to 85% within 180 days in industrial composting conditions.",
            "Designed for biological recovery where municipal organic collection exists."
        ]
    },
    "zero waste": {
        "risk_level": "MEDIUM",
        "reason": "'Zero Waste' is considered absolute and misleading unless verified by ZWIA certification for the entire lifecycle.",
        "standards": ["ZWIA Zero Waste Standard"],
        "alternatives": [
            "Designed for circular recovery with 95%+ recyclable content by weight.",
            "Supports waste diversion through fully curbside-recyclable paper packaging.",
            "Zero single-use plastic packaging."
        ]
    },
    "eco-friendly": {
        "risk_level": "HIGH",
        "reason": "Vague, non-specific environmental claims are prohibited by the FTC Green Guides and EU Consumer Directive unless backed by full LCA evidence.",
        "standards": ["ISO 14040/44 LCA Standard"],
        "alternatives": [
            "Achieves an estimated 32% reduction in CO₂e compared to conventional plastic packaging.",
            "Sourced from FSC-certified responsibly managed forests.",
            "Uses 80% post-consumer recycled paperboard."
        ]
    },
    "100% recyclable": {
        "risk_level": "MEDIUM",
        "reason": "Recyclability depends on municipal infrastructure. If facilities do not accept the material locally, the claim can be deemed deceptive.",
        "standards": ["ISO 14021 Type II Environmental Label"],
        "alternatives": [
            "Widely recyclable in curbside paper collection programs (check local facilities).",
            "Monomaterial paper construction engineered for standard recycling streams.",
            "100% paper-based and recyclable where curbside facilities exist."
        ]
    }
}


def validate_green_claim(claim_text: str):
    """
    Validates a green claim string against greenwashing risks.
    """
    claim_lower = claim_text.strip().lower()
    
    # Check for known risky phrases
    for risky_key, data in RISKY_KEYWORDS.items():
        if risky_key in claim_lower:
            return {
                "input_claim": claim_text,
                "is_compliant": False,
                "risk_level": data["risk_level"],
                "greenwashing_warning": data["reason"],
                "applicable_standards": data["standards"],
                "suggested_alternatives": data["alternatives"],
                "verdict_summary": f"⚠️ Claim contains '{risky_key}' which has a {data['risk_level']} risk of greenwashing regulatory flags."
            }
            
    # Default fallback evaluation for custom claims
    return {
        "input_claim": claim_text,
        "is_compliant": True,
        "risk_level": "LOW",
        "greenwashing_warning": "No obvious deceptive phrases detected. Ensure you hold verifiable documentation or ISO 14040 LCA test reports.",
        "applicable_standards": ["ISO 14021", "FSC Chain of Custody"],
        "suggested_alternatives": [
            f"{claim_text} (Supported by ISO 14040 Life Cycle Assessment data)",
            f"Verified under regional packaging recovery guidelines."
        ],
        "verdict_summary": "✅ Claim appears specific and low risk. Verify local municipal recycling guidelines before printing."
    }
