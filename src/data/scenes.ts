import archiveScene from "../assets/syrvael-archive-bg.png";
import archivistCharacter from "../assets/characters/archivist.png";
import archivistPortrait from "../assets/characters/archivist-portrait.png";
import cathedralScene from "../assets/scenes/scene-cathedral.png";
import grandMarketScene from "../assets/scenes/scene-grand-market.png";
import nobleDistrictScene from "../assets/scenes/scene-noble-district.png";
import royalPalaceScene from "../assets/scenes/scene-royal-palace.png";
import havrenoireScene from "../assets/scene-havrenoire.png";
import hrimgardScene from "../assets/scene-hrimgard.png";
import norathalScene from "../assets/scene-norathal.png";

export type SceneId =
  | "archive"
  | "cathedrale"
  | "cloitre"
  | "grand_marche"
  | "havrenoire"
  | "hotel_ambassades"
  | "palais_royal"
  | "porte_cendres"
  | "quartier_noble"
  | "rues_basses"
  | "taverne_cerf"
  | "hrimgard"
  | "norathal";

export type SceneDefinition = {
  accent: string;
  appOverlay: string;
  characterAlt?: string;
  characterImage?: string;
  portraitImage?: string;
  eyebrow: string;
  image: string;
  sceneOverlay: string;
  title: string;
};

export const scenes: Record<SceneId, SceneDefinition> = {
  archive: {
    accent: "#d9bd7a",
    characterAlt: "Archiviste mysterieux de Syrvael",
    characterImage: archivistCharacter,
    portraitImage: archivistPortrait,
    appOverlay:
      "radial-gradient(circle at 10% 0%, rgba(218, 52, 106, 0.2), transparent 30%), linear-gradient(90deg, rgba(10, 10, 18, 0.94), rgba(10, 10, 18, 0.52) 45%, rgba(10, 10, 18, 0.9))",
    eyebrow: "Archives de Syrvaël",
    image: archiveScene,
    sceneOverlay: "linear-gradient(rgba(19, 17, 28, 0.02), rgba(19, 17, 28, 0.62))",
    title: "Après la chute des barrières",
  },
  havrenoire: {
    accent: "#f0c46d",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(231, 176, 83, 0.22), transparent 34%), linear-gradient(90deg, rgba(20, 15, 13, 0.92), rgba(68, 42, 27, 0.42) 48%, rgba(18, 14, 16, 0.88))",
    eyebrow: "Havrenoire",
    image: havrenoireScene,
    sceneOverlay: "linear-gradient(rgba(77, 43, 24, 0.08), rgba(25, 15, 16, 0.58))",
    title: "La capitale aux murs d'or",
  },
  palais_royal: {
    accent: "#f0c46d",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(231, 176, 83, 0.22), transparent 34%), linear-gradient(90deg, rgba(20, 15, 13, 0.92), rgba(68, 42, 27, 0.42) 48%, rgba(18, 14, 16, 0.88))",
    eyebrow: "Palais royal",
    image: royalPalaceScene,
    sceneOverlay: "linear-gradient(rgba(40, 24, 18, 0.18), rgba(18, 11, 15, 0.7))",
    title: "Les portes fermees",
  },
  cathedrale: {
    accent: "#ead08c",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(235, 211, 141, 0.22), transparent 34%), linear-gradient(90deg, rgba(18, 13, 17, 0.94), rgba(73, 52, 35, 0.42) 48%, rgba(16, 12, 15, 0.9))",
    eyebrow: "Cathedrale de Syrva",
    image: cathedralScene,
    sceneOverlay: "linear-gradient(rgba(96, 74, 42, 0.1), rgba(17, 10, 14, 0.68))",
    title: "Les cloches etaient pretes",
  },
  cloitre: {
    accent: "#d9bd7a",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(217, 189, 122, 0.18), transparent 34%), linear-gradient(90deg, rgba(13, 13, 16, 0.94), rgba(47, 38, 31, 0.42) 48%, rgba(13, 10, 13, 0.9))",
    eyebrow: "Cloitre",
    image: havrenoireScene,
    sceneOverlay: "linear-gradient(rgba(35, 30, 22, 0.16), rgba(12, 9, 12, 0.7))",
    title: "La page dechiree",
  },
  quartier_noble: {
    accent: "#e0ad78",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(224, 173, 120, 0.22), transparent 34%), linear-gradient(90deg, rgba(24, 14, 16, 0.92), rgba(82, 45, 43, 0.42) 48%, rgba(18, 13, 16, 0.88))",
    eyebrow: "Quartier noble",
    image: nobleDistrictScene,
    sceneOverlay: "linear-gradient(rgba(96, 45, 35, 0.12), rgba(20, 12, 15, 0.62))",
    title: "Les carrosses sans armoiries",
  },
  hotel_ambassades: {
    accent: "#e9c07c",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(233, 192, 124, 0.2), transparent 34%), linear-gradient(90deg, rgba(18, 14, 16, 0.92), rgba(66, 42, 34, 0.4) 48%, rgba(15, 12, 15, 0.88))",
    eyebrow: "Hotel des Ambassades",
    image: havrenoireScene,
    sceneOverlay: "linear-gradient(rgba(63, 42, 31, 0.12), rgba(16, 10, 13, 0.66))",
    title: "La liste barree",
  },
  grand_marche: {
    accent: "#f0c46d",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(240, 196, 109, 0.2), transparent 34%), linear-gradient(90deg, rgba(24, 17, 12, 0.92), rgba(74, 45, 22, 0.38) 48%, rgba(16, 12, 12, 0.88))",
    eyebrow: "Grand marche",
    image: grandMarketScene,
    sceneOverlay: "linear-gradient(rgba(79, 47, 21, 0.1), rgba(20, 12, 10, 0.6))",
    title: "Les cierges noirs",
  },
  rues_basses: {
    accent: "#c98f64",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(201, 143, 100, 0.18), transparent 34%), linear-gradient(90deg, rgba(17, 13, 12, 0.94), rgba(43, 29, 24, 0.44) 48%, rgba(15, 11, 12, 0.9))",
    eyebrow: "Rues basses",
    image: havrenoireScene,
    sceneOverlay: "linear-gradient(rgba(45, 31, 24, 0.18), rgba(12, 9, 10, 0.7))",
    title: "Les temoins parlent bas",
  },
  taverne_cerf: {
    accent: "#d8a15f",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(216, 161, 95, 0.2), transparent 34%), linear-gradient(90deg, rgba(22, 13, 9, 0.94), rgba(67, 38, 20, 0.42) 48%, rgba(16, 10, 10, 0.9))",
    eyebrow: "Taverne du Cerf",
    image: havrenoireScene,
    sceneOverlay: "linear-gradient(rgba(72, 39, 18, 0.14), rgba(15, 8, 8, 0.68))",
    title: "Un billet dans le vin",
  },
  porte_cendres: {
    accent: "#d4a06f",
    appOverlay:
      "radial-gradient(circle at 18% 0%, rgba(212, 160, 111, 0.18), transparent 34%), linear-gradient(90deg, rgba(18, 14, 13, 0.94), rgba(49, 37, 32, 0.44) 48%, rgba(13, 11, 12, 0.9))",
    eyebrow: "Porte des Cendres",
    image: havrenoireScene,
    sceneOverlay: "linear-gradient(rgba(43, 35, 31, 0.18), rgba(10, 8, 9, 0.72))",
    title: "Le registre nocturne",
  },
  hrimgard: {
    accent: "#b9ddff",
    appOverlay:
      "radial-gradient(circle at 16% 0%, rgba(154, 207, 255, 0.22), transparent 34%), linear-gradient(90deg, rgba(7, 15, 29, 0.92), rgba(35, 74, 105, 0.34) 48%, rgba(8, 13, 26, 0.9))",
    eyebrow: "Hrímgard",
    image: hrimgardScene,
    sceneOverlay: "linear-gradient(rgba(173, 217, 255, 0.08), rgba(8, 18, 36, 0.58))",
    title: "La mémoire des dragons",
  },
  norathal: {
    accent: "#d46f77",
    appOverlay:
      "radial-gradient(circle at 14% 0%, rgba(142, 25, 43, 0.28), transparent 34%), linear-gradient(90deg, rgba(5, 15, 12, 0.95), rgba(19, 54, 39, 0.36) 48%, rgba(15, 8, 13, 0.92))",
    eyebrow: "Silmëstel",
    image: norathalScene,
    sceneOverlay: "linear-gradient(rgba(5, 25, 17, 0.12), rgba(13, 4, 10, 0.68))",
    title: "Le sanctuaire de Norathal",
  },
};

export function getScene(sceneId?: string) {
  return scenes[(sceneId as SceneId) || "archive"] ?? scenes.archive;
}
