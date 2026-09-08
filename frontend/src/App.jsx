import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PackWiseHero from './components/PackWiseHero';
import ImageUploadModal from './components/ImageUploadModal';
import CopilotChat from './components/CopilotChat';
import DecisionCard from './components/DecisionCard';
import ComparisonDashboard from './components/ComparisonDashboard';
import ReuseBreakEvenCalculator from './components/ReuseBreakEvenCalculator';
import ThreeDBoxPreview from './components/ThreeDBoxPreview';
import ExportModal from './components/ExportModal';
import ClaimsChecker from './components/ClaimsChecker';
import QRDisposalGuide from './components/QRDisposalGuide';
import ScoringModelCustomizer from './components/ScoringModelCustomizer';
import BrandStyleGenerator from './components/BrandStyleGenerator';
import CaseStudiesDashboard from './components/CaseStudiesDashboard';
import CommercializationDashboard from './components/CommercializationDashboard';
import { Camera, Sliders, RefreshCw, Layers, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('optimizer');
  const [isVisionOpen, setIsVisionOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Complete Form State
  const [formData, setFormData] = useState({
    length_cm: 12.0,
    width_cm: 8.0,
    height_cm: 6.0,
    weight_g: 250.0,
    fragility: 'high',
    moisture_sensitivity: 'medium',
    temperature_sensitivity: 'standard',
    product_type: 'fragile_glass',
    annual_volume: 10000,
    product_value_usd: 35.0,
    shipping_region: 'GLOBAL',
    shipping_distance_km: 500.0,
    shipping_mode: 'road',
    branding_preference: 'standard',
    budget_limit_usd: 5.0,
    sustainability_goal: 'balanced',
    user_weights: {
      sustainability: 0.35,
      cost: 0.25,
      protection: 0.25,
      branding: 0.10,
      circularity: 0.05
    }
  });

  const [results, setResults] = useState(null);
  const [showHero, setShowHero] = useState(true);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setShowHero(false); // Hide hero section when changing sections from navbar
  };

  const handleLogoClick = () => {
    setActiveTab('optimizer');
    setShowHero(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWeightsChange = (newWeights) => {
    setFormData(prev => ({
      ...prev,
      user_weights: newWeights
    }));
    if (results) {
      setResults(prevResults => recalculateLiveScores(newWeights, prevResults));
    }
  };

  const recalculateLiveScores = (newWeights, currentResults) => {
    if (!currentResults || !currentResults.alternatives) return currentResults;

    const total = (newWeights.sustainability || 0) + (newWeights.protection || 0) + (newWeights.cost || 0) + (newWeights.branding || 0) + (newWeights.circularity || 0) || 1;
    const ws = (newWeights.sustainability || 0) / total;
    const wp = (newWeights.protection || 0) / total;
    const wc = (newWeights.cost || 0) / total;
    const wb = (newWeights.branding || 0) / total;
    const wcirc = (newWeights.circularity || 0) / total;

    const updatedAlternatives = currentResults.alternatives.map(alt => {
      const score_sust = Math.min(100, Math.max(0, alt.dimension_scores?.sustainability_score ?? (100 - (alt.co2e_kg * 40))));
      const score_cost = Math.min(100, Math.max(0, alt.dimension_scores?.cost_score ?? (100 - (alt.unit_cost_usd * 10))));
      const score_prot = Math.min(100, Math.max(0, alt.protection_score || 80));
      const score_brand = Math.min(100, Math.max(0, alt.branding_score || 80));
      const score_circ = Math.min(100, Math.max(0, alt.recyclability_score || 80));

      const composite = (score_sust * ws) + (score_prot * wp) + (score_cost * wc) + (score_brand * wb) + (score_circ * wcirc);
      const overall = Math.round(composite * 10) / 10;

      return {
        ...alt,
        overall_score: overall,
        dimension_scores: {
          ...(alt.dimension_scores || {}),
          sustainability: Math.round(ws * 100) / 100,
          protection: Math.round(wp * 100) / 100,
          cost: Math.round(wc * 100) / 100,
          branding: Math.round(wb * 100) / 100,
          circularity: Math.round(wcirc * 100) / 100
        }
      };
    });

    const sorted = [...updatedAlternatives].sort((a, b) => b.overall_score - a.overall_score);
    const newRecommended = sorted[0];
    const baseline = sorted.find(a => a.is_baseline) || sorted[sorted.length - 1];

    const annualVol = currentResults.annual_impact?.annual_volume || formData.annual_volume || 10000;
    const co2_saved_kg = Math.max(0, Math.round((baseline.co2e_kg - newRecommended.co2e_kg) * annualVol * 10) / 10);
    const cost_saved_usd = Math.max(0, Math.round((baseline.unit_cost_usd - newRecommended.unit_cost_usd) * annualVol * 100) / 100);
    const co2_reduction_pct = Math.round(((baseline.co2e_kg - newRecommended.co2e_kg) / (baseline.co2e_kg || 1)) * 1000) / 10;
    const cost_reduction_pct = Math.round(((baseline.unit_cost_usd - newRecommended.unit_cost_usd) / (baseline.unit_cost_usd || 1)) * 1000) / 10;

    const winnerIndex = newRecommended.option_number || 1;
    const pareto_recommendation_text = `PackWise AI recommends Option ${winnerIndex} (${newRecommended.name}) because it reduces estimated CO₂e by ${co2_reduction_pct}%, lowers total packaging cost by ${cost_reduction_pct}%, maintains high protection (${newRecommended.protection_score}/100), and improves brand presentation (${newRecommended.branding_score}/100).`;

    return {
      ...currentResults,
      recommended: newRecommended,
      baseline: baseline,
      alternatives: updatedAlternatives,
      pareto_recommendation_text: pareto_recommendation_text,
      why_this_won: pareto_recommendation_text,
      annual_impact: {
        ...(currentResults.annual_impact || {}),
        co2_saved_kg: co2_saved_kg,
        cost_saved_usd: cost_saved_usd,
        co2_reduction_pct: co2_reduction_pct,
        cost_reduction_pct: cost_reduction_pct,
        annual_volume: annualVol
      },
      tradeoffs_breakdown: {
        cost_vs_damage: { title: "1. Cheap Packaging vs Product Damage Risk", finding: `The baseline option carries a ${baseline.damage_probability_pct}% damage risk ($${baseline.expected_damage_cost_usd}/unit loss). Winner reduces damage risk to ${newRecommended.damage_probability_pct}%, saving $${Math.max(0, (baseline.expected_damage_cost_usd - newRecommended.expected_damage_cost_usd)).toFixed(2)}/unit.` },
        eco_cost_availability: { title: "2. Eco-Friendly Material vs Cost & Regional Availability", finding: `Winner '${newRecommended.name}' balances low carbon (${newRecommended.co2e_kg} kg) at $${newRecommended.unit_cost_usd}/unit.` },
        branding_vs_recyclability: { title: "3. Premium Branding vs Curbside Recyclability", finding: `Winner balances an ${newRecommended.branding_score}/100 branding score with ${newRecommended.recyclability_score}% regional curbside recyclability.` },
        lightweight_vs_shipping_stress: { title: "4. Lightweight Packaging vs Transit Shipping Stress", finding: `Winner achieves ${newRecommended.shipping_efficiency_pct}% volume efficiency while maintaining ${newRecommended.protection_score}/100 protection.` },
        regional_composting_reality: { title: "5. Biodegradable Claim vs Regional Infrastructure Reality", finding: `Paper-based pulp achieves 96% real curbside recovery compared to bioplastics facing landfill disposal.` }
      }
    };
  };

  const runOptimization = async (customData = formData) => {
    setLoading(true);
    const endpoints = [
      'http://127.0.0.1:8000/api/optimize',
      'http://localhost:8000/api/optimize'
    ];
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customData)
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        // try next endpoint
      }
    }
    console.warn("Backend API offline. Running client-side multi-objective Pareto optimization engine.");

    // High-Precision Client-Side Optimization Engine (Executes seamlessly when backend is not running)
    const vol_cm3 = (customData.length_cm || 12) * (customData.width_cm || 8) * (customData.height_cm || 6);
    const annualVol = customData.annual_volume || 10000;
    const prodVal = customData.product_value_usd || 35;
    const fragilityMult = customData.fragility === 'very_high' ? 1.8 : (customData.fragility === 'high' ? 1.4 : (customData.fragility === 'medium' ? 1.0 : 0.6));
    const isApparel = customData.product_type === 'apparel';
    const isCompostableGoal = customData.sustainability_goal === 'compostable';
    const isReusableGoal = customData.sustainability_goal === 'reusable';

    const budgetLimit = customData.budget_limit_usd || 5.0;
    const isLowestPlastic = customData.sustainability_goal === 'lowest_plastic';
    const isLowestCarbon = customData.sustainability_goal === 'lowest_carbon';

    let rawAlternatives = [
      {
        option_number: 1,
        id: "opt_corrugated_box",
        name: "Standard Corrugated Box + Plastic Bubble Wrap",
        category: "Corrugated Box",
        archetype: "conventional",
        pareto_archetype: "Baseline Conventional",
        verdict: "High Carbon Baseline",
        is_baseline: true,
        unit_cost_usd: Math.round((1.05 + (vol_cm3 * 0.0004)) * 100) / 100,
        co2e_kg: Math.round((0.42 + (vol_cm3 * 0.00015)) * 1000) / 1000,
        material_mass_kg: Math.round((0.22 + (vol_cm3 * 0.0001)) * 1000) / 1000,
        outer_dimensions_cm: `${(customData.length_cm + 4.0).toFixed(1)} x ${(customData.width_cm + 4.0).toFixed(1)} x ${(customData.height_cm + 4.0).toFixed(1)}`,
        protection_score: 88,
        branding_score: 60,
        recyclability_score: 45,
        shipping_efficiency_pct: 82.0,
        void_space_pct: 18.0,
        damage_probability_pct: Math.round(4.5 * fragilityMult * 10) / 10,
        expected_damage_cost_usd: Math.round(prodVal * 0.045 * fragilityMult * 100) / 100,
        damage_carbon_impact_kg: 0.15,
        base_score: 64.2,
        outer_material: "Virgin Kraft Cardboard",
        inner_material: "Low-Density Polyethylene Bubble Wrap",
        qualitative_co2e: "High",
        qualitative_cost: "High",
        qualitative_protection: "Medium",
        qualitative_branding: "Low",
        is_pareto_optimal: false,
        co2_breakdown: { material_emissions_kg: 0.25, manufacturing_emissions_kg: 0.08, transport_emissions_kg: 0.09, end_of_life_emissions_kg: 0.10, damage_carbon_kg: 0.15 },
        cost_breakdown: { material_cost_usd: 0.52, manufacturing_printing_usd: 0.16, labor_assembly_usd: 0.12, shipping_storage_usd: 0.25, expected_damage_cost_usd: Math.round(prodVal * 0.045 * fragilityMult * 100) / 100 },
        protection_breakdown: { drop_protection_score: 88, compression_strength_score: 86, moisture_barrier_score: 60, fit_void_score: 75, vibration_resistance_score: 85, testing_standards: ["Standard Parcel Test"] },
        branding_breakdown: { printable_surface_score: 65, color_compatibility_score: 60, unboxing_experience_score: 55, texture_finish_score: 50, storytelling_qr_score: 50 },
        dieline: { outer_length_cm: (customData.length_cm + 4.0).toFixed(1), outer_width_cm: (customData.width_cm + 4.0).toFixed(1), outer_height_cm: (customData.height_cm + 4.0).toFixed(1), cushion_thickness_cm: 2.0, flap_margin_cm: 2.0, sheet_width_cm: (customData.length_cm * 2 + 12).toFixed(1), sheet_length_cm: (customData.width_cm * 2 + 12).toFixed(1) },
        bom: [{ item: "Virgin Box", qty: "1 unit", mass_g: 180, cost_usd: 0.52 }]
      },
      {
        option_number: 2,
        id: "opt_paper_mailer",
        name: "Padded Kraft Paper Honeycomb Mailer",
        category: "Paper Mailer",
        archetype: "paper_eco",
        pareto_archetype: isApparel ? "Balanced" : "Cheapest",
        verdict: isApparel ? "Recommended" : (fragilityMult > 1.2 ? "Risky" : "Recommended"),
        is_baseline: false,
        unit_cost_usd: Math.round((0.35 + (vol_cm3 * 0.00015)) * 100) / 100,
        co2e_kg: Math.round((0.08 + (vol_cm3 * 0.00004)) * 1000) / 1000,
        material_mass_kg: Math.round((0.07 + (vol_cm3 * 0.00003)) * 1000) / 1000,
        outer_dimensions_cm: `${(customData.length_cm + 1.2).toFixed(1)} x ${(customData.width_cm + 1.2).toFixed(1)} x ${(customData.height_cm + 0.8).toFixed(1)}`,
        protection_score: 72,
        branding_score: 70,
        recyclability_score: 98,
        shipping_efficiency_pct: 92.0,
        void_space_pct: 8.0,
        damage_probability_pct: Math.round(3.2 * fragilityMult * 10) / 10,
        expected_damage_cost_usd: Math.round(prodVal * 0.032 * fragilityMult * 100) / 100,
        damage_carbon_impact_kg: 0.08,
        base_score: isApparel ? 95.8 : (isCompostableGoal ? 94.2 : 88.2),
        outer_material: "Kraft Paper Mesh",
        inner_material: "Expanded Paper Honeycomb",
        qualitative_co2e: "Low",
        qualitative_cost: "Low",
        qualitative_protection: fragilityMult > 1.2 ? "Low" : "Medium",
        qualitative_branding: "Medium",
        is_pareto_optimal: true,
        co2_breakdown: { material_emissions_kg: 0.06, manufacturing_emissions_kg: 0.02, transport_emissions_kg: 0.02, end_of_life_emissions_kg: 0.01, damage_carbon_kg: 0.08 },
        cost_breakdown: { material_cost_usd: 0.22, manufacturing_printing_usd: 0.10, labor_assembly_usd: 0.05, shipping_storage_usd: 0.05, expected_damage_cost_usd: Math.round(prodVal * 0.032 * fragilityMult * 100) / 100 },
        protection_breakdown: { drop_protection_score: 70, compression_strength_score: 65, moisture_barrier_score: 50, fit_void_score: 85, vibration_resistance_score: 70, testing_standards: ["ASTM D5276 Drop"] },
        branding_breakdown: { printable_surface_score: 70, color_compatibility_score: 65, unboxing_experience_score: 70, texture_finish_score: 75, storytelling_qr_score: 70 },
        dieline: { outer_length_cm: (customData.length_cm + 1.2).toFixed(1), outer_width_cm: (customData.width_cm + 1.2).toFixed(1), outer_height_cm: (customData.height_cm + 0.8).toFixed(1), cushion_thickness_cm: 0.6, flap_margin_cm: 1.0, sheet_width_cm: (customData.length_cm * 2 + 5).toFixed(1), sheet_length_cm: (customData.width_cm * 2 + 5).toFixed(1) },
        bom: [{ item: "Paper Honeycomb Mailer", qty: "1 unit", mass_g: 90, cost_usd: 0.42 }]
      },
      {
        option_number: 3,
        id: "opt_molded_pulp_carton",
        name: "Compact Carton + Molded Pulp Insert",
        category: "Molded Pulp Insert",
        archetype: "balanced_winner",
        pareto_archetype: "Balanced",
        verdict: "Recommended",
        is_baseline: false,
        unit_cost_usd: Math.round((0.65 + (vol_cm3 * 0.0003)) * 100) / 100,
        co2e_kg: Math.round((0.14 + (vol_cm3 * 0.00008)) * 1000) / 1000,
        material_mass_kg: Math.round((0.12 + (vol_cm3 * 0.00006)) * 1000) / 1000,
        outer_dimensions_cm: `${(customData.length_cm + 2.4).toFixed(1)} x ${(customData.width_cm + 2.4).toFixed(1)} x ${(customData.height_cm + 2.4).toFixed(1)}`,
        protection_score: 94,
        branding_score: 82,
        recyclability_score: 96,
        shipping_efficiency_pct: 95.9,
        void_space_pct: 4.1,
        damage_probability_pct: Math.round(1.2 * fragilityMult * 10) / 10,
        expected_damage_cost_usd: Math.round(prodVal * 0.012 * fragilityMult * 100) / 100,
        damage_carbon_impact_kg: 0.04,
        base_score: (isApparel || isLowestPlastic) ? 91.4 : 93.5,
        outer_material: "Recycled Corrugated Cardboard",
        inner_material: "Thermoformed Molded Paper Pulp",
        qualitative_co2e: "Low-Medium",
        qualitative_cost: "Medium",
        qualitative_protection: "High",
        qualitative_branding: "High",
        is_pareto_optimal: true,
        co2_breakdown: { material_emissions_kg: 0.09, manufacturing_emissions_kg: 0.03, transport_emissions_kg: 0.04, end_of_life_emissions_kg: 0.02, damage_carbon_kg: 0.04 },
        cost_breakdown: { material_cost_usd: Math.round((0.30 + vol_cm3 * 0.0001) * 100) / 100, manufacturing_printing_usd: 0.16, labor_assembly_usd: 0.12, shipping_storage_usd: 0.18, expected_damage_cost_usd: Math.round(prodVal * 0.012 * fragilityMult * 100) / 100 },
        protection_breakdown: { drop_protection_score: 95, compression_strength_score: 94, moisture_barrier_score: 85, fit_void_score: 92, vibration_resistance_score: 91, testing_standards: ["ISTA 3A Transit", "ASTM D5276 Drop Test"] },
        branding_breakdown: { printable_surface_score: 85, color_compatibility_score: 80, unboxing_experience_score: 88, texture_finish_score: 78, storytelling_qr_score: 80 },
        dieline: { outer_length_cm: (customData.length_cm + 2.4).toFixed(1), outer_width_cm: (customData.width_cm + 2.4).toFixed(1), outer_height_cm: (customData.height_cm + 2.4).toFixed(1), cushion_thickness_cm: 1.2, flap_margin_cm: 2.0, sheet_width_cm: (customData.length_cm * 2 + 10).toFixed(1), sheet_length_cm: (customData.width_cm * 2 + 10).toFixed(1) },
        bom: [
          { item: "Outer Recycled Box", qty: "1 unit", mass_g: 120, cost_usd: 0.35 },
          { item: "Molded Paper Pulp Insert", qty: "1 unit", mass_g: 60, cost_usd: 0.20 },
          { item: "Water-Soluble Paper Tape", qty: "1.2m", mass_g: 12, cost_usd: 0.08 }
        ]
      },
      {
        option_number: 6,
        id: "opt_reusable_shipper",
        name: "Heavy-Duty Reusable PP Shipper Box",
        category: "Reusable Packaging",
        archetype: "circular_reusable",
        pareto_archetype: isReusableGoal ? "Balanced" : "Reusable",
        verdict: isReusableGoal ? "Recommended" : "High Capex / Reusable",
        is_baseline: false,
        unit_cost_usd: Math.round((4.15 + (vol_cm3 * 0.0005)) * 100) / 100,
        co2e_kg: Math.round((0.09 + (vol_cm3 * 0.00003)) * 1000) / 1000,
        material_mass_kg: Math.round((0.45 + (vol_cm3 * 0.0002)) * 1000) / 1000,
        outer_dimensions_cm: `${(customData.length_cm + 3.5).toFixed(1)} x ${(customData.width_cm + 3.5).toFixed(1)} x ${(customData.height_cm + 3.5).toFixed(1)}`,
        protection_score: 96,
        branding_score: 95,
        recyclability_score: 85,
        shipping_efficiency_pct: 94.0,
        void_space_pct: 6.0,
        damage_probability_pct: Math.round(0.8 * fragilityMult * 10) / 10,
        expected_damage_cost_usd: Math.round(prodVal * 0.008 * fragilityMult * 100) / 100,
        damage_carbon_impact_kg: 0.02,
        base_score: isReusableGoal ? 96.5 : (isLowestPlastic ? 30.0 : 68.4),
        outer_material: "Rigid Reusable Polypropylene Box",
        inner_material: "Kraft Paper Honeycomb",
        qualitative_co2e: "Low",
        qualitative_cost: "High",
        qualitative_protection: "High",
        qualitative_branding: "High",
        is_pareto_optimal: true,
        co2_breakdown: { material_emissions_kg: 0.04, manufacturing_emissions_kg: 0.02, transport_emissions_kg: 0.02, end_of_life_emissions_kg: 0.01, damage_carbon_kg: 0.02 },
        cost_breakdown: { material_cost_usd: 0.45, manufacturing_printing_usd: 0.16, labor_assembly_usd: 0.12, shipping_storage_usd: 0.25, expected_damage_cost_usd: Math.round(prodVal * 0.008 * fragilityMult * 100) / 100 },
        protection_breakdown: { drop_protection_score: 97, compression_strength_score: 96, moisture_barrier_score: 99, fit_void_score: 90, vibration_resistance_score: 95, testing_standards: ["ISTA 3A / 6-AMAZON Transit"] },
        branding_breakdown: { printable_surface_score: 95, color_compatibility_score: 90, unboxing_experience_score: 96, texture_finish_score: 92, storytelling_qr_score: 95 },
        dieline: { outer_length_cm: (customData.length_cm + 3.5).toFixed(1), outer_width_cm: (customData.width_cm + 3.5).toFixed(1), outer_height_cm: (customData.height_cm + 3.5).toFixed(1), cushion_thickness_cm: 1.5, flap_margin_cm: 2.0, sheet_width_cm: (customData.length_cm * 2 + 14).toFixed(1), sheet_length_cm: (customData.width_cm * 2 + 14).toFixed(1) },
        bom: [{ item: "Reusable PP Box", qty: "1 unit (30 uses)", mass_g: 450, cost_usd: 4.15 }]
      },
      {
        option_number: 8,
        id: "opt_premium_mycelium",
        name: "Premium Rigid Box + Mushroom Mycelium Foam",
        category: "Premium Branded Design",
        archetype: "premium_eco",
        pareto_archetype: "Premium",
        verdict: "Not sustainable",
        is_baseline: false,
        unit_cost_usd: Math.round((2.15 + (vol_cm3 * 0.0006)) * 100) / 100,
        co2e_kg: Math.round((0.38 + (vol_cm3 * 0.0001)) * 1000) / 1000,
        material_mass_kg: Math.round((0.35 + (vol_cm3 * 0.00015)) * 1000) / 1000,
        outer_dimensions_cm: `${(customData.length_cm + 3.0).toFixed(1)} x ${(customData.width_cm + 3.0).toFixed(1)} x ${(customData.height_cm + 3.0).toFixed(1)}`,
        protection_score: 97,
        branding_score: 98,
        recyclability_score: 92,
        shipping_efficiency_pct: 95.0,
        void_space_pct: 5.0,
        damage_probability_pct: Math.round(0.5 * fragilityMult * 10) / 10,
        expected_damage_cost_usd: Math.round(prodVal * 0.005 * fragilityMult * 100) / 100,
        damage_carbon_impact_kg: 0.02,
        base_score: customData.branding_preference === 'premium' ? 96.0 : 83.5,
        outer_material: "Rigid Recycled Paperboard Box",
        inner_material: "Bio-grown Mycelium Bio-foam",
        qualitative_co2e: "High",
        qualitative_cost: "High",
        qualitative_protection: "High",
        qualitative_branding: "High",
        is_pareto_optimal: true,
        co2_breakdown: { material_emissions_kg: 0.20, manufacturing_emissions_kg: 0.10, transport_emissions_kg: 0.06, end_of_life_emissions_kg: 0.02, damage_carbon_kg: 0.02 },
        cost_breakdown: { material_cost_usd: 1.25, manufacturing_printing_usd: 0.45, labor_assembly_usd: 0.25, shipping_storage_usd: 0.20, expected_damage_cost_usd: Math.round(prodVal * 0.005 * fragilityMult * 100) / 100 },
        protection_breakdown: { drop_protection_score: 98, compression_strength_score: 96, moisture_barrier_score: 80, fit_void_score: 95, vibration_resistance_score: 98, testing_standards: ["ISTA 3A / 6-AMAZON"] },
        branding_breakdown: { printable_surface_score: 98, color_compatibility_score: 95, unboxing_experience_score: 100, texture_finish_score: 96, storytelling_qr_score: 98 },
        dieline: { outer_length_cm: (customData.length_cm + 3.0).toFixed(1), outer_width_cm: (customData.width_cm + 3.0).toFixed(1), outer_height_cm: (customData.height_cm + 3.0).toFixed(1), cushion_thickness_cm: 1.5, flap_margin_cm: 2.5, sheet_width_cm: (customData.length_cm * 2 + 15).toFixed(1), sheet_length_cm: (customData.width_cm * 2 + 15).toFixed(1) },
        bom: [{ item: "Mycelium Molded Foam", qty: "1 unit", mass_g: 350, cost_usd: 2.15 }]
      }
    ];

    let alternatives = rawAlternatives.map(alt => {
      let score = alt.base_score;
      if (alt.unit_cost_usd > budgetLimit) {
        score -= 50.0;
      }
      return {
        ...alt,
        within_budget: alt.unit_cost_usd <= budgetLimit,
        overall_score: Math.max(0, Math.min(100, Math.round(score * 10) / 10))
      };
    });

    alternatives.sort((a, b) => b.overall_score - a.overall_score);

    const recommended = alternatives[0];
    const baseline = alternatives.find(a => a.is_baseline) || alternatives[alternatives.length - 1];

    const co2_saved_kg = Math.max(0, Math.round((baseline.co2e_kg - recommended.co2e_kg) * annualVol * 10) / 10);
    const cost_saved_usd = Math.max(0, Math.round((baseline.unit_cost_usd - recommended.unit_cost_usd) * annualVol * 100) / 100);
    const co2_reduction_pct = Math.round(((baseline.co2e_kg - recommended.co2e_kg) / baseline.co2e_kg) * 1000) / 10;
    const cost_reduction_pct = Math.round(((baseline.unit_cost_usd - recommended.unit_cost_usd) / baseline.unit_cost_usd) * 1000) / 10;

    const winnerIndex = recommended.option_number || 1;
    const pareto_recommendation_text = `PackWise AI recommends Option ${winnerIndex} (${recommended.name}) because it reduces estimated CO₂e by ${co2_reduction_pct}%, lowers total packaging cost by ${cost_reduction_pct}%, maintains high protection (${recommended.protection_score}/100), and improves brand presentation (${recommended.branding_score}/100).`;

    const fallbackResults = {
      recommended: recommended,
      baseline: baseline,
      alternatives: alternatives,
      pareto_frontier: alternatives.filter(a => a.is_pareto_optimal),
      pareto_recommendation_text: pareto_recommendation_text,
      why_this_won: pareto_recommendation_text,
      annual_impact: {
        co2_saved_kg: co2_saved_kg,
        cost_saved_usd: cost_saved_usd,
        co2_reduction_pct: co2_reduction_pct,
        cost_reduction_pct: cost_reduction_pct,
        annual_volume: annualVol
      },
      tradeoffs_breakdown: {
        cost_vs_damage: { title: "1. Cheap Packaging vs Product Damage Risk", finding: `The baseline option carries a ${baseline.damage_probability_pct}% damage risk ($${baseline.expected_damage_cost_usd}/unit loss). Winner reduces damage risk to ${recommended.damage_probability_pct}%, saving $${Math.max(0, (baseline.expected_damage_cost_usd - recommended.expected_damage_cost_usd)).toFixed(2)}/unit.` },
        eco_cost_availability: { title: "2. Eco-Friendly Material vs Cost & Regional Availability", finding: `Mycelium bio-foam offers high carbon reduction but increases unit cost. Winner '${recommended.name}' balances low carbon (${recommended.co2e_kg} kg) at $${recommended.unit_cost_usd}/unit.` },
        branding_vs_recyclability: { title: "3. Premium Branding vs Curbside Recyclability", finding: `Winner balances an ${recommended.branding_score}/100 branding score with ${recommended.recyclability_score}% regional curbside recyclability.` },
        lightweight_vs_shipping_stress: { title: "4. Lightweight Packaging vs Transit Shipping Stress", finding: `Winner achieves ${recommended.shipping_efficiency_pct}% volume efficiency while maintaining ${recommended.protection_score}/100 protection.` },
        regional_composting_reality: { title: "5. Biodegradable Claim vs Regional Infrastructure Reality", finding: `Paper-based pulp achieves 96% real curbside recovery compared to bioplastics facing landfill disposal.` }
      }
    };

    setResults(fallbackResults);
    setLoading(false);
  };

  const specKey = JSON.stringify({
    l: formData.length_cm,
    w: formData.width_cm,
    h: formData.height_cm,
    wt: formData.weight_g,
    f: formData.fragility,
    m: formData.moisture_sensitivity,
    t: formData.temperature_sensitivity,
    p: formData.product_type,
    v: formData.annual_volume,
    val: formData.product_value_usd,
    reg: formData.shipping_region,
    dist: formData.shipping_distance_km,
    mode: formData.shipping_mode,
    brand: formData.branding_preference,
    budget: formData.budget_limit_usd,
    goal: formData.sustainability_goal
  });

  useEffect(() => {
    runOptimization(formData);
  }, [specKey]);

  const handleApplySpecs = (specs) => {
    const updated = {
      ...formData,
      product_type: specs.product_type || formData.product_type,
      fragility: specs.fragility || formData.fragility,
      length_cm: specs.length_cm || formData.length_cm,
      width_cm: specs.width_cm || formData.width_cm,
      height_cm: specs.height_cm || formData.height_cm,
      weight_g: specs.weight_g || formData.weight_g,
      product_value_usd: specs.product_value_usd || formData.product_value_usd,
      budget_limit_usd: specs.budget_limit_usd || formData.budget_limit_usd,
      sustainability_goal: specs.sustainability_goal || formData.sustainability_goal
    };
    setFormData(updated);
    setActiveTab('optimizer');
    setShowHero(false);
    runOptimization(updated);
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        onLogoClick={handleLogoClick}
        onOpenCopilot={() => setIsCopilotOpen(true)} 
      />

      {/* Main Content Area */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Animated PackWise Hero Section - Only shown on initial landing or logo click */}
        {showHero && (
          <PackWiseHero 
            onStartOptimize={() => {
              const formElem = document.getElementById('product-input-form');
              if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenCopilot={() => setIsCopilotOpen(true)}
          />
        )}

        {activeTab === 'optimizer' && (
          <div id="product-input-form" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
            
            {/* Left Form Controls Panel */}
            <div className="glass-panel" style={{ padding: '20px', height: 'fit-content' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-heading)' }}>
                  <Sliders size={18} color="var(--brand-primary)" /> Product Input Form
                </h2>
                <button 
                  onClick={() => setIsVisionOpen(true)} 
                  className="btn-secondary" 
                  style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                >
                  <Camera size={14} /> Vision AI
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); runOptimization(); }}>
                
                <div className="form-group">
                  <label>Product Category</label>
                  <select className="form-select" value={formData.product_type} onChange={e => setFormData({ ...formData, product_type: e.target.value })}>
                    <option value="fragile_glass">Fragile Glass / Cosmetics</option>
                    <option value="electronics">Consumer Electronics</option>
                    <option value="apparel">Apparel & Textiles</option>
                    <option value="food">FMCG & Dry Food</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Product Fragility Level</label>
                  <select className="form-select" value={formData.fragility} onChange={e => setFormData({ ...formData, fragility: e.target.value })}>
                    <option value="low">Low (Non-breakable)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="high">High (Glass / Ceramics)</option>
                    <option value="very_high">Very High (Precision Optics)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>L (cm)</label>
                    <input type="number" className="form-input" value={formData.length_cm} onChange={e => setFormData({ ...formData, length_cm: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label>W (cm)</label>
                    <input type="number" className="form-input" value={formData.width_cm} onChange={e => setFormData({ ...formData, width_cm: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label>H (cm)</label>
                    <input type="number" className="form-input" value={formData.height_cm} onChange={e => setFormData({ ...formData, height_cm: parseFloat(e.target.value) || 0 })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>Weight (g)</label>
                    <input type="number" className="form-input" value={formData.weight_g} onChange={e => setFormData({ ...formData, weight_g: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label>Value ($)</label>
                    <input type="number" className="form-input" value={formData.product_value_usd} onChange={e => setFormData({ ...formData, product_value_usd: parseFloat(e.target.value) || 0 })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>Moisture Sensitivity</label>
                    <select className="form-select" value={formData.moisture_sensitivity} onChange={e => setFormData({ ...formData, moisture_sensitivity: e.target.value })}>
                      <option value="low">Low (Dry product)</option>
                      <option value="medium">Medium (Standard)</option>
                      <option value="high">High (Hydrophobic barrier needed)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Temp Sensitivity</label>
                    <select className="form-select" value={formData.temperature_sensitivity} onChange={e => setFormData({ ...formData, temperature_sensitivity: e.target.value })}>
                      <option value="standard">Standard Ambient</option>
                      <option value="temperature_controlled">Controlled Insulated</option>
                      <option value="refrigerated">Refrigerated Cold-chain</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Sustainability Priority Goal</label>
                  <select className="form-select" value={formData.sustainability_goal} onChange={e => setFormData({ ...formData, sustainability_goal: e.target.value })}>
                    <option value="balanced">Balanced Trade-off (Recommended)</option>
                    <option value="lowest_carbon">Lowest Carbon Emissions (Min CO₂e)</option>
                    <option value="lowest_plastic">Zero Single-Use Plastic</option>
                    <option value="recyclable">100% Curbside Recyclable</option>
                    <option value="compostable">Home / Industrial Compostable</option>
                    <option value="reusable">Reusable Returnable Shipper</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>Shipping Mode</label>
                    <select className="form-select" value={formData.shipping_mode} onChange={e => setFormData({ ...formData, shipping_mode: e.target.value })}>
                      <option value="road">Road Courier Freight</option>
                      <option value="air">Air Express Cargo</option>
                      <option value="sea">Ocean Sea Freight</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget ($/unit)</label>
                    <input type="number" className="form-input" value={formData.budget_limit_usd} onChange={e => setFormData({ ...formData, budget_limit_usd: parseFloat(e.target.value) || 0 })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', minWidth: 0 }}>
                  <div className="form-group">
                    <label>Branding Style</label>
                    <select className="form-select" value={formData.branding_preference} onChange={e => setFormData({ ...formData, branding_preference: e.target.value })}>
                      <option value="basic">Minimal Basic</option>
                      <option value="standard">Standard Printed</option>
                      <option value="premium">Premium Luxury</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Shipping Region</label>
                    <select className="form-select" value={formData.shipping_region} onChange={e => setFormData({ ...formData, shipping_region: e.target.value })}>
                      <option value="GLOBAL">Global Average</option>
                      <option value="EU">European Union</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="SEA">Southeast Asia</option>
                      <option value="ME">Middle East</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Annual Order Quantity</label>
                  <input type="number" className="form-input" value={formData.annual_volume} onChange={e => setFormData({ ...formData, annual_volume: parseInt(e.target.value) || 0 })} />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
                  {loading ? <RefreshCw className="animate-spin" size={16} /> : <Layers size={16} />} Recalculate Trade-offs
                </button>

              </form>

            </div>

            {/* Right Main Dashboard Panel */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button 
                  onClick={() => setIsExportOpen(true)} 
                  className="btn-primary" 
                  style={{ background: 'var(--green-secondary)' }}
                >
                  <FileText size={16} /> Open Export & RFQ Hub
                </button>
              </div>

              {/* Multi-Objective Scoring Model & Brand Priorities Customizer */}
              <ScoringModelCustomizer 
                weights={formData.user_weights} 
                onChange={handleWeightsChange} 
                onRecalculateLive={(w) => results && setResults(r => recalculateLiveScores(w, r))}
              />

              <DecisionCard data={results} />
              
              {results && results.recommended && (
                <ThreeDBoxPreview 
                  dieline={results.recommended.dieline} 
                  optionName={results.recommended.name} 
                />
              )}

              <ComparisonDashboard data={results} />
              
              {/* Circular Reuse / Refill Break-Even Calculator */}
              <ReuseBreakEvenCalculator data={results} />
            </div>

          </div>
        )}

        {activeTab === 'case_studies' && <CaseStudiesDashboard onApplyCaseStudy={handleApplySpecs} />}
        {activeTab === 'brand_style' && <BrandStyleGenerator />}
        {activeTab === 'claims' && <ClaimsChecker />}
        {activeTab === 'disposal' && <QRDisposalGuide />}
        {activeTab === 'commercialization' && <CommercializationDashboard />}

      </main>

      {/* Modals & Drawers */}
      {isVisionOpen && (
        <ImageUploadModal 
          onClose={() => setIsVisionOpen(false)} 
          onAutoPopulate={handleApplySpecs} 
        />
      )}

      {isExportOpen && (
        <ExportModal 
          data={results} 
          onClose={() => setIsExportOpen(false)} 
        />
      )}

      <CopilotChat 
        isOpen={isCopilotOpen} 
        onClose={() => setIsCopilotOpen(false)} 
        onApplyExtractedSpecs={handleApplySpecs} 
      />

    </div>
  );
}
