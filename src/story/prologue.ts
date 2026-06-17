export const storyContent = String.raw`
VAR trust = 0
-> start

=== start ===
~ trust = 0
# speaker:Archiviste
# scene:archive
La carte tremble sous la lumière des bougies. Les mers de Vylkraan, autrefois impossibles à franchir, sont devenues silencieuses.

# speaker:Archiviste
# scene:archive
Depuis la chute des barrières, Syrvaël n'est plus un ensemble de terres isolées. C'est une promesse ouverte, et une menace.

* [Observer Havrenoire]
  -> havrenoire
* [Consulter les récits draconiques]
  -> dragons
* [Suivre les rumeurs de Norathal]
  -> norathal

=== havrenoire ===
# speaker:Archiviste
# scene:havrenoire
Havrenoire se présente comme le coeur de la civilisation humaine. Ses routes, ses marchés et ses palais racontent une réussite éclatante.

# speaker:Archiviste
# scene:havrenoire
Mais sous les dorures, les conquêtes, les asservis de Valsaen et l'absence du roi laissent des fissures visibles.
~ trust = trust + 1
-> crossroads

=== dragons ===
# speaker:Archiviste
# scene:hrimgard
À Hrímgard, les dragons se souviennent. Leur mémoire n'a pas la douceur des chroniques humaines : elle garde les cendres, les serments et les rancunes.

# speaker:Archiviste
# scene:hrimgard
Les anciens protègent le dogme de Syrva. Les jeunes, eux, regardent l'ouverture du monde comme une chance.
~ trust = trust + 1
-> crossroads

=== norathal ===
# speaker:Archiviste
# scene:norathal
Dans les marges, le nom de Norathal revient comme une tache d'encre. Elfes de Silmëstel, sanguinaris, loups-garous : tous portent une part de cette ombre.

# speaker:Archiviste
# scene:norathal
Ce n'est pas seulement une menace. C'est une question : que deviennent ceux que l'ordre du monde a rejetés ?
~ trust = trust + 1
-> crossroads

=== crossroads ===
# speaker:Archiviste
# scene:archive
Tu as aperçu une première ligne de fracture. Le forum peut être raconté comme une traversée : chaque peuple croit survivre, mais chacun écrit aussi l'histoire des autres.

* [Revenir au début]
  -> start
* [Terminer cette introduction]
  -> ending

=== ending ===
# speaker:Archiviste
# scene:archive
Le codex reste ouvert à côté de toi. Pour transformer ces archives en Visual Novel, il faudra choisir un point de vue, puis décider quels secrets révéler en premier.
-> END
`;
