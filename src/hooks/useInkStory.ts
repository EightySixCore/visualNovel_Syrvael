import { useCallback, useMemo, useState } from "react";
import { Compiler } from "inkjs/compiler/Compiler";
import { Story } from "inkjs/engine/Story";

export type NovelLine = {
  id: number;
  scene: string;
  speaker: string;
  text: string;
};

export type NovelChoice = {
  index: number;
  text: string;
};

export type StoryVariableValue = boolean | number | string | null;

export type StoryVariables = Record<string, StoryVariableValue>;

type StoredStoryState = {
  history: NovelLine[];
  lineId: number;
  sourceKey: string;
  storyState: string;
};

const SAVE_KEY = "syrvael-story-save";

const trackedVariables = [
  "trust",
  "chapter_1_started",
  "has_ruban",
  "has_sermon",
  "has_cierges",
  "has_sceau",
  "has_liste",
  "has_billet",
  "has_clef",
  "has_registre",
  "has_fragment",
] as const;

function createStory(source: string) {
  return new Compiler(source).Compile();
}

function createSourceKey(source: string) {
  return `${source.length}:${source.slice(0, 80)}`;
}

function readStoredState(source: string): StoredStoryState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSave = window.localStorage.getItem(SAVE_KEY);
  if (!rawSave) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawSave) as StoredStoryState;
    return parsed.sourceKey === createSourceKey(source) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStoredState(source: string, story: Story, lineId: number, history: NovelLine[]) {
  if (typeof window === "undefined") {
    return;
  }

  const saveState: StoredStoryState = {
    history,
    lineId,
    sourceKey: createSourceKey(source),
    storyState: story.state.ToJson(),
  };

  window.localStorage.setItem(SAVE_KEY, JSON.stringify(saveState));
}

function readVariables(story: Story): StoryVariables {
  return Object.fromEntries(
    trackedVariables.map((variableName) => {
      const value = story.variablesState.$(variableName);
      return [variableName, typeof value === "boolean" || typeof value === "number" || typeof value === "string" ? value : null];
    }),
  );
}

function readSpeaker(tags: string[]) {
  const speakerTag = tags.find((tag) => tag.startsWith("speaker:"));
  return speakerTag?.replace("speaker:", "").trim() || "Narration";
}

function readScene(tags: string[]) {
  const sceneTag = tags.find((tag) => tag.startsWith("scene:"));
  return sceneTag?.replace("scene:", "").trim() || "archive";
}

function pullNextLine(story: Story, id: number): NovelLine | null {
  if (!story.canContinue) {
    return null;
  }

  const text = (story.Continue() ?? "").trim();
  if (!text) {
    return pullNextLine(story, id);
  }

  const tags = story.currentTags ?? [];

  return {
    id,
    scene: readScene(tags),
    speaker: readSpeaker(tags),
    text,
  };
}

export function useInkStory(source: string) {
  const initialState = useMemo(() => {
    const nextStory = createStory(source);
    const storedState = readStoredState(source);

    if (storedState) {
      nextStory.state.LoadJson(storedState.storyState);
      return {
        history: storedState.history,
        lineId: storedState.lineId,
        story: nextStory,
        variables: readVariables(nextStory),
      };
    }

    const firstLine = pullNextLine(nextStory, 1);
    return {
      history: firstLine ? [firstLine] : [],
      lineId: 1,
      story: nextStory,
      variables: readVariables(nextStory),
    };
  }, [source]);
  const [story, setStory] = useState(initialState.story);
  const [lineId, setLineId] = useState(initialState.lineId);
  const [history, setHistory] = useState<NovelLine[]>(initialState.history);
  const [variables, setVariables] = useState<StoryVariables>(initialState.variables);

  const currentLine = history.at(-1) ?? null;
  const choices: NovelChoice[] = story.currentChoices.map((choice, index) => ({
    index,
    text: choice.text,
  }));

  const pushNextLine = useCallback(
    (nextStory: Story) => {
      const nextId = lineId + 1;
      const nextLine = pullNextLine(nextStory, nextId);

      if (nextLine) {
        setLineId(nextId);
        setVariables(readVariables(nextStory));
        setHistory((previous) => {
          const nextHistory = [...previous, nextLine];
          writeStoredState(source, nextStory, nextId, nextHistory);
          return nextHistory;
        });
      }
    },
    [lineId, source],
  );

  const continueStory = useCallback(() => {
    pushNextLine(story);
  }, [pushNextLine, story]);

  const choose = useCallback(
    (choiceIndex: number) => {
      story.ChooseChoiceIndex(choiceIndex);
      pushNextLine(story);
    },
    [pushNextLine, story],
  );

  const restart = useCallback(() => {
    const nextStory = createStory(source);
    const firstLine = pullNextLine(nextStory, 1);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SAVE_KEY);
    }
    setStory(nextStory);
    setLineId(1);
    setHistory(firstLine ? [firstLine] : []);
    setVariables(readVariables(nextStory));
  }, [source]);

  return {
    choices,
    currentLine,
    history,
    variables,
    choose,
    continueStory,
    restart,
  };
}
