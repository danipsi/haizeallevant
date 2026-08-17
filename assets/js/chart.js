'use strict';

const MAX_MESOS_GRAFIC = METADADES_INSTRUMENT.abastMesos;
const MONTH_COLUMN_WIDTH_PX = 35;
const FITA_NAME_SPACE_PX_DESKTOP = 280;
const FITA_NAME_SPACE_PX_MOBILE = 220;

document.documentElement.style.setProperty('--month-col-width', `${MONTH_COLUMN_WIDTH_PX}px`);

function updateLeftColumnWidth() {
    const amplada = window.innerWidth <= 768 ? FITA_NAME_SPACE_PX_MOBILE : FITA_NAME_SPACE_PX_DESKTOP;
    document.documentElement.style.setProperty('--left-column-width', `${amplada}px`);
}

function getCurrentTimelineStartOffset() {
    return window.innerWidth <= 768 ? FITA_NAME_SPACE_PX_MOBILE : FITA_NAME_SPACE_PX_DESKTOP;
}

function generarIdSegur(text) {
    return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
}

function escaparHtml(text) {
    return String(text).replace(/[&<>'"]/g, caracter => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[caracter]);
}

function obtenirEdatAvaluacioMesos() {
    return typeof estatEdatInfant !== 'undefined' && Number.isFinite(estatEdatInfant.edatAvaluacioMesos)
        ? estatEdatInfant.edatAvaluacioMesos
        : null;
}

function formatMesos(valor) {
    if (!Number.isFinite(valor)) return '—';
    return new Intl.NumberFormat('ca-ES', { maximumFractionDigits: 1 }).format(valor);
}

function formatPercentilsFita(fita) {
    if (fita.franjaTruncada) {
        return `P50: ${formatMesos(fita.edat_50)} m · P75 i P95: fora de la franja representada fins als ${MAX_MESOS_GRAFIC} m`;
    }
    return `P50: ${formatMesos(fita.edat_50)} m · P75: ${formatMesos(fita.edat_75)} m · P95: ${formatMesos(fita.edat_95)} m`;
}

updateLeftColumnWidth();

let tooltipElement;
let touchTooltipTimer;

function mostrarTooltip(text, event) {
    if (!tooltipElement) return;
    tooltipElement.innerHTML = text;
    tooltipElement.classList.remove('hidden');

    const amplada = tooltipElement.offsetWidth;
    const alcada = tooltipElement.offsetHeight;
    const margeX = 15;
    const margeY = 15;
    let x = event.pageX + margeX;
    let y = event.pageY + margeY;

    if (x + amplada > window.scrollX + window.innerWidth) x = event.pageX - amplada - margeX;
    if (x < window.scrollX) x = window.scrollX + 5;
    if (y + alcada > window.scrollY + window.innerHeight) y = event.pageY - alcada - margeY;
    if (y < window.scrollY) y = window.scrollY + 5;

    tooltipElement.style.left = `${x}px`;
    tooltipElement.style.top = `${y}px`;
}

function mostrarTooltipAlElement(text, element) {
    if (!tooltipElement) return;
    const rect = element.getBoundingClientRect();
    mostrarTooltip(text, {
        pageX: rect.left + window.scrollX,
        pageY: rect.bottom + window.scrollY
    });
}

function amagarTooltip() {
    if (tooltipElement) tooltipElement.classList.add('hidden');
}

function crearTextTooltipFita(fita) {
    const font = METADADES_INSTRUMENT.fonts[fita.font];
    return `<strong>${escaparHtml(fita.nomFita)}</strong>`
        + `<br>${escaparHtml(fita.detall)}`
        + `<br><strong>Criteri:</strong> ${escaparHtml(fita.criteri)}`
        + `<br><small>${escaparHtml(formatPercentilsFita(fita))}</small>`
        + `<br><small>${escaparHtml(fita.id)} · ${escaparHtml(font?.etiqueta || fita.font)}</small>`;
}

function crearOpcionsEstatFita(select) {
    [
        ['', 'No explorada'],
        ['assolida', 'Assolida'],
        ['no_assolida', 'No assolida'],
        ['no_valorable', 'No valorable']
    ].forEach(([valor, etiqueta]) => {
        const opcio = document.createElement('option');
        opcio.value = valor;
        opcio.textContent = etiqueta;
        select.appendChild(opcio);
    });
}

function crearOpcionsEstatSigne(select) {
    [
        ['', 'No explorat'],
        ['no_observat', 'No observat'],
        ['observat', 'Observat'],
        ['no_valorable', 'No valorable']
    ].forEach(([valor, etiqueta]) => {
        const opcio = document.createElement('option');
        opcio.value = valor;
        opcio.textContent = etiqueta;
        select.appendChild(opcio);
    });
}

function getEstatFita(fitaId) {
    return document.getElementById(`estat-${fitaId}`)?.value || '';
}

function getEstatSigne(signeId) {
    return document.getElementById(`estat-signe-${signeId}`)?.value || '';
}

function sincronitzarEstatFita(fita, valor, origen) {
    const principal = document.getElementById(`estat-${fita.id}`);
    const llista = document.getElementById(`llista-estat-${fita.id}`);
    if (principal && origen !== principal) principal.value = valor;
    if (llista && origen !== llista) llista.value = valor;
    actualitzarEstatFitaRow(document.getElementById(`fita-row-${fita.id}`), fita);
    actualitzarItemLlista(document.getElementById(`llista-item-${fita.id}`), fita);
    actualitzarResum();
}

function actualitzarEstatFitaRow(fitaRow, fita) {
    if (!fitaRow) return;
    const estatValoracio = getEstatFita(fita.id);
    const classificacio = estatValoracio === 'no_assolida'
        ? classificarFitaNoAssolida(fita, obtenirEdatAvaluacioMesos())
        : null;

    fitaRow.classList.remove('fita-assolida', 'fita-no-assolida', 'fita-no-valorable', 'fita-supera-p95');
    if (estatValoracio) fitaRow.classList.add(`fita-${estatValoracio.replace('_', '-')}`);
    if (classificacio === 'despres_p95') fitaRow.classList.add('fita-supera-p95');

    const icona = fitaRow.querySelector('.fita-estat-icona');
    if (icona) {
        icona.textContent = estatValoracio === 'assolida' ? '✓'
            : estatValoracio === 'no_assolida' ? (classificacio === 'despres_p95' ? '!' : '○')
                : estatValoracio === 'no_valorable' ? '—' : '';
        icona.className = `fita-estat-icona${estatValoracio ? ` fita-estat-icona--${estatValoracio}` : ''}`;
    }
}

function actualitzarItemLlista(item, fita) {
    if (!item) return;
    const estat = getEstatFita(fita.id);
    const superaP95 = estat === 'no_assolida'
        && classificarFitaNoAssolida(fita, obtenirEdatAvaluacioMesos()) === 'despres_p95';
    item.dataset.estat = estat;
    item.classList.toggle('llista-fita-item--supera-p95', superaP95);
}

function actualitzarResum() {
    const resumPanel = document.getElementById('resumPanel');
    if (!resumPanel) return;

    const edatMesos = obtenirEdatAvaluacioMesos();
    let explorades = 0;
    let assolides = 0;
    let noAssolides = 0;
    let noValorables = 0;
    let despresP95 = 0;
    let frangesTruncades = 0;

    dadesDesenvolupament.categories.forEach(categoria => {
        categoria.fites.forEach(fita => {
            const estat = getEstatFita(fita.id);
            if (!estat) return;
            explorades += 1;
            if (estat === 'assolida') assolides += 1;
            if (estat === 'no_valorable') noValorables += 1;
            if (estat === 'no_assolida') {
                noAssolides += 1;
                const classificacio = classificarFitaNoAssolida(fita, edatMesos);
                if (classificacio === 'despres_p95') despresP95 += 1;
                if (classificacio === 'franja_truncada') frangesTruncades += 1;
            }
        });
    });

    let signesExplorats = 0;
    let signesObservats = 0;
    dadesDesenvolupament.signesAlerta.forEach(signe => {
        const estat = getEstatSigne(signe.id);
        if (estat) signesExplorats += 1;
        if (estat === 'observat') signesObservats += 1;
    });

    const preocupacions = document.getElementById('preocupacionsFamilia')?.value.trim() || '';
    const hiHaDades = explorades > 0 || signesExplorats > 0 || preocupacions.length > 0;
    let nivell = 'buit';
    if (hiHaDades) nivell = despresP95 > 0 || signesObservats > 0 ? 'revisio' : (noAssolides > 0 || preocupacions ? 'seguiment' : 'sense-alertes');

    const edatText = Number.isFinite(edatMesos) ? `${formatMesos(edatMesos)} mesos` : 'edat no indicada';
    let html = `<h2 id="resumTitol" class="resum-titol">Resum descriptiu · ${edatText}</h2>`;

    if (!hiHaDades) {
        html += '<p class="resum-hint">Exploreu les fites i els signes d’alerta per obtenir un resum. Els camps buits no es consideren assolits ni absents.</p>';
    } else {
        html += '<div class="resum-grid">';
        html += `<div class="resum-item"><span class="resum-num">${explorades}</span><span class="resum-label">fites explorades</span></div>`;
        html += `<div class="resum-item"><span class="resum-num">${assolides}</span><span class="resum-label">assolides</span></div>`;
        html += `<div class="resum-item"><span class="resum-num">${noAssolides}</span><span class="resum-label">no assolides</span></div>`;
        html += `<div class="resum-item"><span class="resum-num">${noValorables}</span><span class="resum-label">no valorables</span></div>`;
        html += `<div class="resum-item${signesObservats ? ' resum-item--revisio' : ''}"><span class="resum-num">${signesObservats}</span><span class="resum-label">signes observats</span></div>`;
        html += '</div>';

        const missatge = nivell === 'revisio'
            ? 'Hi ha indicadors que justifiquen una valoració global i un seguiment professional. El resultat no estableix cap diagnòstic.'
            : nivell === 'seguiment'
                ? 'Hi ha elements per seguir longitudinalment i comentar amb la família i els professionals de referència.'
                : 'No s’han registrat alertes entre els elements explorats. Aquest resultat parcial no descarta dificultats del desenvolupament.';
        html += `<p class="resum-recomanacio resum-recomanacio--${nivell}">${missatge}</p>`;
        if (despresP95 > 0) html += `<p class="resum-detail">${despresP95} fita o fites no assolides se situen després del P95 de la mostra de referència.</p>`;
        if (frangesTruncades > 0) html += `<p class="resum-detail">${frangesTruncades} fita o fites arriben al límit de 60 mesos sense que la làmina original hi representi el P95; no s’han classificat com a posteriors al P95.</p>`;
    }

    resumPanel.className = `resum-panel resum-panel--${nivell}`;
    resumPanel.innerHTML = html;

    const totalFites = dadesDesenvolupament.categories.reduce((total, categoria) => total + categoria.fites.length, 0);
    const progressFites = document.getElementById('progressFites');
    if (progressFites) progressFites.textContent = `Fites explorades: ${explorades} de ${totalFites}`;
    const progressSignes = document.getElementById('progressSignes');
    if (progressSignes) progressSignes.textContent = `Signes explorats: ${signesExplorats} de ${dadesDesenvolupament.signesAlerta.length}`;

    actualitzarVistaLlista();
}

function crearBotoInformacio(textTooltip, etiqueta) {
    const boto = document.createElement('button');
    boto.type = 'button';
    boto.className = 'fita-info-btn';
    boto.textContent = 'i';
    boto.setAttribute('aria-label', `Mostra els detalls de ${etiqueta}`);
    boto.setAttribute('aria-describedby', 'tooltip');
    boto.addEventListener('click', event => {
        event.stopPropagation();
        mostrarTooltipAlElement(textTooltip, boto);
        clearTimeout(touchTooltipTimer);
        touchTooltipTimer = setTimeout(amagarTooltip, 5000);
    });
    boto.addEventListener('focus', () => mostrarTooltipAlElement(textTooltip, boto));
    boto.addEventListener('blur', amagarTooltip);
    return boto;
}

function initTaula() {
    tooltipElement = document.getElementById('tooltip');
    const categoriesContainer = document.getElementById('categoriesContainer');
    const signesContainer = document.getElementById('signesAlertaContainer');
    const timelineHeader = document.getElementById('timelineHeader');
    categoriesContainer.innerHTML = '';
    signesContainer.innerHTML = '';

    timelineHeader.querySelectorAll('.timeline-month').forEach(element => element.remove());
    for (let mes = 1; mes <= MAX_MESOS_GRAFIC; mes += 1) {
        const etiquetaMes = document.createElement('div');
        etiquetaMes.className = 'timeline-month';
        etiquetaMes.textContent = mes;
        timelineHeader.appendChild(etiquetaMes);
    }

    dadesDesenvolupament.categories.forEach(categoria => {
        const seccioCategoria = document.createElement('section');
        seccioCategoria.className = 'category-row';
        seccioCategoria.setAttribute('aria-labelledby', `categoria-${categoria.id}`);

        const titol = document.createElement('h3');
        titol.className = 'category-row-title';
        titol.id = `categoria-${categoria.id}`;
        titol.textContent = categoria.nom;

        const instruccio = document.createElement('p');
        instruccio.className = 'category-instruction-text';
        instruccio.textContent = 'Seleccioneu l’estat de cada fita';

        const wrapper = document.createElement('div');
        [...categoria.fites].sort((a, b) => a.edat_50 - b.edat_50).forEach(fita => {
            const tooltip = crearTextTooltipFita(fita);
            const fila = document.createElement('div');
            fila.className = 'fita-row';
            fila.id = `fita-row-${fita.id}`;

            const nomContainer = document.createElement('div');
            nomContainer.className = 'fita-name-container';
            const capNom = document.createElement('div');
            capNom.className = 'fita-name-heading';
            const icona = document.createElement('span');
            icona.className = 'fita-estat-icona';
            icona.setAttribute('aria-hidden', 'true');
            const nom = document.createElement('span');
            nom.className = 'fita-name-text';
            nom.textContent = fita.nomFita;
            capNom.append(icona, nom, crearBotoInformacio(tooltip, fita.nomFita));

            const labelSelect = document.createElement('label');
            labelSelect.className = 'sr-only';
            labelSelect.htmlFor = `estat-${fita.id}`;
            labelSelect.textContent = `Estat de la fita ${fita.nomFita}`;
            const select = document.createElement('select');
            select.id = `estat-${fita.id}`;
            select.name = `estat-${fita.id}`;
            select.className = 'fita-estat-select';
            select.dataset.fitaId = fita.id;
            crearOpcionsEstatFita(select);
            select.addEventListener('change', () => sincronitzarEstatFita(fita, select.value, select));
            nomContainer.append(capNom, labelSelect, select);

            const outerBars = document.createElement('div');
            outerBars.className = 'fita-bars-outer-container';
            const barsContainer = document.createElement('div');
            barsContainer.className = 'fita-bars-container';
            barsContainer.style.width = `${MAX_MESOS_GRAFIC * MONTH_COLUMN_WIDTH_PX}px`;
            const barra = document.createElement('div');
            barra.className = 'fita-bar';
            barra.setAttribute('aria-hidden', 'true');
            const segment1 = document.createElement('div');
            segment1.className = 'fita-bar-segment1';
            const segment2 = document.createElement('div');
            segment2.className = 'fita-bar-segment2';
            barra.append(segment1, segment2);
            barra.addEventListener('mousemove', event => mostrarTooltip(tooltip, event));
            barra.addEventListener('mouseout', amagarTooltip);
            barsContainer.appendChild(barra);
            outerBars.appendChild(barsContainer);
            fila.append(nomContainer, outerBars);
            wrapper.appendChild(fila);
        });

        seccioCategoria.append(titol, instruccio, wrapper);
        categoriesContainer.appendChild(seccioCategoria);
    });

    dadesDesenvolupament.signesAlerta.forEach(signe => {
        const item = document.createElement('div');
        item.className = 'signe-alerta-item-container no-esperada-alerta';
        item.id = `signe-container-${signe.id}`;
        const textWrapper = document.createElement('div');
        textWrapper.className = 'signe-text-wrapper';
        const cap = document.createElement('div');
        cap.className = 'signe-heading';
        const nom = document.createElement('span');
        nom.textContent = signe.nomSigne;
        const badge = document.createElement('span');
        badge.className = 'signe-edat-badge';
        badge.textContent = signe.edat_des_de > 0 ? `≥${signe.edat_des_de} m` : 'Qualsevol edat';
        cap.append(nom, badge);
        const area = document.createElement('span');
        area.className = 'signe-area';
        area.textContent = signe.area;
        textWrapper.append(cap, area);

        const label = document.createElement('label');
        label.className = 'sr-only';
        label.htmlFor = `estat-signe-${signe.id}`;
        label.textContent = `Estat del signe ${signe.nomSigne}`;
        const select = document.createElement('select');
        select.id = `estat-signe-${signe.id}`;
        select.name = `estat-signe-${signe.id}`;
        select.className = 'signe-estat-select';
        crearOpcionsEstatSigne(select);
        select.addEventListener('change', () => {
            item.classList.toggle('signe-observat', select.value === 'observat');
            actualitzarResum();
        });

        const tooltip = `<strong>${escaparHtml(signe.nomSigne)}</strong><br>${escaparHtml(signe.detall)}<br><small>${escaparHtml(signe.area)} · ${signe.edat_des_de ? `a partir de ${signe.edat_des_de} mesos` : 'a qualsevol edat'}</small>`;
        item.append(textWrapper, crearBotoInformacio(tooltip, signe.nomSigne), label, select);
        signesContainer.appendChild(item);
    });

    initLlistaVista();
    requestAnimationFrame(actualitzarVisualitzacio);
}

function initLlistaVista() {
    const container = document.getElementById('fitesLlistaContainer');
    if (!container) return;
    container.innerHTML = '';

    dadesDesenvolupament.categories.forEach(categoria => {
        const seccio = document.createElement('section');
        seccio.className = 'llista-categoria';
        const titol = document.createElement('h3');
        titol.className = 'llista-categoria-nom';
        titol.textContent = categoria.nom;
        seccio.appendChild(titol);

        [...categoria.fites].sort((a, b) => a.edat_50 - b.edat_50).forEach(fita => {
            const item = document.createElement('div');
            item.className = 'llista-fita-item';
            item.id = `llista-item-${fita.id}`;
            const text = document.createElement('div');
            text.className = 'llista-fita-text';
            const nom = document.createElement('strong');
            nom.textContent = fita.nomFita;
            const edats = document.createElement('div');
            edats.className = 'llista-fita-edat';
            edats.textContent = formatPercentilsFita(fita);
            text.append(nom, edats);

            const label = document.createElement('label');
            label.className = 'sr-only';
            label.htmlFor = `llista-estat-${fita.id}`;
            label.textContent = `Estat de la fita ${fita.nomFita}`;
            const select = document.createElement('select');
            select.id = `llista-estat-${fita.id}`;
            select.className = 'fita-estat-select';
            crearOpcionsEstatFita(select);
            select.addEventListener('change', () => sincronitzarEstatFita(fita, select.value, select));
            item.append(text, crearBotoInformacio(crearTextTooltipFita(fita), fita.nomFita), label, select);
            seccio.appendChild(item);
        });
        container.appendChild(seccio);
    });
}

function actualitzarVistaLlista() {
    dadesDesenvolupament.categories.forEach(categoria => {
        categoria.fites.forEach(fita => {
            const principal = document.getElementById(`estat-${fita.id}`);
            const llista = document.getElementById(`llista-estat-${fita.id}`);
            if (principal && llista && llista.value !== principal.value) llista.value = principal.value;
            actualitzarItemLlista(document.getElementById(`llista-item-${fita.id}`), fita);
        });
    });
}

function actualitzarVisualitzacio() {
    const timelineHeader = document.getElementById('timelineHeader');
    const categoriesContainer = document.getElementById('categoriesContainer');
    const ageLine = document.getElementById('ageLine');
    const guiesContainer = document.getElementById('verticalGuideLinesContainer');
    const signesContainer = document.getElementById('signesAlertaContainer');
    if (!timelineHeader || !categoriesContainer || !ageLine || !guiesContainer) return;

    const edatMesos = obtenirEdatAvaluacioMesos();
    const headerHeight = timelineHeader.offsetHeight;
    const categoriesHeight = categoriesContainer.offsetHeight;
    const offset = getCurrentTimelineStartOffset();
    const ampladaTimeline = MAX_MESOS_GRAFIC * MONTH_COLUMN_WIDTH_PX;

    guiesContainer.innerHTML = '';
    Object.assign(guiesContainer.style, {
        top: `${headerHeight}px`, height: `${categoriesHeight}px`, width: `${ampladaTimeline}px`, left: `${offset}px`
    });
    for (let mes = 0; mes < MAX_MESOS_GRAFIC; mes += 1) {
        const guia = document.createElement('div');
        guia.className = 'vertical-guide-line';
        guia.style.left = `${mes * MONTH_COLUMN_WIDTH_PX}px`;
        guiesContainer.appendChild(guia);
    }

    dadesDesenvolupament.categories.forEach(categoria => {
        categoria.fites.forEach(fita => {
            const barra = document.querySelector(`#fita-row-${fita.id} .fita-bar`);
            if (barra) {
                const finalBarra = fita.franjaTruncada ? MAX_MESOS_GRAFIC : fita.edat_95;
                const ampladaMesos = Math.max(0, finalBarra - fita.edat_50);
                barra.style.left = `${(fita.edat_50 - 1) * MONTH_COLUMN_WIDTH_PX}px`;
                barra.style.width = `${ampladaMesos * MONTH_COLUMN_WIDTH_PX}px`;
                const segment1 = barra.querySelector('.fita-bar-segment1');
                const segment2 = barra.querySelector('.fita-bar-segment2');
                if (ampladaMesos > 0) {
                    segment1.style.width = fita.franjaTruncada
                        ? '100%'
                        : `${((fita.edat_75 - fita.edat_50) / ampladaMesos) * 100}%`;
                    segment2.style.width = fita.franjaTruncada
                        ? '0%'
                        : `${((fita.edat_95 - fita.edat_75) / ampladaMesos) * 100}%`;
                }
            }
            actualitzarEstatFitaRow(document.getElementById(`fita-row-${fita.id}`), fita);
        });
    });

    ageLine.style.top = `${headerHeight}px`;
    ageLine.style.height = `${categoriesHeight}px`;
    if (Number.isFinite(edatMesos) && edatMesos <= MAX_MESOS_GRAFIC) {
        ageLine.style.left = `${offset + edatMesos * MONTH_COLUMN_WIDTH_PX}px`;
        ageLine.style.display = 'block';
    } else {
        ageLine.style.display = 'none';
    }

    const mostrantTots = signesContainer?.dataset.mostrantTots === 'true';
    dadesDesenvolupament.signesAlerta.forEach(signe => {
        const item = document.getElementById(`signe-container-${signe.id}`);
        if (!item) return;
        const rellevant = Number.isFinite(edatMesos) && edatMesos >= signe.edat_des_de;
        const observat = getEstatSigne(signe.id) === 'observat';
        item.classList.toggle('signe-observat', observat);
        item.classList.toggle('alerta-activa', rellevant);
        item.classList.toggle('no-esperada-alerta', !rellevant);
        item.classList.toggle('signe-no-rellevant', Number.isFinite(edatMesos) && !rellevant && !mostrantTots && !observat);
        item.classList.toggle('signe-forcat-visible', mostrantTots || observat);
    });

    actualitzarResum();
}
