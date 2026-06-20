# Chapitre 1 - La mort du roi

Document de conception interne. Ne pas importer dans le Codex.

## Intention

Le protagoniste est teleporte par l'Archiviste a Havrenoire le jour ou la mort du roi est annoncee. Le joueur explore la capitale, collecte des preuves et fait des allers-retours entre les lieux pour comprendre quelles factions avaient deja commence a agir avant l'annonce officielle.

## Map ASCII

```txt
                              [PALAIS ROYAL]
                               PNJ : Serviteur blesse
                               Item : Clef des galeries de service
                               Item : Fragment d'annonce royale
                                      |
                                      |
                         [GRAND PARVIS DU DEUIL]
                          PNJ : Heraut fatigue
                          Item : Fragment d'annonce royale
                         /             |              \
                        /              |               \
                       /               |                \
          [CATHEDRALE]          [PLACE DES HERAUTS]       [QUARTIER NOBLE]
           PNJ : Soeur Maeliane  PNJ : Crieur royal         PNJ : Cocher noble
           Item : Ruban          Item : Copie scellee       Item : Sceau brise
                  funeraire             de l'annonce               de la Maison Veyrane
                  consacre
                 |                       |                         |
                 |                       |                         |
          [CLOITRE]              [GRAND MARCHE]          [HOTEL DES AMBASSADES]
           PNJ : Novice inquiet   PNJ : Marchande         PNJ : Intendante Ysilde
           Item : Page de                de cierges        Item : Liste de convives
                  sermon dechiree Item : Recu de                  barree
                                          commande de
                                          cierges noirs
                                         |
                                         |
                                  [RUES BASSES]
                                   PNJ : Enfant des rues
                                   Item : Rumeur des domestiques
                                  /              \
                                 /                \
                  [TAVERNE DU CERF]          [PORTE DES CENDRES]
                   PNJ : Messager ivre        PNJ : Capitaine de garde
                   Item : Billet froisse      Item : Registre des sorties
                          d'une reunion              nocturnes
                          noble
                         |
                         |
                  [ANCIENNE ARCHIVE]
                   PNJ : Echo de l'Archiviste
                   Item : Synthese des preuves
```

## Pistes D'Enquete

### Piste Eglise

L'Eglise semblait preparee avant l'annonce officielle.

Objets principaux :

- Ruban funeraire consacre
- Page de sermon dechiree
- Recu de commande de cierges noirs

Boucle possible :

```txt
Cathedrale -> Cloitre -> Grand Marche -> Ancienne Archive
```

La Soeur Maeliane laisse entrevoir que les rites etaient deja prets. Le Novice inquiet confirme qu'un sermon existait avant les cloches. La Marchande de cierges prouve qu'une commande massive a ete passee trop tot.

### Piste Nobles

Les nobles preparent deja une succession secrete.

Objets principaux :

- Sceau brise de la Maison Veyrane
- Liste de convives barree
- Billet froisse d'une reunion noble

Boucle possible :

```txt
Quartier Noble -> Hotel des Ambassades -> Taverne du Cerf -> Ancienne Archive
```

Le Cocher noble donne un sceau perdu dans la confusion. L'Intendante Ysilde reconnait la maison impliquee. Le Messager ivre possede un billet qui confirme une reunion de succession.

### Piste Palais

Certains serviteurs du palais ont disparu dans la nuit.

Objets principaux :

- Clef des galeries de service
- Registre des sorties nocturnes
- Fragment d'annonce royale

Boucle possible :

```txt
Palais Royal -> Porte des Cendres -> Place des Herauts -> Ancienne Archive
```

Le Serviteur blesse parle d'un passage par les galeries. Le Capitaine de garde confirme une sortie avant la fermeture de la ville. La copie scellee de l'annonce permet de comparer les horaires officiels sans accuser directement le Conseil.

## Role De L'Ancienne Archive

L'Ancienne Archive sert de point de consolidation. Le joueur peut y revenir quand il possede assez d'indices. L'Archiviste ne donne pas la solution, mais reformule les preuves et propose une conclusion de chapitre.

Choix final possible :

```txt
1. L'Eglise. Son silence etait pret avant les cloches.
2. Les nobles. Ils avaient deja choisi leurs alliances.
3. Le palais. Quelqu'un a efface les temoins de la nuit.
```

## Notes De Progression

Les objets doivent etre sauvegardes dans la progression du joueur. Pour le prototype navigateur, `localStorage` suffit.

Etat minimal a conserver :

```ts
type SaveState = {
  chapter: "chapter_1";
  currentLocation: string;
  inventory: string[];
  flags: Record<string, boolean>;
  visitedLocations: string[];
};
```
