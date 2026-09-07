"""
Database ORM Models for Resonance EcoPack
Defines Materials, Products, PackagingDesigns, and Results tables.
"""

from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class MaterialModel(Base):
    __tablename__ = "materials"

    material_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False) # paper, plastic, bioplastic, organic, reusable
    density_g_cm3 = Column(Float, nullable=False)
    recycled_content_pct = Column(Float, default=0.0)
    emission_factor = Column(Float, nullable=False) # kg CO2e / kg
    cost_per_kg = Column(Float, nullable=False) # USD / kg
    recyclability_score = Column(Float, default=80.0) # 0 - 100
    compostability = Column(String, default="none") # home, industrial, none
    water_resistance = Column(Float, default=50.0)
    printability_score = Column(Float, default=80.0)
    source_confidence = Column(String, default="High (ISO 14040 Verified)")


class ProductModel(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    dimensions = Column(String, nullable=False) # "12.0 x 8.0 x 6.0 cm"
    weight_g = Column(Float, nullable=False)
    fragility = Column(String, nullable=False) # low, medium, high, very_high
    moisture_sensitivity = Column(String, default="medium")
    value_usd = Column(Float, nullable=False)
    shipping_volume = Column(Integer, default=10000)
    created_at = Column(DateTime, default=datetime.utcnow)


class PackagingDesignModel(Base):
    __tablename__ = "packaging_designs"

    design_id = Column(String, primary_key=True, index=True)
    material_components = Column(String, nullable=False)
    outer_dimensions = Column(String, nullable=False)
    inner_dimensions = Column(String, nullable=False)
    cushioning_type = Column(String, nullable=False)
    printing_type = Column(String, default="Soy Ink Branded Print")
    closure_type = Column(String, default="Water-Soluble Paper Tape")
    reuse_cycles = Column(Integer, default=1)


class ResultModel(Base):
    __tablename__ = "results"

    result_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    design_id = Column(String, ForeignKey("packaging_designs.design_id"), nullable=False)
    estimated_co2e = Column(Float, nullable=False)
    estimated_cost = Column(Float, nullable=False)
    protection_score = Column(Float, nullable=False)
    branding_score = Column(Float, nullable=False)
    circularity_score = Column(Float, nullable=False)
    recommendation_rank = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    design = relationship("PackagingDesignModel")
