# AEGIS X — Evaluator Demonstration Script & Live Walkthrough Guide

> **Tagline:** *"Don't just remember what broke. Discover why it broke."*  
> **Core Paradigm:** Intervention-Grounded Operational Memory (IGOM)  
> **Platform Version:** 1.0.0 (Research Grade)

This guide provides a comprehensive, step-by-step evaluation procedure for demonstrating the real functionality, causal intelligence, long-term memory, and autonomous experimentation capabilities of **AEGIS X**.

---

## 1. Quickstart & Environment Verification

### Prerequisites
- **Python:** Python 3.12+ (tested on Python 3.14.6)
- **Node.js:** v18+ (tested on v26.13.0 with npm 11.20.0)
- **Database:** SQLite (default local) or PostgreSQL (configured in `.env`)
- **Memory Engine:** Hindsight Client 1.2.0 (`vectorize-io/hindsight`) with zero-latency local fallback

### Starting the System

#### 1. Backend Service (Terminal 1)
```bash
# From workspace root:
& "C:\Users\SMART\AppData\Local\Python\pythoncore-3.14-64\python.exe" -m uvicorn app.main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload
```
*Healthy Backend Verification:* Open `http://127.0.0.1:8000/api/health` in your browser. Expected: `{"status": "HEALTHY", "database": "OK", "hindsight_mode": "LOCAL_FALLBACK"}`.

#### 2. Frontend Dashboard (Terminal 2)
```bash
cd frontend
npm run dev
```
*Frontend URL:* Open `http://localhost:5173` (or the reported local port).

---

## 2. Guided 9-Tab Platform Tour

The navigation bar at the top provides direct access to all 9 core platform engines:

---

### Tab 1: System Observatory & Digital Twin
- **Goal:** Observe real-time distributed telemetry flowing through the OpenTelemetry Astronomy Shop digital twin.
- **Key Elements to Inspect:**
  1. **Top Status Indicators:** Core API health, DB status, and the **"Trace Checkout Flow"** button.
  2. **Live Service KPI Grid:** Real rolling $p_{50}, p_{95}, p_{99}$ latency, error rate, and request rate (1.5–2.0 RPS background load).
  3. **Service Topology Graph:** Interactive React Flow graph visualizing 8 microservices (`Frontend`, `Checkout`, `Cart`, `Payment`, `Shipping`, `Email`, `ProductCatalog`, `Recommendation`).
  4. **Live Trace Stream:** Click on any recent trace row to open the **Trace Waterfall Modal**, showing parent-child spans and W3C TraceContext propagation.
  5. **Quick Action:** Click **"Trace Checkout Flow"** to watch a real distributed transaction traverse the topology synchronously.

---

### Tab 2: Causal Intelligence
- **Goal:** Demonstrate automated anomaly detection and causal graph reconstruction.
- **Key Elements to Inspect:**
  1. **SLO Anomaly Detector:** Automatically identifies threshold breaches (e.g., $p_{99} > 350\text{ms}$ or error rate $> 0.05$).
  2. **NetworkX Causal Dependency Graph:** Computes betweenness centrality and isolates failure propagation channels.
  3. **Competing Hypotheses Panel:** Formulates at least 3 mutually exclusive, falsifiable explanations ($H_1, H_2, H_3$).
  4. **Shannon Entropy Meter:** Tracks hypothesis space uncertainty $H(H) = -\sum P(H_i)\log_2 P(H_i)$.

---

### Tab 3: Experiment Designer & Safety Gatekeeper
- **Goal:** Experience active intervention planning and strict zero-harm safety enforcement.
- **Key Elements to Inspect:**
  1. **Expected Information Gain (EIG):**
     $$\text{EIG}(E) = H(\text{Hypotheses}) - \mathbb{E}[H(\text{Hypotheses} \mid \text{Outcome})]$$
  2. **Multi-Objective Pareto Scoring:**
     $$\text{Score}(E) = \frac{\text{EIG}(E)}{\text{Cost}(E) + \lambda \times \text{Risk}(E)}$$
  3. **Safety Gatekeeper Clamps:**
     - Target services validated against allowed list.
     - Latency clamped to $\le 800\text{ms}$; packet drop clamped to $\le 20\%$.
     - Non-production namespace strictly enforced (`aegis-twin`).
  4. **Human-In-The-Loop (HITL) Authorization:** Requires explicit operator sign-off before any perturbation is executed.

---

### Tab 4: Digital Twin Lab
- **Goal:** Directly inspect and control the isolated test environment.
- **Key Elements to Inspect:**
  1. **Traffic Generator Controls:** Toggle background traffic on/off (1.5–2.0 RPS).
  2. **Manual Fault Injection:** Inject controlled latency ($350\text{ms}$), packet drop ($15\%$), or service outage ($503$) onto any microservice.
  3. **Active Toxics Inventory:** Real-time inventory of all perturbations active in Toxiproxy.
  4. **Emergency Red Button:** Purges all toxics and immediately restores baseline SLO compliance.

---

### Tab 5: Memory Intelligence (Hindsight IGOM)
- **Goal:** Inspect persistent long-term operational memory powered by Hindsight (`vectorize-io/hindsight`).
- **Key Elements to Inspect:**
  1. **Bank Metadata:** Bank ID `aegis-operational-memory`, with scientific skepticism disposition (level 4) and literalism (level 4).
  2. **Sub-Millisecond Semantic Recall:** Query the memory bank in real time (< 1ms query latency).
  3. **IGOM Structured Records:** Displays counterfactual interventions $do(X)$, pre-intervention baselines, post-intervention deltas, and crucially, **falsified hypotheses** that preserve negative experimental results.
  4. **Applicability Envelope:** Shows operating condition boundaries (e.g., traffic load $\le 2.5\text{ RPS}$, timeout budgets) preventing improper generalization.

---

### Tab 6: Operational Knowledge (Invariants & Boundaries)
- **Goal:** View cross-incident empirical rules synthesized from experimental memories.
- **Key Elements to Inspect:**
  1. **Discovered Invariant Cards:**
     - Formal rule statements (e.g., *Payment Latency Cascade Invariant*, *Cart Cache Fallback Boundary*).
     - Explicit applicable conditions (concurrency, timeout budgets).
     - Known limitations and negative failure boundaries.
  2. **Empirical Confidence Rating:**
     $$\text{Confidence} = \min\left(0.98, \frac{N_{\text{supp}}}{N_{\text{supp}} + 2 \times N_{\text{contra}}} \times \left(1 - \frac{0.35}{1 + N_{\text{total}}}\right)\right)$$
  3. **Verification Status:** Badges distinguishing `VERIFIED`, `PROVISIONAL`, and `CONTESTED` rules.

---

### Tab 7: Memory Evolution Lab (Ablation Lab)
- **Goal:** Empirically prove that IGOM memory genuinely accelerates investigation without sacrificing rigor.
- **Key Elements to Inspect:**
  1. **Interactive Controls:** Select ground truth cause and toggle between Standard Conditions (1.8 RPS) and Context Shift (5.0 RPS).
  2. **Comparative Metrics Bar:**
     - **-66.7% Experiments Saved:** Config D isolates cause in 1 experiment vs 3 for Config B.
     - **56.2% Diagnosis Acceleration:** Faster time to resolution.
     - **Memory Verdict:** `BENEFICIAL_ACCELERATION` (or `CONTEXT_SHIFT_ADAPTATION`).
  3. **Side-by-Side Step Trails:** Step-by-step logs contrasting Tabula Rasa trial-and-error against IGOM-informed targeted interventions.

---

### Tab 8: CEM-Bench Research Benchmark
- **Goal:** Evaluate the system across 10 canonical failure scenario categories and 4 configurations.
- **Key Elements to Inspect:**
  1. **10 Canonical Failure Scenarios:**
     - Single Fault, Ambiguous Symptoms, Upstream Propagation, Transitive Dependency, Transient vs Persistent, Resource Starvation, Non-Root Anomaly, Cascading Collapse, Counterfactual Invariance, Context Shift.
  2. **Configuration Performance Matrix (40 Runs):**
     - **Config A (Passive Observability):** 70% accuracy, 30% false conclusion rate, 0 experiments.
     - **Config B (Active Tabula Rasa):** 90% accuracy, 2.5 avg experiments, 42s TTD.
     - **Config C (Generic LLM Memory):** 80% accuracy, fails on context shift (0% robustness).
     - **Config D (AEGIS X with IGOM):** **100% accuracy**, **0% false conclusions**, **1.2 avg experiments**, **100% context shift robustness**.
  3. **Click "Run Full Evaluation Suite (40 Runs)"** to observe the quantitative benchmark matrix computed live.

---

### Tab 9: The Mystery Failure Challenge (The Signature Demo)
- **Goal:** Execute the complete end-to-end 14-step scientific reliability lifecycle on a covert multi-hop cascading failure.

#### Step-by-Step Demo Execution:
1. Navigate to **"9. Mystery Failure Challenge"** (or click **"Launch Challenge &rarr;"** from the Observatory banner).
2. Choose **`CHALLENGE-01: The Silent Cascading Checkout Collapse`** (Research Grade).
3. Click **"Inject Fault & Start Challenge"**:
   - Injects a covert 380ms latency toxic into the Payment microservice.
   - Generates background traffic to allow cascading queues to form.
4. You have two options to advance:
   - **Methodical Evaluation:** Click **"Next Step"** repeatedly to walk through each of the 14 steps one by one.
   - **Autonomous Demonstration:** Click **"Auto-Solve All (14 Steps)"** to watch the entire lifecycle execute automatically.
5. Watch the 14-Step Lifecycle Unfold:
   - **Step 1:** Observability detects SLO breach in live telemetry ($p_{95} > 400\text{ms}$).
   - **Step 2:** Empirical state reconstruction isolates affected services (`payment`, `checkout`, `cart`, `frontend`).
   - **Step 3:** NetworkX causal graph builds topology and isolates highest betweenness node.
   - **Step 4:** Generates competing hypotheses ($H_1, H_2, H_3$) with flat priors ($P=0.333$, $H=1.585\text{ bits}$).
   - **Step 5:** Hindsight recalls past counterfactuals, verifies context boundaries, and boosts $H_1$ prior ($P=0.65$, $H=1.25\text{ bits}$).
   - **Step 6:** Active Experiment Planner computes EIG and Pareto scores, selecting optimal payment intervention.
   - **Step 7:** Safety Gatekeeper verifies non-production isolation and logs HITL authorization.
   - **Step 8:** Executes 5-stage isolated experiment (Baseline $\to$ Perturbation $\to$ Measurement $\to$ Rollback $\to$ Recovery Verification).
   - **Step 9:** Causal evaluator confirms synchronous checkout cascade; Bayesian posterior updates to $94.0\%$ ($H=0.32\text{ bits}$).
   - **Step 10:** Hindsight dual-writes structured IGOM record with falsified hypotheses and applicability envelope.
   - **Step 11:** Discovers operational invariant with $95.4\%$ empirical confidence.
   - **Step 12:** Side-by-side ablation confirms **-66.7% experiments saved** and **56.2% faster resolution**.
   - **Step 13:** Generates actionable operator remediation recommendations.
   - **Step 14:** Purges all chaos toxics, restores twin to baseline SLO compliance, and archives the incident ledger.
6. Click **"Reset Twin"** to purge all faults and verify baseline restoration.

---

## 3. Automated Test Verification

To run the complete automated test suite across all 9 modules:
```bash
& "C:\Users\SMART\AppData\Local\Python\pythoncore-3.14-64\python.exe" -m pytest backend/tests -v
```
**Expected Outcome:** 36 passed in ~35 seconds.

To verify the frontend production build:
```bash
cd frontend
npm run build
```
**Expected Outcome:** `✓ built in ~7s` with 0 TypeScript errors.
