import { ArrowRight, GitCompareArrows, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import { getRelationship, getTypeProfile } from "./socionicsModel";
import type { PersonRecord } from "./personStorage";

function DirectionPanel({ from, to, channels }: { from: PersonRecord; to: PersonRecord; channels: NonNullable<ReturnType<typeof getRelationship>>["aToB"] }) {
  return (
    <section className="direction-panel">
      <header>
        <div className="person-mini"><span>{from.name.slice(0, 1).toUpperCase()}</span><div><strong>{from.name}</strong><small>{from.typeId}</small></div></div>
        <ArrowRight size={18} />
        <div className="person-mini"><span>{to.name.slice(0, 1).toUpperCase()}</span><div><strong>{to.name}</strong><small>{to.typeId}</small></div></div>
      </header>
      <div className="channel-list">
        {channels.map((channel) => (
          <article className="relation-channel" key={`${channel.from}-${channel.to}`}>
            <span className={`channel-layer ${channel.layer.startsWith("Ego") ? "valued" : "shadow"}`}>{channel.layer}</span>
            <div className="channel-functions">
              <span><b>{channel.from}</b><small>{channel.fromPosition}</small></span>
              <ArrowRight size={15} />
              <span><b>{channel.to}</b><small>{channel.toPosition}</small></span>
            </div>
            <p>{channel.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function RelationshipView({ person, other }: { person: PersonRecord; other: PersonRecord | null }) {
  if (!other) {
    return <section className="empty-panel"><GitCompareArrows size={24} /><h2>Add another person to compare</h2><p>Relationships need two working type hypotheses.</p></section>;
  }

  const relationship = getRelationship(person.typeId, other.typeId);
  if (!relationship) {
    return <section className="empty-panel"><TriangleAlert size={24} /><h2>This pair is not mapped in the prototype yet</h2><p>The first vertical slice currently supports ISTP ↔ ENFP.</p></section>;
  }

  const a = getTypeProfile(person.typeId);
  const b = getTypeProfile(other.typeId);

  return (
    <div className="relationship-view">
      <section className="relationship-hero">
        <div>
          <span className="eyebrow"><GitCompareArrows size={13} /> Intertype relationship</span>
          <h1>{person.name} <span>×</span> {other.name}</h1>
          <p>{a.core} and {b.core} · viewed from both directions</p>
        </div>
        <div className="relation-badge"><Sparkles size={16} /><div><strong>{relationship.name}</strong><small>model-defined complement</small></div></div>
      </section>

      <section className="relation-explanation">
        <div><ShieldCheck size={18} /><p>{relationship.summary}</p></div>
        <div className="model-caution"><TriangleAlert size={15} /><p>{relationship.caution}</p></div>
      </section>

      <div className="relationship-directions">
        <DirectionPanel from={person} to={other} channels={relationship.aToB} />
        <DirectionPanel from={other} to={person} channels={relationship.bToA} />
      </div>

      <section className="source-conflict">
        <TriangleAlert size={16} />
        <div><strong>Source taxonomy needs review</strong><p>The type notes identify this pair as Dual, while their recorded quadras differ and the relation taxonomy describes Dual as same-quadra. Akasha preserves the relation but does not hide the conflict.</p></div>
      </section>
    </div>
  );
}
