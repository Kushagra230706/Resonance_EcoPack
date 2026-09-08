import requests
import json

BASE_URL = "http://127.0.0.1:8000"

print("--- 1. Testing Packaging Copilot ---")
copilot_res = requests.post(f"{BASE_URL}/api/copilot-chat", json={
    "message": "I need plastic-free packaging for a fragile candle under ₹35 per unit."
})
print("Copilot Response:", json.dumps(copilot_res.json(), indent=2))

print("\n--- 2. Testing Brand Style Generator ---")
brand_res = requests.post(f"{BASE_URL}/api/generate-brand-style", json={
    "brand_name": "EcoLumina",
    "product_type": "Fragile Glass Candle",
    "sustainability_focus": "100% Plastic-Free",
    "visual_direction": "Minimalist & Premium"
})
print("Brand Style Response:", json.dumps(brand_res.json(), indent=2))

print("\n--- 3. Testing Claim Validator (6 Claims) ---")
claims = ["Carbon neutral", "Eco-friendly", "Biodegradable", "Zero waste", "Plastic-free", "100% recyclable"]
for c in claims:
    claim_res = requests.post(f"{BASE_URL}/api/validate-claim", json={"claim_text": c})
    res_data = claim_res.json()
    summary = res_data.get('verdict_summary', '').encode('ascii', 'ignore').decode('ascii')
    print(f"Claim '{c}' -> Risk: {res_data.get('risk_level')}, Warning: {summary}")

print("\n--- 4. Testing Smart Recommendation Explanation ---")
opt_res = requests.post(f"{BASE_URL}/api/optimize", json={
    "length_cm": 10.0,
    "width_cm": 10.0,
    "height_cm": 12.0,
    "weight_g": 400.0,
    "fragility": "high",
    "product_type": "fragile_glass",
    "budget_limit_usd": 0.42,
    "sustainability_goal": "lowest_plastic"
})
opt_data = opt_res.json()
rec_text = opt_data.get("pareto_recommendation_text", "").encode('ascii', 'ignore').decode('ascii')
print("Pareto Rec Text:", rec_text)
print("Recommended Winner:", opt_data.get("recommended", {}).get("name"))
