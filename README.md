# 🌱 Resonance EcoPack

> **Hackathon Prototype** | Sustainable Packaging & Eco-Impact Optimization System

[![GitHub Repo](https://img.shields.io/badge/GitHub-Resonance__EcoPack-green?logo=github)](https://github.com/Kushagra230706/Resonance_EcoPack)

---

## 📌 Overview

**Resonance EcoPack** is an innovative platform aimed at reducing packaging waste and optimizing eco-friendly packaging solutions for modern supply chains and consumer products.

### ⚡ Key Features (Planned)
- 📦 **Eco-Packaging Analyzer**: Calculates sustainability scores and material efficiency.
- 📉 **Carbon Footprint Estimator**: Real-time carbon savings comparison against traditional plastic/cardboard.
- 🎨 **Smart Packaging Recommender**: Interactive recommendations tailored to product dimensions and fragility.
- 📊 **Impact Dashboard**: Visual insights into waste reduction metrics.

---

## 🛠️ Tech Stack

- **Frontend**: *HTML5 / CSS3 / JavaScript / React / Vite / Next.js (Select team preference)*
- **Backend**: *Node.js / Express / Python FastAPI / Flask*
- **Database / AI**: *PostgreSQL / MongoDB / Custom Eco-Algorithm*
- **Deployment**: *Vercel / Render*

---

## 👥 Team & Roles

| Name | Role | Responsibilities | Branch |
| :--- | :--- | :--- | :--- |
| **Kushagra** | Team Lead & UI/UX | Architecture, Landing Page & Pitch Deck | `kushagra/*` |
| **Ayush** | Backend Engineer | API Routes, Database & Integrations | `ayush/*` |
| **Divyam** | Frontend Engineer | Interactive Dashboards & UI State | `divyam/*` |
| **Abhay** | Eco / AI Specialist | Carbon Calculation & Sustainability Model | `abhay/*` |

---

## 🚀 Quick Start & Running the Project

### Option A: Standalone Client Mode (Zero Setup - Runs Anywhere)
If you only run the frontend, PackWise AI's built-in **Client-Side Pareto Optimization Engine** automatically handles all calculations without requiring Python/FastAPI:

```bash
# 1. Clone the repository
git clone https://github.com/Kushagra230706/Resonance_EcoPack.git

# 2. Enter project directory
cd Resonance_EcoPack

# 3. Start development server
npm run dev
# App opens automatically at http://localhost:5173
```

---

### Option B: Full-Stack Mode (Frontend + Python FastAPI Backend)
For full AI Vision recognition and live server endpoints:

```bash
# 1. Start Python FastAPI Backend (Terminal 1)
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate | On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000 --reload

# 2. Start React Frontend (Terminal 2)
cd frontend
npm install
npm run dev
```

> **Note on Browser Console `net::ERR_CONNECTION_REFUSED :8000/api/optimize`**:
> If the Python FastAPI backend is not running on port 8000, the browser console will log a standard connection warning (`ERR_CONNECTION_REFUSED`). This is expected. The app automatically catches this and seamlessly runs the client-side Pareto optimization engine without crashing.


## 🤝 Collaboration & Git Guidelines

For git branching strategy, PR procedures, and team checklists, refer to [`COLLABORATION.md`](./COLLABORATION.md).

---

## 📜 License

Created during the Hackathon. All rights reserved by the Resonance EcoPack Team.
