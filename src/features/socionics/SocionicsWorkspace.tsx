import {
  BookOpen,
  CircleHelp,
  Grid2X2,
  Plus,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import RelationshipView from "./RelationshipView";
import RealLifeView from "./RealLifeView";
import TypeAnalysisView from "./TypeAnalysisView";
import {
  loadObservations,
  removeObservation,
  restoreObservation,
  saveObservations,
  type ObservationRecord,
} from "./observationStorage";
import {
  createPerson,
  loadPeople,
  loadSelectedPersonId,
  savePeople,
  saveSelectedPersonId,
  type PersonRecord,
} from "./personStorage";
import {
  getSupportedTypes,
  getTypeProfile,
  type FunctionProfile,
  type TypeId,
} from "./socionicsModel";

type ProfileTab =
  | "person"
  | "analysis"
  | "real-life"
  | "hypothesis"
  | "relationships"
  | "groups";

const TABS: { id: ProfileTab; label: string }[] = [
  { id: "person", label: "Person" },
  { id: "analysis", label: "Type Analysis" },
  { id: "real-life", label: "Link to Real Life" },
  { id: "hypothesis", label: "Hypothesis & Questions" },
  { id: "relationships", label: "Relationships" },
  { id: "groups", label: "Groups" },
];

function PersonForm({
  onSave,
  onCancel,
  suggestedType,
}: {
  onSave: (name: string, type: TypeId, relationship: string) => void;
  onCancel?: () => void;
  suggestedType: TypeId;
}) {
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState<TypeId>(suggestedType);
  const [relationship, setRelationship] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  return (
    <form
      className="person-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (name.trim()) onSave(name, typeId, relationship);
      }}
    >
      <label>
        <span>Name or nickname</span>
        <input
          ref={nameRef}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Stored only on this device"
          required
        />
      </label>
      <label>
        <span>Working type</span>
        <select
          value={typeId}
          onChange={(event) => setTypeId(event.target.value as TypeId)}
        >
          {getSupportedTypes().map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Relationship</span>
        <input
          value={relationship}
          onChange={(event) => setRelationship(event.target.value)}
          placeholder="e.g. self, close friend"
        />
      </label>
      <div className="person-form-actions">
        {onCancel && (
          <button type="button" className="quiet-action" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="primary-action"
          disabled={!name.trim()}
        >
          <Plus size={15} /> Add person
        </button>
      </div>
    </form>
  );
}

function OverviewPanel({ person }: { person: PersonRecord }) {
  const profile = getTypeProfile(person.typeId);
  return (
    <div className="overview-panel">
      <section className="person-hero-card">
        <span className="large-initial">
          {person.name.slice(0, 1).toUpperCase()}
        </span>
        <div>
          <span className="eyebrow">Local person profile</span>
          <h1>{person.name}</h1>
          <p>{person.relationship || "Relationship not described yet"}</p>
        </div>
        <span className="type-code">{person.typeId}</span>
      </section>
      <div className="overview-grid">
        <section>
          <span className="section-label">Working structure</span>
          <h2>{profile.core}</h2>
          <p>
            {profile.functions[0].elementName} leads;{" "}
            {profile.functions[1].elementName.toLowerCase()} supports its
            expression.
          </p>
        </section>
        <section>
          <span className="section-label">Current status</span>
          <h2>{person.confidence}</h2>
          <p>
            This is a working hypothesis. Real-life evidence has not been added
            yet.
          </p>
        </section>
        <section>
          <span className="section-label">Next useful move</span>
          <h2>Inspect one block</h2>
          <p>
            Open Type Analysis and compare a model prediction with one concrete
            situation.
          </p>
        </section>
      </div>
    </div>
  );
}

function PlaceholderPanel({
  kind,
  onGo,
}: {
  kind: "evidence" | "questions";
  onGo: () => void;
}) {
  const evidence = kind === "evidence";
  return (
    <section className="empty-panel wide">
      {evidence ? <BookOpen size={26} /> : <CircleHelp size={26} />}
      <span className="eyebrow">First vertical slice</span>
      <h2>
        {evidence
          ? "Connect theory to one real situation"
          : "Keep the type as a question"}
      </h2>
      <p>
        {evidence
          ? "The evidence editor comes next. For now, return to a function and choose the exact model claim you want to test."
          : "Question tracking comes next. The current type remains explicitly marked as a working hypothesis."}
      </p>
      <button className="primary-action" onClick={onGo}>
        Return to Type Analysis
      </button>
    </section>
  );
}

function GroupsPanel({ person }: { person: PersonRecord }) {
  const profile = getTypeProfile(person.typeId);
  return (
    <div className="groups-view">
      <header>
        <span className="eyebrow">
          <Grid2X2 size={13} /> Type groups
        </span>
        <h1>{person.name} across the model</h1>
        <p>Memberships derived from the current {person.typeId} hypothesis.</p>
      </header>
      <div className="groups-grid">
        <section>
          <span className="section-label">Quadra</span>
          <h2>{profile.quadra}</h2>
          <p>Shared valued function ring.</p>
        </section>
        <section>
          <span className="section-label">Club</span>
          <h2>{profile.club}</h2>
          <p>What people naturally think and talk about.</p>
        </section>
        <section>
          <span className="section-label">Temperament</span>
          <h2>{profile.temperament}</h2>
          <p>
            Energy and pace. An asterisk marks a source conflict requiring
            review.
          </p>
        </section>
      </div>
    </div>
  );
}

export default function SocionicsWorkspace() {
  const [people, setPeople] = useState<PersonRecord[]>(loadPeople);
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    loadSelectedPersonId(),
  );
  const [activeTab, setActiveTab] = useState<ProfileTab>("analysis");
  const [openedRealLife, setOpenedRealLife] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [observations, setObservations] =
    useState<ObservationRecord[]>(loadObservations);
  const [evidenceTarget, setEvidenceTarget] = useState<FunctionProfile | null>(
    null,
  );
  const [query, setQuery] = useState("");
  const addPersonButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => savePeople(people), [people]);
  useEffect(() => saveObservations(observations), [observations]);
  useEffect(() => {
    if (selectedId) saveSelectedPersonId(selectedId);
  }, [selectedId]);
  useEffect(() => {
    if (!selectedId && people[0]) setSelectedId(people[0].id);
  }, [people, selectedId]);
  useEffect(() => {
    if (!showAddPerson) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAddPerson(false);
        requestAnimationFrame(() => addPersonButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showAddPerson]);

  const selected =
    people.find((person) => person.id === selectedId) ?? people[0] ?? null;
  const other = useMemo(
    () => people.find((person) => person.id !== selected?.id) ?? null,
    [people, selected],
  );
  const visiblePeople = people.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  const addPerson = (name: string, typeId: TypeId, relationship: string) => {
    const person = createPerson(name, typeId, relationship);
    setPeople((current) => [...current, person]);
    setSelectedId(person.id);
    setShowAddPerson(false);
  };

  if (people.length === 0) {
    return (
      <main className="private-setup">
        <div className="setup-mark">
          <UsersRound size={28} />
        </div>
        <span className="eyebrow">Private local workspace</span>
        <h1>Add the first person</h1>
        <p>
          Names stay in this device's local storage and are not part of the
          repository. Start with either ISTP or ENFP; add the second person from
          the sidebar.
        </p>
        <PersonForm onSave={addPerson} suggestedType="ISTP" />
      </main>
    );
  }

  if (!selected) return null;

  return (
    <div className="socionics-shell">
      <aside className="people-rail">
        <div className="brand-lockup">
          <div className="brand-symbol">A</div>
          <div>
            <strong>AKASHA</strong>
            <span>
              <i /> Socionics lab
            </span>
          </div>
        </div>
        <div className="people-section-heading">
          <span>People</span>
          <button
            ref={addPersonButtonRef}
            onClick={() => setShowAddPerson(true)}
            aria-label="Add person"
          >
            <Plus size={15} />
          </button>
        </div>
        <label className="people-search">
          <Search size={14} />
          <input
            aria-label="Find a person"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a person"
          />
        </label>
        <nav className="people-list" aria-label="People">
          {visiblePeople.map((person) => (
            <button
              key={person.id}
              className={person.id === selected.id ? "active" : ""}
              onClick={() => setSelectedId(person.id)}
            >
              <span className="person-initial">
                {person.name.slice(0, 1).toUpperCase()}
              </span>
              <span>
                <strong>{person.name}</strong>
                <small>
                  {person.typeId} · {person.confidence}
                </small>
              </span>
            </button>
          ))}
        </nav>
        <div className="local-status">
          <span>
            <i /> Local & private
          </span>
          <small>
            {people.length} {people.length === 1 ? "person" : "people"} · saved
          </small>
        </div>
      </aside>

      <main className="profile-workspace">
        <header className="profile-topbar">
          <div className="profile-context">
            <span className="profile-initial">
              {selected.name.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <strong>{selected.name}</strong>
              <span>{selected.relationship || "Person profile"}</span>
            </div>
            <span className="working-type">
              {selected.typeId}
              <small>working</small>
            </span>
          </div>
          <div className="topbar-actions">
            <button className="icon-action" aria-label="Knowledge sources">
              <BookOpen size={17} />
            </button>
            <button className="icon-action" aria-label="Help">
              <CircleHelp size={17} />
            </button>
          </div>
        </header>

        <nav className="profile-tabs" aria-label="Person profile sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => {
                if (tab.id === "real-life") {
                  setEvidenceTarget(null);
                  setOpenedRealLife(true);
                }
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="profile-content">
          {activeTab === "person" && <OverviewPanel person={selected} />}
          {activeTab === "analysis" && (
            <TypeAnalysisView
              typeId={selected.typeId}
              personName={selected.name}
              observations={observations.filter(
                (observation) => observation.personId === selected.id,
              )}
              onOpenEvidence={(fn) => {
                setEvidenceTarget(fn);
                setOpenedRealLife(true);
                setActiveTab("real-life");
              }}
              onOpenQuestions={() => setActiveTab("hypothesis")}
            />
          )}
          {openedRealLife && (
            <RealLifeView
              key={selected.id}
              person={selected}
              observations={observations}
              initialTarget={evidenceTarget}
              hidden={activeTab !== "real-life"}
              onSave={(observation) =>
                setObservations((current) => [...current, observation])
              }
              onDelete={(observationId) =>
                setObservations((current) =>
                  removeObservation(current, observationId),
                )
              }
              onRestore={(observation) =>
                setObservations((current) =>
                  restoreObservation(current, observation),
                )
              }
            />
          )}
          {activeTab === "hypothesis" && (
            <PlaceholderPanel
              kind="questions"
              onGo={() => setActiveTab("analysis")}
            />
          )}
          {activeTab === "relationships" && (
            <RelationshipView person={selected} other={other} />
          )}
          {activeTab === "groups" && <GroupsPanel person={selected} />}
        </div>
      </main>

      {showAddPerson && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowAddPerson(false);
          }}
        >
          <section
            className="person-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-person-title"
          >
            <header>
              <div>
                <span className="eyebrow">Local person record</span>
                <h2 id="add-person-title">Add another person</h2>
              </div>
              <button
                className="icon-action"
                onClick={() => setShowAddPerson(false)}
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </header>
            <PersonForm
              onSave={addPerson}
              onCancel={() => setShowAddPerson(false)}
              suggestedType={
                people.some((person) => person.typeId === "ISTP")
                  ? "ENFP"
                  : "ISTP"
              }
            />
          </section>
        </div>
      )}
    </div>
  );
}
