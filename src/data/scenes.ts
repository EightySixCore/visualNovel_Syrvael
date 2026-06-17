import archiveScene from "../assets/syrvael-archive-bg.png";
import havrenoireScene from "../assets/scene-havrenoire.png";
import hrimgardScene from "../assets/scene-hrimgard.png";
import norathalScene from "../assets/scene-norathal.png";

export type SceneId = "archive" | "havrenoire" | "hrimgard" | "norathal";

export type SceneDefinition = {
  accent: string;
  appOverlay: string;
  eyebrow: string;
  image: string;
  sceneOverlay: string;
  title: string;
};

export const scenes: Record<SceneId, SceneDefinition> = {
  archive: {
    accent: "#d9bd7a",
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
