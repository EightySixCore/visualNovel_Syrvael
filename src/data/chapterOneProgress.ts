import type { NovelLine, StoryVariables } from "../hooks/useInkStory";
import type { SceneId } from "./scenes";

export type InvestigationLocation = {
  id: SceneId;
  label: string;
  shortLabel: string;
  mapX: number;
  mapY: number;
  unlockHint?: string;
  requiredItem?: string;
};

export type InvestigationItem = {
  id: string;
  variable: string;
  label: string;
  location: SceneId;
  npc: string;
  description: string;
};

export type InvestigationClue = {
  id: string;
  variables: string[];
  label: string;
  description: string;
};

export type InvestigationHypothesis = {
  id: string;
  variables: string[];
  label: string;
  description: string;
};

export type InvestigationContact = {
  id: string;
  itemVariables: string[];
  label: string;
  location: SceneId;
  prompt: string;
};

export type ContactConfidence = "fermee" | "prudente" | "ouverte";

export type ChapterOneProgress = {
  chapterStarted: boolean;
  clues: Array<InvestigationClue & { discovered: boolean }>;
  contacts: Array<InvestigationContact & { confidence: ContactConfidence; shownItems: number }>;
  hypotheses: Array<InvestigationHypothesis & { unlocked: boolean }>;
  items: Array<InvestigationItem & { acquired: boolean }>;
  locations: Array<
    InvestigationLocation & { accessible: boolean; current: boolean; hasPendingItem: boolean; visited: boolean }
  >;
  objective: string;
};

export const investigationLocations: InvestigationLocation[] = [
  { id: "havrenoire", label: "Grand Parvis du Deuil", shortLabel: "Parvis", mapX: 50, mapY: 42 },
  { id: "cathedrale", label: "Cathedrale de Syrva", shortLabel: "Cathedrale", mapX: 50, mapY: 16 },
  {
    id: "cloitre",
    label: "Cloitre",
    shortLabel: "Cloitre",
    mapX: 70,
    mapY: 16,
    requiredItem: "has_ruban",
    unlockHint: "Ruban d'office requis",
  },
  { id: "quartier_noble", label: "Quartier Noble", shortLabel: "Nobles", mapX: 21, mapY: 42 },
  {
    id: "hotel_ambassades",
    label: "Hotel des Ambassades",
    shortLabel: "Ambassades",
    mapX: 18,
    mapY: 17,
    requiredItem: "has_sceau",
    unlockHint: "Sceau Veyrane requis",
  },
  { id: "taverne_cerf", label: "Taverne du Cerf", shortLabel: "Taverne", mapX: 18, mapY: 68 },
  { id: "grand_marche", label: "Grand Marche", shortLabel: "Marche", mapX: 50, mapY: 68 },
  { id: "rues_basses", label: "Rues Basses", shortLabel: "Rues", mapX: 34, mapY: 86 },
  { id: "palais_royal", label: "Palais Royal", shortLabel: "Palais", mapX: 82, mapY: 42 },
  {
    id: "porte_cendres",
    label: "Porte des Cendres",
    shortLabel: "Porte",
    mapX: 82,
    mapY: 70,
    requiredItem: "has_clef",
    unlockHint: "Clef de service requise",
  },
  { id: "archive", label: "Ancienne Archive", shortLabel: "Archive", mapX: 66, mapY: 86 },
];

export const investigationItems: InvestigationItem[] = [
  {
    id: "ruban",
    variable: "has_ruban",
    label: "Ruban d'office",
    location: "cathedrale",
    npc: "Soeur Maeliane",
    description: "Preuve que le deuil royal etait prepare avant la foule.",
  },
  {
    id: "sermon",
    variable: "has_sermon",
    label: "Sermon au passe",
    location: "cloitre",
    npc: "Novice inquiet",
    description: "Une page deja seche parlant du roi comme d'un mort.",
  },
  {
    id: "cierges",
    variable: "has_cierges",
    label: "Recu de cierges noirs",
    location: "grand_marche",
    npc: "Marchande de cierges",
    description: "Commande passee avant l'annonce officielle.",
  },
  {
    id: "sceau",
    variable: "has_sceau",
    label: "Sceau Veyrane brise",
    location: "quartier_noble",
    npc: "Cocher noble",
    description: "Trace d'une reunion noble tenue trop tot.",
  },
  {
    id: "liste",
    variable: "has_liste",
    label: "Liste du salon noir",
    location: "hotel_ambassades",
    npc: "Intendante Ysilde",
    description: "Noms rayes puis recopies pour une succession officieuse.",
  },
  {
    id: "billet",
    variable: "has_billet",
    label: "Billet froisse",
    location: "taverne_cerf",
    npc: "Messager ivre",
    description: "Mentionne une succession provisoire avant l'annonce.",
  },
  {
    id: "clef",
    variable: "has_clef",
    label: "Clef de service",
    location: "palais_royal",
    npc: "Serviteur blesse",
    description: "Ouvre la piste des galeries et des temoins deplaces.",
  },
  {
    id: "registre",
    variable: "has_registre",
    label: "Registre nocturne",
    location: "porte_cendres",
    npc: "Capitaine de garde",
    description: "Trois serviteurs et un coffre ont quitte la ville avant l'aube.",
  },
  {
    id: "annonce",
    variable: "has_fragment",
    label: "Copie de l'annonce",
    location: "havrenoire",
    npc: "Crieur royal",
    description: "Le sceau officiel semble avoir seche avant le texte.",
  },
];

export const investigationClues: InvestigationClue[] = [
  {
    id: "eglise",
    variables: ["has_sermon", "has_cierges"],
    label: "L'Eglise savait avant l'annonce",
    description: "Sermon et cierges forment une preparation liturgique impossible a improviser.",
  },
  {
    id: "nobles",
    variables: ["has_liste", "has_billet"],
    label: "Les nobles preparent une succession secrete",
    description: "Le salon noir relie les maisons nobles a une succession provisoire.",
  },
  {
    id: "palais",
    variables: ["has_clef", "has_registre"],
    label: "Le palais a deplace des temoins",
    description: "La clef et le registre indiquent une evacuation avant la version officielle.",
  },
];

export const investigationHypotheses: InvestigationHypothesis[] = [
  {
    id: "church",
    variables: ["has_sermon", "has_cierges"],
    label: "Conclure sur l'Eglise",
    description: "L'autel a parle avant les cloches.",
  },
  {
    id: "nobles",
    variables: ["has_liste", "has_billet"],
    label: "Conclure sur les nobles",
    description: "La couronne a deja un successeur officieux.",
  },
  {
    id: "palace",
    variables: ["has_clef", "has_registre"],
    label: "Conclure sur le palais",
    description: "Le silence le plus grave vient des temoins effaces.",
  },
];

export const investigationContacts: InvestigationContact[] = [
  {
    id: "maeliane",
    itemVariables: ["has_ruban", "has_sermon", "has_cierges"],
    label: "Soeur Maeliane",
    location: "cathedrale",
    prompt: "Lui opposer les traces de preparation liturgique.",
  },
  {
    id: "cocher",
    itemVariables: ["has_sceau", "has_liste", "has_billet"],
    label: "Cocher noble",
    location: "quartier_noble",
    prompt: "Faire pression avec les preuves du salon noir.",
  },
  {
    id: "messager",
    itemVariables: ["has_liste", "has_billet"],
    label: "Messager ivre",
    location: "taverne_cerf",
    prompt: "Comparer son billet aux noms recopies.",
  },
  {
    id: "serviteur",
    itemVariables: ["has_clef", "has_registre", "has_fragment"],
    label: "Serviteur blesse",
    location: "palais_royal",
    prompt: "Le rassurer avec les traces de sortie du palais.",
  },
];

function hasVariable(variables: StoryVariables, variableName?: string) {
  return variableName ? variables[variableName] === true : true;
}

function hasAllVariables(variables: StoryVariables, variableNames: string[]) {
  return variableNames.every((variableName) => variables[variableName] === true);
}

export function buildChapterOneProgress(
  variables: StoryVariables,
  history: NovelLine[],
  currentScene?: string,
): ChapterOneProgress {
  const visitedScenes = new Set(history.map((line) => line.scene));
  const items = investigationItems.map((item) => ({
    ...item,
    acquired: variables[item.variable] === true,
  }));

  const locations = investigationLocations.map((location) => {
    const locationItems = items.filter((item) => item.location === location.id);
    return {
      ...location,
      accessible: hasVariable(variables, location.requiredItem),
      current: location.id === currentScene,
      hasPendingItem: locationItems.some((item) => !item.acquired),
      visited: visitedScenes.has(location.id),
    };
  });

  const clues = investigationClues.map((clue) => ({
    ...clue,
    discovered: hasAllVariables(variables, clue.variables),
  }));

  const hypotheses = investigationHypotheses.map((hypothesis) => ({
    ...hypothesis,
    unlocked: hasAllVariables(variables, hypothesis.variables),
  }));

  const contacts = investigationContacts.map((contact) => {
    const shownItems = contact.itemVariables.filter((variableName) => variables[variableName] === true).length;
    const confidence: ContactConfidence = shownItems >= 2 ? "ouverte" : shownItems === 1 ? "prudente" : "fermee";

    return {
      ...contact,
      confidence,
      shownItems,
    };
  });

  const objective =
    hypotheses.some((hypothesis) => hypothesis.unlocked)
      ? "Retourne a l'Ancienne Archive pour poser une conclusion."
      : "Recoupe assez d'indices avant de conclure sur la mort du roi.";

  return {
    chapterStarted: variables.chapter_1_started === true,
    clues,
    contacts,
    hypotheses,
    items,
    locations,
    objective,
  };
}
