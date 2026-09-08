"""
Green Claims Validator Module for Resonance EcoPack

Evaluates marketing claims (e.g. "100% biodegradable", "Zero Waste", "Plastic-Free")
against greenwashing risks, regulatory compliance (FTC / EU Green Claims Directive),
and provides accurate, certifiable alternative phrasing.
"""

RISKY_KEYWORDS = {
    "carbon neutral": {
        "risk_level": "HIGH",
        "reason": "Claims of 'Carbon Neutrality' based on unverified off-site carbon offsets face severe regulatory bans under the EU Empowering Consumers for Green Transition directive.",
        "standards": ["ISO 14068-1", "PAS 2060"],
        "alternatives": [
            "Achieves an estimated 31% lower lifecycle CO₂e through recycled monomaterials (ISO 14040 LCA verified).",
            "Net CO₂e reduced by 2.4 kg per unit through direct material efficiency.",
            "Manufactured using 100% renewable electricity at production site."
        ]
    },
    "eco-friendly": {
        "risk_level": "HIGH",
        "reason": "Vague, non-specific environmental claims are strictly prohibited by FTC Green Guides and EU Directives unless backed by full ISO 14040 LCA evidence.",
        "standards": ["ISO 14040/44 LCA Standard", "FTC Green Guides 16 CFR § 260.4"],
        "alternatives": [
            "Achieves an estimated 32% reduction in CO₂e compared to conventional plastic packaging.",
            "Sourced from FSC-certified responsibly managed forests (FSC-C000000).",
            "Uses 80% post-consumer recycled paperboard."
        ]
    },
    "biodegradable": {
        "risk_level": "HIGH",
        "reason": "Unqualified 'biodegradable' claims without specific degradation timeframes or disposal environments (home vs industrial) violate FTC guidelines and EU rules.",
        "standards": ["ASTM D6400", "EN 13432", "ISO 14855"],
        "alternatives": [
            "Made from certified industrially compostable material (ASTM D6400). Best disposed in commercial organic collection.",
            "Decomposes up to 90% within 180 days in municipal composting infrastructure.",
            "Designed for organic recovery where industrial composting infrastructure exists."
        ]
    },
    "100% biodegradable": {
        "risk_level": "HIGH",
        "reason": "Absolute statements like '100% Biodegradable' trigger greenwashing flags without certified ASTM D6400 laboratory proof.",
        "standards": ["ASTM D6400", "EN 13432"],
        "alternatives": [
            "Compostable paper packaging certified under EN 13432 standards.",
            "Degrades naturally in soil without microplastic residue within 6 months."
        ]
    },
    "zero waste": {
        "risk_level": "MEDIUM",
        "reason": "'Zero Waste' is an absolute claim that is legally misleading unless audited under ZWIA (Zero Waste International Alliance) certification.",
        "standards": ["ZWIA Zero Waste Standard"],
        "alternatives": [
            "Designed for circular recovery with 95%+ curbside recyclable paper mass.",
            "Supports waste diversion through fully curbside-recyclable monomaterial construction.",
            "Zero single-use plastic packaging components."
        ]
    },
    "plastic-free": {
        "risk_level": "MEDIUM",
        "reason": "'Plastic-free' claims can be deceptive if adhesives, coatings, inks, or tear-tapes contain synthetic polymer additives.",
        "standards": ["EN 13430", "FTC 16 CFR § 260.17"],
        "alternatives": [
            "100% paper-based structural package with water-based soy ink printing.",
            "Eliminates conventional single-use plastic cushions and poly-bags.",
            "Uses bio-based starch adhesive in place of synthetic hot-melt glue."
        ]
    },
    "100% recyclable": {
        "risk_level": "MEDIUM",
        "reason": "Recyclability depends on municipal infrastructure. If facilities do not accept the specific material locally, the claim is deemed deceptive.",
        "standards": ["ISO 14021 Type II Environmental Label", "FTC 16 CFR § 260.12"],
        "alternatives": [
            "Widely recyclable in standard curbside paper collection streams (check local municipal facilities).",
            "Monomaterial paper construction engineered for high-efficiency pulp repulpability.",
            "100% paper-based box recyclable where paper recovery exists."
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
