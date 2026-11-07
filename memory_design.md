# AEGIS X — Memory Architecture & Hindsight Integration

**Module:** Intervention-Grounded Operational Memory (IGOM)  
**Primary Engine:** Hindsight (`vectorize-io/hindsight` & `hindsight-client`)  
**Relational Substrate:** PostgreSQL / SQLite (for exact time-series records & audits)

---

## 1. The Core Problem with Naive Agent Memory

Standard LLM agent memory architectures (e.g. basic vector search over chat transcripts or simple RAG) suffer from three fatal flaws when applied to reliability engineering:

1. **Correlation Fallacy:** They remember symptoms that occurred alongside failures, converting accidental correlations (e.g., "high CPU was present during payment failure") into false rules, even if high CPU was an unrelated side effect.
2. **Context Blindness:** They fail to record the boundary conditions under which an observation was true (e.g., "timeout increased latency under load $L=500$ rps with default connection pool $N=10$, but does not hold under $N=50$").
3. **Absence of Negative Evidence:** Traditional vector databases retain what happened, but discard what was disproven, leading agents to repeatedly test and suggest hypotheses that experiments have already falsified.

---

## 2. The Hindsight Paradigm

AEGIS X leverages Hindsight's mental models and multi-tier memory concepts:

| Hindsight Concept | Operational Role in AEGIS X |
|---|---|
| **World** | Objective, verifiable facts about the topology, configurations, service dependencies, and deployment state. |
| **Experience** | Ground-truth records of actual incident investigations, candidate hypotheses, executed interventions, baseline/delta telemetry, and verified recovery. |
| **Observation** | Synthesized operational patterns derived across multiple experiences (e.g., *"Under Kubernetes cluster autoscaler delay, checkout fails over to cart retry storm if circuit breaker timeout is < 200ms"*). |
| **Opinion** | Evolving confidence ratings and diagnostic heuristics that adapt as new experiments contradict or reinforce prior findings. |

### Memory Bank Mission

AEGIS X registers its dedicated memory bank (`aegis-operational-memory`) with this formal mission:

> *"Preserve the experimental history of distributed software systems. Distinguish objective facts, observations, hypotheses, interventions, results and conclusions. Remember the exact conditions under which each experiment was performed. Retrieve prior experiments when planning new investigations. Preserve failed experiments and contradictory evidence. Never generalise beyond available evidence. Never silently convert an unverified hypothesis into an established fact."*

---

## 3. Supported Hindsight Operations

### A. Retain (`client.retain`)
Called at the conclusion of every investigation or experiment.
The payload structured schema contains:
- **Experiment Metadata:** ID, Incident ID, target service, timestamp.
- **Pre-Conditions:** Topology version, traffic load, active configs.
- **Hypotheses Evaluated:** Competing explanations with initial priors.
- **Intervention Applied:** Toxic type, parameter value, duration.
- **Empirical Measurements:** Baseline metrics vs. perturbation metrics.
- **Falsification Records:** Hypotheses ruled out by contradictory evidence.
- **Final Grounded Diagnosis:** Supported cause with confidence interval.

### B. Recall (`client.recall`)
Invoked at the start of Hypothesis Generation and Experiment Planning.
- Executes sub-second multi-pass retrieval (semantic vector search, BM25 keyword matching, entity graph traversal).
- Fetches past experiments involving the same services, similar symptom vectors, or identical fault types.
- **Critical Property:** No LLM is invoked during recall, ensuring microsecond retrieval latencies and deterministic fact ranking.

### C. Reflect (`client.reflect`)
Invoked periodically or upon the accumulation of new experimental evidence.
- Spins up an analytical synthesis pass over the memory bank.
- Identifies cross-incident commonalities, conflicts, and context shifts.
- Generates candidate operational rules and updates system opinions.

---

## 4. Structured Experiment Memory Schema (PostgreSQL & Dual-Write)

While Hindsight stores the semantic representation, knowledge graph, and temporal associations, PostgreSQL preserves the immutable audit trail and raw telemetry series:

```sql
CREATE TABLE experiment_memories (
    experiment_id UUID PRIMARY KEY,
    incident_id UUID NOT NULL,
    system_version VARCHAR(64) NOT NULL,
    target_service VARCHAR(128) NOT NULL,
    symptoms JSONB NOT NULL,
    candidate_hypotheses JSONB NOT NULL,
    selected_experiment VARCHAR(128) NOT NULL,
    intervention_parameters JSONB NOT NULL,
    baseline_metrics JSONB NOT NULL,
    post_intervention_metrics JSONB NOT NULL,
    supporting_evidence JSONB NOT NULL,
    contradicting_evidence JSONB NOT NULL,
    outcome_classification VARCHAR(32) NOT NULL, -- SUPPORTED, CONTRADICTED, INCONCLUSIVE
    conclusion TEXT NOT NULL,
    confidence_score FLOAT NOT NULL,
    applicability_conditions JSONB NOT NULL,
    limitations TEXT NOT NULL,
    engineer_approval_id VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
