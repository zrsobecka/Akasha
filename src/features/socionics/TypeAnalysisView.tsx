import {
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  FlaskConical,
  Link2,
  Plus,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  getTypeProfile,
  groupFunctions,
  type AnalysisView,
  type FunctionProfile,
  type TypeId,
} from "./socionicsModel";

interface TypeAnalysisViewProps {
  typeId: TypeId;
  personName: string;
  onOpenEvidence: () => void;
  onOpenQuestions: () => void;
}

const VIEW_LABELS: { id: AnalysisView; label: string }[] = [
  { id: "positions", label: "Positions" },
  { id: "aspects", label: "Aspects" },
  { id: "dimensions", label: "Dimensions" },
];

function FunctionCard({
  fn,
  selected,
  onSelect,
}: {
  fn: FunctionProfile;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`function-card ${selected ? "selected" : ""} aspect-${fn.aspect.toLowerCase().replace("-", "")}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="function-card-index">
        {String(fn.id).padStart(2, "0")}
      </span>
      <span className="function-symbol">{fn.element}</span>
      <span className="function-position">{fn.name}</span>
      <span className="function-theme">{fn.elementName}</span>
      <span className="function-card-meta">
        <span>{fn.aspect}</span>
        <span>{fn.dimension.split(" ")[0]}</span>
      </span>
    </button>
  );
}

function AnalysisInspector({
  fn,
  onOpenEvidence,
  onOpenQuestions,
}: {
  fn: FunctionProfile;
  onOpenEvidence: () => void;
  onOpenQuestions: () => void;
}) {
  return (
    <aside
      className="analysis-inspector"
      aria-label={`${fn.element} ${fn.name} details`}
    >
      <div className="inspector-heading">
        <span className="inspector-symbol">{fn.element}</span>
        <div>
          <span className="eyebrow">
            {fn.archetype} · position {fn.id}
          </span>
          <h2>{fn.name}</h2>
          <p>{fn.elementName}</p>
        </div>
      </div>

      <div className="source-status">
        <BookOpen size={13} /> Curated notes · derived profile
      </div>

      <section className="inspector-section">
        <span className="section-label">What the model predicts</span>
        <p>{fn.overview}</p>
      </section>

      <section className="inspector-section growth">
        <span className="section-label">
          <Sparkles size={12} /> Development direction
        </span>
        <p>{fn.growth}</p>
      </section>

      <section className="inspector-section">
        <span className="section-label">Cognitive traits</span>
        <div className="trait-list">
          {fn.traits.map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>
      </section>

      <section className="inspector-section">
        <span className="section-label">Structural memberships</span>
        <dl className="membership-list">
          <div>
            <dt>Aspect</dt>
            <dd>{fn.aspect}</dd>
          </div>
          <div>
            <dt>Dimension</dt>
            <dd>{fn.dimension}</dd>
          </div>
          <div>
            <dt>Reflection</dt>
            <dd>{fn.reflection}</dd>
          </div>
          <div>
            <dt>Axis</dt>
            <dd>{fn.axis}</dd>
          </div>
          <div>
            <dt>Orbit</dt>
            <dd>{fn.orbit}</dd>
          </div>
          <div>
            <dt>Sphere</dt>
            <dd>{fn.sphere}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{fn.mode}</dd>
          </div>
        </dl>
      </section>

      <details className="derivation-details">
        <summary>
          <Link2 size={14} /> Show how this was derived
        </summary>
        <div className="derivation-path">
          <span>{fn.element} in the type stack</span>
          <i />
          <span>
            Position {fn.id} · {fn.name}
          </span>
          <i />
          <span>{fn.traits.join(" · ")}</span>
          <i />
          <span>
            {fn.aspect} · {fn.dimension} · {fn.sphere}
          </span>
        </div>
      </details>

      <div className="inspector-actions">
        <button className="primary-action" onClick={onOpenEvidence}>
          <Plus size={15} /> Add real-life example
        </button>
        <button className="quiet-action" onClick={onOpenQuestions}>
          <CircleHelp size={15} /> Add a question
        </button>
      </div>
    </aside>
  );
}

export default function TypeAnalysisView({
  typeId,
  personName,
  onOpenEvidence,
  onOpenQuestions,
}: TypeAnalysisViewProps) {
  const profile = useMemo(() => getTypeProfile(typeId), [typeId]);
  const [view, setView] = useState<AnalysisView>("positions");
  const [depth, setDepth] = useState<"overview" | "deep">("overview");
  const [selectedPosition, setSelectedPosition] = useState(1);
  const groups = useMemo(() => groupFunctions(profile, view), [profile, view]);
  const selected =
    profile.functions.find((fn) => fn.id === selectedPosition) ??
    profile.functions[0];

  return (
    <div className="analysis-view">
      <section className="analysis-intro">
        <div>
          <span className="eyebrow">
            <FlaskConical size={13} /> Working model · {profile.core}
          </span>
          <h1>{personName}'s type structure</h1>
          <p>
            If the {typeId} hypothesis is accurate, the model derives the
            following eight-function architecture.
          </p>
        </div>
        <div className="type-summary">
          <span className="type-code">{typeId}</span>
          <div>
            <strong>{profile.leadingSign}</strong>
            <small>
              {profile.frame} · {profile.labels}
            </small>
          </div>
        </div>
      </section>

      <div className="analysis-toolbar" aria-label="Analysis display controls">
        <div className="segmented-control" aria-label="Group functions by">
          {VIEW_LABELS.map((item) => (
            <button
              key={item.id}
              className={view === item.id ? "active" : ""}
              onClick={() => setView(item.id)}
              aria-pressed={view === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="depth-control">
          <span>Depth</span>
          <button
            className={depth === "overview" ? "active" : ""}
            onClick={() => setDepth("overview")}
            aria-pressed={depth === "overview"}
          >
            Overview
          </button>
          <button
            className={depth === "deep" ? "active" : ""}
            onClick={() => setDepth("deep")}
            aria-pressed={depth === "deep"}
          >
            Deep dive
          </button>
        </div>
        <span className="coverage-indicator">
          <i /> 8/8 functions derived
        </span>
      </div>

      <div className="analysis-workspace">
        <div className={`function-canvas view-${view} depth-${depth}`}>
          {groups.map((group) => (
            <section className="function-group" key={group.id}>
              {view !== "positions" && (
                <header className="function-group-heading">
                  <div>
                    <span className="section-label">
                      {view === "aspects"
                        ? "Integration block"
                        : "Processing capacity"}
                    </span>
                    <h2>{group.label}</h2>
                  </div>
                  <p>{group.description}</p>
                </header>
              )}
              <div className="function-grid">
                {group.functions.map((fn) => (
                  <FunctionCard
                    key={fn.id}
                    fn={fn}
                    selected={fn.id === selected.id}
                    onSelect={() => setSelectedPosition(fn.id)}
                  />
                ))}
              </div>
              {depth === "deep" && view !== "positions" && (
                <div className="group-synthesis">
                  <span className="section-label">What follows</span>
                  <p>
                    {group.label === "Super-Ego"
                      ? "This block concentrates conscious pressure around weak, subdued functions. Treat it as a question for observation—not a confirmed description of the person."
                      : `${group.label} connects ${group.functions.map((fn) => `${fn.element} ${fn.name}`).join(" with ")}. Open either function to trace the exact traits behind the grouping.`}
                  </p>
                  <button
                    onClick={() => setSelectedPosition(group.functions[0].id)}
                  >
                    Inspect block <ArrowUpRight size={13} />
                  </button>
                </div>
              )}
            </section>
          ))}
        </div>
        <AnalysisInspector
          fn={selected}
          onOpenEvidence={onOpenEvidence}
          onOpenQuestions={onOpenQuestions}
        />
      </div>
    </div>
  );
}
