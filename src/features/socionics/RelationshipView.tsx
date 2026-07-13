import {
  ArrowRight,
  GitCompareArrows,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { getRelationship, getTypeProfile } from "./socionicsModel";
import type { PersonRecord } from "./personStorage";

function DirectionPanel({
  from,
  to,
  channels,
}: {
  from: PersonRecord;
  to: PersonRecord;
  channels: NonNullable<ReturnType<typeof getRelationship>>["aToB"];
}) {
  return (
    <section className="direction-panel">
      <header>
        <div className="person-mini">
          <span>{from.name.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{from.name}</strong>
            <small>{from.typeId}</small>
          </div>
        </div>
        <ArrowRight size={18} />
        <div className="person-mini">
          <span>{to.name.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{to.name}</strong>
            <small>{to.typeId}</small>
          </div>
        </div>
      </header>
      <div className="channel-list">
        {channels.map((channel) => (
          <article
            className="relation-channel"
            key={`${channel.from}-${channel.to}`}
          >
            <span
              className={`channel-layer ${channel.layer.startsWith("Ego") ? "valued" : "shadow"}`}
            >
              {channel.layer}
            </span>
            <div className="channel-functions">
              <span>
                <b>{channel.from}</b>
                <small>{channel.fromPosition}</small>
              </span>
              <ArrowRight size={15} />
              <span>
                <b>{channel.to}</b>
                <small>{channel.toPosition}</small>
              </span>
            </div>
            <p>{channel.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function RelationshipView({
  person,
  people,
  comparisonPersonId,
  onComparisonPersonChange,
}: {
  person: PersonRecord;
  people: PersonRecord[];
  comparisonPersonId: string | null;
  onComparisonPersonChange: (personId: string) => void;
}) {
  const availablePeople = people.filter(
    (candidate) => candidate.id !== person.id,
  );
  const other =
    availablePeople.find((candidate) => candidate.id === comparisonPersonId) ??
    null;

  if (!other) {
    return (
      <div className="relationship-view">
        <section className="empty-panel">
          <GitCompareArrows size={24} />
          <h2>Add another person to compare</h2>
          <p>Relationships need two working type hypotheses.</p>
        </section>
      </div>
    );
  }

  const relationship = getRelationship(person.typeId, other.typeId);
  const a = getTypeProfile(person.typeId);
  const b = getTypeProfile(other.typeId);

  return (
    <div className="relationship-view">
      <section
        className="relationship-picker"
        aria-label="Choose people to compare"
      >
        <div className="person-mini">
          <span>{person.name.slice(0, 1).toUpperCase()}</span>
          <div>
            <small>Current person</small>
            <strong>{person.name}</strong>
          </div>
        </div>
        <GitCompareArrows size={18} aria-hidden="true" />
        <label>
          <span>Compare with</span>
          <select
            value={other.id}
            onChange={(event) => onComparisonPersonChange(event.target.value)}
          >
            {availablePeople.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} · {candidate.typeId}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="relationship-hero">
        <div>
          <span className="eyebrow">
            <GitCompareArrows size={13} /> Intertype relationship
          </span>
          <h1>
            {person.name} <span>×</span> {other.name}
          </h1>
          <p>
            {a.core} and {b.core} · viewed from both directions
          </p>
        </div>
        <div className="relation-badge">
          <Sparkles size={16} />
          <div>
            <strong>{relationship.name}</strong>
            <small>{relationship.family}</small>
            {relationship.aRole && relationship.bRole && (
              <small className="relation-roles">
                {person.name}: {relationship.aRole} · {other.name}:{" "}
                {relationship.bRole}
              </small>
            )}
          </div>
        </div>
      </section>

      <section className="relation-explanation">
        <div>
          <ShieldCheck size={18} />
          <p>{relationship.summary}</p>
        </div>
        <div className="model-caution">
          <TriangleAlert size={15} />
          <p>{relationship.caution}</p>
        </div>
      </section>

      <div className="relationship-directions">
        <DirectionPanel from={person} to={other} channels={relationship.aToB} />
        <DirectionPanel from={other} to={person} channels={relationship.bToA} />
      </div>
    </div>
  );
}
