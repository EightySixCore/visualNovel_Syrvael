import { type CSSProperties, useMemo, useState } from "react";
import { BookOpen, RotateCcw, ScrollText } from "lucide-react";
import { CodexPanel } from "./components/CodexPanel";
import { NovelStage } from "./components/NovelStage";
import { useInkStory } from "./hooks/useInkStory";
import { loreEntries } from "./data/loreEntries";
import { getScene } from "./data/scenes";
import { storyContent } from "./story/prologue";

type ViewMode = "novel" | "codex";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("novel");
  const story = useMemo(() => storyContent, []);
  const ink = useInkStory(story);
  const activeScene = getScene(viewMode === "novel" ? ink.currentLine?.scene : "archive");

  return (
    <main
      className="app-shell"
      style={
        {
          "--app-accent": activeScene.accent,
          "--app-bg": `url(${activeScene.image})`,
          "--app-overlay": activeScene.appOverlay,
        } as CSSProperties
      }
    >
      <header className="topbar">
        <div className="brand-block">
          <p className="kicker">Syrvael</p>
          <h1>Chroniques d'un monde rouvert</h1>
        </div>
        <nav className="mode-switch" aria-label="Changer de vue">
          <button
            className={viewMode === "novel" ? "active" : ""}
            type="button"
            onClick={() => setViewMode("novel")}
            title="Visual Novel"
          >
            <ScrollText size={18} />
            <span>Novel</span>
          </button>
          <button
            className={viewMode === "codex" ? "active" : ""}
            type="button"
            onClick={() => setViewMode("codex")}
            title="Codex"
          >
            <BookOpen size={18} />
            <span>Codex</span>
          </button>
          <button type="button" onClick={ink.restart} title="Recommencer">
            <RotateCcw size={18} />
          </button>
        </nav>
      </header>

      {viewMode === "novel" ? (
        <NovelStage
          choices={ink.choices}
          currentLine={ink.currentLine}
          history={ink.history}
          onChoose={ink.choose}
          onContinue={ink.continueStory}
        />
      ) : (
        <CodexPanel entries={loreEntries} />
      )}
    </main>
  );
}
