import type { CSSProperties } from "react";
import type { ChapterOneProgress } from "../data/chapterOneProgress";
import type { NovelChoice, NovelLine } from "../hooks/useInkStory";
import { useEffect, useState } from "react";
import { ArchiveNotebook } from "./ArchiveNotebook";
import { getScene } from "../data/scenes";
import { getSpeakerPortrait, getSpeakerSprite } from "../data/speakers";

type NovelStageProps = {
  chapterOneProgress: ChapterOneProgress;
  choices: NovelChoice[];
  currentLine: NovelLine | null;
  history: NovelLine[];
  onChoose: (choiceIndex: number) => void;
  onContinue: () => void;
};

export function NovelStage({ chapterOneProgress, choices, currentLine, history, onChoose, onContinue }: NovelStageProps) {
  const canContinue = choices.length === 0 && currentLine !== null;
  const [isSceneChanging, setIsSceneChanging] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSceneTitleVisible, setIsSceneTitleVisible] = useState(true);
  const scene = getScene(currentLine?.scene);
  const speakerName = currentLine?.speaker ?? "Narration";
  const speakerPortrait = getSpeakerPortrait(speakerName) ?? scene.portraitImage;
  const dedicatedSpeakerSprite = getSpeakerSprite(speakerName);
  const speakerSprite = dedicatedSpeakerSprite ?? scene.characterImage;
  const isNpcSprite = Boolean(dedicatedSpeakerSprite && speakerName !== "Archiviste");

  useEffect(() => {
    setIsSceneChanging(true);
    setIsSceneTitleVisible(true);
    const transitionTimer = window.setTimeout(() => setIsSceneChanging(false), 520);
    const timer = window.setTimeout(() => setIsSceneTitleVisible(false), 7500);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(transitionTimer);
    };
  }, [scene.title]);

  return (
    <section className="novel-layout" aria-label="Visual Novel">
      <div
        className={`scene-frame ${isSceneChanging ? "changing" : ""}`}
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
        {speakerSprite ? (
          <img
            className={`scene-character ${isNpcSprite ? "scene-character-npc" : ""}`}
            src={speakerSprite}
            alt={speakerName !== "Narration" ? speakerName : scene.characterAlt ?? ""}
            loading="eager"
            decoding="sync"
          />
        ) : null}
        <div className="location-badge">{scene.eyebrow}</div>
        <button
          className="notebook-toggle"
          type="button"
          aria-expanded={isNotebookOpen}
          aria-controls="archive-notebook"
          onClick={() => setIsNotebookOpen((open) => !open)}
        >
          Carnet
        </button>
        <button
          className="history-toggle"
          type="button"
          aria-expanded={isHistoryOpen}
          aria-controls="history-drawer"
          onClick={() => setIsHistoryOpen((open) => !open)}
        >
          Journal
        </button>
        <div className={`scene-copy ${isSceneTitleVisible ? "visible" : "hidden"}`}>
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

        <aside
          className={`notebook-panel ${isNotebookOpen ? "open" : ""}`}
          id="archive-notebook"
          aria-label="Carnet d'Archiviste"
        >
          <ArchiveNotebook progress={chapterOneProgress} />
        </aside>

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
      </div>
    </section>
  );
}
