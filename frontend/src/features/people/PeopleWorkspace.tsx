import {
  BookOpen,
  CircleHelp,
  Grid2X2,
  Pencil,
  Plus,
  Save,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import akashaIcon from "../../assets/akasha-icon.png";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import RelationshipView from "../relationships/RelationshipView";
import RealLifeView from "../observations/RealLifeView";
import TypeAnalysisView from "../type-analysis/TypeAnalysisView";
import AkashaAtmosphere from "../../app/shell/AkashaAtmosphere";
import {
  loadObservations,
  removeObservation,
  restoreObservation,
  saveObservations,
  type ObservationRecord,
} from "../../infrastructure/persistence/local-storage/observationStorage";
import {
  createPerson,
  loadPeople,
  loadSelectedPersonId,
  savePeople,
  saveSelectedPersonId,
  updatePerson,
  type PersonRecord,
} from "../../infrastructure/persistence/local-storage/personStorage";
import { resolveComparisonPersonId } from "../relationships/relationshipSelection";
import {
  getSupportedTypes,
  getTypeGroupMemberships,
  getTypeProfile,
  type FunctionProfile,
  type TypeGroupMembership,
  type TypeId,
} from "../../domain/socionics/socionicsModel";

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
  initialValues,
  mode,
}: {
  onSave: (name: string, type: TypeId, relationship: string) => void;
  onCancel?: () => void;
  initialValues: Pick<PersonRecord, "name" | "typeId" | "relationship">;
  mode: "create" | "edit";
}) {
  const [name, setName] = useState(initialValues.name);
  const [typeId, setTypeId] = useState<TypeId>(initialValues.typeId);
  const [relationship, setRelationship] = useState(initialValues.relationship);
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
          {mode === "create" ? <Plus size={15} /> : <Save size={15} />}
          {mode === "create" ? "Add person" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function PersonModal({
  titleId,
  eyebrow,
  title,
  onClose,
  children,
}: {
  titleId: string;
  eyebrow: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="person-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
      >
        <header>
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 id={titleId}>{title}</h2>
          </div>
          <button className="icon-action" onClick={onClose} aria-label="Close">
            <X size={17} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

function OverviewPanel({
  person,
  onEdit,
  editButtonRef,
}: {
  person: PersonRecord;
  onEdit: () => void;
  editButtonRef: RefObject<HTMLButtonElement | null>;
}) {
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
        <div className="person-hero-actions">
          <span className="type-code">{person.typeId}</span>
          <button ref={editButtonRef} className="quiet-action" onClick={onEdit}>
            <Pencil size={14} /> Edit profile
          </button>
        </div>
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

function GroupCard({
  membership,
  selected,
  onSelect,
}: {
  membership: TypeGroupMembership;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`group-card ${selected ? "selected" : ""}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={selected}
      aria-controls="group-inspector"
    >
      <span className="section-label">
        {membership.label} [{membership.source}]
      </span>
      <h2>{membership.value}</h2>
      <p>{membership.summary}</p>
    </button>
  );
}

function GroupsInspector({ membership }: { membership: TypeGroupMembership }) {
  return (
    <aside
      id="group-inspector"
      className="analysis-inspector group-inspector"
      aria-label={`${membership.label}: ${membership.value} details`}
      aria-live="polite"
    >
      <div className="inspector-heading">
        <span className="inspector-symbol">
          <Grid2X2 size={20} />
        </span>
        <div>
          <span className="eyebrow">
            {membership.label} · {membership.source}
          </span>
          <h2>{membership.value}</h2>
          <p>{membership.summary}</p>
        </div>
      </div>

      <div className="source-status">
        <BookOpen size={13} /> Curated overview · {membership.source}
      </div>

      <section className="inspector-section">
        <span className="section-label">In theory</span>
        <p>{membership.theory}</p>
      </section>

      <section className="inspector-section">
        <span className="section-label">In practice</span>
        <ul className="practice-list">
          {membership.practice.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </section>

      <section className="inspector-section">
        <span className="section-label">Why this assignment</span>
        <p>{membership.derivation}</p>
      </section>

      <section className="inspector-section group-caution">
        <span className="section-label">Working hypothesis</span>
        <p>{membership.caution}</p>
      </section>
    </aside>
  );
}

function GroupsPanel({ person }: { person: PersonRecord }) {
  const profile = getTypeProfile(person.typeId);
  const memberships = getTypeGroupMemberships(profile);
  const [selectedGroupId, setSelectedGroupId] = useState("quadra");
  const selectedMembership =
    memberships.find((membership) => membership.id === selectedGroupId) ??
    memberships[0];

  return (
    <div className="groups-view">
      <header>
        <span className="eyebrow">
          <Grid2X2 size={13} /> Type groups
        </span>
        <h1>{person.name} across the model</h1>
        <p>Memberships derived from the current {person.typeId} hypothesis.</p>
      </header>
      <div className="groups-workspace">
        <div className="groups-grid">
          {memberships.map((membership) => (
            <GroupCard
              key={membership.id}
              membership={membership}
              selected={membership.id === selectedMembership.id}
              onSelect={() => setSelectedGroupId(membership.id)}
            />
          ))}
        </div>
        <GroupsInspector membership={selectedMembership} />
      </div>
    </div>
  );
}

export default function PeopleWorkspace() {
  const [people, setPeople] = useState<PersonRecord[]>(loadPeople);
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    loadSelectedPersonId(),
  );
  const [activeTab, setActiveTab] = useState<ProfileTab>("analysis");
  const [openedRealLife, setOpenedRealLife] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
  const [comparisonPersonId, setComparisonPersonId] = useState<string | null>(
    null,
  );
  const [observations, setObservations] =
    useState<ObservationRecord[]>(loadObservations);
  const [evidenceTarget, setEvidenceTarget] = useState<FunctionProfile | null>(
    null,
  );
  const [query, setQuery] = useState("");
  const addPersonButtonRef = useRef<HTMLButtonElement>(null);
  const editPersonButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => savePeople(people), [people]);
  useEffect(() => saveObservations(observations), [observations]);
  useEffect(() => {
    if (selectedId) saveSelectedPersonId(selectedId);
  }, [selectedId]);
  useEffect(() => {
    if (!selectedId && people[0]) setSelectedId(people[0].id);
  }, [people, selectedId]);

  const selected =
    people.find((person) => person.id === selectedId) ?? people[0] ?? null;
  const editingPerson =
    people.find((person) => person.id === editingPersonId) ?? null;
  const resolvedComparisonPersonId = selected
    ? resolveComparisonPersonId(people, selected.id, comparisonPersonId)
    : null;
  const visiblePeople = people.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  const closeAddPerson = () => {
    setShowAddPerson(false);
    requestAnimationFrame(() => addPersonButtonRef.current?.focus());
  };

  const closeEditPerson = () => {
    setEditingPersonId(null);
    requestAnimationFrame(() => editPersonButtonRef.current?.focus());
  };

  const addPerson = (name: string, typeId: TypeId, relationship: string) => {
    const person = createPerson(name, typeId, relationship);
    setPeople((current) => [...current, person]);
    setSelectedId(person.id);
    setShowAddPerson(false);
  };

  const updateExistingPerson = (
    name: string,
    typeId: TypeId,
    relationship: string,
  ) => {
    if (!editingPerson) return;
    setPeople((current) =>
      current.map((person) =>
        person.id === editingPerson.id
          ? updatePerson(person, name, typeId, relationship)
          : person,
      ),
    );
    setEditingPersonId(null);
    requestAnimationFrame(() => editPersonButtonRef.current?.focus());
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
          repository. Choose any of the 16 working types; add the second person
          from the sidebar.
        </p>
        <PersonForm
          onSave={addPerson}
          initialValues={{ name: "", typeId: "ISTP", relationship: "" }}
          mode="create"
        />
      </main>
    );
  }

  if (!selected) return null;

  return (
    <div className="socionics-shell">
      <AkashaAtmosphere activeView={activeTab} />
      <aside className="people-rail">
        <div className="brand-lockup">
          <div className="brand-symbol">
            <img alt="" src={akashaIcon} />
          </div>
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
                  {person.typeId} · {person.relationship || "Not set"}
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
          {activeTab === "person" && (
            <OverviewPanel
              person={selected}
              onEdit={() => setEditingPersonId(selected.id)}
              editButtonRef={editPersonButtonRef}
            />
          )}
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
            <RelationshipView
              person={selected}
              people={people}
              comparisonPersonId={resolvedComparisonPersonId}
              onComparisonPersonChange={setComparisonPersonId}
            />
          )}
          {activeTab === "groups" && <GroupsPanel person={selected} />}
        </div>
      </main>

      {showAddPerson && (
        <PersonModal
          titleId="add-person-title"
          eyebrow="Local person record"
          title="Add another person"
          onClose={closeAddPerson}
        >
          <PersonForm
            onSave={addPerson}
            onCancel={closeAddPerson}
            initialValues={{
              name: "",
              typeId: people.some((person) => person.typeId === "ISTP")
                ? "ENFP"
                : "ISTP",
              relationship: "",
            }}
            mode="create"
          />
        </PersonModal>
      )}

      {editingPerson && (
        <PersonModal
          titleId="edit-person-title"
          eyebrow="Local person record"
          title={`Edit ${editingPerson.name}`}
          onClose={closeEditPerson}
        >
          <PersonForm
            onSave={updateExistingPerson}
            onCancel={closeEditPerson}
            initialValues={editingPerson}
            mode="edit"
          />
        </PersonModal>
      )}
    </div>
  );
}
