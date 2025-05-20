# Eina de Seguiment del Desenvolupament Psicomotor Infantil

Aquesta és una eina web senzilla dissenyada per a professionals que vulguin realitzar un seguiment visual i ràpid dels principals indicadors del desenvolupament psicomotor en infants. Permet registrar fites de desenvolupament no assolides i signes d'alerta presents, oferint una representació gràfica i la possibilitat de generar un informe en PDF.

**Important: Aquesta eina no substitueix en cap cas el diagnòstic o l'avaluació d'un professional qualificat.** El seu objectiu és ser un suport visual i una primera aproximació per identificar possibles indicadors que puguin requerir una atenció o seguiment més exhaustiu.

## Característiques principals

* **Visualització de fites:** Mostra gràficament els rangs d'edat esperats (percentils 50, 75 i 95) per a l'assoliment de diverses fites del desenvolupament en àrees com la postural, la manipulació, el llenguatge i la sociabilitat.
* **Registre de signes d'alerta:** Permet marcar la presència de signes d'alerta rellevants per a diferents edats.
* **Càlcul d'edat:** Calcula automàticament l'edat de l'infant en mesos i dies a partir de la data de naixement, o permet introduir l'edat directament en mesos.
* **Generació d'informes PDF:** Crea un informe resum amb les dades introduïdes (nom/identificador de l'infant, edat, fites no assolides i signes d'alerta presents) que es pot desar localment.

## Privacitat i gestió de dades

**Aquesta eina ha estat dissenyada prioritzant la privacitat i la seguretat de les dades:**

* **Processament 100% local:** Tota la informació introduïda (nom de l'infant, data de naixement, fites marcades, signes d'alerta) es processa exclusivament al navegador de l'usuari.
* **Sense emmagatzematge extern:** Les dades **NO s'envien a cap servidor extern ni s'emmagatzemen de forma persistent** enlloc (ni en bases de dades, ni en `localStorage`, ni en *cookies*). La informació es perd en tancar la pestanya del navegador.
* **Descàrrega local del PDF:** L'informe PDF generat es crea al navegador i es descarrega directament al dispositiu de l'usuari. La gestió i custòdia d'aquest arxiu és responsabilitat exclusiva de l'usuari, d'acord amb les normatives de protecció de dades que li siguin aplicables.
* **Recomanació d'anonimat:** Es recomana utilitzar identificadors anònims (sigles, codis numèrics, etc.) en lloc de noms complets per referir-se als infants, especialment si l'informe PDF s'ha de compartir o emmagatzemar.

## Ús

1.  Obriu l'arxiu `index.html` en un navegador web modern.
2.  Introduïu el nom o identificador de l'infant (opcional, es recomana anonimitzat).
3.  Introduïu la data de naixement de l'infant o la seva edat directament en mesos.
4.  A la taula de fites, marqueu les caselles corresponents a aquelles fites que l'infant **encara NO ha assolit**.
5.  A la secció de "Signes d'alerta", marqueu les caselles d'aquells signes que **SÍ observeu** en l'infant.
6.  Feu clic al botó "Desar informe de seguiment en PDF" per generar i descarregar l'informe.

## Tecnologies utilitzades

* HTML5
* CSS3 (amb Tailwind CSS per a l'estil)
* JavaScript (vanilla)
* jsPDF (per a la generació de PDFs)
* Google Fonts (Font Inter)

## Contribucions

Les contribucions són benvingudes. Si teniu suggeriments o voleu millorar l'eina, podeu obrir una *issue* o enviar un *pull request*.

## Llicència

Aquest projecte es distribueix sota la llicència GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007. (Si us plau, afegiu aquí la llicència que escolliu).
