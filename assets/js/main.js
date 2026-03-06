'use strict';

// ---------------------------------------------------------------------------
// Estat global compartit entre chart.js, pdf.js i main.js
// ---------------------------------------------------------------------------
let edatPrecisaInfant = {
    totalMesosComplets:            null,
    diesTranscorregutsEnMesActual: null,
    diesEnElMesActualDeEdat:       null
};

// ---------------------------------------------------------------------------
// Calcul d'edat a partir de la data de naixement
// ---------------------------------------------------------------------------
function calcularMesosDesdeData() {
    const dataNaixementInput = document.getElementById('dataNaixement');
    const edatInfantInput    = document.getElementById('edatInfant');
    const dataNaixementStr   = dataNaixementInput.value;

    if (!dataNaixementStr) {
        edatInfantInput.value = '';
        edatPrecisaInfant     = { totalMesosComplets: null, diesTranscorregutsEnMesActual: null, diesEnElMesActualDeEdat: null };
        actualitzarVisualitzacio();
        return;
    }

    const dataNaix = new Date(dataNaixementStr);
    const avui     = new Date();

    if (dataNaix > avui) {
        edatInfantInput.value = '';
        edatPrecisaInfant     = { totalMesosComplets: null, diesTranscorregutsEnMesActual: null, diesEnElMesActualDeEdat: null };
        // Mostrar missatge d'error inline
        const inputRect = dataNaixementInput.getBoundingClientRect();
        mostrarTooltip('La data de naixement no pot ser futura.', {
            pageX: inputRect.left + window.scrollX,
            pageY: inputRect.bottom + window.scrollY + 5
        });
        setTimeout(amagarTooltip, 3000);
        actualitzarVisualitzacio();
        return;
    }

    let anys  = avui.getFullYear() - dataNaix.getFullYear();
    let mesos = avui.getMonth()    - dataNaix.getMonth();
    let dies  = avui.getDate()     - dataNaix.getDate();

    if (dies < 0) {
        mesos--;
        dies += new Date(avui.getFullYear(), avui.getMonth(), 0).getDate();
    }
    if (mesos < 0) {
        anys--;
        mesos += 12;
    }

    const totalMesos = (anys * 12) + mesos;

    if (totalMesos < 0) {
        edatInfantInput.value = '';
        edatPrecisaInfant     = { totalMesosComplets: null, diesTranscorregutsEnMesActual: null, diesEnElMesActualDeEdat: null };
        actualitzarVisualitzacio();
        return;
    }

    // Dies del mes de referencia per calcular la fraccio
    const mesRef      = new Date(dataNaix.getFullYear(), dataNaix.getMonth() + totalMesos, 1);
    const diesDelMes  = new Date(mesRef.getFullYear(), mesRef.getMonth() + 1, 0).getDate();

    edatPrecisaInfant = {
        totalMesosComplets:            totalMesos,
        diesTranscorregutsEnMesActual: dies,
        diesEnElMesActualDeEdat:       diesDelMes
    };

    edatInfantInput.value = totalMesos;
    actualitzarVisualitzacio();
}

// ---------------------------------------------------------------------------
// Inicialitzacio i event listeners
// ---------------------------------------------------------------------------
let resizeTimer;

document.addEventListener('DOMContentLoaded', () => {
    // Limitar edat maxima al grafic
    document.getElementById('edatInfant').max = MAX_MESOS_GRAFIC;

    // Construir taula i grafic
    initTaula();

    // Doble rAF per garantir que el DOM esta completament pintat
    requestAnimationFrame(() => requestAnimationFrame(actualitzarVisualitzacio));

    // Boton PDF
    document.getElementById('desarPdfBtn').addEventListener('click', generarResumPDF);

    // Data de naixement
    document.getElementById('dataNaixement').addEventListener('change', calcularMesosDesdeData);

    // Edat manual en mesos
    document.getElementById('edatInfant').addEventListener('change', () => {
        const input  = document.getElementById('edatInfant');
        const valor  = input.value;

        if (valor === '') {
            edatPrecisaInfant = { totalMesosComplets: null, diesTranscorregutsEnMesActual: null, diesEnElMesActualDeEdat: null };
            requestAnimationFrame(actualitzarVisualitzacio);
            return;
        }

        const parsed = parseFloat(valor);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= MAX_MESOS_GRAFIC) {
            const mesosComplets = Math.floor(parsed);
            input.value         = mesosComplets;

            let diesDelMes = 30.4375;
            const dnInput  = document.getElementById('dataNaixement');
            if (dnInput.value) {
                const dn     = new Date(dnInput.value);
                const mesRef = new Date(dn.getFullYear(), dn.getMonth() + mesosComplets, 1);
                diesDelMes   = new Date(mesRef.getFullYear(), mesRef.getMonth() + 1, 0).getDate();
            }

            edatPrecisaInfant = {
                totalMesosComplets:            mesosComplets,
                diesTranscorregutsEnMesActual: 0,
                diesEnElMesActualDeEdat:       diesDelMes
            };
        } else {
            input.value   = '';
            edatPrecisaInfant = { totalMesosComplets: null, diesTranscorregutsEnMesActual: null, diesEnElMesActualDeEdat: null };
        }

        requestAnimationFrame(actualitzarVisualitzacio);
    });

    // Resize amb debounce (evita recalculs cada pixel)
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateLeftColumnWidth();
            const offset = getCurrentTimelineStartOffset();
            document.getElementById('verticalGuideLinesContainer').style.left = `${offset}px`;
            requestAnimationFrame(actualitzarVisualitzacio);
        }, 100);
    });
});
