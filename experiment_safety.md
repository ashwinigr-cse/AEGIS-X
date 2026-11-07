# AEGIS X — Experiment Safety & Gatekeeper Specification

**Core Principle:** *Safe Intervention or No Intervention.*  
Chaos experiments must never run against unapproved targets, outside sandboxed boundaries, or without deterministic rollback guarantees.

---

## 1. Safety Principles & Defense in Depth

AEGIS X enforces five distinct safety layers:

1. **Target Whitelist & Boundary Validation:**
   - Only services deployed in the designated isolated test namespace / digital twin environment may be perturbed.
   - Production ports and external dependencies (e.g. cloud payment gateways, identity providers) are strictly forbidden targets.
2. **Deterministic Parameter Clamping:**
   - LLMs can suggest experiment parameters, but all inputs pass through strict numerical validators.
   - Out-of-bounds parameters are clamped or rejected with an error.
3. **Mandatory Human-in-the-Loop (HITL) Authorization:**
   - No experiment is executed autonomously.
   - The platform presents a structured proposal detailing the target, toxic type, duration, expected blast radius, and rollback mechanism.
   - Requires explicit engineer authorization.
4. **Automated Baseline & Rollback Guarantees:**
   - Before injection, a baseline measurement check verifies that the target system is stable enough to tolerate perturbation.
   - If health metrics fail preconditions, the experiment is aborted.
   - Every toxic intervention is bound to a hard execution deadline (TTL). Upon TTL expiry or emergency stop, the intervention is cleared.
5. **Post-Intervention Recovery Verification:**
   - After clearing the intervention, the system monitors telemetry for $T_{\text{recov}}$ seconds.
   - Verifies that error rates, latency, and queue depths return to pre-experiment baseline tolerances ($\pm 10\%$).

---

## 2. Permitted Experiment Types & Parameter Ranges

| Experiment Type | Implementation Tool | Allowed Target Services | Parameter Range | Max Duration |
|---|---|---|---|---|
| **Network Latency Injection** | Toxiproxy (`latency` toxic) | `checkout`, `cart`, `payment`, `frontend` | $10\text{ ms} \le \text{latency} \le 800\text{ ms}$ (jitter $\le 50\text{ ms}$) | $30\text{ s}$ |
| **Network Packet Drop** | Toxiproxy (`drop` toxic) | `checkout`, `cart`, `recommendation` | $1\% \le \text{rate} \le 20\%$ | $20\text{ s}$ |
| **Bandwidth Throttle** | Toxiproxy (`bandwidth` toxic) | `productcatalog`, `cart` | $100\text{ KB/s} \le \text{rate} \le 5\text{ MB/s}$ | $30\text{ s}$ |
| **Service Interruption** | Toxiproxy (`down` toxic) | `recommendation`, `adservice` (non-critical) | Boolean: Toggle connection down | $15\text{ s}$ |
| **CPU Pressure Simulation** | Cgroup throttle / synthetic compute burn | Isolated container runner | $10\% \le \text{load} \le 80\%$ | $25\text{ s}$ |
| **Memory Pressure Simulation**| Synthetic allocation limit | Isolated container runner | $50\text{ MB} \le \text{alloc} \le 500\text{ MB}$ | $20\text{ s}$ |
| **Database Delay** | Synthetic proxy delay | `database-proxy` | $20\text{ ms} \le \text{delay} \le 600\text{ ms}$ | $25\text{ s}$ |

---

## 3. The Emergency Stop Mechanism ("Red Button")

- **Global Kill Switch:** The UI and API expose `POST /api/experiments/{experiment_id}/cancel` and `POST /api/experiments/emergency-abort`.
- **Action:** Immediately removes all active Toxiproxy toxics, kills any synthetic stress worker processes, restores network routing, and triggers an immediate recovery validation pass.
- **Audit Logging:** Logs the operator identity, timestamp, system state at abort, and residual metrics.
