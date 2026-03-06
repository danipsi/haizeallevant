'use strict';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MAX_MESOS_GRAFIC           = 30;
const MONTH_COLUMN_WIDTH_PX      = 35;
const FITA_NAME_SPACE_PX_DESKTOP = 200;
const FITA_NAME_SPACE_PX_MOBILE  = 150;

document.documentElement.style.setProperty('--month-col-width', `${MONTH_COLUMN_WIDTH_PX}px`);

// ---------------------------------------------------------------------------
// Helpers de layout
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
// Lògica clínica: estat d'una fita per l'edat actual
// ---------------------------------------------------------------------------
/**
 * Retorna 'critica' | 'preocupant' | 'atencio' | null
 * - critica:    l'infant ha superat el P95 i encara no l'ha assolida (molt preocupant)
 * - preocupant: entre P75 i P95
 * - atencio:    entre P50 i P75
 * - null:       l'edat es inferior al P50 o no hi ha edat introduida
 */
function calcularEstatFita(fita, edatMesos) {
    if (edatMesos === null) return null;
    if (edatMesos >= fita.edat_95) return 'critica';
    if (edatMesos >= fita.edat_75) return 'preocupant';
    if (edatMesos >= fita.edat_50) return 'atencio';
    return null;
}

/**
 * Aplica la classe d'estat correcta a una fila de fita.
 * Nomes s'aplica si el checkbox esta marcat (fita NO assolida).
 */
function actualitzarEstatFitaRow(fitaRow, fita) {
    fitaRow.classList.remove('fita-atencio', 'fita-preocupant', 'fita-critica');

    if (!fitaRow.classList.contains('fita-seleccionada')) return;

    const estat = calcularEstatFita(fita, edatPrecisaInfant.totalMesosComplets);
    if (estat) fitaRow.classList.add(`fita-${estat}`);

    // Sincronitza el color de fons de la columna fixa (sticky)
    const nameContainer = fitaRow.querySelector('.fita-name-container');
    if (nameContainer) {
        nameContainer.classList.remove('fita-name--atencio', 'fita-name--preocupant', 'fita-name--critica');
        if (estat) nameContainer.classList.add(`fita-name--${estat}`);
    }
}

// ---------------------------------------------------------------------------
// Panell de resum dinàmic
// ---------------------------------------------------------------------------
function actualitzarResum() {
    const resumPanel = document.getElementById('resumPanel');
    if (!resumPanel) return;

    const edatMesos = edatPrecisaInfant.totalMesosComplets;

    if (edatMesos === null) {
        resumPanel.className   = 'resum-panel resum-panel--buit';
        resumPanel.innerHTML   = '<p class="resum-hint">Introduiu l\'edat de l\'infant per veure el resum de la valoracio.</p>';
        return;
    }

    // Comptatge de fites per estat
    let totalMarcades = 0, critiques = 0, preocupants = 0;
    dadesDesenvolupament.categories.forEach(cat => {
        cat.fites.forEach(fita => {
            const cb = document.getElementById(`check-${generarIdSegur(fita.nomFita)}`);
            if (!cb || !cb.checked) return;
            totalMarcades++;
            const estat = calcularEstatFita(fita, edatMesos);
            if (estat === 'critica')    critiques++;
            else if (estat === 'preocupant') preocupants++;
        });
    });

    // Comptatge de signes d'alerta marcats
    let signesMarcats = 0;
    dadesDesenvolupament.signesAlerta.forEach(signe => {
        const cb = document.getElementById(`check-signe-${generarIdSegur(signe.nomSigne)}`);
        if (cb && cb.checked) signesMarcats++;
    });

    // Nivell global de la valoracio
    let nivell = 'ok';
    if (critiques > 0 || signesMarcats > 0) nivell = 'critica';
    else if (preocupants > 0)               nivell = 'atencio';

    // Construeix el HTML del panell
    const icones = { critica: '⚠', atencio: '◉', ok: '✓' };

    let html = `<div class="resum-titol">${icones[nivell]} Resum de la valoracio — ${edatMesos} mesos</div>`;
    html += '<div class="resum-grid">';
    html += `<div class="resum-item">
                <span class="resum-num">${totalMarcades}</span>
                <span class="resum-label">fites no assolides</span>
             </div>`;
    if (critiques > 0) {
        html += `<div class="resum-item resum-item--critica">
                    <span class="resum-num">${critiques}</span>
                    <span class="resum-label">superen el P95 ⚠</span>
                 </div>`;
    }
    if (preocupants > 0) {
        html += `<div class="resum-item resum-item--preocupant">
                    <span class="resum-num">${preocupants}</span>
                    <span class="resum-label">entre P75 i P95</span>
                 </div>`;
    }
    html += `<div class="resum-item${signesMarcats > 0 ? ' resum-item--critica' : ''}">
                <span class="resum-num">${signesMarcats}</span>
                <span class="resum-label">signes d'alerta</span>
             </div>`;
    html += '</div>';

    const missatges = {
        critica: '⚠ Es recomana valoracio professional: hi ha fites que superen el P95 o signes d\'alerta presents.',
        atencio: 'Seguiment proper recomanat: hi ha fites no assolides properes al P95.',
        ok: totalMarcades > 0
            ? 'Les fites no assolides estan dins dels rangs d\'edat esperats. Continuar el seguiment habitual.'
            : 'Cap fita marcada com a no assolida ni signe d\'alerta present.'
    };
    html += `<div class="resum-recomanacio resum-recomanacio--${nivell}">${missatges[nivell]}</div>`;

    resumPanel.className = `resum-panel resum-panel--${nivell}`;
    resumPanel.innerHTML = html;

    // Indicadors de progrés
    const totalFites  = dadesDesenvolupament.categories.reduce((acc, cat) => acc + cat.fites.length, 0);
    const totalSignes = dadesDesenvolupament.signesAlerta.length;

    const progFites = document.getElementById('progressFites');
    if (progFites) progFites.textContent = `Fites marcades: ${totalMarcades} de ${totalFites}`;

    const progSignes = document.getElementById('progressSignes');
    if (progSignes) progSignes.textContent = `Signes marcats: ${signesMarcats} de ${totalSignes}`;
}

// ---------------------------------------------------------------------------
// Construcció de la taula
// ---------------------------------------------------------------------------
function initTaula() {
    tooltipElement = document.getElementById('tooltip');

    const categoriesContainer   = document.getElementById('categoriesContainer');
    const signesAlertaContainer = document.getElementById('signesAlertaContainer');
    const timelineHeader        = document.getElementById('timelineHeader');

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
            const ttText = `<strong>${fita.nomFita}</strong><br>${fita.detall}<br><small>Edats: ${fita.edat_50}m (50%) - ${fita.edat_75}m (75%) - ${fita.edat_95}m (95%)</small>`;

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
                actualitzarEstatFitaRow(fitaRow, fita);
                actualitzarResum();
            });

            const nameSpan = document.createElement('span');
            nameSpan.textContent = fita.nomFita;

            nameContainer.appendChild(checkbox);
            nameContainer.appendChild(nameSpan);
            nameContainer.addEventListener('mousemove', e => mostrarTooltip(ttText, e));
            nameContainer.addEventListener('mouseout',  amagarTooltip);

            // Barra de temps
            const outerBars = document.createElement('div');
            outerBars.className = 'fita-bars-outer-container';

            const barsContainer = document.createElement('div');
            barsContainer.className   = 'fita-bars-container';
            barsContainer.style.width = `${MAX_MESOS_GRAFIC * MONTH_COLUMN_WIDTH_PX}px`;

            const barDiv = document.createElement('div');
            barDiv.className = 'fita-bar';

            const seg1 = document.createElement('div');
            seg1.className = 'fita-bar-segment1';
            const seg2 = document.createElement('div');
            seg2.className = 'fita-bar-segment2';

            barDiv.appendChild(seg1);
            barDiv.appendChild(seg2);
            barDiv.addEventListener('mousemove', e => mostrarTooltip(ttText, e));
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
        checkboxSigne.type             = 'checkbox';
        checkboxSigne.id               = `check-signe-${generarIdSegur(signe.nomSigne)}`;
        checkboxSigne.dataset.signeNom = signe.nomSigne;

        // Quan es marca un signe, actualitzar el resum
        checkboxSigne.addEventListener('change', actualitzarResum);

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
// Actualitzacio visual completa
// ---------------------------------------------------------------------------
function actualitzarVisualitzacio() {
    const timelineHeader              = document.getElementById('timelineHeader');
    const categoriesContainer         = document.getElementById('categoriesContainer');
    const ageLine                     = document.getElementById('ageLine');
    const verticalGuideLinesContainer = document.getElementById('verticalGuideLinesContainer');
    const edatInfantInput             = document.getElementById('edatInfant');
    const signesAlertaContainer       = document.getElementById('signesAlertaContainer');

    const edatMesosComplets  = edatPrecisaInfant.totalMesosComplets;
    const diesTranscorreguts = edatPrecisaInfant.diesTranscorregutsEnMesActual;
    const diesDelMes         = edatPrecisaInfant.diesEnElMesActualDeEdat || 30.4375;

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
        guide.className  = 'vertical-guide-line';
        guide.style.left = `${i * MONTH_COLUMN_WIDTH_PX}px`;
        guide.style.height = '100%';
        verticalGuideLinesContainer.appendChild(guide);
    }

    // Barres de cada fita + estat clínic
    dadesDesenvolupament.categories.forEach(categoria => {
        categoria.fites.forEach(fita => {
            const barDiv = document.querySelector(`#fita-row-${generarIdSegur(fita.nomFita)} .fita-bar`);
            if (barDiv) {
                const barLeftPx           = (fita.edat_50 - 1) * MONTH_COLUMN_WIDTH_PX;
                const totalBarWidthMonths = Math.max(0, fita.edat_95 - fita.edat_50);
                const barWidthPx          = totalBarWidthMonths * MONTH_COLUMN_WIDTH_PX;

                barDiv.style.left  = `${barLeftPx}px`;
                barDiv.style.width = `${barWidthPx}px`;

                const seg1 = barDiv.querySelector('.fita-bar-segment1');
                const seg2 = barDiv.querySelector('.fita-bar-segment2');
                if (seg1 && seg2 && totalBarWidthMonths > 0) {
                    seg1.style.width = `${(Math.max(0, fita.edat_75 - fita.edat_50) / totalBarWidthMonths) * 100}%`;
                    seg2.style.width = `${(Math.max(0, fita.edat_95 - fita.edat_75) / totalBarWidthMonths) * 100}%`;
                }
            }

            // Actualitzar l'estat clínic de la fila
            const fitaRow = document.getElementById(`fita-row-${generarIdSegur(fita.nomFita)}`);
            if (fitaRow) actualitzarEstatFitaRow(fitaRow, fita);
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

    // Signes d'alerta: colorat + filtratge per rellevancia d'edat
    const edatInputMesos = parseFloat(edatInfantInput.value);
    const hiHaEdat       = !isNaN(edatInputMesos);
    const mostrantTots   = signesAlertaContainer?.dataset.mostrantTots === 'true';

    dadesDesenvolupament.signesAlerta.forEach(signe => {
        const sc = document.getElementById(`signe-container-${generarIdSegur(signe.nomSigne)}`);
        if (!sc) return;

        const esRellevant = hiHaEdat && edatInputMesos >= signe.edat_des_de;

        sc.classList.remove('alerta-activa', 'no-esperada-alerta');
        sc.classList.add(esRellevant ? 'alerta-activa' : 'no-esperada-alerta');

        // Atenuar signes no rellevants (amagar si no s'esta mostrant tot)
        sc.classList.toggle('signe-no-rellevant', hiHaEdat && !esRellevant && !mostrantTots);
    });

    // Actualitzar resum
    actualitzarResum();
}
