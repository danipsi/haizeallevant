'use strict';

const PDF_MARGIN = 15;
const PDF_LINE_HEIGHT = 6;

function normalitzarTextPdf(text) {
    return String(text)
        .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
        .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/\u2212/g, '-');
}

function afegirCapcalera(doc, identificador, edatText, dataActual) {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Seguiment orientatiu del desenvolupament infantil', pageWidth / 2, 10, { align: 'center' });
    doc.setFontSize(8);
    doc.text(normalitzarTextPdf(`Identificador: ${identificador} | ${edatText} | Data: ${dataActual}`), pageWidth / 2, 16, { align: 'center' });
    doc.setDrawColor(200, 200, 200);
    doc.line(PDF_MARGIN, 19, pageWidth - PDF_MARGIN, 19);
    doc.setTextColor(0, 0, 0);
    return 26;
}

function afegirPeusDePagina(doc) {
    const totalPagines = doc.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    for (let pagina = 1; pagina <= totalPagines; pagina += 1) {
        doc.setPage(pagina);
        doc.setFontSize(7);
        doc.setTextColor(130, 130, 130);
        doc.text(normalitzarTextPdf(`Dades ${METADADES_INSTRUMENT.versioDades} | Document local | No és una prova diagnòstica`), PDF_MARGIN, pageHeight - 8);
        doc.text(`Pàgina ${pagina} de ${totalPagines}`, pageWidth - PDF_MARGIN, pageHeight - 8, { align: 'right' });
        doc.setTextColor(0, 0, 0);
    }
}

function comprovarSaltPagina(doc, y, context) {
    if (y <= doc.internal.pageSize.getHeight() - PDF_MARGIN * 2.5) return y;
    doc.addPage();
    return afegirCapcalera(doc, context.identificador, context.edatText, context.dataActual);
}

function afegirLinies(doc, text, y, context, opcions = {}) {
    const sagnat = opcions.sagnat || 0;
    const amplada = doc.internal.pageSize.getWidth() - PDF_MARGIN * 2 - sagnat;
    const linies = doc.splitTextToSize(normalitzarTextPdf(text), amplada);
    linies.forEach(linia => {
        y = comprovarSaltPagina(doc, y, context);
        doc.text(linia, PDF_MARGIN + sagnat, y);
        y += PDF_LINE_HEIGHT;
    });
    return y;
}

function afegirTitolSeccio(doc, text, y, context) {
    y = comprovarSaltPagina(doc, y + 4, context);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(normalitzarTextPdf(text), PDF_MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    return y + PDF_LINE_HEIGHT * 1.5;
}

function etiquetaPosicioPercentil(fita, edatMesos) {
    const posicio = classificarFitaNoAssolida(fita, edatMesos);
    return ({
        abans_p50: 'abans del P50',
        entre_p50_p75: 'entre P50 i P75',
        entre_p75_p95: 'entre P75 i P95',
        despres_p95: 'després del P95',
        franja_truncada: 'al límit de 60 mesos; P95 no representat a la làmina original'
    })[posicio] || 'edat no disponible';
}

function generarResumPDF() {
    const boto = document.getElementById('desarPdfBtn');
    boto.textContent = 'Generant l’informe…';
    boto.disabled = true;

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const identificador = normalitzarTextPdf(document.getElementById('identificadorInfant').value.trim() || 'No indicat');
        const dataActual = new Intl.DateTimeFormat('ca-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
        const edatCronologica = estatEdatInfant.edatCronologicaMesos;
        const edatAvaluacio = estatEdatInfant.edatAvaluacioMesos;
        let edatText = 'Edat no indicada';
        if (Number.isFinite(edatCronologica)) {
            edatText = `Edat cronològica: ${formatNombre(edatCronologica)} mesos`;
            if (estatEdatInfant.aplicaCorreccio) edatText += `; edat corregida: ${formatNombre(edatAvaluacio)} mesos`;
        }
        const context = { identificador, edatText, dataActual };
        let y = afegirCapcalera(doc, identificador, edatText, dataActual);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.text('Informe de seguiment del desenvolupament', doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        y += PDF_LINE_HEIGHT * 2;
        y = afegirLinies(doc, METADADES_INSTRUMENT.avis, y, context);

        const fitesNoAssolides = [];
        const fitesNoValorables = [];
        let fitesExplorades = 0;
        dadesDesenvolupament.categories.forEach(categoria => {
            categoria.fites.forEach(fita => {
                const estat = getEstatFita(fita.id);
                if (estat) fitesExplorades += 1;
                if (estat === 'no_assolida') fitesNoAssolides.push({ categoria: categoria.nom, fita });
                if (estat === 'no_valorable') fitesNoValorables.push({ categoria: categoria.nom, fita });
            });
        });

        const signesObservats = [];
        const signesNoValorables = [];
        let signesExplorats = 0;
        dadesDesenvolupament.signesAlerta.forEach(signe => {
            const estat = getEstatSigne(signe.id);
            if (estat) signesExplorats += 1;
            if (estat === 'observat') signesObservats.push(signe);
            if (estat === 'no_valorable') signesNoValorables.push(signe);
        });

        y = afegirTitolSeccio(doc, 'Cobertura de la valoració', y, context);
        const totalFites = dadesDesenvolupament.categories.reduce((total, categoria) => total + categoria.fites.length, 0);
        const totalSignes = dadesDesenvolupament.signesAlerta.length;
        y = afegirLinies(doc, `${fitesExplorades} de ${totalFites} fites explorades. ${signesExplorats} de ${totalSignes} signes d’alerta explorats. Els elements no explorats no s’interpreten com a assolits ni com a absents.`, y, context);

        y = afegirTitolSeccio(doc, 'Fites no assolides', y, context);
        if (!fitesNoAssolides.length) {
            y = afegirLinies(doc, 'No s’han registrat fites com a no assolides entre les explorades.', y, context);
        } else {
            fitesNoAssolides.forEach(({ categoria, fita }) => {
                const posicio = etiquetaPosicioPercentil(fita, edatAvaluacio);
                y = afegirLinies(doc, `- ${fita.nomFita} (${categoria}; ${posicio}; ${fita.id})`, y, context, { sagnat: 2 });
            });
        }

        if (fitesNoValorables.length) {
            y = afegirTitolSeccio(doc, 'Fites no valorables', y, context);
            fitesNoValorables.forEach(({ categoria, fita }) => {
                y = afegirLinies(doc, `- ${fita.nomFita} (${categoria}; ${fita.id})`, y, context, { sagnat: 2 });
            });
        }

        y = afegirTitolSeccio(doc, 'Signes d’alerta observats', y, context);
        if (!signesObservats.length) {
            y = afegirLinies(doc, 'No s’han registrat signes d’alerta observats entre els explorats.', y, context);
        } else {
            signesObservats.forEach(signe => {
                y = afegirLinies(doc, `- ${signe.nomSigne} (${signe.area}; ${signe.id})`, y, context, { sagnat: 2 });
            });
        }

        if (signesNoValorables.length) {
            y = afegirTitolSeccio(doc, 'Signes no valorables', y, context);
            signesNoValorables.forEach(signe => {
                y = afegirLinies(doc, `- ${signe.nomSigne} (${signe.area}; ${signe.id})`, y, context, { sagnat: 2 });
            });
        }

        const preocupacions = document.getElementById('preocupacionsFamilia').value.trim();
        if (preocupacions) {
            y = afegirTitolSeccio(doc, 'Preocupacions comunicades', y, context);
            y = afegirLinies(doc, preocupacions, y, context);
        }
        const observacions = document.getElementById('observacions').value.trim();
        if (observacions) {
            y = afegirTitolSeccio(doc, 'Observacions professionals', y, context);
            y = afegirLinies(doc, observacions, y, context);
        }

        y = afegirTitolSeccio(doc, 'Interpretació prudent', y, context);
        y = afegirLinies(doc, 'Cal interpretar les fites, els signes d’alerta, les possibles regressions i les preocupacions en conjunt i de manera longitudinal. Aquest resum no confirma ni descarta cap diagnòstic.', y, context);
        afegirPeusDePagina(doc);

        doc.save(`informe_seguiment_desenvolupament_${dataLocalIso(new Date())}.pdf`);
        boto.textContent = 'Informe desat';
        boto.classList.add('pdf-btn--ok');
        setTimeout(() => {
            boto.textContent = 'Desa l’informe en PDF';
            boto.classList.remove('pdf-btn--ok');
            boto.disabled = false;
        }, 2500);
    } catch (error) {
        console.error('Error en generar el PDF:', error);
        boto.textContent = 'No s’ha pogut generar. Torneu-ho a provar';
        boto.classList.add('pdf-btn--error');
        setTimeout(() => {
            boto.textContent = 'Desa l’informe en PDF';
            boto.classList.remove('pdf-btn--error');
            boto.disabled = false;
        }, 4000);
    }
}
