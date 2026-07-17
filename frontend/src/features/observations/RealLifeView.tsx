import {
  BookOpen,
  Check,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  fetchLmStudioModels,
  LmStudioError,
  suggestFunctionConnections,
  type FunctionSuggestion,
  type FunctionSuggestionResult,
} from "../../infrastructure/integrations/lm-studio/lmStudio";
import {
  createObservation,
  type EvidenceRating,
  type ObservationRecord,
} from "../../infrastructure/persistence/local-storage/observationStorage";
import type { PersonRecord } from "../../domain/person/person";
import {
  getTypeProfile,
  type FunctionProfile,
} from "../../domain/socionics/socionicsModel";

const MODEL_STORAGE_KEY = "akasha.socionics.lm-studio-model.v1";
const RATING_OPTIONS: { value: EvidenceRating; label: string }[] = [
  { value: "fits", label: "Fits the model" },
  { value: "partial", label: "Partly fits" },
  { value: "contradicts", label: "Contradicts it" },
  { value: "uncertain", label: "Not sure yet" },
];

function localDate(): string {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export default function RealLifeView({
  person,
  observations,
  initialTarget,
  hidden,
  onSave,
  onDelete,
  onRestore,
}: {
  person: PersonRecord;
  observations: ObservationRecord[];
  initialTarget: FunctionProfile | null;
  hidden?: boolean;
  onSave: (observation: ObservationRecord) => void;
  onDelete: (observationId: string) => void;
  onRestore: (observation: ObservationRecord) => void;
}) {
  const profile = useMemo(() => getTypeProfile(person.typeId), [person.typeId]);
  const [positionId, setPositionId] = useState<number>(initialTarget?.id ?? 1);
  const [occurredOn, setOccurredOn] = useState(localDate);
  const [context, setContext] = useState("");
  const [description, setDescription] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [rating, setRating] = useState<EvidenceRating>("uncertain");
  const [savedId, setSavedId] = useState<string | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState(
    () => window.localStorage.getItem(MODEL_STORAGE_KEY) ?? "",
  );
  const [modelStatus, setModelStatus] = useState<
    "loading" | "ready" | "offline"
  >("loading");
  const [modelError, setModelError] = useState("");
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "analyzing">(
    "idle",
  );
  const [suggestionResult, setSuggestionResult] =
    useState<FunctionSuggestionResult | null>(null);
  const [acceptedSuggestion, setAcceptedSuggestion] =
    useState<FunctionSuggestion | null>(null);
  const [deletedObservation, setDeletedObservation] =
    useState<ObservationRecord | null>(null);
  const contextRef = useRef<HTMLInputElement>(null);
  const analysisControllerRef = useRef<AbortController | null>(null);
  const discoveryControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initialTarget) setPositionId(initialTarget.id);
  }, [initialTarget]);

  const discoverModels = useCallback(async () => {
    discoveryControllerRef.current?.abort();
    const controller = new AbortController();
    discoveryControllerRef.current = controller;
    setModelStatus("loading");
    setModelError("");
    try {
      const discovered = await fetchLmStudioModels(controller.signal);
      setModels(discovered);
      setSelectedModel((current) => {
        const next = discovered.includes(current) ? current : discovered[0];
        window.localStorage.setItem(MODEL_STORAGE_KEY, next);
        return next;
      });
      setModelStatus("ready");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setModels([]);
      setModelStatus("offline");
      setModelError(
        error instanceof Error
          ? error.message
          : "Akasha could not connect to LM Studio.",
      );
    }
  }, []);

  useEffect(() => {
    void discoverModels();
    return () => {
      discoveryControllerRef.current?.abort();
      analysisControllerRef.current?.abort();
    };
  }, [discoverModels]);

  const target =
    profile.functions.find((fn) => fn.id === positionId) ??
    profile.functions[0];
  const personObservations = observations
    .filter((observation) => observation.personId === person.id)
    .sort((a, b) => b.occurredOn.localeCompare(a.occurredOn));

  const clearSuggestion = () => {
    setSuggestionResult(null);
    setAcceptedSuggestion(null);
    setModelError("");
  };

  const analyzeObservation = async () => {
    if (!selectedModel || !context.trim() || !description.trim()) return;
    analysisControllerRef.current?.abort();
    const controller = new AbortController();
    analysisControllerRef.current = controller;
    setAnalysisStatus("analyzing");
    setSuggestionResult(null);
    setAcceptedSuggestion(null);
    setModelError("");
    try {
      const result = await suggestFunctionConnections({
        model: selectedModel,
        typeId: person.typeId,
        context,
        description,
        functions: profile.functions,
        signal: controller.signal,
      });
      setSuggestionResult(result);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setModelError(
        error instanceof LmStudioError || error instanceof Error
          ? error.message
          : "The local model could not analyze this observation.",
      );
    } finally {
      setAnalysisStatus("idle");
      analysisControllerRef.current = null;
    }
  };

  const acceptSuggestion = (suggestion: FunctionSuggestion) => {
    setPositionId(suggestion.positionId);
    setAcceptedSuggestion(suggestion);
    setSavedId(null);
  };

  const submitObservation = () => {
    if (!context.trim() || !description.trim()) return;
    const observation = createObservation({
      personId: person.id,
      occurredOn,
      context,
      description,
      interpretation,
      rating,
      typeId: person.typeId,
      fn: target,
      linkProvenance: acceptedSuggestion
        ? {
            origin: "ai-confirmed",
            modelId: selectedModel,
            reason: acceptedSuggestion.reason,
          }
        : { origin: "manual" },
    });
    onSave(observation);
    setSavedId(observation.id);
    setContext("");
    setDescription("");
    setInterpretation("");
    setRating("uncertain");
    setSuggestionResult(null);
    setAcceptedSuggestion(null);
    contextRef.current?.focus();
  };

  return (
    <div className="real-life-view" hidden={hidden}>
      <header className="real-life-heading">
        <div>
          <span className="eyebrow">
            <BookOpen size={13} /> Theory meets real life
          </span>
          <h1>Evidence for {person.name}</h1>
          <p>
            Record what happened first. Local AI may suggest a connection, but
            only you can confirm what the observation should be linked to.
          </p>
        </div>
        <span className="evidence-total">
          {personObservations.length} saved{" "}
          {personObservations.length === 1 ? "example" : "examples"}
        </span>
      </header>

      <div className="real-life-layout">
        <form
          className="observation-form"
          onSubmit={(event) => {
            event.preventDefault();
            submitObservation();
          }}
        >
          <div className="observation-form-heading">
            <div>
              <span className="section-label">New observation</span>
              <h2>
                {target.element} · {target.name}
              </h2>
            </div>
            {savedId && (
              <span className="save-confirmation" role="status">
                <Check size={14} /> Saved locally
              </span>
            )}
          </div>

          <div className="observation-form-row">
            <label>
              <span>Date</span>
              <input
                type="date"
                value={occurredOn}
                onChange={(event) => setOccurredOn(event.target.value)}
                required
              />
            </label>
            <label>
              <span>How does it fit?</span>
              <select
                value={rating}
                onChange={(event) =>
                  setRating(event.target.value as EvidenceRating)
                }
              >
                {RATING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            <span>Situation or context</span>
            <input
              ref={contextRef}
              value={context}
              onChange={(event) => {
                setContext(event.target.value);
                setSavedId(null);
                clearSuggestion();
              }}
              placeholder="e.g. planning a trip with friends"
              disabled={analysisStatus === "analyzing"}
              required
            />
          </label>

          <label>
            <span>What happened? Keep this observable.</span>
            <textarea
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                setSavedId(null);
                clearSuggestion();
              }}
              placeholder="Describe words or actions without diagnosing the person."
              rows={4}
              disabled={analysisStatus === "analyzing"}
              required
            />
          </label>

          <section className="local-ai-panel" aria-label="Local AI suggestions">
            <div className="local-ai-heading">
              <div>
                <span className="section-label">
                  <Sparkles size={12} /> Local AI connection
                </span>
                <p>
                  Only the situation, observed behavior and current type model
                  are sent to LM Studio on this computer.
                </p>
              </div>
              <span className={`model-status status-${modelStatus}`}>
                {modelStatus === "ready"
                  ? "Local server ready"
                  : modelStatus === "loading"
                    ? "Checking LM Studio"
                    : "LM Studio offline"}
              </span>
            </div>

            {modelStatus === "ready" && (
              <label>
                <span>Local model</span>
                <select
                  value={selectedModel}
                  onChange={(event) => {
                    const model = event.target.value;
                    setSelectedModel(model);
                    window.localStorage.setItem(MODEL_STORAGE_KEY, model);
                    clearSuggestion();
                  }}
                  disabled={analysisStatus === "analyzing"}
                >
                  {models.map((model) => (
                    <option key={model}>{model}</option>
                  ))}
                </select>
              </label>
            )}

            {modelError && (
              <div className="local-ai-error" role="alert">
                <p>{modelError}</p>
                {modelStatus === "offline" && (
                  <button
                    type="button"
                    className="quiet-action"
                    onClick={() => void discoverModels()}
                  >
                    <RefreshCw size={13} /> Retry connection
                  </button>
                )}
              </div>
            )}

            {analysisStatus === "analyzing" ? (
              <div className="analysis-progress" role="status">
                <span>Comparing this observation with eight functions…</span>
                <button
                  type="button"
                  className="quiet-action"
                  onClick={() => analysisControllerRef.current?.abort()}
                >
                  <X size={13} /> Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="ai-suggest-action"
                onClick={() => void analyzeObservation()}
                disabled={
                  modelStatus !== "ready" ||
                  !selectedModel ||
                  !context.trim() ||
                  !description.trim()
                }
              >
                <Sparkles size={14} /> Suggest function connections
              </button>
            )}

            {suggestionResult && (
              <div className="ai-suggestions" aria-live="polite">
                <span className="section-label">Review suggestions</span>
                {suggestionResult.suggestions.map((suggestion) => {
                  const fn = profile.functions.find(
                    (functionProfile) =>
                      functionProfile.id === suggestion.positionId,
                  );
                  if (!fn) return null;
                  const accepted =
                    acceptedSuggestion?.positionId === suggestion.positionId;
                  return (
                    <article
                      className={`ai-suggestion-card ${accepted ? "accepted" : ""}`}
                      key={suggestion.positionId}
                    >
                      <div>
                        <strong>
                          {fn.element} · {fn.name}
                        </strong>
                        <span>{suggestion.confidence} confidence</span>
                      </div>
                      <p>{suggestion.reason}</p>
                      <button
                        type="button"
                        className={
                          accepted ? "accepted-action" : "quiet-action"
                        }
                        onClick={() => acceptSuggestion(suggestion)}
                      >
                        {accepted ? (
                          <>
                            <Check size={13} /> Connection confirmed
                          </>
                        ) : (
                          "Use this connection"
                        )}
                      </button>
                    </article>
                  );
                })}
                {suggestionResult.alternativeExplanation && (
                  <div className="alternative-explanation">
                    <span>Alternative explanation</span>
                    <p>{suggestionResult.alternativeExplanation}</p>
                  </div>
                )}
              </div>
            )}
          </section>

          <label>
            <span>
              Confirmed connection ·{" "}
              {acceptedSuggestion ? "AI suggested" : "chosen manually"}
            </span>
            <select
              value={positionId}
              onChange={(event) => {
                setPositionId(Number(event.target.value));
                setAcceptedSuggestion(null);
                setSavedId(null);
              }}
            >
              {profile.functions.map((fn) => (
                <option key={fn.id} value={fn.id}>
                  {fn.element} · {fn.name} · {fn.aspect}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Your interpretation (optional)</span>
            <textarea
              value={interpretation}
              onChange={(event) => {
                setInterpretation(event.target.value);
                setSavedId(null);
              }}
              placeholder={`Why might this connect to ${target.element} ${target.name}? What else could explain it?`}
              rows={3}
            />
          </label>

          <button
            className="primary-action observation-submit"
            type="submit"
            disabled={
              analysisStatus === "analyzing" ||
              !context.trim() ||
              !description.trim()
            }
          >
            <Plus size={15} /> Save confirmed observation
          </button>
        </form>

        <section className="observation-list" aria-label="Saved observations">
          <div className="observation-list-heading">
            <span className="section-label">Saved evidence</span>
            <h2>Real situations</h2>
          </div>
          {deletedObservation && (
            <div className="observation-undo" role="status">
              <span>Observation removed.</span>
              <button
                type="button"
                onClick={() => {
                  onRestore(deletedObservation);
                  setDeletedObservation(null);
                }}
              >
                <Undo2 size={13} /> Undo
              </button>
            </div>
          )}
          {personObservations.length === 0 ? (
            <div className="observation-empty">
              <BookOpen size={22} />
              <h3>No evidence yet</h3>
              <p>
                Add one concrete situation. Uncertain and contradictory examples
                are just as useful as matching ones.
              </p>
            </div>
          ) : (
            personObservations.map((observation) => (
              <article
                className={`observation-card rating-${observation.rating}`}
                key={observation.id}
              >
                <div className="observation-card-meta">
                  <span>
                    {observation.target.element} ·{" "}
                    {observation.target.positionName}
                  </span>
                  <time dateTime={observation.occurredOn}>
                    {observation.occurredOn}
                  </time>
                </div>
                <h3>{observation.context}</h3>
                <p>{observation.description}</p>
                {observation.interpretation && (
                  <div className="observation-interpretation">
                    <span>Interpretation</span>
                    <p>{observation.interpretation}</p>
                  </div>
                )}
                <div className="observation-card-footer">
                  <span className="rating-label">
                    {
                      RATING_OPTIONS.find(
                        (option) => option.value === observation.rating,
                      )?.label
                    }
                  </span>
                  <span className="link-origin">
                    {observation.linkProvenance?.origin === "ai-confirmed"
                      ? "AI suggested · confirmed"
                      : "Manual connection"}
                  </span>
                  <button
                    type="button"
                    className="delete-observation"
                    aria-label={`Delete observation: ${observation.context}`}
                    onClick={() => {
                      onDelete(observation.id);
                      setDeletedObservation(observation);
                    }}
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
