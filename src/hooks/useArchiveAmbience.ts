import { useCallback, useEffect, useRef, useState } from "react";
import archiveMusic from "../assets/music/Into-Oblivion(chosic.com).mp3";

const TARGET_VOLUME = 0.45;

type AudioWindow = Window & {
  __syrvaelArchiveAmbienceStop?: () => void;
};

function fadeAudio(audio: HTMLAudioElement, targetVolume: number, duration = 700) {
  const startVolume = audio.volume;
  const startTime = performance.now();

  function tick(now: number) {
    const progress = Math.min(1, (now - startTime) / duration);
    audio.volume = startVolume + (targetVolume - startVolume) * progress;

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    }
  }

  window.requestAnimationFrame(tick);
}

export function useArchiveAmbience(isArchiveChapterActive: boolean) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isAudible, setIsAudible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      setIsAudible(false);
      return;
    }

    fadeAudio(audio, 0, 450);
    window.setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
      setIsAudible(false);
    }, 480);
  }, []);

  const toggle = useCallback(() => {
    setIsEnabled((enabled) => !enabled);
  }, []);

  useEffect(() => {
    if (!isEnabled || !isArchiveChapterActive) {
      stop();
      return;
    }

    (window as AudioWindow).__syrvaelArchiveAmbienceStop?.();

    const audio = new Audio(archiveMusic);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;
    (window as AudioWindow).__syrvaelArchiveAmbienceStop = stop;

    void audio
      .play()
      .then(() => {
        setIsAudible(true);
        fadeAudio(audio, TARGET_VOLUME, 900);
      })
      .catch(() => {
        setIsEnabled(false);
        setIsAudible(false);
      });

    return () => {
      stop();
    };
  }, [isArchiveChapterActive, isEnabled, stop]);

  return {
    isAudible,
    isEnabled,
    toggle,
  };
}
