import type { CSSProperties } from "react";
import type { NovelChoice, NovelLine } from "../hooks/useInkStory";
import { useState } from "react";
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const scene = getScene(currentLine?.scene);
  const archiveScene = getScene("archive");
  const speakerName = currentLine?.speaker ?? "Narration";
  const speakerPortrait = speakerName === "Archiviste" ? archiveScene.portraitImage : scene.portraitImage;

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
        <div className="frame-corner frame-corner-tl" />
        <div className="frame-corner frame-corner-tr" />
        <div className="frame-corner frame-corner-bl" />
        <div className="frame-corner frame-corner-br" />
        <div className="skyline" />
        {scene.characterImage ? (
          <img
            className="scene-character"
            src={scene.characterImage}
            alt={scene.characterAlt ?? ""}
            loading="eager"
            decoding="sync"
          />
        ) : null}
        <div className="location-badge">{scene.eyebrow}</div>
        <button
          className="history-toggle"
          type="button"
          aria-expanded={isHistoryOpen}
          aria-controls="history-drawer"
          onClick={() => setIsHistoryOpen((open) => !open)}
        >
          Journal
        </button>
        <div className="scene-copy">
          <p>{scene.eyebrow}</p>
          <h2>{scene.title}</h2>
        </div>

        <aside
          className={`history-panel ${isHistoryOpen ? "open" : ""}`}
          id="history-drawer"
          aria-label="Historique du dialogue"
        >
          <div className="panel-title">Journal</div>
          {history.slice(-6).map((line) => (
            <article key={line.id}>
              <span>{line.speaker}</span>
              <p>{line.text}</p>
            </article>
          ))}
        </aside>
      </div>

      <div className={`dialogue-box ${speakerPortrait ? "with-portrait" : ""}`}>
        <div className="dialogue-ornament" />
        <div className="speaker-name">{speakerName}</div>
        <div className="dialogue-main">
          {speakerPortrait ? (
            <div className="speaker-portrait" aria-hidden="true">
              <img src={speakerPortrait} alt="" />
            </div>
          ) : null}

          <div className="dialogue-content">
            <p>{currentLine?.text ?? "Le recit est termine."}</p>

            {choices.length > 0 ? (
              <div className="choice-list">
                {choices.map((choice, index) => (
                  <button key={choice.index} type="button" onClick={() => onChoose(choice.index)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
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
        </div>
      </div>
    </section>
  );
}
