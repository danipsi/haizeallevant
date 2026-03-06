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
// Reset complet de la valoracio
// ---------------------------------------------------------------------------
function realitzarReset() {
    document.getElementById('nomInfant').value      = '';
    document.getElementById('dataNaixement').value  = '';
    document.getElementById('edatInfant').value     = '';
    const obsEl = document.getElementById('observacions');
    if (obsEl) {
        obsEl.value = '';
        document.getElementById('comptadorObs').textContent = '0';
        document.getElementById('comptadorObsWrapper').classList.remove('comptador--limit');
    }

    edatPrecisaInfant = { totalMesosComplets: null, diesTranscorregutsEnMesActual: null, diesEnElMesActualDeEdat: null };

    // Desmarcar totes les fites i netejar estats visuals
    dadesDesenvolupament.categories.forEach(cat => {
        cat.fites.forEach(fita => {
            const cb = document.getElementById(`check-${generarIdSegur(fita.nomFita)}`);
            if (!cb) return;
            cb.checked = false;
            const row = document.getElementById(`fita-row-${generarIdSegur(fita.nomFita)}`);
            if (row) {
                row.classList.remove('fita-seleccionada', 'fita-atencio', 'fita-preocupant', 'fita-critica');
                const nc = row.querySelector('.fita-name-container');
                if (nc) nc.classList.remove('fita-name--atencio', 'fita-name--preocupant', 'fita-name--critica');
            }
        });
    });

    // Desmarcar tots els signes
    dadesDesenvolupament.signesAlerta.forEach(signe => {
        const cb = document.getElementById(`check-signe-${generarIdSegur(signe.nomSigne)}`);
        if (cb) cb.checked = false;
    });

    // Restablir toggle de signes
    const signesContainer = document.getElementById('signesAlertaContainer');
    signesContainer.dataset.mostrantTots = 'false';
    const toggleBtn = document.getElementById('toggleSignesBtn');
    toggleBtn.textContent = 'Mostrar tots els signes';
    toggleBtn.setAttribute('aria-pressed', 'false');

    requestAnimationFrame(actualitzarVisualitzacio);
}

// ---------------------------------------------------------------------------
// Inicialitzacio i event listeners
// ---------------------------------------------------------------------------
let resizeTimer;
let resetPendent = false;
let resetTimer;

document.addEventListener('DOMContentLoaded', () => {
    // Limitar edat maxima al grafic
    document.getElementById('edatInfant').max = MAX_MESOS_GRAFIC;

    // Construir taula i grafic
    initTaula();

    // Doble rAF per garantir que el DOM esta completament pintat
    requestAnimationFrame(() => requestAnimationFrame(actualitzarVisualitzacio));

    // Boton PDF
    document.getElementById('desarPdfBtn').addEventListener('click', generarResumPDF);

    // Toggle: mostrar/amagar signes d'alerta no rellevants per l'edat
    document.getElementById('toggleSignesBtn').addEventListener('click', function () {
        const container    = document.getElementById('signesAlertaContainer');
        const mostrantTots = container.dataset.mostrantTots === 'true';
        const nouEstat     = !mostrantTots;

        container.dataset.mostrantTots = nouEstat;
        this.textContent   = nouEstat ? 'Amagar no rellevants' : 'Mostrar tots els signes';
        this.setAttribute('aria-pressed', nouEstat);

        // Si ara mostrem tots, afegir classe per restaurar interaccio visual
        document.querySelectorAll('.signe-no-rellevant').forEach(el => {
            el.classList.toggle('signe-forcat-visible', nouEstat);
        });

        requestAnimationFrame(actualitzarVisualitzacio);
    });

    // Acordio d'instruccions
    const instrToggle   = document.getElementById('instruccionsToggle');
    const instrContingut = document.getElementById('instruccionsContingut');
    const estatGuardat  = sessionStorage.getItem('instruccionsObert');
    // Per defecte obert (null = primera visita), tancat si l'usuari el va tancar
    if (estatGuardat === 'false') {
        instrToggle.setAttribute('aria-expanded', 'false');
        instrContingut.hidden = true;
    }
    instrToggle.addEventListener('click', function () {
        const estaObert = this.getAttribute('aria-expanded') === 'true';
        const nouEstat  = !estaObert;
        this.setAttribute('aria-expanded', nouEstat);
        instrContingut.hidden = !nouEstat;
        sessionStorage.setItem('instruccionsObert', nouEstat);
    });

    // Comptador d'observacions
    const obsEl = document.getElementById('observacions');
    if (obsEl) {
        obsEl.addEventListener('input', function () {
            const len     = this.value.length;
            const counter = document.getElementById('comptadorObs');
            const wrapper = document.getElementById('comptadorObsWrapper');
            counter.textContent = len;
            wrapper.classList.toggle('comptador--limit', len >= 450);
        });
    }

    // Boton Nova valoracio (confirmacio en dos clics)
    document.getElementById('novaValoracioBtn').addEventListener('click', function () {
        if (!resetPendent) {
            resetPendent      = true;
            this.textContent  = 'Segur? (cliqueu de nou per confirmar)';
            this.classList.add('nova-valoracio-btn--confirmar');
            resetTimer = setTimeout(() => {
                resetPendent     = false;
                this.textContent = 'Nova valoracio';
                this.classList.remove('nova-valoracio-btn--confirmar');
            }, 3000);
        } else {
            clearTimeout(resetTimer);
            resetPendent     = false;
            this.textContent = 'Nova valoracio';
            this.classList.remove('nova-valoracio-btn--confirmar');
            realitzarReset();
        }
    });

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
