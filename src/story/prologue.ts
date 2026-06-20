export const prologueContent = String.raw`
VAR trust = 0
VAR chapter_1_started = false
VAR has_ruban = false
VAR has_sermon = false
VAR has_cierges = false
VAR has_sceau = false
VAR has_liste = false
VAR has_billet = false
VAR has_clef = false
VAR has_registre = false
VAR has_fragment = false

-> start

=== start ===
~ trust = 0
# speaker:Archiviste
# scene:archive
La carte tremble sous la lumiere des bougies. Les mers de Vylkraan, autrefois impossibles a franchir, sont devenues silencieuses.

# speaker:Archiviste
# scene:archive
Depuis la chute des barrieres, Syrvael n'est plus un ensemble de terres isolees. C'est une promesse ouverte, et une menace.

* [Observer Havrenoire]
  -> havrenoire_intro
* [Consulter les recits draconiques]
  -> dragons
* [Suivre les rumeurs de Norathal]
  -> norathal

=== havrenoire_intro ===
# speaker:Archiviste
# scene:havrenoire
Havrenoire se presente comme le coeur de la civilisation humaine. Ses routes, ses marches et ses palais racontent une reussite eclatante.

# speaker:Archiviste
# scene:havrenoire
Mais sous les dorures, les conquetes, les asservis de Valsaen et l'absence du roi laissent des fissures visibles.
~ trust = trust + 1
-> crossroads

=== dragons ===
# speaker:Archiviste
# scene:hrimgard
A Hrimgard, les dragons se souviennent. Leur memoire n'a pas la douceur des chroniques humaines : elle garde les cendres, les serments et les rancunes.

# speaker:Archiviste
# scene:hrimgard
Les anciens protegent le dogme de Syrva. Les jeunes, eux, regardent l'ouverture du monde comme une chance.
~ trust = trust + 1
-> crossroads

=== norathal ===
# speaker:Archiviste
# scene:norathal
Dans les marges, le nom de Norathal revient comme une tache d'encre. Elfes de Silmestel, sanguinaris, loups-garous : tous portent une part de cette ombre.

# speaker:Archiviste
# scene:norathal
Ce n'est pas seulement une menace. C'est une question : que deviennent ceux que l'ordre du monde a rejetes ?
~ trust = trust + 1
-> crossroads

=== crossroads ===
# speaker:Archiviste
# scene:archive
Tu as apercu une premiere ligne de fracture. Le forum peut etre raconte comme une traversee : chaque peuple croit survivre, mais chacun ecrit aussi l'histoire des autres.

* [Revenir au debut]
  -> start
* [Commencer le chapitre 1 : La mort du roi]
  -> chapter_1_arrival`;

