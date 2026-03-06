'use strict';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MAX_MESOS_GRAFIC          = 30;
const MONTH_COLUMN_WIDTH_PX     = 35;
const FITA_NAME_SPACE_PX_DESKTOP = 200;
const FITA_NAME_SPACE_PX_MOBILE  = 150;

// Aplica variables CSS globals
document.documentElement.style.setProperty('--month-col-width', `${MONTH_COLUMN_WIDTH_PX}px`);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function updateLeftColumnWidth() {
    const w = window.innerWidth <= 768 ? FITA_NAME_SPACE_PX_MOBILE : FITA_NAME_SPACE_PX_DESKTOP;
    document.documentElement.style.setProperty('--left-column-width', `${w}px`);
}
updateLeftColumnWidth();

function getCurrentTimelineStartOffset() {
    return window.innerWidth <= 768 ? FITA_NAME_SPACE_PX_MOBILE : FITA_NAME_SPACE_PX_DESKTOP;
}

function generarIdSegur(text) {
    return text.toLowerCase().replace(/[^\wA-Za-z0-9-]+/g, '-');
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------
let tooltipElement;

function mostrarTooltip(text, event) {
    if (!tooltipElement) return;
    tooltipElement.innerHTML = text;
    tooltipElement.classList.remove('hidden');

    const tw = tooltipElement.offsetWidth;
    const th = tooltipElement.offsetHeight;
    const ox = 15;
    const oy = 15;

    let nx = event.pageX + ox;
    let ny = event.pageY + oy;

    if (nx + tw > window.scrollX + window.innerWidth)  { nx = event.pageX - tw - ox; }
    if (nx < window.scrollX)                            { nx = window.scrollX + 5; }
    if (ny + th > window.scrollY + window.innerHeight) { ny = event.pageY - th - oy; }
    if (ny < window.scrollY)                            { ny = window.scrollY + 5; }

    tooltipElement.style.left = `${nx}px`;
    tooltipElement.style.top  = `${ny}px`;
}

function amagarTooltip() {
    if (tooltipElement) tooltipElement.classList.add('hidden');
}

// ---------------------------------------------------------------------------
// Construcció de la taula
// ---------------------------------------------------------------------------
function initTaula() {
    tooltipElement = document.getElementById('tooltip');

    const categoriesContainer        = document.getElementById('categoriesContainer');
    const signesAlertaContainer      = document.getElementById('signesAlertaContainer');
    const timelineHeader             = document.getElementById('timelineHeader');

    categoriesContainer.innerHTML   = '';
    signesAlertaContainer.innerHTML = '';

    // Capçalera de mesos
    timelineHeader.querySelectorAll('.timeline-month').forEach(el => el.remove());
    for (let i = 1; i <= MAX_MESOS_GRAFIC; i++) {
        const div = document.createElement('div');
        div.className   = 'timeline-month';
        div.textContent = i;
        timelineHeader.appendChild(div);
    }

    // Categories i fites
    dadesDesenvolupament.categories.forEach(categoria => {
        const catDiv = document.createElement('div');
        catDiv.className = 'category-row';

        const titol = document.createElement('h4');
        titol.className   = 'category-row-title';
        titol.textContent = categoria.nom;

        const instruccio = document.createElement('p');
        instruccio.className = 'category-instruction-text no-break-text';
        instruccio.innerHTML = '(marqueu les NO&nbsp;assolides)';

        const fitesWrapper = document.createElement('div');
        categoria.fites.sort((a, b) => a.edat_50 - b.edat_50);

        categoria.fites.forEach(fita => {
            const tooltipText = `<strong>${fita.nomFita}</strong><br>${fita.detall}<br><small>Edats: ${fita.edat_50}m (50%) - ${fita.edat_75}m (75%) - ${fita.edat_95}m (95%)</small>`;

            const fitaRow = document.createElement('div');
            fitaRow.className = 'fita-row';
            fitaRow.id        = `fita-row-${generarIdSegur(fita.nomFita)}`;

            // Columna esquerra: checkbox + nom
            const nameContainer = document.createElement('div');
            nameContainer.className = 'fita-name-container';

            const checkbox = document.createElement('input');
            checkbox.type                  = 'checkbox';
            checkbox.id                    = `check-${generarIdSegur(fita.nomFita)}`;
            checkbox.dataset.fitaNom       = fita.nomFita;
            checkbox.dataset.fitaCategoria = categoria.nom;
            checkbox.addEventListener('change', function () {
                fitaRow.classList.toggle('fita-seleccionada', this.checked);
            });

            const nameSpan = document.createElement('span');
            nameSpan.textContent = fita.nomFita;

            nameContainer.appendChild(checkbox);
            nameContainer.appendChild(nameSpan);
            nameContainer.addEventListener('mousemove', e => mostrarTooltip(tooltipText, e));
            nameContainer.addEventListener('mouseout',  amagarTooltip);

            // Barra de temps
            const outerBars  = document.createElement('div');
            outerBars.className = 'fita-bars-outer-container';

            const barsContainer = document.createElement('div');
            barsContainer.className  = 'fita-bars-container';
            barsContainer.style.width = `${MAX_MESOS_GRAFIC * MONTH_COLUMN_WIDTH_PX}px`;

            const barDiv = document.createElement('div');
            barDiv.className = 'fita-bar';

            const seg1 = document.createElement('div');
            seg1.className = 'fita-bar-segment1';

            const seg2 = document.createElement('div');
            seg2.className = 'fita-bar-segment2';

            barDiv.appendChild(seg1);
            barDiv.appendChild(seg2);
            barDiv.addEventListener('mousemove', e => mostrarTooltip(tooltipText, e));
            barDiv.addEventListener('mouseout',  amagarTooltip);

            barsContainer.appendChild(barDiv);
            outerBars.appendChild(barsContainer);

            fitaRow.appendChild(nameContainer);
            fitaRow.appendChild(outerBars);
            fitesWrapper.appendChild(fitaRow);
        });

        catDiv.appendChild(titol);
        catDiv.appendChild(instruccio);
        catDiv.appendChild(fitesWrapper);
        categoriesContainer.appendChild(catDiv);
    });

    // Signes d'alerta
    dadesDesenvolupament.signesAlerta.forEach(signe => {
        const signeContainer = document.createElement('div');
        signeContainer.className = 'signe-alerta-item-container no-esperada-alerta';
        signeContainer.id        = `signe-container-${generarIdSegur(signe.nomSigne)}`;

        const checkboxSigne = document.createElement('input');
        checkboxSigne.type              = 'checkbox';
        checkboxSigne.id                = `check-signe-${generarIdSegur(signe.nomSigne)}`;
        checkboxSigne.dataset.signeNom  = signe.nomSigne;

        const signeText = document.createElement('span');
        signeText.textContent = signe.nomSigne;

        signeContainer.appendChild(checkboxSigne);
        signeContainer.appendChild(signeText);

        const ttSigne = `<strong>${signe.nomSigne}</strong><br>${signe.detall}` +
            (signe.edat_des_de > 0
                ? ` <small>(Considerar a partir de ${signe.edat_des_de} mesos).</small>`
                : ` <small>(Considerar a qualsevol edat).</small>`);

        signeContainer.addEventListener('mousemove', e => mostrarTooltip(ttSigne, e));
        signeContainer.addEventListener('mouseout',  amagarTooltip);

        signesAlertaContainer.appendChild(signeContainer);
    });

    requestAnimationFrame(actualitzarVisualitzacio);
}

// ---------------------------------------------------------------------------
// Actualitzacio visual (edat line + barres + alertes)
// ---------------------------------------------------------------------------
function actualitzarVisualitzacio() {
    const timelineHeader             = document.getElementById('timelineHeader');
    const categoriesContainer        = document.getElementById('categoriesContainer');
    const ageLine                    = document.getElementById('ageLine');
    const verticalGuideLinesContainer = document.getElementById('verticalGuideLinesContainer');
    const edatInfantInput            = document.getElementById('edatInfant');

    const edatMesosComplets   = edatPrecisaInfant.totalMesosComplets;
    const diesTranscorreguts  = edatPrecisaInfant.diesTranscorregutsEnMesActual;
    const diesDelMes          = edatPrecisaInfant.diesEnElMesActualDeEdat || 30.4375;

    const headerHeight        = timelineHeader.offsetHeight;
    const categoriesHeight    = categoriesContainer.offsetHeight;
    const timelineStartOffset = getCurrentTimelineStartOffset();
    const totalTimelineWidth  = MAX_MESOS_GRAFIC * MONTH_COLUMN_WIDTH_PX;

    // Guies verticals
    verticalGuideLinesContainer.innerHTML    = '';
    verticalGuideLinesContainer.style.top    = `${headerHeight}px`;
    verticalGuideLinesContainer.style.height = `${categoriesHeight}px`;
    verticalGuideLinesContainer.style.width  = `${totalTimelineWidth}px`;
    verticalGuideLinesContainer.style.left   = `${timelineStartOffset}px`;

    for (let i = 0; i < MAX_MESOS_GRAFIC; i++) {
        const guide = document.createElement('div');
        guide.className    = 'vertical-guide-line';
        guide.style.left   = `${i * MONTH_COLUMN_WIDTH_PX}px`;
        guide.style.height = '100%';
        verticalGuideLinesContainer.appendChild(guide);
    }

    // Barres de cada fita
    dadesDesenvolupament.categories.forEach(categoria => {
        categoria.fites.forEach(fita => {
            const barDiv = document.querySelector(`#fita-row-${generarIdSegur(fita.nomFita)} .fita-bar`);
            if (!barDiv) return;

            const barLeftPx           = (fita.edat_50 - 1) * MONTH_COLUMN_WIDTH_PX;
            const totalBarWidthMonths = Math.max(0, fita.edat_95 - fita.edat_50);
            const barWidthPx          = totalBarWidthMonths * MONTH_COLUMN_WIDTH_PX;

            barDiv.style.left  = `${barLeftPx}px`;
            barDiv.style.width = `${barWidthPx}px`;

            const seg1 = barDiv.querySelector('.fita-bar-segment1');
            const seg2 = barDiv.querySelector('.fita-bar-segment2');
            if (seg1 && seg2 && totalBarWidthMonths > 0) {
                const seg1Months = Math.max(0, fita.edat_75 - fita.edat_50);
                const seg2Months = Math.max(0, fita.edat_95 - fita.edat_75);
                seg1.style.width = `${(seg1Months / totalBarWidthMonths) * 100}%`;
                seg2.style.width = `${(seg2Months / totalBarWidthMonths) * 100}%`;
            }
        });
    });

    // Línia d'edat
    ageLine.style.top    = `${headerHeight}px`;
    ageLine.style.height = `${categoriesHeight}px`;

    if (edatMesosComplets !== null && edatMesosComplets >= 0) {
        const fraccioMesPx = (diesTranscorreguts !== null && diesDelMes > 0)
            ? (diesTranscorreguts / diesDelMes) * MONTH_COLUMN_WIDTH_PX
            : 0;

        let posicio = (edatMesosComplets * MONTH_COLUMN_WIDTH_PX) + fraccioMesPx;
        const maxPos = MAX_MESOS_GRAFIC * MONTH_COLUMN_WIDTH_PX;
        posicio = Math.min(Math.max(posicio, 0), maxPos);

        if (posicio < maxPos || edatMesosComplets === MAX_MESOS_GRAFIC) {
            ageLine.style.left    = `${timelineStartOffset + posicio}px`;
            ageLine.style.display = 'block';
        } else {
            ageLine.style.display = 'none';
        }
    } else {
        ageLine.style.display = 'none';
    }

    // Signes d'alerta (activar/desactivar segons edat)
    const edatInputMesos = parseFloat(edatInfantInput.value);
    dadesDesenvolupament.signesAlerta.forEach(signe => {
        const signeContainer = document.getElementById(`signe-container-${generarIdSegur(signe.nomSigne)}`);
        if (!signeContainer) return;
        signeContainer.classList.remove('alerta-activa', 'no-esperada-alerta');
        signeContainer.classList.add(
            (!isNaN(edatInputMesos) && edatInputMesos >= signe.edat_des_de)
                ? 'alerta-activa'
                : 'no-esperada-alerta'
        );
    });
}
