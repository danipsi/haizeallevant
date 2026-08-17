'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { METADADES_INSTRUMENT, dadesDesenvolupament } = require('../assets/js/data.js');
const {
    LIMIT_EDAT_CORREGIDA_MESOS,
    calcularEdatCronologica,
    calcularEdatAvaluacio,
    classificarFitaNoAssolida
} = require('../assets/js/logic.js');

const arrel = path.resolve(__dirname, '..');
const fites = dadesDesenvolupament.categories.flatMap(categoria => categoria.fites);
const signes = dadesDesenvolupament.signesAlerta;

assert.equal(METADADES_INSTRUMENT.abastMesos, 60);
assert.equal(fites.length, 97);
assert.equal(signes.length, 26);
assert.equal(new Set(fites.map(fita => fita.id)).size, fites.length, 'Els identificadors de fita han de ser únics');
assert.equal(new Set(signes.map(signe => signe.id)).size, signes.length, 'Els identificadors de signe han de ser únics');
assert.deepEqual(
    fites.map(fita => fita.id).sort(),
    Array.from({ length: 97 }, (_, index) => `HL${String(index + 1).padStart(2, '0')}`).sort(),
    'Han de ser presents totes les fites HL01–HL97'
);
assert.deepEqual(
    Object.fromEntries(dadesDesenvolupament.categories.map(categoria => [categoria.id, categoria.fites.length])),
    { postural: 21, manipulacio: 19, llenguatge: 31, socialitzacio: 26 }
);

fites.forEach(fita => {
    assert.match(fita.id, /^HL\d{2}$/);
    assert.ok(fita.nomFita && fita.detall && fita.criteri, `${fita.id}: contingut incomplet`);
    assert.ok(Number.isFinite(fita.edat_50) && Number.isFinite(fita.edat_75) && Number.isFinite(fita.edat_95));
    assert.ok(fita.edat_50 <= fita.edat_75 && fita.edat_75 <= fita.edat_95, `${fita.id}: percentils desordenats`);
    assert.ok(fita.edat_95 <= METADADES_INSTRUMENT.abastMesos, `${fita.id}: fora de l’abast`);
    assert.ok(METADADES_INSTRUMENT.fonts[fita.font], `${fita.id}: font desconeguda`);
});

signes.forEach(signe => {
    assert.match(signe.id, /^SA\d{2}$/);
    assert.ok(signe.nomSigne && signe.detall && signe.area, `${signe.id}: contingut incomplet`);
    assert.ok(Number.isFinite(signe.edat_des_de) && signe.edat_des_de >= 0 && signe.edat_des_de <= 60);
    assert.ok(METADADES_INSTRUMENT.fonts[signe.font], `${signe.id}: font desconeguda`);
});

const obtenirFita = id => fites.find(fita => fita.id === id);
assert.deepEqual(
    [obtenirFita('HL35').edat_50, obtenirFita('HL35').edat_75, obtenirFita('HL35').edat_95],
    [11.5, 13, 16]
);
assert.deepEqual(
    [obtenirFita('HL15').edat_50, obtenirFita('HL15').edat_75, obtenirFita('HL15').edat_95],
    [14, 16, 21]
);
assert.deepEqual(
    [obtenirFita('HL40').edat_50, obtenirFita('HL40').edat_75, obtenirFita('HL40').edat_95],
    [21, 23, 25]
);
assert.deepEqual(
    [obtenirFita('HL46').edat_50, obtenirFita('HL46').edat_75, obtenirFita('HL46').edat_95],
    [29, 35, 41]
);
assert.deepEqual(
    [obtenirFita('HL93').edat_50, obtenirFita('HL93').edat_75, obtenirFita('HL93').edat_95],
    [24, 28, 37]
);
assert.equal(obtenirFita('HL56').franjaTruncada, true);
assert.equal(obtenirFita('HL57').franjaTruncada, true);
assert.equal(signes.find(signe => signe.id === 'SA11').edat_des_de, 2);
assert.equal(signes.find(signe => signe.id === 'SA26').edat_des_de, 36);

const edatCalendari = calcularEdatCronologica('2024-01-15', new Date(2025, 1, 20));
assert.equal(edatCalendari.mesosComplets, 13);
assert.equal(edatCalendari.diesTranscorreguts, 5);
const edatBixest = calcularEdatCronologica('2024-02-29', new Date(2025, 1, 28));
assert.equal(edatBixest.mesosComplets, 12);
assert.equal(edatBixest.diesTranscorreguts, 0);
assert.equal(calcularEdatCronologica('2030-01-01', new Date(2026, 0, 1)), null);

const corregida = calcularEdatAvaluacio(12, true, 32);
assert.equal(corregida.aplicaCorreccio, true);
assert.ok(corregida.edatAvaluacioMesos > 10 && corregida.edatAvaluacioMesos < 10.5);
assert.equal(calcularEdatAvaluacio(LIMIT_EDAT_CORREGIDA_MESOS, true, 32).aplicaCorreccio, false);
assert.equal(calcularEdatAvaluacio(12, true, 37).aplicaCorreccio, false);

const fitaProva = { edat_50: 5, edat_75: 7, edat_95: 9 };
assert.equal(classificarFitaNoAssolida(fitaProva, 4.9), 'abans_p50');
assert.equal(classificarFitaNoAssolida(fitaProva, 5), 'entre_p50_p75');
assert.equal(classificarFitaNoAssolida(fitaProva, 7), 'entre_p75_p95');
assert.equal(classificarFitaNoAssolida(fitaProva, 9), 'despres_p95');
assert.equal(
    classificarFitaNoAssolida({ edat_50: 53, edat_75: 60, edat_95: 60, franjaTruncada: true }, 60),
    'franja_truncada'
);

const indexHtml = fs.readFileSync(path.join(arrel, 'index.html'), 'utf8');
const pdfJs = fs.readFileSync(path.join(arrel, 'assets/js/pdf.js'), 'utf8');
const swJs = fs.readFileSync(path.join(arrel, 'sw.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(arrel, 'manifest.json'), 'utf8'));
const idsEstatics = [...indexHtml.matchAll(/\bid="([^"]+)"/g)].map(coincidencia => coincidencia[1]);
const labelsFor = [...indexHtml.matchAll(/\bfor="([^"]+)"/g)].map(coincidencia => coincidencia[1]);
assert.equal(new Set(idsEstatics).size, idsEstatics.length, 'L’HTML no pot contenir identificadors duplicats');
labelsFor.forEach(controlId => assert.ok(idsEstatics.includes(controlId), `Etiqueta sense control: ${controlId}`));
assert.match(indexHtml, /Identificador pseudonimitzat/);
assert.doesNotMatch(indexHtml, /Nom\/Identificador|id="nomInfant"/);
assert.match(indexHtml, /assets\/js\/logic\.js/);
assert.match(indexHtml, /0 a 60 mesos/);
assert.match(indexHtml, /0 de 97/);
assert.match(pdfJs, /informe_seguiment_desenvolupament_/);
assert.doesNotMatch(pdfJs, /nomInfant|identificador\.toLowerCase/);
assert.match(swJs, /assets\/js\/logic\.js/);
const recursosPwa = [...swJs.matchAll(/'\.\/([^']+)'/g)].map(coincidencia => coincidencia[1]);
recursosPwa.forEach(recurs => assert.ok(fs.existsSync(path.join(arrel, recurs)), `Recurs PWA inexistent: ${recurs}`));
assert.equal(manifest.lang, 'ca');

console.log(`Correcte: ${fites.length} fites, ${signes.length} signes i lògica d’edat validades.`);
