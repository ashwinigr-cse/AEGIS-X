# AEGIS X — Installation & Fresh Setup Guide

> **Tagline:** *"Don't just remember what broke. Discover why it broke."*  
> **Platform:** AEGIS X — The Self-Experimenting Reliability Scientist  
> **Version:** 1.0.0

This guide provides complete, step-by-step setup instructions for deploying AEGIS X on **Windows**, **Linux**, and **macOS**, as well as containerized deployment via **Docker Compose**.

---

## 1. System Requirements

| Component | Minimum Specification | Recommended Specification |
|---|---|---|
| **Operating System** | Windows 10/11, Ubuntu 20.04+, macOS 12+ | Windows 11 Pro, Ubuntu 22.04 LTS, macOS 14+ |
| **Python** | Python 3.12+ (tested on Python 3.14.6) | Python 3.12 / 3.14 |
| **Node.js** | Node.js v18.0.0+ | Node.js v20.x or v22.x LTS (with npm 10+) |
| **RAM** | 4 GB | 8 GB or 16 GB |
| **Disk Space** | 2 GB free disk space | 5 GB SSD storage |
| **Optional Container Engine** | Docker 24.0+ & Docker Compose v2.20+ | Docker Desktop with WSL2 backend |

---

## 2. Windows Installation (PowerShell)

### Step 2.1: Clone the Repository
```powershell
git clone https://github.com/your-org/aegis-x.git
cd aegis-x
```

### Step 2.2: Python Environment Setup
```powershell
# Create virtual environment (optional but recommended)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Upgrade pip and install backend dependencies
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Step 2.3: Frontend Setup
```powershell
cd frontend
npm install
cd ..
```

### Step 2.4: Environment Configuration
Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```
Default configuration values in `.env`:
```ini
ENVIRONMENT=development
HOST=127.0.0.1
PORT=8000
DATABASE_URL=sqlite+aiosqlite:///./aegis_x.db
HINDSIGHT_BASE_URL=http://localhost:8888
HINDSIGHT_BANK_ID=aegis-operational-memory
ISOLATED_ENV_NAMESPACE=aegis-twin
MAX_LATENCY_INJECTION_MS=800
MAX_PACKET_DROP_RATE=0.20
```
*(Note: If a remote Hindsight daemon is not active on port 8888, the official `hindsight-client` automatically falls back to AEGIS X's high-performance local SQLite memory store without breaking functionality).*

### Step 2.5: Run Backend & Frontend Tests
```powershell
# 1. Run all 42 backend pytest integration tests
python -m pytest backend/tests -v

# 2. Run frontend vitest suite
cd frontend
npm test
npm run build
cd ..
```

### Step 2.6: Launch the Platform
Open two PowerShell terminals:

**Terminal 1 (FastAPI Backend):**
```powershell
python -m uvicorn app.main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload
```

**Terminal 2 (React Frontend Dashboard):**
```powershell
cd frontend
npm run dev
```

Open your browser to: `http://localhost:5173`

---

## 3. Linux Installation (Ubuntu / Debian / RHEL)

### Step 3.1: Install System Packages
```bash
sudo apt update && sudo apt install -y python3 python3-pip python3-venv git curl nodejs npm
```

### Step 3.2: Clone Repository & Virtual Environment
```bash
git clone https://github.com/your-org/aegis-x.git
cd aegis-x

python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt
```

### Step 3.3: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 3.4: Configure Environment & Test
```bash
cp .env.example .env

# Run full backend test suite
pytest backend/tests -v

# Run frontend tests & build
cd frontend
npm test
npm run build
cd ..
```

### Step 3.5: Run Services
```bash
# Terminal 1:
uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload

# Terminal 2:
cd frontend && npm run dev -- --host
```

---

## 4. macOS Installation (Apple Silicon / Intel)

```bash
# Install Node & Python via Homebrew if needed
brew install python@3.12 node

git clone https://github.com/your-org/aegis-x.git
cd aegis-x

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cd frontend
npm install
npm test
npm run build
cd ..

cp .env.example .env
pytest backend/tests -v
```

---

## 5. Docker Compose Multi-Container Deployment

To spin up AEGIS X along with PostgreSQL and local Toxiproxy in Docker:

```bash
docker compose up --build
```
This launches:
- **`aegis-backend`**: FastAPI application on `http://localhost:8000`
- **`aegis-frontend`**: React + Vite UI on `http://localhost:5173`
- **`aegis-postgres`**: PostgreSQL database on port 5432
- **`aegis-toxiproxy`**: Toxiproxy daemon on port 8474

---

## 6. One-Command Headless Demonstration

To verify the entire 14-stage autonomous investigation lifecycle directly from the command line without launching a browser:

```bash
python scripts/run_demo.py
```

This headless runner executes:
1. Covert fault injection (Payment 380ms latency cascade)
2. Live telemetry streaming & SLO anomaly detection
3. Causal NetworkX graph topology and betweenness centrality calculation
4. Competing hypothesis generation with flat priors
5. Hindsight IGOM memory recall and prior probability boosting
6. Expected Information Gain (EIG) calculation and Pareto ranking
7. Safety Gatekeeper parameter clamping and HITL authorization
8. 5-stage isolated test execution with delta measurement
9. Causal evidence evaluation with Bayesian posterior update ($\ge 94\%$)
10. Dual-write IGOM structured retention in Hindsight
11. Cross-incident operational invariant discovery
12. Side-by-side empirical ablation vs Tabula Rasa (-66.7% tests saved)
13. Automated operator remediation recommendations
14. Complete toxic purge and baseline SLO recovery verification
