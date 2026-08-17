# Seguiment del desenvolupament infantil

Eina web local de suport a l’observació professional del desenvolupament infantil entre 0 i 60 mesos. Inclou les 97 fites Haizea-Llevant i 26 signes d’alerta.

> Aquesta eina no és una prova diagnòstica ni substitueix una valoració clínica, psicopedagògica o interdisciplinària global.

## Funcions principals

- Marcatge àgil amb caselles de les fites no assolides; les fites desmarcades no s’interpreten com a assolides.
- Registre diferenciat dels signes observats, no observats i no valorables.
- Visualització dels percentils P50, P75 i P95 de la mostra Haizea-Llevant.
- Càlcul d’edat cronològica i edat corregida per prematuritat per sota dels 18 mesos.
- Resum descriptiu sense etiquetes diagnòstiques.
- Generació local d’un informe PDF.
- Funcionament fora de línia com a aplicació web progressiva.

## Privacitat

- Tot el processament es fa al navegador.
- Les dades introduïdes no s’envien a cap servidor ni es desen en bases de dades, `localStorage` o galetes.
- L’única preferència temporal desada a `sessionStorage` és si el bloc d’instruccions està obert o tancat.
- El formulari demana un identificador pseudonimitzat, no el nom de l’infant.
- El nom del PDF no incorpora l’identificador.

Cal evitar noms, cognoms, inicials identificatives, adreces, centres educatius o altres dades personals en els camps de text lliure.

## Fonts i abast

Les dades estan versionades com a `2026.08.1` a `assets/js/data.js` i reprodueixen les 97 fites de l’instrument de 0 a 5 anys: 26 de socialització, 31 de llenguatge i lògica matemàtica, 19 de manipulació i 21 posturals.

- Fernández Álvarez E, Fernández Matamoros I, Fuentes Biggi J, Rueda Quillet J. *Taula de desenvolupament Haizea-Llevant*. Govern Basc; 1991.
- Adaptació professional Haizea-Llevant de l’AEPap per a l’estudi LAyDI.
- *Protocol d’activitats preventives i de promoció de la salut a l’edat pediàtrica*. Catalunya; 2025.

Els percentils que no consten a l’adaptació tabulada de l’AEPap s’han transcrit de la taula gràfica original. En `HL56` i `HL57`, la franja continua fins al límit de 60 mesos sense mostrar-hi el P95; l’aplicació ho indica com a franja truncada i no ho classifica com un valor posterior al P95.

## Ús

Obriu `index.html` en un navegador modern. Per instal·lar i provar correctament el *service worker*, serviu la carpeta des d’un servidor local o des d’un allotjament HTTPS.

## Proves

Amb Node.js instal·lat:

```powershell
node tests\run-tests.js
```

Les proves comproven la coherència de les dades, els ítems crítics corregits, el càlcul calendari —inclòs el 29 de febrer—, l’edat corregida, els llindars de percentils i algunes garanties de privacitat i PWA.

## Llicència

GNU General Public License v3. Consulteu `LICENSE`.
