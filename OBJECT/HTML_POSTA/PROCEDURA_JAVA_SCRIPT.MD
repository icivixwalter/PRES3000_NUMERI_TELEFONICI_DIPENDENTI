const inputData = `
2022\tING\tGRUPPO HERA S.P.A.\tSOLLECITO DI PAGAMENTO\t17/08/2022 - 14:45\t42011
2022\tING\tGRUPPO HERA S.P.A.\tSOLLECITO DI PAGAMENTO\t17/08/2022 - 14:28\t42004
`;

// Funzione di conversione
function parseTable(data) {
    const lines = data.trim().split('\n');
    return lines.map(line => {
        const [anno, codice, gruppo, descrizione, dataOra, codice2] = line.split('\t');
        return {
            anno,
            codice,
            gruppo,
            descrizione,
            dataOra,
            codice2
        };
    });
}

const jsonData = parseTable(inputData);

// Stampa JSON formattato
console.log(JSON.stringify(jsonData, null, 2));
