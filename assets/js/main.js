'use strict';

let estatEdatInfant = {
    origen: null,
    edatCronologicaMesos: null,
    edatAvaluacioMesos: null,
    mesosComplets: null,
    diesTranscorreguts: null,
    correccioMesos: 0,
    aplicaCorreccio: false
};

let resizeTimer;
let resetPendent = false;
let resetTimer;

function formatNombre(valor, decimals = 1) {
    return new Intl.NumberFormat('ca-ES', { maximumFractionDigits: decimals }).format(valor);
}

function dataLocalIso(data) {
    const any = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${any}-${mes}-${dia}`;
}

function mostrarErrorCamp(id, missatge = '') {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = missatge;
    element.hidden = !missatge;
}

function restablirEstatEdat() {
    estatEdatInfant = {
        origen: null,
        edatCronologicaMesos: null,
        edatAvaluacioMesos: null,
        mesosComplets: null,
        diesTranscorreguts: null,
        correccioMesos: 0,
        aplicaCorreccio: false
    };
}

function actualitzarEdatAvaluacio(edatCronologicaMesos, dadesCalendari = null, origen = null) {
    if (!Number.isFinite(edatCronologicaMesos)) {
        restablirEstatEdat();
        document.getElementById('edatAvaluacioInfo').textContent = '';
        requestAnimationFrame(actualitzarVisualitzacio);
        return;
    }

    const esPrematur = document.getElementById('infantPrematur').checked;
    const valorSetmanes = document.getElementById('setmanesGestacio').value;
    const setmanes = valorSetmanes === '' ? Number.NaN : Number(valorSetmanes);
    const resultat = calcularEdatAvaluacio(edatCronologicaMesos, esPrematur, setmanes);

    estatEdatInfant = {
        origen,
        edatCronologicaMesos: resultat.edatCronologicaMesos,
        edatAvaluacioMesos: resultat.edatAvaluacioMesos,
        mesosComplets: dadesCalendari?.mesosComplets ?? Math.floor(edatCronologicaMesos),
        diesTranscorreguts: dadesCalendari?.diesTranscorreguts ?? null,
        correccioMesos: resultat.correccioMesos,
        aplicaCorreccio: resultat.aplicaCorreccio
    };

    const info = document.getElementById('edatAvaluacioInfo');
    let text = `Edat cronològica: ${formatNombre(resultat.edatCronologicaMesos)} mesos.`;
    if (resultat.aplicaCorreccio) {
        text += ` Edat corregida utilitzada al gràfic: ${formatNombre(resultat.edatAvaluacioMesos)} mesos.`;
    } else if (esPrematur && Number.isFinite(setmanes) && edatCronologicaMesos >= LIMIT_EDAT_CORREGIDA_MESOS) {
        text += ` No s’aplica correcció perquè l’edat és igual o superior a ${LIMIT_EDAT_CORREGIDA_MESOS} mesos.`;
    } else if (esPrematur && !Number.isFinite(setmanes)) {
        text += ' Indiqueu les setmanes de gestació per calcular l’edat corregida.';
    }
    info.textContent = text;
    requestAnimationFrame(actualitzarVisualitzacio);
}

function recalcularEdat() {
    const dataInput = document.getElementById('dataNaixement');
    const edatInput = document.getElementById('edatInfant');
    mostrarErrorCamp('errorDataNaixement');
    mostrarErrorCamp('errorEdatInfant');
    mostrarErrorCamp('errorSetmanesGestacio');

    const prematur = document.getElementById('infantPrematur').checked;
    const valorSetmanes = document.getElementById('setmanesGestacio').value;
    const setmanes = valorSetmanes === '' ? Number.NaN : Number(valorSetmanes);
    if (prematur && valorSetmanes !== '' && (!Number.isInteger(setmanes) || setmanes < 22 || setmanes > 36)) {
        mostrarErrorCamp('errorSetmanesGestacio', 'Introduïu un nombre enter entre 22 i 36 setmanes.');
    }

    if (dataInput.value) {
        const resultat = calcularEdatCronologica(dataInput.value);
        if (!resultat) {
            mostrarErrorCamp('errorDataNaixement', 'Introduïu una data vàlida que no sigui futura.');
            actualitzarEdatAvaluacio(null);
            return;
        }
        if (resultat.mesosDecimals > MAX_MESOS_GRAFIC) {
            mostrarErrorCamp('errorDataNaixement', `Aquesta selecció de fites arriba fins als ${MAX_MESOS_GRAFIC} mesos.`);
            actualitzarEdatAvaluacio(null);
            return;
        }
        edatInput.value = '';
        actualitzarEdatAvaluacio(resultat.mesosDecimals, resultat, 'data');
        return;
    }

    if (edatInput.value === '') {
        actualitzarEdatAvaluacio(null);
        return;
    }

    const edat = Number(edatInput.value);
    if (!Number.isFinite(edat) || edat < 0 || edat > MAX_MESOS_GRAFIC) {
        mostrarErrorCamp('errorEdatInfant', `Introduïu una edat entre 0 i ${MAX_MESOS_GRAFIC} mesos.`);
        actualitzarEdatAvaluacio(null);
        return;
    }
    actualitzarEdatAvaluacio(edat, null, 'manual');
}

function teValoracioEnCurs() {
    if (document.getElementById('identificadorInfant')?.value) return true;
    if (document.getElementById('observacions')?.value || document.getElementById('preocupacionsFamilia')?.value) return true;
    if (document.querySelector('.fita-estat-select option:checked:not([value=""])')) return true;
    if (document.querySelector('.signe-estat-select option:checked:not([value=""])')) return true;
    return false;
}

function actualitzarBotoVista() {
    const boto = document.getElementById('toggleVistaBtn');
    if (!boto) return;
    const esMobil = window.matchMedia('(max-width: 640px)').matches;
    const classeActiva = document.body.classList.contains('vista-llista');
    const mostraLlista = esMobil ? !classeActiva : classeActiva;
    boto.setAttribute('aria-pressed', String(mostraLlista));
    boto.textContent = mostraLlista ? 'Mostra el gràfic' : 'Mostra la vista de llista';
}

function realitzarReset() {
    ['identificadorInfant', 'dataNaixement', 'edatInfant', 'setmanesGestacio', 'preocupacionsFamilia', 'observacions']
        .forEach(id => { const element = document.getElementById(id); if (element) element.value = ''; });
    document.getElementById('infantPrematur').checked = false;
    document.getElementById('setmanesGestacioWrapper').hidden = true;
    document.querySelectorAll('.fita-estat-select, .signe-estat-select').forEach(select => { select.value = ''; });
    document.getElementById('comptadorObs').textContent = '0';
    document.getElementById('comptadorObsWrapper').classList.remove('comptador--limit');
    ['errorDataNaixement', 'errorEdatInfant', 'errorSetmanesGestacio'].forEach(id => mostrarErrorCamp(id));
    restablirEstatEdat();

    const signesContainer = document.getElementById('signesAlertaContainer');
    signesContainer.dataset.mostrantTots = 'false';
    const toggleSignes = document.getElementById('toggleSignesBtn');
    toggleSignes.textContent = 'Mostra tots els signes';
    toggleSignes.setAttribute('aria-pressed', 'false');

    document.body.classList.remove('vista-llista');
    actualitzarBotoVista();
    document.getElementById('edatAvaluacioInfo').textContent = '';
    requestAnimationFrame(actualitzarVisualitzacio);
    document.getElementById('identificadorInfant').focus();
}

document.addEventListener('DOMContentLoaded', () => {
    const dataNaixement = document.getElementById('dataNaixement');
    const edatInfant = document.getElementById('edatInfant');
    dataNaixement.max = dataLocalIso(new Date());
    edatInfant.max = MAX_MESOS_GRAFIC;
    document.getElementById('versioDades').textContent = METADADES_INSTRUMENT.versioDades;

    initTaula();
    actualitzarBotoVista();
    requestAnimationFrame(() => requestAnimationFrame(actualitzarVisualitzacio));

    document.getElementById('toggleVistaBtn').addEventListener('click', function () {
        document.body.classList.toggle('vista-llista');
        actualitzarBotoVista();
    });

    document.getElementById('desarPdfBtn').addEventListener('click', generarResumPDF);

    document.getElementById('toggleSignesBtn').addEventListener('click', function () {
        const container = document.getElementById('signesAlertaContainer');
        const nouEstat = container.dataset.mostrantTots !== 'true';
        container.dataset.mostrantTots = String(nouEstat);
        this.textContent = nouEstat ? 'Mostra només els rellevants per edat' : 'Mostra tots els signes';
        this.setAttribute('aria-pressed', String(nouEstat));
        requestAnimationFrame(actualitzarVisualitzacio);
    });

    const instruccionsToggle = document.getElementById('instruccionsToggle');
    const instruccionsContingut = document.getElementById('instruccionsContingut');
    if (sessionStorage.getItem('instruccionsObert') === 'false') {
        instruccionsToggle.setAttribute('aria-expanded', 'false');
        instruccionsContingut.hidden = true;
    }
    instruccionsToggle.addEventListener('click', function () {
        const nouEstat = this.getAttribute('aria-expanded') !== 'true';
        this.setAttribute('aria-expanded', String(nouEstat));
        instruccionsContingut.hidden = !nouEstat;
        sessionStorage.setItem('instruccionsObert', String(nouEstat));
    });

    const observacions = document.getElementById('observacions');
    observacions.addEventListener('input', function () {
        document.getElementById('comptadorObs').textContent = this.value.length;
        document.getElementById('comptadorObsWrapper').classList.toggle('comptador--limit', this.value.length >= 450);
    });
    document.getElementById('preocupacionsFamilia').addEventListener('input', actualitzarResum);

    document.getElementById('novaValoracioBtn').addEventListener('click', function () {
        if (!resetPendent && teValoracioEnCurs()) {
            resetPendent = true;
            this.textContent = 'Confirmeu que voleu esborrar-la';
            this.classList.add('nova-valoracio-btn--confirmar');
            resetTimer = setTimeout(() => {
                resetPendent = false;
                this.textContent = 'Esborra la valoració';
                this.classList.remove('nova-valoracio-btn--confirmar');
            }, 4000);
            return;
        }
        clearTimeout(resetTimer);
        resetPendent = false;
        this.textContent = 'Esborra la valoració';
        this.classList.remove('nova-valoracio-btn--confirmar');
        realitzarReset();
    });

    dataNaixement.addEventListener('change', recalcularEdat);
    edatInfant.addEventListener('input', () => {
        if (edatInfant.value !== '') {
            dataNaixement.value = '';
            mostrarErrorCamp('errorDataNaixement');
        }
        recalcularEdat();
    });

    const infantPrematur = document.getElementById('infantPrematur');
    infantPrematur.addEventListener('change', () => {
        document.getElementById('setmanesGestacioWrapper').hidden = !infantPrematur.checked;
        if (!infantPrematur.checked) document.getElementById('setmanesGestacio').value = '';
        recalcularEdat();
    });
    document.getElementById('setmanesGestacio').addEventListener('input', function () {
        recalcularEdat();
    });

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateLeftColumnWidth();
            actualitzarBotoVista();
            requestAnimationFrame(actualitzarVisualitzacio);
        }, 100);
    });

    window.addEventListener('beforeunload', event => {
        if (!teValoracioEnCurs()) return;
        event.preventDefault();
        event.returnValue = '';
    });
});
