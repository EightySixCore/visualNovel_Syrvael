import type { CSSProperties } from "react";
import { Boxes, Map, Search, Target, Users } from "lucide-react";
import type { ChapterOneProgress } from "../data/chapterOneProgress";

type ArchiveNotebookProps = {
  progress: ChapterOneProgress;
};

function CountBadge({ current, total }: { current: number; total: number }) {
  return (
    <span className="notebook-count">
      {current}/{total}
    </span>
  );
}

export function ArchiveNotebook({ progress }: ArchiveNotebookProps) {
  const acquiredItems = progress.items.filter((item) => item.acquired).length;
  const discoveredClues = progress.clues.filter((clue) => clue.discovered).length;
  const openContacts = progress.contacts.filter((contact) => contact.confidence === "ouverte").length;
  const unlockedHypotheses = progress.hypotheses.filter((hypothesis) => hypothesis.unlocked).length;

  return (
    <div className="archive-notebook">
      <header className="notebook-header">
        <div>
          <p>Carnet d'Archiviste</p>
          <h3>La mort du roi</h3>
        </div>
        <span>{progress.chapterStarted ? "Enquete active" : "Prologue"}</span>
      </header>

      <section className="notebook-objective" aria-label="Objectif actuel">
        <Target size={16} />
        <p>{progress.objective}</p>
      </section>

      <div className="notebook-grid">
        <section className="notebook-section notebook-map" aria-label="Carte d'Havrenoire">
          <div className="notebook-section-title">
            <Map size={15} />
            <span>Carte</span>
          </div>
          <div className="city-map" aria-label="Mini-map d'Havrenoire">
            <div className="map-road map-road-main" />
            <div className="map-road map-road-north" />
            <div className="map-road map-road-west" />
            <div className="map-road map-road-east" />
            <div className="map-road map-road-south" />
            {progress.locations.map((location) => (
              <div
                className={[
                  "map-node",
                  location.current ? "current" : "",
                  location.visited ? "visited" : "",
                  location.accessible ? "accessible" : "locked",
                  location.hasPendingItem ? "pending" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={location.id}
                style={{ "--map-x": `${location.mapX}%`, "--map-y": `${location.mapY}%` } as CSSProperties}
                title={location.unlockHint ?? location.label}
              >
                <strong>{location.shortLabel}</strong>
                <span>
                  {location.current
                    ? "Position actuelle"
                    : location.accessible
                      ? location.visited
                        ? "Visite"
                        : "Ouvert"
                      : "Verrouille"}
                </span>
              </div>
            ))}
          </div>
          <div className="map-legend" aria-label="Legende de la carte">
            <span>
              <i className="legend-dot current" /> Position actuelle
            </span>
            <span>
              <i className="legend-dot visited" /> Visite
            </span>
            <span>
              <i className="legend-dot pending" /> Objet restant
            </span>
            <span>
              <i className="legend-dot locked" /> Verrouille
            </span>
          </div>
        </section>

        <section className="notebook-section" aria-label="Objets recuperes">
          <div className="notebook-section-title">
            <Boxes size={15} />
            <span>Objets</span>
            <CountBadge current={acquiredItems} total={progress.items.length} />
          </div>
          <div className="notebook-list">
            {progress.items.map((item) => (
              <article className={item.acquired ? "known" : ""} key={item.id}>
                <strong>{item.acquired ? item.label : "Objet inconnu"}</strong>
                <span>{item.acquired ? `${item.npc} - ${item.description}` : `A chercher : ${item.location}`}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="notebook-section" aria-label="Indices recoupes">
          <div className="notebook-section-title">
            <Search size={15} />
            <span>Indices</span>
            <CountBadge current={discoveredClues} total={progress.clues.length} />
          </div>
          <div className="notebook-list">
            {progress.clues.map((clue) => (
              <article className={clue.discovered ? "known" : ""} key={clue.id}>
                <strong>{clue.discovered ? clue.label : "Indice incomplet"}</strong>
                <span>{clue.discovered ? clue.description : "Il manque encore une preuve pour recouper cette piste."}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="notebook-section" aria-label="Hypotheses disponibles">
          <div className="notebook-section-title">
            <Target size={15} />
            <span>Hypotheses</span>
            <CountBadge current={unlockedHypotheses} total={progress.hypotheses.length} />
          </div>
          <div className="notebook-list">
            {progress.hypotheses.map((hypothesis) => (
              <article className={hypothesis.unlocked ? "known" : ""} key={hypothesis.id}>
                <strong>{hypothesis.unlocked ? hypothesis.label : "Conclusion verrouillee"}</strong>
                <span>{hypothesis.unlocked ? hypothesis.description : "Rassemble les objets lies a cette piste."}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="notebook-section" aria-label="Confiance des contacts">
          <div className="notebook-section-title">
            <Users size={15} />
            <span>Contacts</span>
            <CountBadge current={openContacts} total={progress.contacts.length} />
          </div>
          <div className="notebook-list">
            {progress.contacts.map((contact) => (
              <article className={contact.confidence !== "fermee" ? "known" : ""} key={contact.id}>
                <strong>{contact.label}</strong>
                <span>
                  Confiance {contact.confidence} - {contact.shownItems} preuve(s). {contact.prompt}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
