import archivistPortrait from "../assets/characters/archivist-portrait.png";
import archivistSprite from "../assets/characters/archivist.png";
import drunkenMessengerPortrait from "../assets/characters/drunken-messenger.png";
import drunkenMessengerSprite from "../assets/characters/drunken-messenger-sprite.png";
import nobleCoachmanPortrait from "../assets/characters/noble-coachman.png";
import nobleCoachmanSprite from "../assets/characters/noble-coachman-sprite.png";
import sisterMaelianePortrait from "../assets/characters/sister-maeliane.png";
import sisterMaelianeSprite from "../assets/characters/sister-maeliane-sprite.png";
import woundedServantPortrait from "../assets/characters/wounded-servant.png";
import woundedServantSprite from "../assets/characters/wounded-servant-sprite.png";

export const speakerPortraits: Record<string, string> = {
  Archiviste: archivistPortrait,
  "Cocher noble": nobleCoachmanPortrait,
  "Messager ivre": drunkenMessengerPortrait,
  "Serviteur blesse": woundedServantPortrait,
  "Soeur Maeliane": sisterMaelianePortrait,
};

export const speakerSprites: Record<string, string> = {
  Archiviste: archivistSprite,
  "Cocher noble": nobleCoachmanSprite,
  "Messager ivre": drunkenMessengerSprite,
  "Serviteur blesse": woundedServantSprite,
  "Soeur Maeliane": sisterMaelianeSprite,
};

export function getSpeakerPortrait(speaker?: string) {
  if (!speaker) {
    return undefined;
  }

  return speakerPortraits[speaker];
}

export function getSpeakerSprite(speaker?: string) {
  if (!speaker) {
    return undefined;
  }

  return speakerSprites[speaker];
}
