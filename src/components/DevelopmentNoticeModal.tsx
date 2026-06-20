import { useState } from "react";

const NOTICE_KEY = "syrvael-development-notice-seen";

function hasSeenNotice() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.localStorage.getItem(NOTICE_KEY) === "true";
}

export function DevelopmentNoticeModal() {
  const [isOpen, setIsOpen] = useState(() => !hasSeenNotice());

  function closeNotice() {
    window.localStorage.setItem(NOTICE_KEY, "true");
    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="development-modal-backdrop" role="presentation">
      <section
        aria-labelledby="development-modal-title"
        aria-modal="true"
        className="development-modal"
        role="dialog"
      >
        <p className="development-modal-kicker">Information projet</p>
        <h2 id="development-modal-title">Prototype en developpement</h2>
        <ul>
          <li>Le jeu est actuellement en cours de developpement.</li>
          <li>Le lore et l'histoire appartiennent a Syrvael.</li>
          <li>
            L'IA a ete utilisee pour generer des images dans le cadre du developpement du projet, en attendant une
            validation artistique ulterieure.
          </li>
        </ul>
        <button type="button" onClick={closeNotice}>
          J'ai compris
        </button>
      </section>
    </div>
  );
}
