"""
Live AI Recommender Engine for PackWise AI
Calls Google Gemini API (gemini-3.6-flash) to dynamically generate real-time 
executive Pareto trade-off recommendations and full section insights for optimized packaging specs.
"""

import os
import json
from typing import Dict, Any, Optional

def call_live_ai_recommendation(
    winner: Dict[str, Any],
    baseline: Dict[str, Any],
    annual_impact: Dict[str, Any],
    winner_index: int = 1,
    product_type: str = "general",
    shipping_region: str = "GLOBAL",
    sustainability_goal: str = "balanced",
    user_weights: Optional[Dict[str, float]] = None
) -> Dict[str, Any]:
    """
    Generates dynamic, AI-powered insights for the entire Pareto Recommendation Section using Gemini 3.6 Flash.
    Returns a dictionary with:
    - pareto_recommendation_text
    - annual_impact_summary
    - verified_impact_claim
    - objective_badges
    - tradeoffs_breakdown
    """
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

    winner_name = winner.get("name", "Option 1")
    co2_reduction = annual_impact.get("co2_reduction_pct", 25.0)
    cost_reduction = annual_impact.get("cost_reduction_pct", 1.6)
    protection_score = winner.get("protection_score", 80)
    branding_score = winner.get("branding_score", 80)
    recyclability_score = winner.get("recyclability_score", 85)
    annual_vol = annual_impact.get("annual_volume", 10000)
    co2_saved_kg = annual_impact.get("co2_saved_kg", 2060)
    cost_saved_usd = annual_impact.get("cost_saved_usd", 700)
    outer_mat = winner.get("outer_material", "Recycled Cardboard")
    inner_mat = winner.get("inner_material", "Molded Pulp")

    if api_key and api_key != "your_gemini_api_key_here":
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            prompt = (
                f"You are PackWise AI, an expert sustainable packaging consultant. "
                f"Generate a comprehensive JSON response for the executive recommendation section for choosing Option {winner_index} ({winner_name}).\n"
                f"Product Category: {product_type}, Shipping Region: {shipping_region}, Sustainability Focus: {sustainability_goal}.\n"
                f"Key Metrics:\n"
                f"- Winner Outer Material: {outer_mat}, Inner Cushion: {inner_mat}\n"
                f"- CO2e Reduction: {co2_reduction}%\n"
                f"- Annual CO2e Saved: {co2_saved_kg:,} kg ({co2_saved_kg/1000:.1f} Tons)\n"
                f"- Cost Savings: {cost_reduction}% (${cost_saved_usd:,.2f}/yr)\n"
                f"- Protection Score: {protection_score}/100\n"
                f"- Branding Score: {branding_score}/100\n"
                f"- Recyclability Score: {recyclability_score}%\n"
                f"- Annual Volume: {annual_vol:,} shipments/year\n\n"
                f"Return ONLY a valid JSON object with exact keys:\n"
                f"{{\n"
                f'  "pareto_recommendation_text": "Option {winner_index} ({winner_name}) was selected because it is {cost_reduction}% cheaper than the conventional option, has {co2_reduction}% lower carbon than the plastic option, and meets the required protection threshold ({protection_score}/100).",\n'
                f'  "annual_impact_summary": "For {annual_vol:,} shipments/year, this design saves approximately {co2_saved_kg/1000:.1f} tons CO2e and ${cost_saved_usd:,.0f} annually.",\n'
                f'  "verified_impact_claim": "Estimated {co2_reduction}% lower CO2e under selected lifecycle assumptions (Avoids vague \\"100% eco-friendly\\" greenwashing).",\n'
                f'  "objective_badges": [\n'
                f'     {{"label": "Min CO₂e", "icon": "🌱"}},\n'
                f'     {{"label": "Min Cost", "icon": "💲"}},\n'
                f'     {{"label": "Min Damage Risk", "icon": "🛡️"}},\n'
                f'     {{"label": "Min Void Space", "icon": "📦"}},\n'
                f'     {{"label": "Min Material Mass", "icon": "⚖️"}},\n'
                f'     {{"label": "Max Branding", "icon": "✨"}},\n'
                f'     {{"label": "Max Circularity", "icon": "♻️"}},\n'
                f'     {{"label": "Satisfy Protection", "icon": "✅"}}\n'
                f'  ],\n'
                f'  "tradeoffs_breakdown": {{\n'
                f'     "cost_vs_damage": {{"title": "1. Cheap Packaging vs Product Damage Risk", "finding": "AI finding..."}},\n'
                f'     "eco_cost_availability": {{"title": "2. Eco-Friendly Material vs Cost & Regional Availability", "finding": "AI finding..."}},\n'
                f'     "branding_vs_recyclability": {{"title": "3. Premium Branding vs Curbside Recyclability", "finding": "AI finding..."}},\n'
                f'     "lightweight_vs_shipping_stress": {{"title": "4. Lightweight Packaging vs Transit Shipping Stress", "finding": "AI finding..."}},\n'
                f'     "regional_composting_reality": {{"title": "5. Biodegradable Claim vs Regional Infrastructure Reality", "finding": "AI finding..."}}\n'
                f'  }}\n'
                f"}}"
            )
            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents=prompt
            )
            if response and response.text:
                raw_text = response.text.strip()
                start_idx = raw_text.find('{')
                end_idx = raw_text.rfind('}')
                if start_idx != -1 and end_idx != -1:
                    json_str = raw_text[start_idx:end_idx+1]
                    parsed = json.loads(json_str)
                    if isinstance(parsed, dict) and "pareto_recommendation_text" in parsed:
                        return parsed
        except Exception as e:
            print(f"Gemini 3.6 Flash AI recommendation generation note: {e}")

    # 2. Try Groq API as secondary live AI fallback
    groq_key = os.getenv("GROQ_API_KEY")
    if groq_key and groq_key != "your_groq_api_key_here":
        try:
            import urllib.request
            import urllib.error
            models_to_try = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]
            url = "https://api.groq.com/openai/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {groq_key}",
                "Content-Type": "application/json"
            }
            for m in models_to_try:
                try:
                    payload = {
                        "model": m,
                        "messages": [
                            {"role": "system", "content": "You are PackWise AI sustainable packaging consultant. Respond ONLY with a valid JSON object."},
                            {"role": "user", "content": prompt}
                        ],
                        "temperature": 0.2,
                        "max_tokens": 800
                    }
                    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method="POST")
                    with urllib.request.urlopen(req, timeout=2.5) as response:
                        res_data = json.loads(response.read().decode('utf-8'))
                        content = res_data["choices"][0]["message"]["content"]
                        if content:
                            start_idx = content.find('{')
                            end_idx = content.rfind('}')
                            if start_idx != -1 and end_idx != -1:
                                parsed = json.loads(content[start_idx:end_idx+1])
                                if isinstance(parsed, dict) and "pareto_recommendation_text" in parsed:
                                    return parsed
                except urllib.error.HTTPError as he:
                    if he.code in (401, 403):
                        print(f"Groq API key unauthorized ({he.code}). Skipping remaining Groq models.")
                        break
                    print(f"Groq model '{m}' recommendation note: {he}")
                except Exception as e:
                    print(f"Groq model '{m}' recommendation note: {e}")
        except Exception as e:
            print(f"Groq API recommendation attempt note: {e}")

    # Fallback rule-based synthesis if live APIs are unavailable
    co2_tons = round(co2_saved_kg / 1000.0, 1)
    return {
        "pareto_recommendation_text": (
            f"Option {winner_index} ({winner_name}) was selected because it is {cost_reduction}% cheaper than the conventional option, "
            f"has {co2_reduction}% lower carbon than the plastic option, and meets the required protection threshold ({protection_score}/100)."
        ),
        "annual_impact_summary": (
            f"For {annual_vol:,} shipments/year, this design saves approximately {co2_tons} tons CO₂e and ${cost_saved_usd:,.0f} annually."
        ),
        "verified_impact_claim": (
            f"Estimated {co2_reduction}% lower CO₂e under selected lifecycle assumptions (Avoids vague \"100% eco-friendly\" greenwashing)."
        ),
        "objective_badges": [
            {"label": "Min CO₂e", "icon": "🌱"},
            {"label": "Min Cost", "icon": "💲"},
            {"label": "Min Damage Risk", "icon": "🛡️"},
            {"label": "Min Void Space", "icon": "📦"},
            {"label": "Min Material Mass", "icon": "⚖️"},
            {"label": "Max Branding", "icon": "✨"},
            {"label": "Max Circularity", "icon": "♻️"},
            {"label": "Satisfy Protection", "icon": "✅"}
        ],
        "tradeoffs_breakdown": {
            "cost_vs_damage": {
                "title": "1. Cheap Packaging vs Product Damage Risk",
                "finding": f"The baseline option carries a {baseline.get('damage_probability_pct', 4.5)}% damage risk (${baseline.get('expected_damage_cost_usd', 1.5)}/unit replacement loss). Winner reduces damage risk to {winner.get('damage_probability_pct', 1.2)}%, saving ${round(baseline.get('expected_damage_cost_usd', 1.5) - winner.get('expected_damage_cost_usd', 0.4), 2)}/unit."
            },
            "eco_cost_availability": {
                "title": "2. Eco-Friendly Material vs Cost & Regional Availability",
                "finding": f"The '{winner_name}' design balances low carbon footprint ({winner.get('co2e_kg', 0.12)} kg) at a cost-effective ${winner.get('unit_cost_usd', 0.65)}/unit."
            },
            "branding_vs_recyclability": {
                "title": "3. Premium Branding vs Curbside Recyclability",
                "finding": f"Winner balances a {branding_score}/100 branding unboxing score with {recyclability_score}% regional curbside recyclability."
            },
            "lightweight_vs_shipping_stress": {
                "title": "4. Lightweight Packaging vs Transit Shipping Stress",
                "finding": f"Winner achieves {winner.get('shipping_efficiency_pct', 95.0)}% shipping volume efficiency while maintaining a high {protection_score}/100 protection rating."
            },
            "regional_composting_reality": {
                "title": "5. Biodegradable Claim vs Regional Infrastructure Reality",
                "finding": f"In region '{shipping_region}', paper and molded pulp materials achieve {recyclability_score}% real curbside recovery compared to bioplastics facing landfill disposal."
            }
        }
    }

