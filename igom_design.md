# Intervention-Grounded Operational Memory (IGOM)
## Theoretical Foundations & Mathematical Formulation

**Authors:** AEGIS X Principal Engineering & Research Team  
**Designation:** Research Methodology & Formal Specification  
**Status:** System Proposal & Benchmark Standard

---

## 1. Abstract

Reliability incident analysis in distributed software systems suffers from a fundamental identifiability deficit: purely observational telemetry (passive metrics, logs, traces) can identify correlations but is mathematically insufficient to resolve competing causal structures under observational equivalence. We propose **Intervention-Grounded Operational Memory (IGOM)**, an architecture that bridges causal discovery with long-term agent memory. Rather than indexing passive incident narratives, IGOM retains structured records of physical interventions, baseline-to-perturbation delta vectors, and verified counterfactuals. This paper formalizes the active experiment selection criteria, entropy reduction formulation, and memory-conditioned prior updates governing AEGIS X.

---

## 2. Mathematical Formalization

### 2.1 Causal Structural Causal Model (SCM)
Consider a distributed microservice topology represented as a structural causal model:
$$\mathcal{M} = \langle V, U, F, P(U) \rangle$$
Where:
- $V = \{S_1, S_2, \dots, S_n, M_1, M_2, \dots, M_k\}$ denotes endogenous variables representing service operational states $S_i$ and observable telemetry metrics $M_j$.
- $U$ denotes exogenous noise variables and external workload conditions.
- $F = \{f_v\}_{v \in V}$ represents structural equations $v = f_v(\text{pa}(v), u_v)$.

When an incident occurs, an anomaly symptom vector $S_{\text{obs}}$ is registered. Multiple distinct root causes $H_1, H_2, \dots, H_K$ can generate the identical observation:
$$P(S_{\text{obs}} \mid H_1) \approx P(S_{\text{obs}} \mid H_2)$$

### 2.2 Active Interventions & Pearl's Do-Calculus
To differentiate between observationally equivalent hypotheses, the system applies an intervention $\text{do}(X = x)$ within an isolated environment. The post-intervention distribution is given by:
$$P(Y \mid \text{do}(X = x), H_k)$$
An experiment $E = \langle X, x, Y \rangle$ is informative with respect to a hypothesis pair $(H_i, H_j)$ if and only if:
$$\mathcal{D}_{\text{KL}}\Big( P(Y \mid \text{do}(X = x), H_i) \,||\, P(Y \mid \text{do}(X = x), H_j) \Big) > \epsilon$$

### 2.3 Expected Information Gain (EIG)
Let $\mathcal{H} = \{H_1, \dots, H_K\}$ be the set of candidate hypotheses with current probability distribution $P(H)$. The initial Shannon entropy of the hypothesis space is:
$$\mathbb{H}(\mathcal{H}) = - \sum_{k=1}^K P(H_k) \log_2 P(H_k)$$

For candidate experiment $E$, the Expected Information Gain $\text{IG}(E)$ over possible observable outcomes $\mathcal{O}$ is:
$$\text{IG}(E) = \mathbb{H}(\mathcal{H}) - \mathbb{E}_{o \sim P(O \mid E)}\Big[ \mathbb{H}(\mathcal{H} \mid O = o) \Big]$$
Where the posterior entropy is:
$$\mathbb{H}(\mathcal{H} \mid O = o) = - \sum_{k=1}^K P(H_k \mid O = o, E) \log_2 P(H_k \mid O = o, E)$$
And Bayesian belief updating yields:
$$P(H_k \mid O = o, E) = \frac{P(O = o \mid H_k, E) P(H_k)}{\sum_{j=1}^K P(O = o \mid H_j, E) P(H_j)}$$

### 2.4 Multiobjective Utility Optimization
Real-world experimentation in distributed systems entails execution latency, computing cost, and operational blast-radius risk. We define the Experiment Selection Utility:
$$\text{Score}(E) = \frac{\text{IG}(E)}{\text{Cost}(E) + \lambda \times \text{Risk}(E)}$$
Where:
- $\text{Cost}(E) \in [0.1, 1.0]$ normalizes test duration, synthetic load, and resource overhead.
- $\text{Risk}(E) \in [0.0, 1.0]$ quantifies potential instability or cascade failure probability.
- $\lambda \ge 0$ is a risk-aversion hyperparameter.

---

## 3. Intervention-Grounded Memory Integration

When an experiment $E^*$ is approved and executed:
1. **Delta Measurement:** $\Delta M = M_{\text{post}} - M_{\text{baseline}}$ is computed across all monitored service boundaries.
2. **Falsification & Confirmation:** Evidence is partitioned into supporting $\mathcal{S}$, contradicting $\mathcal{C}$, and inconclusive $\mathcal{I}$.
3. **Hindsight Retention:**
   The tuple $\langle S_{\text{obs}}, \text{Context}, E^*, \Delta M, \mathcal{C}, H_{\text{supported}}, \text{Conf} \rangle$ is stored in Hindsight.
4. **Prior Adjustment for Future Investigations:**
   When a new incident exhibits similar symptoms $S_{\text{new}} \approx S_{\text{obs}}$, Hindsight recalls prior experiment results:
   - If conditions (traffic, topology, configuration) match and hypothesis $H_{\text{prior}}$ was confirmed, the prior $P(H_{\text{prior}})$ is elevated, drastically reducing required investigation steps.
   - If conditions diverge (e.g. database connection pool size changed from 10 to 50), the system explicitly notes the context shift and selects an experiment that tests whether the old rule still holds.
