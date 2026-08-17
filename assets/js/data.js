'use strict';

const METADADES_INSTRUMENT = {
    nom: 'Taula Haizea-Llevant completa de 0 a 60 mesos',
    versioDades: '2026.08.1',
    abastMesos: 60,
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
                { id: 'HL78', nomFita: 'Alinea el cap en passar a assegut', edat_50: 2, edat_75: 3, edat_95: 4, detall: 'Acompanya amb el cap la maniobra de passar de supí a assegut.', criteri: 'En estirar-lo suaument pels avantbraços, el cap segueix el tronc i queda alineat abans d’arribar a la posició asseguda.', font: 'HAIZEA_1991_GRAFIC' },
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
                { id: 'HL90', nomFita: 'Camina cap enrere', edat_50: 15, edat_75: 17, edat_95: 22, detall: 'Fa passes cap enrere sense suport.', criteri: 'Fa almenys dues passes cap enrere sense ajuda ni perdre l’equilibri.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL92', nomFita: 'Xuta una pilota', edat_50: 21, edat_75: 22, edat_95: 26, detall: 'Dona una puntada de peu a una pilota.', criteri: 'Xuta la pilota sense perdre l’equilibri de manera marcada.', font: 'AEPAP_LAYDI' },
                { id: 'HL93', nomFita: 'Salta cap endavant', edat_50: 24, edat_75: 28, edat_95: 37, detall: 'Salta cap endavant amb els dos peus.', criteri: 'Salta endavant separant simultàniament tots dos peus del terra.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL94', nomFita: 'Es manté sobre un peu', edat_50: 27, edat_75: 34, edat_95: 41, detall: 'Manté breument l’equilibri sobre un sol peu.', criteri: 'Aixeca un peu i manté la posició uns instants sense suport.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL95', nomFita: 'Salta amb els peus junts', edat_50: 30, edat_75: 36, edat_95: 43, detall: 'Salta mantenint els peus junts.', criteri: 'Fa el salt amb els dos peus alhora i cau sense separar-los de manera marcada.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL96', nomFita: 'Salta cap enrere', edat_50: 38, edat_75: 45, edat_95: 50, detall: 'Salta cap enrere amb els dos peus.', criteri: 'Salta enrere separant simultàniament tots dos peus del terra.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL97', nomFita: 'Equilibri prolongat sobre un peu', edat_50: 41, edat_75: 45, edat_95: 53, detall: 'Manté l’equilibri sobre un sol peu durant cinc segons.', criteri: 'Manté la posició sense suport durant aproximadament cinc segons.', font: 'HAIZEA_1991_GRAFIC' }
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
                { id: 'HL62', nomFita: 'Fa la pinça inferior', edat_50: 7, edat_75: 8, edat_95: 10, detall: 'Agafa un objecte petit amb el polze i la part lateral de l’índex.', criteri: 'Recull l’objecte fent oposició del polze amb l’índex, encara que no sigui amb els palpissos.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL63', nomFita: 'Fa la pinça superior', edat_50: 8.5, edat_75: 11.5, edat_95: 13.5, detall: 'Agafa un objecte petit oposant les puntes del polze i l’índex.', criteri: 'Agafa l’objecte oposant els palpissos del polze i l’índex.', font: 'AEPAP_LAYDI' },
                { id: 'HL64', nomFita: 'Assenyala amb l’índex', edat_50: 10, edat_75: 12, edat_95: 16, detall: 'Assenyala amb el dit índex.', criteri: 'Ho fa espontàniament o la família n’informa de manera clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL65', nomFita: 'Fa gargots espontàniament', edat_50: 13, edat_75: 15, edat_95: 22, detall: 'Fa marques espontànies sobre un paper.', criteri: 'Fa 2 o més gargots; no importa com subjecta el bolígraf.', font: 'AEPAP_LAYDI' },
                { id: 'HL66', nomFita: 'Passa pàgines d’un llibre', edat_50: 13, edat_75: 16, edat_95: 21, detall: 'Passa pàgines d’un llibre per si mateix.', criteri: 'Passa 3 o més pàgines, encara que en passi més d’una alhora.', font: 'AEPAP_LAYDI' },
                { id: 'HL67', nomFita: 'Fa una torre de dos cubs', edat_50: 15, edat_75: 17, edat_95: 21, detall: 'Apila dos cubs.', criteri: 'Construeix una torre de dos cubs després d’una demostració.', font: 'AEPAP_LAYDI' },
                { id: 'HL68', nomFita: 'Tapa un bolígraf', edat_50: 16, edat_75: 20, edat_95: 24, detall: 'Col·loca el caputxó a un bolígraf.', criteri: 'Ho fa durant l’observació o la família n’informa de manera clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL69', nomFita: 'Fa una torre de quatre cubs', edat_50: 17, edat_75: 20, edat_95: 24, detall: 'Apila quatre cubs.', criteri: 'Construeix una torre de quatre cubs després d’una demostració.', font: 'AEPAP_LAYDI' },
                { id: 'HL70', nomFita: 'Agafa el llapis amb els dits', edat_50: 27, edat_75: 30, edat_95: 37, detall: 'Subjecta el llapis amb els dits i no amb el puny.', criteri: 'Agafa espontàniament el llapis entre el polze i els altres dits.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL71', nomFita: 'Copia un cercle', edat_50: 30, edat_75: 34, edat_95: 43, detall: 'Copia un cercle després de veure’n un model.', criteri: 'Traça una línia tancada de forma aproximadament circular sense resseguir el model.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL72', nomFita: 'Reprodueix un pont amb tres cubs', edat_50: 31, edat_75: 37, edat_95: 42, detall: 'Construeix un pont senzill amb tres cubs.', criteri: 'Després d’una demostració, col·loca dos cubs separats i un tercer al damunt.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL73', nomFita: 'Doblega un paper', edat_50: 40, edat_75: 50, edat_95: 56, detall: 'Doblega un full de paper per la meitat.', criteri: 'Imita el plec i aproxima les vores, encara que no quedin perfectament alineades.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL74', nomFita: 'Talla paper amb tisores', edat_50: 42, edat_75: 48, edat_95: 55, detall: 'Utilitza unes tisores infantils per tallar paper.', criteri: 'Obre i tanca les tisores mentre subjecta el paper amb l’altra mà i hi fa un tall.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL75', nomFita: 'Copia un quadrat', edat_50: 46, edat_75: 50, edat_95: 56, detall: 'Copia un quadrat a partir d’un model.', criteri: 'Dibuixa una figura tancada amb quatre costats i angles recognoscibles sense resseguir el model.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL76', nomFita: 'Reprodueix una porta amb cinc cubs', edat_50: 46, edat_75: 51, edat_95: 56, detall: 'Construeix una estructura en forma de porta amb cinc cubs.', criteri: 'Després d’una demostració, reprodueix dues columnes de dos cubs amb un cinquè cub al damunt.', font: 'HAIZEA_1991_GRAFIC' }
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
                { id: 'HL40', nomFita: 'Combina dues paraules', edat_50: 21, edat_75: 23, edat_95: 25, detall: 'Combina dues paraules amb valor comunicatiu.', criteri: 'Produeix espontàniament combinacions de dues paraules diferents.', font: 'AEPAP_LAYDI' },
                { id: 'HL41', nomFita: 'Utilitza pronoms', edat_50: 22, edat_75: 23, edat_95: 36, detall: 'Utilitza pronoms personals o possessius en la parla espontània.', criteri: 'Empra adequadament algun pronom com «jo», «tu», «meu» o «teu».', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL42', nomFita: 'Anomena cinc imatges', edat_50: 24, edat_75: 28, edat_95: 33, detall: 'Anomena objectes familiars representats en imatges.', criteri: 'Anomena correctament cinc de les imatges proposades.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL43', nomFita: 'Identifica objectes per l’ús', edat_50: 25, edat_75: 29, edat_95: 35, detall: 'Assenyala un objecte a partir de la seva funció.', criteri: 'Identifica correctament els objectes quan se li pregunta, per exemple, quin serveix per menjar o pentinar-se.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL44', nomFita: 'Fa frases de tres paraules', edat_50: 27, edat_75: 31, edat_95: 34, detall: 'Produeix frases espontànies de tres paraules.', criteri: 'Combina tres paraules diferents en una mateixa emissió amb sentit comunicatiu.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL45', nomFita: 'Memoritza una imatge senzilla', edat_50: 27, edat_75: 31, edat_95: 39, detall: 'Recorda elements d’una imatge que acaba de veure.', criteri: 'Després d’observar la làmina i retirar-la, recorda correctament l’element demanat.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL46', nomFita: 'Compta fins a dos', edat_50: 29, edat_75: 35, edat_95: 41, detall: 'Recita o aplica la seqüència numèrica fins a dos.', criteri: 'Compta correctament dos objectes o diu la seqüència «un, dos».', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL47', nomFita: 'Anomena deu imatges', edat_50: 29, edat_75: 34, edat_95: 41, detall: 'Anomena deu objectes familiars representats en imatges.', criteri: 'Anomena correctament deu de les imatges proposades.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL48', nomFita: 'Utilitza el verb «ser»', edat_50: 30, edat_75: 35, edat_95: 43, detall: 'Utilitza formes del verb «ser» en la parla espontània.', criteri: 'Produeix una frase correcta amb una forma del verb «ser».', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL49', nomFita: 'Discrimina llarg i curt', edat_50: 33, edat_75: 36, edat_95: 44, detall: 'Distingeix entre un element llarg i un de curt.', criteri: 'Assenyala correctament quin dels dos elements és llarg i quin és curt.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL50', nomFita: 'Respon coherentment', edat_50: 34, edat_75: 41, edat_95: 47, detall: 'Respon de manera congruent a preguntes sobre necessitats quotidianes.', criteri: 'Dona respostes coherents a preguntes com què fa quan té gana, fred o son.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL51', nomFita: 'Reconeix quatre colors', edat_50: 37, edat_75: 41, edat_95: 44, detall: 'Assenyala quatre colors quan se li demanen.', criteri: 'Reconeix correctament els quatre colors presentats, sense necessitat d’anomenar-los.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL52', nomFita: 'Executa tres accions inconnexes', edat_50: 37, edat_75: 43, edat_95: 50, detall: 'Segueix una seqüència de tres ordres no relacionades.', criteri: 'Executa les tres accions després d’haver escoltat totes les instruccions, sense suport gestual.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL53', nomFita: 'Anomena quatre colors', edat_50: 40, edat_75: 44, edat_95: 51, detall: 'Diu el nom de quatre colors.', criteri: 'Anomena correctament els quatre colors presentats.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL54', nomFita: 'Discrimina matí i tarda', edat_50: 44, edat_75: 50, edat_95: 57, detall: 'Distingeix activitats pròpies del matí i de la tarda o nit.', criteri: 'Respon correctament a preguntes contextuals sobre quan es lleva i quan se’n va a dormir.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL55', nomFita: 'Explica una història', edat_50: 49, edat_75: 55, edat_95: 60, detall: 'Construeix un relat comprensible a partir d’una làmina.', criteri: 'Explica una història congruent que relaciona els elements principals de la imatge.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL56', nomFita: 'Repeteix una frase de nou paraules', edat_50: 53, edat_75: 60, edat_95: 60, franjaTruncada: true, detall: 'Repeteix una frase de nou paraules.', criteri: 'Repeteix la frase completa mantenint-ne l’ordre i el sentit. La làmina original no representa el P95 dins els 60 mesos.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL57', nomFita: 'Reconeix els cinc primers nombres', edat_50: 53, edat_75: 60, edat_95: 60, franjaTruncada: true, detall: 'Identifica les grafies dels nombres de l’1 al 5.', criteri: 'Assenyala correctament els cinc nombres quan se li demanen. La làmina original no representa el P95 dins els 60 mesos.', font: 'HAIZEA_1991_GRAFIC' }
            ]
        },
        {
            id: 'socialitzacio',
            nom: 'Socialització',
            fites: [
                { id: 'HL01', nomFita: 'Reacciona a la veu', edat_50: 1, edat_75: 1.5, edat_95: 3.5, detall: 'Modifica l’activitat quan sent una veu humana.', criteri: 'Atura l’activitat, canvia el ritme respiratori o mostra una altra resposta consistent.', font: 'AEPAP_LAYDI' },
                { id: 'HL02', nomFita: 'Distingeix la persona cuidadora principal', edat_50: 1.5, edat_75: 2, edat_95: 3, detall: 'Somriu i fixa la mirada davant la veu o el gest de la persona cuidadora principal.', criteri: 'Somriu fixant la mirada en sentir-ne la veu o veure’n el somriure o el gest, sense contacte físic.', font: 'AEPAP_LAYDI' },
                { id: 'HL03', nomFita: 'Reconeix el biberó o l’aliment', edat_50: 1.5, edat_75: 3, edat_95: 4.5, detall: 'Mostra anticipació quan veu el recipient habitual de l’aliment.', criteri: 'Quan té gana i veu el biberó o el recipient habitual, es tranquil·litza o mostra una resposta anticipatòria clara.', font: 'AEPAP_LAYDI' },
                { id: 'HL04', nomFita: 'Mira les mans', edat_50: 2.5, edat_75: 3.5, edat_95: 4.5, detall: 'Observa atentament una o totes dues mans.', criteri: 'Porta una o totes dues mans davant dels ulls i les mira atentament.', font: 'AEPAP_LAYDI' },
                { id: 'HL05', nomFita: 'Seguiment òptic vertical', edat_50: 2.5, edat_75: 3.5, edat_95: 4.5, detall: 'Segueix visualment un objecte que es mou verticalment.', criteri: 'Segueix més de 60° del recorregut vertical d’un objecte situat aproximadament a 30 cm.', font: 'AEPAP_LAYDI' },
                { id: 'HL06', nomFita: 'Seguiment òptic horitzontal', edat_50: 3.5, edat_75: 4, edat_95: 5.5, detall: 'Segueix visualment un objecte que es mou horitzontalment.', criteri: 'Segueix amb els ulls i el cap tot el recorregut horitzontal de 180°.', font: 'AEPAP_LAYDI' },
                { id: 'HL07', nomFita: 'Busca un objecte que ha caigut', edat_50: 6, edat_75: 7, edat_95: 8, detall: 'Busca un objecte que cau fora del camp visual.', criteri: 'Busca l’objecte després de veure com cau.', font: 'AEPAP_LAYDI' },
                { id: 'HL08', nomFita: 'Menja una galeta', edat_50: 5.5, edat_75: 7, edat_95: 8, detall: 'Subjecta i menja tot sol un aliment sòlid que se li posa a la mà.', criteri: 'Porta l’aliment a la boca i en menja sense que una persona adulta l’hi hagi de sostenir.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL09', nomFita: 'Juga a fet i amagar', edat_50: 7, edat_75: 8, edat_95: 12, detall: 'Anticipa la reaparició d’una persona en un joc d’amagar-se.', criteri: 'Mira cap al costat per on la persona ha aparegut abans.', font: 'AEPAP_LAYDI' },
                { id: 'HL10', nomFita: 'Busca un objecte amagat', edat_50: 7.5, edat_75: 8.5, edat_95: 10.5, detall: 'Busca un objecte que ha vist amagar.', criteri: 'Destapa ràpidament l’objecte, el mira i l’agafa.', font: 'AEPAP_LAYDI' },
                { id: 'HL11', nomFita: 'Imita gestos senzills', edat_50: 9.5, edat_75: 11, edat_95: 13, detall: 'Imita gestos com aplaudir o dir adeu amb la mà.', criteri: 'Imita almenys un gest senzill proposat.', font: 'AEPAP_LAYDI' },
                { id: 'HL12', nomFita: 'Col·labora quan el vesteixen', edat_50: 8.5, edat_75: 13, edat_95: 16, detall: 'Participa activament quan el vesteixen.', criteri: 'Acosta el braç a la màniga, estira el jersei o fa una altra acció de col·laboració.', font: 'AEPAP_LAYDI' },
                { id: 'HL13', nomFita: 'Porta un got a la boca', edat_50: 12, edat_75: 14, edat_95: 17.5, detall: 'Beu d’un got encara que vessi una mica.', criteri: 'Porta a la boca el got que se li dona i beu.', font: 'AEPAP_LAYDI' },
                { id: 'HL14', nomFita: 'Imita tasques de la llar', edat_50: 14, edat_75: 15, edat_95: 18.5, detall: 'Imita una tasca quotidiana de la llar.', criteri: 'Imita almenys una tasca, com treure la pols o escombrar.', font: 'AEPAP_LAYDI' },
                { id: 'HL15', nomFita: 'Menja amb cullera', edat_50: 14, edat_75: 16, edat_95: 21, detall: 'Es porta la cullera a la boca per menjar.', criteri: 'Subjecta la cullera pel mànec i se la porta a la boca, encara que vessi part del menjar.', font: 'AEPAP_LAYDI' },
                { id: 'HL16', nomFita: 'Ajuda a recollir les joguines', edat_50: 16, edat_75: 21, edat_95: 26, detall: 'Col·labora a recollir les joguines quan se li demana.', criteri: 'La família informa clarament que ho fa.', font: 'AEPAP_LAYDI' },
                { id: 'HL17', nomFita: 'Dona menjar als ninots', edat_50: 18, edat_75: 26, edat_95: 30, detall: 'Fa veure que dona menjar a un ninot o peluix.', criteri: 'Participa espontàniament en aquest joc simbòlic.', font: 'AEPAP_LAYDI' },
                { id: 'HL18', nomFita: 'Es treu els pantalons', edat_50: 24, edat_75: 26, edat_95: 31, detall: 'Es treu una peça de roba de la part inferior del cos.', criteri: 'Es baixa i es treu uns pantalons senzills sense botons, cremallera ni tirants.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL19', nomFita: 'Dramatitza seqüències', edat_50: 28, edat_75: 33, edat_95: 38, detall: 'Representa una seqüència de joc simbòlic.', criteri: 'Enllaça espontàniament dues o més accions relacionades en el joc de ficció.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL20', nomFita: 'Es posa peces de roba obertes', edat_50: 28, edat_75: 36, edat_95: 43, detall: 'Es posa una jaqueta o una altra peça oberta.', criteri: 'Introdueix els braços i es col·loca la peça sense que calgui cordar-la.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL21', nomFita: 'Va al vàter', edat_50: 29, edat_75: 31, edat_95: 38, detall: 'Utilitza el vàter o l’orinal amb ajuda limitada.', criteri: 'Avisa o hi va quan ho necessita i participa activament en la rutina.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL22', nomFita: 'Identifica el seu sexe', edat_50: 29, edat_75: 35, edat_95: 43, detall: 'Respon si és nen o nena.', criteri: 'Identifica correctament el seu sexe quan se li pregunta.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL23', nomFita: 'Es descorda els botons', edat_50: 34, edat_75: 39, edat_95: 46, detall: 'Descorda botons d’una peça de roba.', criteri: 'Descorda almenys un botó accessible sense ajuda física.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL24', nomFita: 'Manipula un titella de guant', edat_50: 34, edat_75: 38, edat_95: 48, detall: 'Fa servir un titella de guant amb intenció de joc.', criteri: 'Introdueix la mà al titella i el mou per representar una acció.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL25', nomFita: 'Prepara un aliment per menjar-lo', edat_50: 40, edat_75: 47, edat_95: 54, detall: 'Desembolica o pela un aliment senzill i se’l menja.', criteri: 'Sense recordatori, obre l’embolcall o pela un aliment fàcil, com un plàtan, i el deixa a punt per menjar.', font: 'HAIZEA_1991_GRAFIC' },
                { id: 'HL26', nomFita: 'Dibuixa una persona', edat_50: 49, edat_75: 52, edat_95: 60, detall: 'Fa un dibuix recognoscible d’una persona.', criteri: 'El dibuix inclou una figura humana recognoscible amb diverses parts del cos.', font: 'HAIZEA_1991_GRAFIC' }
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
        { id: 'SA25', area: 'Socialització', nomSigne: 'Absència de joc simbòlic', edat_des_de: 24, detall: 'No representa situacions o accions mitjançant objectes, joguines o ninots.', font: 'MANUAL_HAIZEA' },
        { id: 'SA26', area: 'Llenguatge', nomSigne: 'Llenguatge inintel·ligible', edat_des_de: 36, detall: 'A partir dels 36 mesos, la parla continua sent inintel·ligible per a persones que no conviuen habitualment amb l’infant.', font: 'MANUAL_HAIZEA' }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { METADADES_INSTRUMENT, dadesDesenvolupament };
}
