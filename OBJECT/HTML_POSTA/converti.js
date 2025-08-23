//file di conversione denominato converti.js e salvato nella directory
//il file script per la  conversione si trova qui:
//c:\GESTIONI\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA\converti.js
//il file trasformato da xls --> js si deve salvare qui:
//c:\GESTIONI\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA\PROTOCOLLO.js
// il file xls si trova qui:
//c:\GESTIONI\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA\PROTOCOLLO.xls




const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');


// Percorsi dei file aggiornati salva tutto nella stessa cartella dove si trova il sorgente .xls

const inputFilePath = 'c:\\GESTIONI\\GESTIONE_LLPP\\TMP\\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\\OBJECT\\HTML_POSTA\\POSTA\\PROTOCOLLO.xls';
const outputFilePath = 'c:\\GESTIONI\\GESTIONE_LLPP\\TMP\\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\\OBJECT\\HTML_POSTA\\POSTA\\PROTOCOLLO.js';



// Leggi il file XLS
const workbook = xlsx.readFile(inputFilePath);

// Considera solo il primo foglio
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Converte il foglio in JSON
const data = xlsx.utils.sheet_to_json(sheet);

// Prepara il contenuto JS
const jsContent = `const protocollo = ${JSON.stringify(data, null, 2)};\nmodule.exports = protocollo;\n`;

// Salva il file JS
fs.writeFileSync(outputFilePath, jsContent, 'utf8');

console.log('Conversione completata! File salvato in:', outputFilePath);
