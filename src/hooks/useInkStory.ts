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

function createStory(source: string) {
  return new Compiler(source).Compile();
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
  const initialStory = useMemo(() => createStory(source), [source]);
  const [story, setStory] = useState(initialStory);
  const [lineId, setLineId] = useState(1);
  const [history, setHistory] = useState<NovelLine[]>(() => {
    const firstLine = pullNextLine(initialStory, 1);
    return firstLine ? [firstLine] : [];
  });

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
        setHistory((previous) => [...previous, nextLine]);
      }
    },
    [lineId],
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
    setStory(nextStory);
    setLineId(1);
    setHistory(firstLine ? [firstLine] : []);
  }, [source]);

  return {
    choices,
    currentLine,
    history,
    choose,
    continueStory,
    restart,
  };
}
