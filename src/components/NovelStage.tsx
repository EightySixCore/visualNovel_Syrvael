import type { NovelChoice, NovelLine } from "../hooks/useInkStory";
import type { CSSProperties } from "react";
import { getScene } from "../data/scenes";

type NovelStageProps = {
  choices: NovelChoice[];
  currentLine: NovelLine | null;
  history: NovelLine[];
  onChoose: (choiceIndex: number) => void;
  onContinue: () => void;
};

export function NovelStage({ choices, currentLine, history, onChoose, onContinue }: NovelStageProps) {
  const canContinue = choices.length === 0 && currentLine !== null;
  const scene = getScene(currentLine?.scene);

  return (
    <section className="novel-layout" aria-label="Visual Novel">
      <div
        className="scene-frame"
        style={
          {
            "--scene-bg": `url(${scene.image})`,
            "--scene-overlay": scene.sceneOverlay,
          } as CSSProperties
        }
      >
        <div className="skyline" />
        <div className="location-badge">{scene.eyebrow}</div>
        <div className="scene-copy">
          <p>{scene.eyebrow}</p>
          <h2>{scene.title}</h2>
        </div>
      </div>

      <aside className="history-panel" aria-label="Historique du dialogue">
        {history.slice(-5).map((line) => (
          <article key={line.id}>
            <span>{line.speaker}</span>
            <p>{line.text}</p>
          </article>
        ))}
      </aside>

      <div className="dialogue-box">
        <div className="speaker-name">{currentLine?.speaker ?? "Narration"}</div>
        <p>{currentLine?.text ?? "Le récit est terminé."}</p>

        {choices.length > 0 ? (
          <div className="choice-list">
            {choices.map((choice) => (
              <button key={choice.index} type="button" onClick={() => onChoose(choice.index)}>
                {choice.text}
              </button>
            ))}
          </div>
        ) : (
          <button className="continue-button" type="button" onClick={onContinue} disabled={!canContinue}>
            Continuer
          </button>
        )}
      </div>
    </section>
  );
}
