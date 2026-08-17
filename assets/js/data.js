'use strict';

const METADADES_INSTRUMENT = {
    nom: 'Selecció de fites Haizea-Llevant de 0 a 30 mesos',
    versioDades: '2026.08',
    abastMesos: 30,
    instrumentOriginal: 'Fernández Álvarez E, Fernández Matamoros I, Fuentes Biggi J, Rueda Quillet J. Taula de desenvolupament Haizea-Llevant. Govern Basc; 1991.',
    fonts: {
        AEPAP_LAYDI: {
            etiqueta: 'Adaptació professional Haizea-Llevant de l’AEPap (estudi LAyDI)',
            url: 'https://www.aepap.org/sites/default/files/noticia/archivos-adjuntos/indicaciones_para_valorar_el_desarrollo_psicomotor_en_el_estudio_laydi.pdf'
        },
        HAIZEA_1991_GRAFIC: {
            etiqueta: 'Taula gràfica Haizea-Llevant original (1991); valors aproximats per lectura del gràfic',
            url: 'https://aepap.org/sites/default/files/psicomotor.pdf'
        },
        MANUAL_HAIZEA: {
            etiqueta: 'Manual d’aplicació Haizea-Llevant',
            url: 'https://aepap.org/sites/default/files/psicomotor.pdf'
        }
    },
    avis: 'Instrument orientatiu de vigilància del desenvolupament. No és una prova diagnòstica ni substitueix una valoració clínica global.'
};

const dadesDesenvolupament = {
    categories: [
        {
            id: 'postural',
            nom: 'Postural',
            fites: [
                { id: 'HL77', nomFita: 'Redreçament cefàlic en pron', edat_50: 1, edat_75: 1.5, edat_95: 3.5, detall: 'Aixeca el cap quan està de bocaterrosa.', criteri: 'Aixeca el cap aproximadament 45° respecte del pla, encara que sigui de manera intermitent.', font: 'AEPAP_LAYDI' },
                { id: 'HL80', nomFita: 'Flexió cefàlica en passar a assegut', edat_50: 4, edat_75: 5, edat_95: 7.5, detall: 'Flexiona activament el cap durant la maniobra de passar a assegut.', criteri: 'Quan el tronc arriba a 45°, el cap queda avançat respecte del tronc.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL79', nomFita: 'Suport sobre els avantbraços en pron', edat_50: 2, edat_75: 3, edat_95: 4.5, detall: 'En posició de bocaterrosa, es recolza sobre els avantbraços.', criteri: 'Aixeca el cap i el tòrax recolzant-se sobre els avantbraços, sense ajuda física.', font: 'AEPAP_LAYDI' },
                { id: 'HL81', nomFita: 'Volteig de pron a supí', edat_50: 6.3, edat_75: 7, edat_95: 8.8, detall: 'Passa de bocaterrosa a panxa enlaire.', criteri: 'Fa el canvi de pron a supí per si mateix.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL83', nomFita: 'Sedestació estable', edat_50: 7.5, edat_75: 8, edat_95: 9.5, detall: 'Es manté assegut sense suport.', criteri: 'Manté l’equilibri assegut sense utilitzar les mans com a suport.', font: 'AEPAP_LAYDI' },
                { id: 'HL82', nomFita: 'Reaccions de paracaigudes laterals', edat_50: 6.5, edat_75: 7, edat_95: 9, detall: 'Estén el braç del costat cap al qual se l’inclina.', criteri: 'En inclinar-lo ràpidament a cada costat, estén el braç corresponent i recolza la mà.', font: 'AEPAP_LAYDI' },
                { id: 'HL85', nomFita: 'Passa a seure sense ajuda', edat_50: 9, edat_75: 10.5, edat_95: 13, detall: 'Passa d’estar estirat a assegut per si mateix.', criteri: 'S’asseu sol des de la posició estirada, tant en supí com en pron.', font: 'AEPAP_LAYDI' },
                { id: 'HL88', nomFita: 'Es posa dret sense suport', edat_50: 13, edat_75: 14.5, edat_95: 16.5, detall: 'S’aixeca fins a quedar dret sense agafar-se a cap suport.', criteri: 'Passa d’estar estirat o assegut a estar dret utilitzant només el terra com a suport.', font: 'AEPAP_LAYDI' },
                { id: 'HL84', nomFita: 'Es manté dret amb suport', edat_50: 8, edat_75: 9, edat_95: 11, detall: 'Es manté dret agafat a un suport.', criteri: 'Es manté dret amb suport durant més de 5 segons.', font: 'AEPAP_LAYDI' },
                { id: 'HL86', nomFita: 'Fa cinc passes sense suport', edat_50: 12, edat_75: 13, edat_95: 15.5, detall: 'Fa més de cinc passes sense ajuda ni suport.', criteri: 'Fa més de cinc passes consecutives sense ajuda ni suport.', font: 'AEPAP_LAYDI' },
                { id: 'HL87', nomFita: 'Marxa lliure', edat_50: 13, edat_75: 14, edat_95: 16, detall: 'Camina autònomament amb bon control de l’equilibri.', criteri: 'Camina portant un objecte a la mà i reprèn la marxa sense obrir els braços per equilibrar-se.', font: 'AEPAP_LAYDI' },
                { id: 'HL91', nomFita: 'Baixa escales', edat_50: 18, edat_75: 21, edat_95: 24, detall: 'Baixa graons amb l’ajuda adequada a l’edat.', criteri: 'Baixa almenys 3 graons dret, encara que necessiti agafar-se a la barana o a la mà d’una persona adulta.', font: 'AEPAP_LAYDI' },
                { id: 'HL89', nomFita: 'Carrera lliure', edat_50: 15, edat_75: 16, edat_95: 20, detall: 'Corre amb seguretat.', criteri: 'Corre sense ajuda més de 3 metres i s’atura progressivament sense caure ni recolzar-se.', font: 'AEPAP_LAYDI' },
                { id: 'HL92', nomFita: 'Xuta una pilota', edat_50: 21, edat_75: 22, edat_95: 26, detall: 'Dona una puntada de peu a una pilota.', criteri: 'Xuta la pilota sense perdre l’equilibri de manera marcada.', font: 'AEPAP_LAYDI' }
            ]
        },
        {
            id: 'manipulacio',
            nom: 'Manipulació',
            fites: [
                { id: 'HL58', nomFita: 'Ajunta les mans', edat_50: 2, edat_75: 3, edat_95: 4, detall: 'Ajunta les mans a la línia mitjana del cos.', criteri: 'Ajunta o enllaça espontàniament les mans a la línia mitjana.', font: 'AEPAP_LAYDI' },
                { id: 'HL59', nomFita: 'Dirigeix la mà cap a un objecte', edat_50: 4.5, edat_75: 5, edat_95: 6, detall: 'Porta la mà cap a un objecte amb intenció.', criteri: 'Dirigeix la mà cap a l’objecte, encara que no arribi a agafar-lo.', font: 'AEPAP_LAYDI' },
                { id: 'HL60', nomFita: 'Passa objectes d’una mà a l’altra', edat_50: 5.5, edat_75: 6.5, edat_95: 8, detall: 'Transfereix un objecte entre les mans.', criteri: 'Passa l’objecte d’una mà a l’altra sense ajudar-se amb la boca, el cos o la taula.', font: 'AEPAP_LAYDI' },
                { id: 'HL61', nomFita: 'Es treu un mocador de la cara', edat_50: 6, edat_75: 6.5, edat_95: 7.5, detall: 'Es retira un mocador que li cobreix la cara.', criteri: 'Es treu el mocador amb una o ambdues mans.', font: 'AEPAP_LAYDI' },
                { id: 'HL63', nomFita: 'Fa la pinça superior', edat_50: 8.5, edat_75: 11.5, edat_95: 13.5, detall: 'Agafa un objecte petit oposant les puntes del polze i l’índex.', criteri: 'Agafa l’objecte oposant els palpissos del polze i l’índex.', font: 'AEPAP_LAYDI' },
                { id: 'HL64', nomFita: 'Assenyala amb l’índex', edat_50: 10, edat_75: 12, edat_95: 16, detall: 'Assenyala amb el dit índex.', criteri: 'Ho fa espontàniament o la família n’informa de manera clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL65', nomFita: 'Fa gargots espontàniament', edat_50: 13, edat_75: 15, edat_95: 22, detall: 'Fa marques espontànies sobre un paper.', criteri: 'Fa 2 o més gargots; no importa com subjecta el bolígraf.', font: 'AEPAP_LAYDI' },
                { id: 'HL66', nomFita: 'Passa pàgines d’un llibre', edat_50: 13, edat_75: 16, edat_95: 21, detall: 'Passa pàgines d’un llibre per si mateix.', criteri: 'Passa 3 o més pàgines, encara que en passi més d’una alhora.', font: 'AEPAP_LAYDI' },
                { id: 'HL67', nomFita: 'Fa una torre de dos cubs', edat_50: 15, edat_75: 17, edat_95: 21, detall: 'Apila dos cubs.', criteri: 'Construeix una torre de dos cubs després d’una demostració.', font: 'AEPAP_LAYDI' },
                { id: 'HL68', nomFita: 'Tapa un bolígraf', edat_50: 16, edat_75: 20, edat_95: 24, detall: 'Col·loca el caputxó a un bolígraf.', criteri: 'Ho fa durant l’observació o la família n’informa de manera clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL69', nomFita: 'Fa una torre de quatre cubs', edat_50: 17, edat_75: 20, edat_95: 24, detall: 'Apila quatre cubs.', criteri: 'Construeix una torre de quatre cubs després d’una demostració.', font: 'AEPAP_LAYDI' }
            ]
        },
        {
            id: 'llenguatge',
            nom: 'Llenguatge i lògica',
            fites: [
                { id: 'HL27', nomFita: 'Atén una conversa', edat_50: 1.5, edat_75: 2, edat_95: 4.5, detall: 'Para atenció quan altres persones parlen.', criteri: 'Quan està tranquil, mira regularment les persones que conversen.', font: 'AEPAP_LAYDI' },
                { id: 'HL28', nomFita: 'Riu a riallades', edat_50: 2.5, edat_75: 3.5, edat_95: 5.5, detall: 'Riu a riallades sense necessitat de pessigolles.', criteri: 'Ho fa durant l’observació o la família n’informa de manera clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL29', nomFita: 'Balbuceja', edat_50: 5.5, edat_75: 6, edat_95: 8, detall: 'Emet síl·labes amb consonant, com «ma», «da» o «pa».', criteri: 'Emet almenys una síl·laba amb consonant durant l’observació.', font: 'AEPAP_LAYDI' },
                { id: 'HL30', nomFita: 'Diu «mama» o «papa» inespecíficament', edat_50: 7.5, edat_75: 8.5, edat_95: 9.5, detall: 'Produeix «mama» o «papa» sense referir-se necessàriament a una persona concreta.', criteri: 'Ho fa durant l’observació o la família n’informa de manera clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL31', nomFita: 'Comprèn una prohibició', edat_50: 8.5, edat_75: 10.5, edat_95: 15, detall: 'S’atura davant una prohibició verbal habitual.', criteri: 'S’atura davant una ordre com «no» emesa amb un to de veu habitual.', font: 'AEPAP_LAYDI' },
                { id: 'HL32', nomFita: 'Reconeix el seu nom', edat_50: 9, edat_75: 10.5, edat_95: 12, detall: 'Mostra una resposta clara quan sent el seu nom.', criteri: 'Gira el cap, mira o mostra una altra resposta consistent quan sent el seu nom.', font: 'AEPAP_LAYDI' },
                { id: 'HL33', nomFita: 'Comprèn algunes paraules', edat_50: 10, edat_75: 11, edat_95: 13, detall: 'Associa paraules familiars amb persones o objectes.', criteri: 'Sense gestos, mostra una associació clara entre el nom i la persona o l’objecte.', font: 'AEPAP_LAYDI' },
                { id: 'HL34', nomFita: 'Obeeix ordres mitjançant gestos', edat_50: 10.5, edat_75: 14, edat_95: 18.5, detall: 'Respon a gestos convencionals sense paraules.', criteri: 'Obeeix un gest com «silenci» o una negació amb el cap; no val només parar atenció.', font: 'AEPAP_LAYDI' },
                { id: 'HL35', nomFita: 'Diu «mama» o «papa» amb sentit', edat_50: 11.5, edat_75: 13, edat_95: 16, detall: 'Utilitza «mama», «papa» o una paraula equivalent per referir-se a la persona adequada.', criteri: 'Ho fa durant l’observació o la família n’informa de manera clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL36', nomFita: 'Utilitza la paraula «no»', edat_50: 17, edat_75: 20, edat_95: 24, detall: 'Utilitza «no» amb intenció comunicativa.', criteri: 'Empra la paraula correctament durant l’observació o segons informació familiar clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL37', nomFita: 'Assenyala parts del cos', edat_50: 17, edat_75: 21, edat_95: 24, detall: 'Assenyala una part del seu cos quan se li demana.', criteri: 'Assenyala adequadament una part com l’ull, el nas, la boca o la mà.', font: 'AEPAP_LAYDI' },
                { id: 'HL38', nomFita: 'Anomena un objecte dibuixat', edat_50: 19, edat_75: 22, edat_95: 25, detall: 'Anomena un objecte familiar representat en una imatge.', criteri: 'Anomena correctament almenys un objecte dibuixat.', font: 'AEPAP_LAYDI' },
                { id: 'HL39', nomFita: 'Executa dues ordres', edat_50: 19, edat_75: 22, edat_95: 25, detall: 'Segueix dues ordres consecutives.', criteri: 'Executa correctament dues ordres senzilles indicades una rere l’altra.', font: 'AEPAP_LAYDI' },
                { id: 'HL40', nomFita: 'Combina dues paraules', edat_50: 21, edat_75: 23, edat_95: 25, detall: 'Combina dues paraules amb valor comunicatiu.', criteri: 'Produeix espontàniament combinacions de dues paraules diferents.', font: 'AEPAP_LAYDI' }
            ]
        },
        {
            id: 'socialitzacio',
            nom: 'Socialització',
            fites: [
                { id: 'HL01', nomFita: 'Reacciona a la veu', edat_50: 1, edat_75: 1.5, edat_95: 3.5, detall: 'Modifica l’activitat quan sent una veu humana.', criteri: 'Atura l’activitat, canvia el ritme respiratori o mostra una altra resposta consistent.', font: 'AEPAP_LAYDI' },
                { id: 'HL02', nomFita: 'Distingeix la persona cuidadora principal', edat_50: 1.5, edat_75: 2, edat_95: 3, detall: 'Somriu i fixa la mirada davant la veu o el gest de la persona cuidadora principal.', criteri: 'Somriu fixant la mirada en sentir-ne la veu o veure’n el somriure o el gest, sense contacte físic.', font: 'AEPAP_LAYDI' },
                { id: 'HL04', nomFita: 'Mira les mans', edat_50: 2.5, edat_75: 3.5, edat_95: 4.5, detall: 'Observa atentament una o totes dues mans.', criteri: 'Porta una o totes dues mans davant dels ulls i les mira atentament.', font: 'AEPAP_LAYDI' },
                { id: 'HL05', nomFita: 'Seguiment òptic vertical', edat_50: 2.5, edat_75: 3.5, edat_95: 4.5, detall: 'Segueix visualment un objecte que es mou verticalment.', criteri: 'Segueix més de 60° del recorregut vertical d’un objecte situat aproximadament a 30 cm.', font: 'AEPAP_LAYDI' },
                { id: 'HL06', nomFita: 'Seguiment òptic horitzontal', edat_50: 3.5, edat_75: 4, edat_95: 5.5, detall: 'Segueix visualment un objecte que es mou horitzontalment.', criteri: 'Segueix amb els ulls i el cap tot el recorregut horitzontal de 180°.', font: 'AEPAP_LAYDI' },
                { id: 'HL07', nomFita: 'Busca un objecte que ha caigut', edat_50: 6, edat_75: 7, edat_95: 8, detall: 'Busca un objecte que cau fora del camp visual.', criteri: 'Busca l’objecte després de veure com cau.', font: 'AEPAP_LAYDI' },
                { id: 'HL09', nomFita: 'Juga a fet i amagar', edat_50: 7, edat_75: 8, edat_95: 12, detall: 'Anticipa la reaparició d’una persona en un joc d’amagar-se.', criteri: 'Mira cap al costat per on la persona ha aparegut abans.', font: 'AEPAP_LAYDI' },
                { id: 'HL10', nomFita: 'Busca un objecte amagat', edat_50: 7.5, edat_75: 8.5, edat_95: 10.5, detall: 'Busca un objecte que ha vist amagar.', criteri: 'Destapa ràpidament l’objecte, el mira i l’agafa.', font: 'AEPAP_LAYDI' },
                { id: 'HL11', nomFita: 'Imita gestos senzills', edat_50: 9.5, edat_75: 11, edat_95: 13, detall: 'Imita gestos com aplaudir o dir adeu amb la mà.', criteri: 'Imita almenys un gest senzill proposat.', font: 'AEPAP_LAYDI' },
                { id: 'HL12', nomFita: 'Col·labora quan el vesteixen', edat_50: 8.5, edat_75: 13, edat_95: 16, detall: 'Participa activament quan el vesteixen.', criteri: 'Acosta el braç a la màniga, estira el jersei o fa una altra acció de col·laboració.', font: 'AEPAP_LAYDI' },
                { id: 'HL13', nomFita: 'Porta un got a la boca', edat_50: 12, edat_75: 14, edat_95: 17.5, detall: 'Beu d’un got encara que vessi una mica.', criteri: 'Porta a la boca el got que se li dona i beu.', font: 'AEPAP_LAYDI' },
                { id: 'HL14', nomFita: 'Imita tasques de la llar', edat_50: 14, edat_75: 15, edat_95: 18.5, detall: 'Imita una tasca quotidiana de la llar.', criteri: 'Imita almenys una tasca, com treure la pols o escombrar.', font: 'AEPAP_LAYDI' },
                { id: 'HL15', nomFita: 'Menja amb cullera', edat_50: 14, edat_75: 16, edat_95: 21, detall: 'Es porta la cullera a la boca per menjar.', criteri: 'Subjecta la cullera pel mànec i se la porta a la boca, encara que vessi part del menjar.', font: 'AEPAP_LAYDI' },
                { id: 'HL16', nomFita: 'Ajuda a recollir les joguines', edat_50: 16, edat_75: 21, edat_95: 26, detall: 'Col·labora a recollir les joguines quan se li demana.', criteri: 'La família informa clarament que ho fa.', font: 'AEPAP_LAYDI' },
                { id: 'HL17', nomFita: 'Dona menjar als ninots', edat_50: 18, edat_75: 26, edat_95: 30, detall: 'Fa veure que dona menjar a un ninot o peluix.', criteri: 'Participa espontàniament en aquest joc simbòlic.', font: 'AEPAP_LAYDI' }
            ]
        }
    ],
    signesAlerta: [
        { id: 'SA01', area: 'Neurològica', nomSigne: 'Macrocefàlia', edat_des_de: 0, detall: 'Perímetre cefàlic superior a +3 desviacions estàndard segons el criteri del manual Haizea-Llevant.', font: 'MANUAL_HAIZEA' },
        { id: 'SA02', area: 'Neurològica', nomSigne: 'Microcefàlia', edat_des_de: 0, detall: 'Perímetre cefàlic inferior a −2 desviacions estàndard.', font: 'MANUAL_HAIZEA' },
        { id: 'SA03', area: 'Neurològica', nomSigne: 'Estancament del perímetre cefàlic', edat_des_de: 0, detall: '3 mesos o més sense augment durant el primer any de vida.', font: 'MANUAL_HAIZEA' },
        { id: 'SA04', area: 'Neurològica', nomSigne: 'Moviments oculars anormals', edat_des_de: 0, detall: 'Moviments erràtics, nistagme o ulls en «sol ponent»; no inclou l’estrabisme.', font: 'MANUAL_HAIZEA' },
        { id: 'SA05', area: 'Neurològica', nomSigne: 'Altres moviments, to o postura anormals', edat_des_de: 0, detall: 'Actituds distòniques, hiperextensió cefàlica o moviments cefàlics repetitius, entre altres.', font: 'MANUAL_HAIZEA' },
        { id: 'SA06', area: 'Neurològica', nomSigne: 'Dismorfismes evidents', edat_des_de: 0, detall: 'Característiques morfològiques que requereixen valoració clínica.', font: 'MANUAL_HAIZEA' },
        { id: 'SA07', area: 'Neurològica', nomSigne: 'Arreflèxia osteotendinosa generalitzada', edat_des_de: 0, detall: 'Absència generalitzada de reflexos, especialment rotulians i aquil·lians.', font: 'MANUAL_HAIZEA' },
        { id: 'SA08', area: 'Neurològica', nomSigne: 'Reacció extensora al suport plantar', edat_des_de: 0, detall: 'Extensió progressiva anormal de les extremitats inferiors en contactar els peus amb una superfície.', font: 'MANUAL_HAIZEA' },
        { id: 'SA09', area: 'Socialització', nomSigne: 'Absència de somriure social', edat_des_de: 2, detall: 'No apareix somriure social a partir dels 2 mesos.', font: 'MANUAL_HAIZEA' },
        { id: 'SA10', area: 'Socialització', nomSigne: 'No fixa la mirada', edat_des_de: 2, detall: 'No fixa la mirada de manera consistent a partir dels 2 mesos.', font: 'MANUAL_HAIZEA' },
        { id: 'SA11', area: 'Socialització', nomSigne: 'Irritabilitat permanent', edat_des_de: 2, detall: 'Irritabilitat o plor persistent que no es regula amb les mesures habituals.', font: 'MANUAL_HAIZEA' },
        { id: 'SA12', area: 'Socialització', nomSigne: 'Sobresalt exagerat', edat_des_de: 2, detall: 'Resposta exagerada davant qualsevol soroll inesperat.', font: 'MANUAL_HAIZEA' },
        { id: 'SA13', area: 'Manipulació', nomSigne: 'Adducció permanent dels polzes', edat_des_de: 2, detall: 'Manté un o tots dos polzes flexionats dins del puny de manera persistent.', font: 'MANUAL_HAIZEA' },
        { id: 'SA14', area: 'Manipulació', nomSigne: 'Asimetria d’activitat amb les mans', edat_des_de: 3, detall: 'Ús predominant o exclusiu d’una mà abans de l’edat esperada.', font: 'MANUAL_HAIZEA' },
        { id: 'SA15', area: 'Postural', nomSigne: 'Absència de control cefàlic', edat_des_de: 3, detall: 'No mostra un control cefàlic adequat a partir dels 3 mesos.', font: 'MANUAL_HAIZEA' },
        { id: 'SA16', area: 'Socialització', nomSigne: 'Passivitat excessiva', edat_des_de: 4, detall: 'Mostra molt poca iniciativa o resposta relacional quan està despert.', font: 'MANUAL_HAIZEA' },
        { id: 'SA17', area: 'Postural', nomSigne: 'Hipertonia dels adductors', edat_des_de: 4, detall: 'Tensió excessiva dels adductors amb un angle d’obertura inferior a 90°.', font: 'MANUAL_HAIZEA' },
        { id: 'SA18', area: 'Postural', nomSigne: 'Persistència del reflex de Moro', edat_des_de: 6, detall: 'El reflex de Moro persisteix a partir dels 6 mesos.', font: 'MANUAL_HAIZEA' },
        { id: 'SA19', area: 'Socialització', nomSigne: 'Patró de conducta repetitiu predominant', edat_des_de: 8, detall: 'Conducta repetitiva o estereotipada que ocupa una part molt rellevant del temps d’activitat.', font: 'MANUAL_HAIZEA' },
        { id: 'SA20', area: 'Postural', nomSigne: 'Absència de desplaçament autònom', edat_des_de: 9, detall: 'No es desplaça autònomament més de 2 metres, sigui reptant, gatejant o caminant.', font: 'MANUAL_HAIZEA' },
        { id: 'SA21', area: 'Llenguatge', nomSigne: 'Pèrdua del balbuceig', edat_des_de: 12, detall: 'Deixa de produir un balbuceig que ja havia adquirit.', font: 'MANUAL_HAIZEA' },
        { id: 'SA22', area: 'Socialització', nomSigne: 'Passa ininterrompudament d’una activitat a una altra', edat_des_de: 16, detall: 'Canvia contínuament d’activitat amb una inquietud difícil de regular.', font: 'MANUAL_HAIZEA' },
        { id: 'SA23', area: 'Postural', nomSigne: 'Absència de deambulació autònoma', edat_des_de: 18, detall: 'No camina de manera autònoma a partir dels 18 mesos.', font: 'MANUAL_HAIZEA' },
        { id: 'SA24', area: 'Llenguatge', nomSigne: 'Estereotípies verbals', edat_des_de: 24, detall: 'Repeteix de manera automàtica expressions estructurades sense finalitat comunicativa aparent.', font: 'MANUAL_HAIZEA' },
        { id: 'SA25', area: 'Socialització', nomSigne: 'Absència de joc simbòlic', edat_des_de: 24, detall: 'No representa situacions o accions mitjançant objectes, joguines o ninots.', font: 'MANUAL_HAIZEA' }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { METADADES_INSTRUMENT, dadesDesenvolupament };
}
