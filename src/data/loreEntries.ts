import analysis from "../../docs/Syrvael_Lore/00_Analyse_Visual_Novel.md?raw";
import context from "../../docs/Syrvael_Lore/01_Contexte_Global.md?raw";
import races from "../../docs/Syrvael_Lore/02_Races_Principales.md?raw";
import religions from "../../docs/Syrvael_Lore/03_Religions_et_Dieux.md?raw";
import places from "../../docs/Syrvael_Lore/04_Lieu.md?raw";

export type LoreEntry = {
  id: string;
  title: string;
  source: string;
  content: string;
};

export const loreEntries: LoreEntry[] = [
  {
    id: "analysis",
    title: "Analyse Visual Novel",
    source: "00_Analyse_Visual_Novel.md",
    content: analysis,
  },
  {
    id: "context",
    title: "Contexte global",
    source: "01_Contexte_Global.md",
    content: context,
  },
  {
    id: "races",
    title: "Races principales",
    source: "02_Races_Principales.md",
    content: races,
  },
  {
    id: "religions",
    title: "Religions et dieux",
    source: "03_Religions_et_Dieux.md",
    content: religions,
  },
  {
    id: "places",
    title: "Lieux et factions",
    source: "04_Lieu.md",
    content: places,
  },
];
