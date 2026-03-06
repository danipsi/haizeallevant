'use strict';

const dadesDesenvolupament = {
    categories: [
        {
            nom: "Postural",
            fites: [
                { nomFita: "REDRECAMENT CEFALIC PRONO",       edat_50: 1,    edat_75: 1.8,  edat_95: 3.5,  detall: "L'infant aixeca i aguanta el cap estant de bocaterrosa." },
                { nomFita: "PULL TO SIT: FLEXIO CEFALICA",    edat_50: 4,    edat_75: 5,    edat_95: 7.5,  detall: "En estirar-lo pels bracos per asseure'l, el cap acompanya el moviment del tronc sense quedar enrere." },
                { nomFita: "PRONO RECOLZA AVANTBRAC",         edat_50: 2,    edat_75: 3,    edat_95: 4.8,  detall: "Estant de bocaterrosa, es recolza sobre els avantbracos aixecant cap i espatles." },
                { nomFita: "VOLTEIG",                         edat_50: 6.3,  edat_75: 7,    edat_95: 8.8,  detall: "Es capac de girar sobre si mateix, passant de panxa enlaire a bocaterrosa o viceversa." },
                { nomFita: "ES MANTE ASSEGUT ESTABLEMENT",   edat_50: 7.3,  edat_75: 8,    edat_95: 9.5,  detall: "Pot seure sense suport i mantenir l'equilibri." },
                { nomFita: "REAC PARACAIGUDISTES LATERALS",  edat_50: 6.3,  edat_75: 7.2,  edat_95: 9,    detall: "En inclinar-lo lateralment assegut, esten el brac del costat de la inclinacio per recolzar-se." },
                { nomFita: "PASSA A SEURE SENSE AJUT",       edat_50: 9,    edat_75: 10.5, edat_95: 12.5, detall: "Pot passar d'estar estirat a assegut per si mateix." },
                { nomFita: "ES POSA DRET",                   edat_50: 12.4, edat_75: 14.3, edat_95: 16.1, detall: "S'aixeca fins a posar-se dret, agafant-se a algun suport." },
                { nomFita: "ES MANTE DRET RECOLZAT",         edat_50: 8.2,  edat_75: 9,    edat_95: 11,   detall: "Aguanta dret amb suport." },
                { nomFita: "MARXA SOL",                      edat_50: 12.5, edat_75: 14.5, edat_95: 15.9, detall: "Camina de manera autonoma sense ajuda (fa cinc passes lliurement)." },
                { nomFita: "BAIXA ESCALES",                  edat_50: 18,   edat_75: 21,   edat_95: 24,   detall: "Pot baixar escales, inicialment amb ajuda o recolzant-se." },
                { nomFita: "CARRERA LLIURE",                 edat_50: 15,   edat_75: 16,   edat_95: 20,   detall: "Corre de manera fluida." },
                { nomFita: "XUTA PILOTA",                    edat_50: 21,   edat_75: 22,   edat_95: 26,   detall: "Pot donar una puntada de peu a una pilota." }
            ]
        },
        {
            nom: "Manipulacio",
            fites: [
                { nomFita: "DIRIGEIX MA",                    edat_50: 4.2,  edat_75: 4.8,  edat_95: 5.8,  detall: "Porta la ma cap a un objecte amb intencio." },
                { nomFita: "AJUNTA MANS",                    edat_50: 2.2,  edat_75: 3.2,  edat_95: 4,    detall: "Junta les mans a la linia mitjana del cos." },
                { nomFita: "PASSA OBJECTES DE MA",           edat_50: 5.5,  edat_75: 6.3,  edat_95: 8,    detall: "Es capac de passar un objecte d'una ma a l'altra." },
                { nomFita: "TREU MOCADOR",                   edat_50: 5.7,  edat_75: 6.4,  edat_95: 7.5,  detall: "Es treu un mocador o drap que li cobreix la cara." },
                { nomFita: "PINCA SUPERIOR",                 edat_50: 8.5,  edat_75: 11.5, edat_95: 13.5, detall: "Agafa objectes petits utilitzant el dit polze i l'index (pinca fina)." },
                { nomFita: "APUNTA AMB L'INDEX",             edat_50: 10.2, edat_75: 12.5, edat_95: 16.1, detall: "Assenyala objectes o persones amb el dit index." },
                { nomFita: "FA TORRE DE 2 CUBS",             edat_50: 15,   edat_75: 16.8, edat_95: 21,   detall: "Apila dos cubs per fer una torre." },
                { nomFita: "PASSA PAGINES LLIBRE",           edat_50: 13,   edat_75: 16,   edat_95: 21,   detall: "Pot passar les pagines d'un llibre (inicialment varies a la vegada)." },
                { nomFita: "TAPA BOLIGRAF",                  edat_50: 16,   edat_75: 20,   edat_95: 24,   detall: "Posa la tapa a un boligraf o retolador." },
                { nomFita: "FA GARGOTS ESPONTANIAMENT",      edat_50: 13,   edat_75: 15,   edat_95: 22,   detall: "Fa gargots amb un llapis sobre un paper de manera espontania." },
                { nomFita: "FA TORRE DE 4 CUBS",             edat_50: 17,   edat_75: 20,   edat_95: 24,   detall: "Apila quatre cubs per fer una torre." }
            ]
        },
        {
            nom: "Llenguatge",
            fites: [
                { nomFita: "ATEN LES CONVERSES",             edat_50: 1.9,  edat_75: 2.3,  edat_95: 4.8,  detall: "Para atencio a les converses dels adults." },
                { nomFita: "FA RIALLES",                     edat_50: 3,    edat_75: 4,    edat_95: 5.8,  detall: "Riu de manera espontania o en resposta a estimuls." },
                { nomFita: "BALBUCEIG",                      edat_50: 5.6,  edat_75: 6.2,  edat_95: 7.8,  detall: "Emet sons vocals i consonantics repetitius (ba-ba, da-da)." },
                { nomFita: "RECONEIX EL SEU NOM",            edat_50: 8.8,  edat_75: 10.5, edat_95: 12,   detall: "Gira el cap o mostra reconeixement quan sent el seu nom." },
                { nomFita: "COMPREN SIGN. ALGUNES PARAULES", edat_50: 10.1, edat_75: 11.3, edat_95: 13.5, detall: "Compren el significat d'algunes paraules familiars (mare, pare, aigua)." },
                { nomFita: "OBEEIX ORDRES PER GESTOS",       edat_50: 10.5, edat_75: 14.1, edat_95: 18.2, detall: "Segueix ordres simples acompanyades de gestos (adona'm, mira)." },
                { nomFita: "PAPA, MAMA, ESPECIF.",            edat_50: 7.6,  edat_75: 8.8,  edat_95: 9.6,  detall: "Diu 'papa' i 'mama' referint-se especificament als seus progenitors." },
                { nomFita: "COMPREN UNA PROHIBICIO",         edat_50: 8.3,  edat_75: 10.4, edat_95: 14.8, detall: "Enten el 'no' o una negacio." },
                { nomFita: "UTILITZA LA PARAULA NO",         edat_50: 17,   edat_75: 20,   edat_95: 24,   detall: "Comenca a utilitzar la paraula 'no' amb intencio." },
                { nomFita: "ASSENYALA PART DEL SEU COS",     edat_50: 17,   edat_75: 21,   edat_95: 24,   detall: "Assenyala parts del seu cos quan se li demana (nas, ulls, boca)." },
                { nomFita: "ANOMENA OBJ. DIBUIXAT",          edat_50: 19,   edat_75: 22,   edat_95: 25,   detall: "Anomena objectes comuns representats en dibuixos." },
                { nomFita: "UNEIX 2 PARAULES",               edat_50: 19.8, edat_75: 21,   edat_95: 25,   detall: "Comenca a formar frases de dues paraules (nen cotxe, aigua vull)." }
            ]
        },
        {
            nom: "Sociabilitat",
            fites: [
                { nomFita: "REAC VEU",                       edat_50: 1,    edat_75: 2.3,  edat_95: 3.1,  detall: "Reacciona a la veu humana (es gira, es calma, etc.)." },
                { nomFita: "SOMRIURE MARE",                  edat_50: 1.2,  edat_75: 1.9,  edat_95: 4,    detall: "Somriu en resposta a la cara o veu de la mare o cuidador principal." },
                { nomFita: "PERS. OPTICA VERT.",             edat_50: 2.5,  edat_75: 3.2,  edat_95: 4.5,  detall: "Segueix un objecte amb la mirada en moviment vertical." },
                { nomFita: "MIRA LES MANS",                  edat_50: 2.2,  edat_75: 3.1,  edat_95: 4.5,  detall: "Observa les seves propies mans." },
                { nomFita: "PERS. OPTICA HOR.",              edat_50: 2.5,  edat_75: 4,    edat_95: 5.5,  detall: "Segueix un objecte amb la mirada en moviment horitzontal." },
                { nomFita: "IMITA GESTOS",                   edat_50: 9.2,  edat_75: 11,   edat_95: 13,   detall: "Imita gestos simples que fan els altres (aplaudir, dir adeu)." },
                { nomFita: "JUGA A L'AMAGATALL",             edat_50: 6.7,  edat_75: 7.8,  edat_95: 12.2, detall: "Participa en jocs d'amagar i apareixer (cucu-tast)." },
                { nomFita: "BUSCA OBJECTE DESAPAREGUT",      edat_50: 7.3,  edat_75: 8.4,  edat_95: 10.5, detall: "Busca un objecte que ha vist amagar (permanencia de l'objecte)." },
                { nomFita: "PORTA GOT A LA BOCA",            edat_50: 12,   edat_75: 13.8, edat_95: 17.6, detall: "Agafa un got i se'l porta a la boca per beure (pot vessar)." },
                { nomFita: "BUSCA OBJECTE CAIGUT",           edat_50: 5.8,  edat_75: 6.8,  edat_95: 8,    detall: "Busca un objecte que li ha caigut." },
                { nomFita: "MENJA AMB CULLERA",              edat_50: 14,   edat_75: 16,   edat_95: 26,   detall: "Intenta menjar sol amb una cullera (pot necessitar ajuda)." },
                { nomFita: "AJUDA QUAN EL VESTEIXEN",        edat_50: 8.2,  edat_75: 13,   edat_95: 16,   detall: "Col-labora quan el vesteixen (aixeca els bracos, les cames)." },
                { nomFita: "DONA DE MENJAR ALS NINOS",       edat_50: 18,   edat_75: 26,   edat_95: 30,   detall: "Imita l'accio de donar de menjar a ninos o peluixos." },
                { nomFita: "IMITA TASQUES CASA",             edat_50: 14,   edat_75: 15.6, edat_95: 18.5, detall: "Imita tasques domestiques simples (escombrar, netejar)." },
                { nomFita: "AJUDA A RECOLLIR JOGUINES",      edat_50: 16,   edat_75: 21,   edat_95: 26,   detall: "Col-labora en recollir les seves joguines si se li demana." },
                { nomFita: "COMPLEIX DUES ORDRES",           edat_50: 19,   edat_75: 22,   edat_95: 25,   detall: "Pot seguir dues ordres consecutives no relacionades (agafa la pilota i seu a la cadira)." }
            ]
        }
    ],
    signesAlerta: [
        { nomSigne: "Macrocefalia",                                         edat_des_de: 0,  detall: "Perimetre cefalic (PC) supera +3 desviacio estandard." },
        { nomSigne: "Microcefalia",                                         edat_des_de: 0,  detall: "PC es inferior a -2 desviacio estandard." },
        { nomSigne: "Estancament perimetre cefalic",                        edat_des_de: 0,  detall: "Tres o mes mesos sense augment d'aquest, durant el primer any de vida." },
        { nomSigne: "Moviments oculars anormals",                           edat_des_de: 0,  detall: "Presencia de moviments erratics, nistagme, en 'sol ponent', etc. No s'inclou l'estrabisme." },
        { nomSigne: "Altres moviments anormals",                            edat_des_de: 0,  detall: "Actitud distonica mans, hiperextensio cefalica, moviments cefalics repetitius d'afirmacio o negacio, etc." },
        { nomSigne: "Dismorfies obvies",                                    edat_des_de: 0,  detall: "Malformacions fisiques evidents." },
        { nomSigne: "Arreflectivitat osteotendinosa generalitzada",         edat_des_de: 0,  detall: "Absencia de reflexos en tendons, d'especial valor en rotulians i aquilis." },
        { nomSigne: "Sobresalt exagerat",                                   edat_des_de: 2,  detall: "Per qualsevol soroll inesperat." },
        { nomSigne: "Polze adduIt",                                         edat_des_de: 2,  detall: "El dit polze es mante flexionat i tancat dins del puny. Te mes valor si es unilateral." },
        { nomSigne: "Asimetria d'activitat amb les mans",                   edat_des_de: 3,  detall: "Us predominant o exclusiu d'una ma abans de l'edat esperada per a la lateralitzacio." },
        { nomSigne: "Passivitat excessiva",                                 edat_des_de: 4,  detall: "El nen/a passa la major part del temps dormint o be quan esta despert no reclama l'atencio de l'adult amb sons, plors, etc." },
        { nomSigne: "Hipertonia adductors / Angle adductors menor de 90%", edat_des_de: 4,  detall: "Excessiva tensio als muscles adductors de les cuixes, dificultant la seva separacio." },
        { nomSigne: "Moro persistent / Persisteix Moro",                   edat_des_de: 6,  detall: "El reflex de Moro (resposta de sobresalt amb extensio de bracos) persisteix mes enlla dels 6 mesos." },
        { nomSigne: "Patro de conducta repetitiu mes del 50% del temps",   edat_des_de: 8,  detall: "Realitza estereotipies com, per exemple, gronxar-se assegut, pronacio, supinacio avantbrac." },
        { nomSigne: "Absencia desplacament autonom",                        edat_des_de: 9,  detall: "Incapacitat de desplacar-se, tot sol, mes de 2 metres (gatejar, reptar, caminar)." },
        { nomSigne: "Irritabilitat permanent",                              edat_des_de: 12, detall: "Plor incoercible que no es tranquil-litza quan se'l bressola o se l'agafa en bracos." },
        { nomSigne: "Passa constantment d'una activitat a l'altra",         edat_des_de: 16, detall: "Dificultat per mantenir l'atencio en una activitat durant un periode adequat a la seva edat." },
        { nomSigne: "Estereotipies verbals",                                edat_des_de: 24, detall: "Repeteix habitualment de forma automatica i sense finalitat comunicativa frases estructurades fora de context." },
        { nomSigne: "Incapacitat per fer joc simbolic",                     edat_des_de: 24, detall: "Si el nen/a no es capac de jugar a reproduir situacions o accions amb els objectes, joguines, ninos o nines, etc." }
    ]
};
