# 🚀 Team Collaboration & Git Workflow Guide (Resonance EcoPack)

Welcome Team! This guide outlines our workflow, division of tasks, and Git strategy to ensure seamless collaboration during the hackathon.

---

## 👥 1. Role Division (4 Team Members)

To avoid overlapping work and merge conflicts, tasks are separated by responsibility:

| Member | Focus Area | Core Responsibilities | Branch Convention |
| :--- | :--- | :--- | :--- |
| **Kushagra** | Lead & UI/UX | Project architecture, landing page, pitch deck, video demo | `kushagra/<feature>` |
| **Ayush** | Backend & APIs | Server routes, database models, REST endpoints, integrations | `ayush/<feature>` |
| **Divyam** | Frontend Apps | Interactive components, dashboard state, API integration | `divyam/<feature>` |
| **Abhay** | AI / Eco Algorithm | Sustainability formulas, carbon metrics, ML models / data | `abhay/<feature>` |

---

## 🌿 2. Git Branching Strategy

> ⚠️ **Rule #1:** Never push directly to `main` without checking with the team!

### Branch Naming Conventions
- `main` — Production-ready, stable demo code.
- `dev` — Staging branch where feature branches merge before test runs.
- **Personal Feature Branches**: Include your name in the branch!
  - Example for Ayush: `ayush/backend-api`
  - Example for Divyam: `divyam/dashboard-ui`
  - Example for Abhay: `abhay/eco-calculator`
  - Example for Kushagra: `kushagra/landing-hero`

### Step-by-Step Feature Workflow

1. **Pull latest changes:**
   ```bash
   git checkout dev
   git pull origin dev
   ```

2. **Create your feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit often with clear messages:**
   ```bash
   git add .
   git commit -m "feat(ui): add navbar component and eco badge"
   ```

4. **Push your branch to GitHub:**
   ```bash
   git push -u origin feature/your-feature-name
   ```

5. **Create a Pull Request (PR):**
   - Open a PR from `feature/your-feature-name` -> `dev`.
   - Tag at least **1 teammate** to review or quickly test.
   - Once approved/verified, merge into `dev`.

---

## ⏱️ 3. Hackathon Timeline Checklist

### 📍 Phase 1: Setup & Alignment (Hours 0 - 2)
- [ ] Confirm tech stack (React/Vite/Next.js, Node/Python backend, DB, APIs).
- [ ] Set up environment variables template (`.env.example`).
- [ ] Initialize `dev` branch on GitHub.
- [ ] Set up GitHub Project board / Kanban column (To Do, In Progress, Done).

### 📍 Phase 2: Core Build (Hours 2 - 16)
- [ ] Frontend mockups & core component skeleton.
- [ ] Backend routes & mock responses established early so Frontend can connect.
- [ ] AI/Eco model implementation & output validation.

### 📍 Phase 3: Integration & Testing (Hours 16 - 20)
- [ ] Freeze new features; merge feature branches into `dev`.
- [ ] Test end-to-end user flows (frontend -> backend -> output).
- [ ] Merge `dev` into `main`.

### 📍 Phase 4: Pitch & Polish (Hours 20 - 24)
- [ ] Deploy frontend & backend (e.g., Vercel / Render / Netlify).
- [ ] Record 2-minute demo video.
- [ ] Finalize pitch deck slides & README presentation.

---

## 💻 Localhost Setup for Teammates (Ayush, Divyam, Abhay)

To run the full-stack app on your own laptop:

### Step 1: Get the Code
```bash
git clone https://github.com/Kushagra230706/Resonance_EcoPack.git
cd Resonance_EcoPack
git checkout dev
git pull origin dev
```

### Step 2: Start Backend Server (Terminal 1)
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

### Step 3: Start Frontend Server (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

### Step 4: Open App
Open **`http://localhost:5173/`** in your browser!

---

## 🛠️ Useful Command Cheatsheet

```bash
# Save working changes temporarily
git stash

# Restore stashed changes
git stash pop

# Check active status
git status

# View commit history succinctly
git log --oneline -n 10
```
