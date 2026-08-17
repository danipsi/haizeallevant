'use strict';

const LIMIT_EDAT_CORREGIDA_MESOS = 18;
const DIES_MITJANS_MES = 30.4375;

function parseDataLocal(dataIso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataIso || '')) return null;
    const [any, mes, dia] = dataIso.split('-').map(Number);
    const data = new Date(any, mes - 1, dia);
    if (data.getFullYear() !== any || data.getMonth() !== mes - 1 || data.getDate() !== dia) return null;
    return data;
}

function afegirMesosAmbLimit(dataBase, mesos) {
    const resultat = new Date(dataBase.getFullYear(), dataBase.getMonth() + mesos, 1);
    const ultimDia = new Date(resultat.getFullYear(), resultat.getMonth() + 1, 0).getDate();
    resultat.setDate(Math.min(dataBase.getDate(), ultimDia));
    return resultat;
}

function diferenciaDies(dataInici, dataFi) {
    const iniciUtc = Date.UTC(dataInici.getFullYear(), dataInici.getMonth(), dataInici.getDate());
    const fiUtc = Date.UTC(dataFi.getFullYear(), dataFi.getMonth(), dataFi.getDate());
    return Math.max(0, Math.round((fiUtc - iniciUtc) / 86400000));
}

function calcularEdatCronologica(dataNaixementIso, dataReferencia = new Date()) {
    const dataNaixement = parseDataLocal(dataNaixementIso);
    const avui = new Date(dataReferencia.getFullYear(), dataReferencia.getMonth(), dataReferencia.getDate());
    if (!dataNaixement || dataNaixement > avui) return null;

    let mesosComplets = (avui.getFullYear() - dataNaixement.getFullYear()) * 12
        + avui.getMonth() - dataNaixement.getMonth();
    let iniciMesEdat = afegirMesosAmbLimit(dataNaixement, mesosComplets);
    if (iniciMesEdat > avui) {
        mesosComplets -= 1;
        iniciMesEdat = afegirMesosAmbLimit(dataNaixement, mesosComplets);
    }

    const iniciMesSeguent = afegirMesosAmbLimit(dataNaixement, mesosComplets + 1);
    const diesTranscorreguts = diferenciaDies(iniciMesEdat, avui);
    const diesEnMesEdat = Math.max(1, diferenciaDies(iniciMesEdat, iniciMesSeguent));

    return {
        mesosComplets,
        diesTranscorreguts,
        diesEnMesEdat,
        mesosDecimals: mesosComplets + diesTranscorreguts / diesEnMesEdat
    };
}

function calcularEdatAvaluacio(edatCronologicaMesos, esPrematur, setmanesGestacio) {
    const edat = Number(edatCronologicaMesos);
    const setmanes = Number(setmanesGestacio);
    if (!Number.isFinite(edat) || edat < 0) return null;

    const aplicaCorreccio = Boolean(esPrematur)
        && Number.isFinite(setmanes)
        && setmanes >= 22
        && setmanes < 37
        && edat < LIMIT_EDAT_CORREGIDA_MESOS;
    const correccioMesos = aplicaCorreccio ? ((40 - setmanes) * 7) / DIES_MITJANS_MES : 0;

    return {
        edatCronologicaMesos: edat,
        edatAvaluacioMesos: Math.max(0, edat - correccioMesos),
        correccioMesos,
        aplicaCorreccio
    };
}

function classificarFitaNoAssolida(fita, edatMesos) {
    if (!fita || !Number.isFinite(edatMesos)) return null;
    if (fita.franjaTruncada && edatMesos >= fita.edat_75) return 'franja_truncada';
    if (edatMesos >= fita.edat_95) return 'despres_p95';
    if (edatMesos >= fita.edat_75) return 'entre_p75_p95';
    if (edatMesos >= fita.edat_50) return 'entre_p50_p75';
    return 'abans_p50';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LIMIT_EDAT_CORREGIDA_MESOS,
        DIES_MITJANS_MES,
        parseDataLocal,
        afegirMesosAmbLimit,
        calcularEdatCronologica,
        calcularEdatAvaluacio,
        classificarFitaNoAssolida
    };
}
