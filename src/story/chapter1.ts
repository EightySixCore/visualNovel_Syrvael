export const chapterOneContent = String.raw`=== chapter_1_arrival ===
~ chapter_1_started = true
# speaker:Archiviste
# scene:archive
Alors regarde Havrenoire non plus comme une carte, mais comme une heure precise.

# speaker:Archiviste
# scene:archive
Je vais te deposer le jour ou la ville apprend que son roi est mort. Tu ne peux pas sauver un cadavre. Tu peux seulement observer les mains qui se posent dessus.

# speaker:Archiviste
# scene:havrenoire
Le monde se retourne. L'odeur de cire chaude et de pluie sur la pierre t'arrache aux Archives. Une cloche sonne. Puis une autre. Puis toute Havrenoire.

# speaker:Heraut fatigue
# scene:havrenoire
Peuple de Havrenoire ! Par decret du Conseil de Regence, la Couronne annonce la mort de Sa Majeste. La capitale demeure sous protection royale jusqu'a nouvel ordre.

# speaker:Archiviste
# scene:havrenoire
Autour de toi, personne ne respire au meme rythme. Les pretres sont deja en place. Les nobles quittent le parvis trop vite. Les gardes regardent les serviteurs, pas la foule.

-> parvis

=== parvis ===
# speaker:Narration
# scene:havrenoire
Tu te tiens sur le Grand Parvis du Deuil. De la, Havrenoire s'ouvre comme une enquete.

* [Entrer dans la Cathedrale]
  -> cathedrale
* [Suivre les carrosses vers le Quartier Noble]
  -> quartier_noble
* [Remonter vers le Palais Royal]
  -> palais_royal
* [Descendre vers le Grand Marche]
  -> grand_marche
* [Chercher un lieu calme : l'Ancienne Archive]
  -> ancienne_archive

=== cathedrale ===
# speaker:Narration
# scene:cathedrale
La Cathedrale de Syrva est deja pleine. Trop pleine. Les cierges noirs brulent en lignes parfaites, comme si le deuil avait attendu son public.

{has_ruban:
# speaker:Soeur Maeliane
# scene:cathedrale
Tu reviens encore. Les morts royaux attirent toujours ceux qui confondent devotion et curiosite.
- else:
# speaker:Soeur Maeliane
# scene:cathedrale
Ne trouble pas les prieres. Le royaume a besoin d'ordre, pas de questions.

# speaker:Narration
# scene:cathedrale
En se detournant, Soeur Maeliane laisse tomber un mince ruban d'office, brode du sceau funeraire royal.
~ has_ruban = true
}

* [Questionner le Cloitre avec le ruban]
  -> cloitre
* [Retourner au Parvis]
  -> parvis

=== cloitre ===
{not has_ruban:
# speaker:Narration
# scene:cloitre
Le cloitre reste ferme. Un novice t'observe par une porte entrebaillee, mais il refuse de parler sans preuve que tu viens de l'office.
-> cathedrale
}

# speaker:Novice inquiet
# scene:cloitre
Ce ruban... vous l'avez trouve dans la nef ? Alors ils ont vraiment commence avant l'annonce.

{has_sermon:
# speaker:Novice inquiet
# scene:cloitre
Je vous ai deja donne tout ce que je pouvais. Si on sait que j'ai parle, je disparais avant complies.
- else:
# speaker:Narration
# scene:cloitre
Le novice glisse une page dechiree dans ta manche. Le sermon y parle du roi au passe, avec une encre deja seche.
~ has_sermon = true
}

* [Aller au Grand Marche verifier les cierges]
  -> grand_marche
* [Retourner au Parvis]
  -> parvis

=== grand_marche ===
# speaker:Narration
# scene:grand_marche
Au Grand Marche, les prix montent plus vite que les voix. On achete du pain, du sel, des cierges, des couteaux.

{has_cierges:
# speaker:Marchande de cierges
# scene:grand_marche
Je n'ai rien d'autre. Une commande pareille, avant l'aube, ca ne s'oublie pas.
- else:
# speaker:Marchande de cierges
# scene:grand_marche
Des cierges noirs ? On m'en a commande cent avant que les cloches sonnent. Payes par un clerc, pas par le palais.

# speaker:Narration
# scene:grand_marche
Elle te tend le recu de commande, plie en quatre et tache de cire.
~ has_cierges = true
}

* [Remonter vers la Cathedrale]
  -> cathedrale
* [Descendre vers les Rues Basses]
  -> rues_basses
* [Retourner au Parvis]
  -> parvis

=== quartier_noble ===
# speaker:Narration
# scene:quartier_noble
Dans le Quartier Noble, les volets se ferment et les carrosses circulent sans armoiries. Une prudence de coupables ou de survivants.

{has_sceau:
# speaker:Cocher noble
# scene:quartier_noble
Je vous ai deja donne le sceau. Si mon maitre sait que je l'ai perdu, je finirai sous les roues.
- else:
# speaker:Cocher noble
# scene:quartier_noble
Je ne sais rien. Je conduis. Je ne demande pas pourquoi trois maisons se reunissent quand le roi vient a peine de mourir.

# speaker:Narration
# scene:quartier_noble
Un petit sceau brise tombe de sa manche. La cire porte encore la marque de la Maison Veyrane.
~ has_sceau = true
}

* [Porter le sceau a l'Hotel des Ambassades]
  -> hotel_ambassades
* [Chercher des rumeurs a la Taverne du Cerf]
  -> taverne_cerf
* [Retourner au Parvis]
  -> parvis

=== hotel_ambassades ===
{not has_sceau:
# speaker:Narration
# scene:hotel_ambassades
L'Hotel des Ambassades ne s'ouvre pas aux inconnus. Il te faudrait un nom, un sceau, ou une faute commise par quelqu'un de plus riche que toi.
-> quartier_noble
}

# speaker:Intendante Ysilde
# scene:hotel_ambassades
Veyrane... Evidemment. Ils n'ont meme pas attendu que le corps refroidisse pour deplacer les convives.

{has_liste:
# speaker:Intendante Ysilde
# scene:hotel_ambassades
Gardez la liste. Elle vaut plus que ma parole.
- else:
# speaker:Narration
# scene:hotel_ambassades
Elle arrache une page de registre. Plusieurs noms sont barres, puis recopies sous une mention secrete : salon noir.
~ has_liste = true
}

* [Suivre la piste du salon noir a la Taverne]
  -> taverne_cerf
* [Retourner au Quartier Noble]
  -> quartier_noble
* [Retourner au Parvis]
  -> parvis

=== taverne_cerf ===
# speaker:Narration
# scene:taverne_cerf
La Taverne du Cerf sent le vin fort, le cuir mouille et les secrets qui ont trop attendu dans une poche.

{has_billet:
# speaker:Messager ivre
# scene:taverne_cerf
J'ai deja parle. Enfin... assez pour regretter demain.
- else:
# speaker:Messager ivre
# scene:taverne_cerf
Un salon noir ? J'ai porte un billet la-bas. Pas au palais. Pas a l'Eglise. Aux nobles qui font semblant de pleurer.

# speaker:Narration
# scene:taverne_cerf
Il abandonne un billet froisse sur la table. Il mentionne une succession "provisoire" avant meme l'annonce officielle.
~ has_billet = true
}

* [Retourner au Quartier Noble]
  -> quartier_noble
* [Descendre vers les Rues Basses]
  -> rues_basses
* [Retourner au Parvis]
  -> parvis

=== palais_royal ===
# speaker:Narration
# scene:palais_royal
Le Palais Royal est cerne de gardes. Les grilles brillent de pluie. Derriere elles, un serviteur serre son bras bande contre sa poitrine.

{has_clef:
# speaker:Serviteur blesse
# scene:palais_royal
La clef ne vous servira qu'une fois. Les galeries ont des oreilles, aujourd'hui.
- else:
# speaker:Serviteur blesse
# scene:palais_royal
Ils ont vide l'aile des domestiques avant l'annonce. Ceux qui ont vu la chambre du roi ne sont plus dans le palais.

# speaker:Narration
# scene:palais_royal
Il te confie une clef froide : celle des galeries de service.
~ has_clef = true
}

* [Verifier les sorties a la Porte des Cendres]
  -> porte_cendres
* [Comparer l'annonce a la Place des Herauts]
  -> place_herauts
* [Retourner au Parvis]
  -> parvis

=== porte_cendres ===
{not has_clef:
# speaker:Narration
# scene:porte_cendres
La Porte des Cendres est sous controle militaire. Sans raison solide, le capitaine ne t'approchera pas du registre.
-> palais_royal
}

# speaker:Capitaine de garde
# scene:porte_cendres
Une clef des galeries ? Alors vous savez deja qu'un convoi est sorti avant la fermeture. Je n'ai pas le droit de dire son nom.

{has_registre:
# speaker:Capitaine de garde
# scene:porte_cendres
Le registre vous suffit. Ne me demandez pas de trahir deux fois.
- else:
# speaker:Narration
# scene:porte_cendres
Il tourne le registre vers toi. Trois serviteurs et un coffre ont quitte la ville avant l'aube.
~ has_registre = true
}

* [Retourner au Palais]
  -> palais_royal
* [Retourner au Parvis]
  -> parvis

=== place_herauts ===
# speaker:Narration
# scene:havrenoire
Sur la Place des Herauts, les annonces officielles sont recopiees sous la surveillance de deux gardes.

{has_fragment:
# speaker:Crieur royal
# scene:havrenoire
Vous avez votre copie. Si elle est fausse, elle l'est officiellement.
- else:
# speaker:Crieur royal
# scene:havrenoire
Prenez-la, si vous voulez tant lire. Mais ne venez pas me demander pourquoi l'encre du sceau a seche avant celle du texte.

# speaker:Narration
# scene:havrenoire
Tu obtiens une copie scellee de l'annonce royale.
~ has_fragment = true
}

* [Retourner au Palais]
  -> palais_royal
* [Retourner au Parvis]
  -> parvis

=== rues_basses ===
# speaker:Narration
# scene:rues_basses
Dans les Rues Basses, les gens ne parlent pas de succession. Ils parlent de farine, de soldats, de portes fermees et de noms effaces.

# speaker:Enfant des rues
# scene:rues_basses
Les grands mentent avec du papier. Les petits mentent avec leurs jambes. Cette nuit, des domestiques ont couru plus vite que les gardes.

* [Aller a la Taverne du Cerf]
  -> taverne_cerf
* [Aller a la Porte des Cendres]
  -> porte_cendres
* [Remonter au Grand Marche]
  -> grand_marche
* [Retourner au Parvis]
  -> parvis

=== ancienne_archive ===
# speaker:Archiviste
# scene:archive
Tu reviens avec l'odeur de Havrenoire sur tes vetements. Pose les preuves. Pas les certitudes.

{has_sermon and has_cierges:
# speaker:Archiviste
# scene:archive
L'Eglise n'a pas seulement accompagne le deuil. Elle l'avait prepare. Les cierges et le sermon parlent plus tot que les cloches.
}

{has_liste and has_billet:
# speaker:Archiviste
# scene:archive
Les nobles ne pleurent pas ensemble par affection. La liste et le billet dessinent deja une succession officieuse.
}

{has_clef and has_registre:
# speaker:Archiviste
# scene:archive
Le palais a deplace des temoins avant de donner un nom au deuil. Ce silence-la n'est pas naturel.
}

* {has_sermon and has_cierges} [Conclure : l'Eglise savait avant l'annonce]
  -> ending_church
* {has_liste and has_billet} [Conclure : les nobles preparent une succession secrete]
  -> ending_nobles
* {has_clef and has_registre} [Conclure : le palais a efface les temoins]
  -> ending_palace
* [Retourner enqueter a Havrenoire]
  -> parvis

=== ending_church ===
# speaker:Archiviste
# scene:archive
Tu choisis l'Eglise. Alors le chapitre suivant ne commencera pas par une couronne, mais par un autel.
-> END

=== ending_nobles ===
# speaker:Archiviste
# scene:archive
Tu choisis les nobles. Alors la mort du roi n'est qu'une porte, et derriere elle quelqu'un a deja choisi le prochain visage du pouvoir.
-> END

=== ending_palace ===
# speaker:Archiviste
# scene:archive
Tu choisis le palais. Alors le plus important n'est peut-etre pas la mort du roi, mais ceux que l'on a fait disparaitre avant de la nommer.
-> END`;

