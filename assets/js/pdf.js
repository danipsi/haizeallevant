'use strict';

// ---------------------------------------------------------------------------
// Helpers interns del PDF
// ---------------------------------------------------------------------------
const PDF_MARGIN      = 15;
const PDF_LINE_HEIGHT = 7;

/**
 * Normalitza una cadena per a jsPDF (WinAnsi/Latin-1):
 * substitueix cometes tipografiques per cometes simples.
 */
function normalitzarTextPdf(str) {
    return String(str)
        .replace(/[\u2018\u2019\u201A\u201B]/g, "'")  // cometes simples tipografiques
        .replace(/[\u201C\u201D\u201E\u201F]/g, '"'); // cometes dobles tipografiques
}

/**
 * Afegeix la capçalera de l'informe a la pagina actual.
 * Retorna el yPos despres de la capçalera.
 */
function afegirCapcalera(doc, nomInfant, edatText, dataActual) {
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(
        'Eina de seguiment del desenvolupament psicomotor infantil',
        pageWidth / 2,
        10,
        { align: 'center' }
    );
    doc.setFontSize(8);
    doc.text(
        `Infant: ${nomInfant}  |  Edat: ${edatText}  |  Data: ${dataActual}`,
        pageWidth / 2,
        16,
        { align: 'center' }
    );
    doc.setDrawColor(200, 200, 200);
    doc.line(PDF_MARGIN, 19, pageWidth - PDF_MARGIN, 19);
    doc.setTextColor(0, 0, 0);

    return 26; // yPos despres de la capçalera
}

/**
 * Recorre totes les pagines i afegeix el peu amb numero de pagina.
 */
function afegirPeusDePagina(doc) {
    const totalPagines = doc.getNumberOfPages();
    const pageWidth    = doc.internal.pageSize.getWidth();
    const pageHeight   = doc.internal.pageSize.getHeight();

    for (let i = 1; i <= totalPagines; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text(
            'Document generat localment. No substitueix el diagnostic professional.',
            PDF_MARGIN,
            pageHeight - 8
        );
        doc.text(
            `Pagina ${i} de ${totalPagines}`,
            pageWidth - PDF_MARGIN,
            pageHeight - 8,
            { align: 'right' }
        );
        doc.setTextColor(0, 0, 0);
    }
}

/**
 * Comprova si cal afegir una pagina nova i, si es aixi, la crea amb capçalera.
 * Retorna el yPos actualitzat.
 */
function comprovarSaltPagina(doc, yPos, nomInfant, edatText, dataActual) {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (yPos > pageHeight - PDF_MARGIN * 3) {
        doc.addPage();
        return afegirCapcalera(doc, nomInfant, edatText, dataActual);
    }
    return yPos;
}

// ---------------------------------------------------------------------------
// Funcio principal exportada
// ---------------------------------------------------------------------------
function generarResumPDF() {
    const btn = document.getElementById('desarPdfBtn');

    // Feedback visual: boton en estat "generant"
    btn.textContent = 'Generant informe...';
    btn.disabled    = true;

    try {
        const { jsPDF } = window.jspdf;
        const doc        = new jsPDF();

        const nomInfant  = normalitzarTextPdf(
            document.getElementById('nomInfant').value || 'No especificat'
        );

        // Calcular text d'edat
        let edatText = 'No especificada';
        if (edatPrecisaInfant.totalMesosComplets !== null) {
            edatText = `${edatPrecisaInfant.totalMesosComplets} mesos`;
            const dataNaixementInput = document.getElementById('dataNaixement');
            if (edatPrecisaInfant.diesTranscorregutsEnMesActual > 0 && dataNaixementInput.value) {
                edatText += ` i ${edatPrecisaInfant.diesTranscorregutsEnMesActual} dies`;
            } else if (!dataNaixementInput.value) {
                edatText += ' (edat manual)';
            }
        } else {
            const edatInfantInput = document.getElementById('edatInfant');
            if (edatInfantInput.value) {
                edatText = `${edatInfantInput.value} mesos (edat manual)`;
            }
        }

        const dataActual = new Date().toLocaleDateString('ca-ES', {
            year: 'numeric', month: '2-digit', day: '2-digit'
        });

        // --- Pagina 1: capçalera + titol principal ---
        let yPos = afegirCapcalera(doc, nomInfant, edatText, dataActual);

        doc.setFontSize(15);
        doc.setFont('helvetica', 'bold');
        doc.text('Informe de seguiment del desenvolupament psicomotor', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
        yPos += PDF_LINE_HEIGHT * 2;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(`Nom/Identificador: ${nomInfant}`, PDF_MARGIN, yPos);  yPos += PDF_LINE_HEIGHT;
        doc.text(`Edat a la data del registre: ${edatText}`,            PDF_MARGIN, yPos);  yPos += PDF_LINE_HEIGHT;
        doc.text(`Data del registre: ${dataActual}`,                    PDF_MARGIN, yPos);  yPos += PDF_LINE_HEIGHT * 1.5;

        doc.setDrawColor(100, 100, 100);
        doc.line(PDF_MARGIN, yPos, doc.internal.pageSize.getWidth() - PDF_MARGIN, yPos);
        yPos += PDF_LINE_HEIGHT * 2;

        // --- Seccio 1: Fites no assolides ---
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('Fites encara NO assolides (indicadors de possible retard):', PDF_MARGIN, yPos);
        yPos += PDF_LINE_HEIGHT * 1.8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        let algunaFita = false;

        dadesDesenvolupament.categories.forEach(categoria => {
            const fitesMarcades = [];
            categoria.fites.forEach(fita => {
                const cb = document.getElementById(`check-${generarIdSegur(fita.nomFita)}`);
                if (cb && cb.checked) {
                    fitesMarcades.push(fita.nomFita);
                    algunaFita = true;
                }
            });

            if (fitesMarcades.length === 0) return;

            yPos = comprovarSaltPagina(doc, yPos, nomInfant, edatText, dataActual);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(`${normalitzarTextPdf(categoria.nom)}:`, PDF_MARGIN, yPos);
            yPos += PDF_LINE_HEIGHT * 1.2;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);

            fitesMarcades.forEach(nomFita => {
                yPos = comprovarSaltPagina(doc, yPos, nomInfant, edatText, dataActual);
                doc.text(`  - ${normalitzarTextPdf(nomFita)}`, PDF_MARGIN + 3, yPos);
                yPos += PDF_LINE_HEIGHT * 0.9;
            });

            yPos += PDF_LINE_HEIGHT * 0.5;
        });

        if (!algunaFita) {
            yPos = comprovarSaltPagina(doc, yPos, nomInfant, edatText, dataActual);
            doc.setTextColor(100, 100, 100);
            doc.text("No s'han marcat fites com a 'no assolides'.", PDF_MARGIN + 3, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += PDF_LINE_HEIGHT;
        }

        // --- Separador ---
        yPos += PDF_LINE_HEIGHT;
        yPos = comprovarSaltPagina(doc, yPos, nomInfant, edatText, dataActual);
        doc.setDrawColor(100, 100, 100);
        doc.line(PDF_MARGIN, yPos, doc.internal.pageSize.getWidth() - PDF_MARGIN, yPos);
        yPos += PDF_LINE_HEIGHT * 2;

        // --- Seccio 2: Signes d'alerta ---
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text("Signes d'alerta observats (presents):", PDF_MARGIN, yPos);
        yPos += PDF_LINE_HEIGHT * 1.8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        const signesMarcats = [];
        dadesDesenvolupament.signesAlerta.forEach(signe => {
            const cb = document.getElementById(`check-signe-${generarIdSegur(signe.nomSigne)}`);
            if (cb && cb.checked) signesMarcats.push(signe.nomSigne);
        });

        if (signesMarcats.length > 0) {
            signesMarcats.forEach(nomSigne => {
                yPos = comprovarSaltPagina(doc, yPos, nomInfant, edatText, dataActual);
                doc.text(`  - ${normalitzarTextPdf(nomSigne)}`, PDF_MARGIN + 3, yPos);
                yPos += PDF_LINE_HEIGHT * 0.9;
            });
        } else {
            yPos = comprovarSaltPagina(doc, yPos, nomInfant, edatText, dataActual);
            doc.setTextColor(100, 100, 100);
            doc.text("No s'han marcat signes d'alerta com a 'presents'.", PDF_MARGIN + 3, yPos);
            doc.setTextColor(0, 0, 0);
        }

        // --- Peus de pagina a totes les pagines ---
        afegirPeusDePagina(doc);

        // --- Desa el fitxer ---
        const nomFitxer = `informe_seguiment_${
            nomInfant.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'infant'
        }.pdf`;
        doc.save(nomFitxer);

        // Feedback exit
        btn.textContent = 'Informe desat correctament';
        btn.classList.add('pdf-btn--ok');
        setTimeout(() => {
            btn.textContent = 'Desar informe de seguiment en PDF';
            btn.classList.remove('pdf-btn--ok');
            btn.disabled = false;
        }, 3000);

    } catch (err) {
        console.error('Error generant el PDF:', err);
        btn.textContent = 'Error generant el PDF. Torneu-ho a intentar.';
        btn.classList.add('pdf-btn--error');
        setTimeout(() => {
            btn.textContent = 'Desar informe de seguiment en PDF';
            btn.classList.remove('pdf-btn--error');
            btn.disabled = false;
        }, 4000);
    }
}
