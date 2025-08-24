//
// Elenco Segnalibri @01, @02, ...
//
// #      | Attività / Istruzione               | Cosa fa / Descrizione
// --------------------------------------------------------------------------
// @01    | Avvio server                        | Avvia Node.js su http://localhost:3000
// @02    | Servizio file statici                | Serve HTML, CSS e JS dalla cartella HTML
// @03    | Rotta principale                     | Serve la pagina HTML principale
// @04    | Rotta dati / Recupero DB             | Esegue query SELECT * FROM CIVILIA_Tb06_PROTOCOLLO e invia JSON al client
// @05    | Invio dati al client                 | JSON dei protocolli
// @08    | Chiusura sicura connessione          | Chiude connessione ODBC
// @09    | Gestione errori DB                   | Log degli errori e invio errore 500
// @10    | Rotta IP server                      | Recupera e invia l’IP del PC master al client
//

import express from 'express';
import path from 'path';
import odbc from 'odbc';
import { fileURLToPath } from 'url';
import os from 'os';

// ============================================================
// Configurazione percorsi
// ============================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// ============================================================
// @02 Servizio file statici
// ============================================================
app.use(express.static(path.join(__dirname, 'HTML')));

// ============================================================
// @03 Rotta principale
// ============================================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'POSTA_HTML_NODE.html'));
});

// ============================================================
// @04 Rotta dati / Recupero DB
// ============================================================
const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};
DBQ=C:\\Gestioni\\GESTIONE_LLPP\\25_GESTIONE_LLPP\\CIVILIA_GESTIONE\\CIVILIA_MDB\\CIVILIA_N03_Tb06_PROTOCOLLO.mdb;`;

app.get('/dati', async (req, res) => {
  let connection;
  try {
    connection = await odbc.connect(connectionString); // @04 Connessione DB
    const result = await connection.query('SELECT * FROM CIVILIA_Tb06_PROTOCOLLO'); // @04 Query
    res.json(result); // @05 Invio dati al client
  } catch (err) {
    console.error('[09] Errore DB:', err); // @09 Gestione errori
    res.status(500).send('Errore DB');      // @09
  } finally {
    if (connection) await connection.close(); // @08 Chiusura sicura connessione
  }
});

// ============================================================
// @10 Rotta IP server
// ============================================================
app.get('/server-ip', (req, res) => {
  const interfaces = os.networkInterfaces();
  let ip = 'non trovato';
  for (const iface of Object.values(interfaces)) {
    for (const i of iface) {
      if (i.family === 'IPv4' && !i.internal) {
        ip = i.address;
        break;
      }
    }
  }
  res.json({ ip }); // @10 Invio IP al client
});

// ============================================================
// @01 Avvio server
// ============================================================
app.listen(PORT, () => {
  console.log(`[01] Server avviato su http://localhost:${PORT}`);
});
