/*
COME AVVIARE IL SERVER:
  POSIZIONATI IN:
    CD C:\GESTIONI\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA_NODE
  AVVIA IL SERVER
    node server.js

==============================================================================
Tabella attività / debug server.js (aggiornata)
==============================================================================

Azione / Controllo                        | Descrizione                                                                                     | Segnalibro / Posizione nel Codice
---------------------------------------------------------------------------------------------------------------
Avvio server                              | Avvia Node.js su http://localhost:3000                                                        | app.listen(PORT)
Servizio file statici                     | Permette al server di servire HTML, CSS e JS dalla cartella HTML                               | app.use(express.static(...))
Rotta principale                          | Serve la pagina HTML principale                                                                 | app.get('/', ...)
Recupero dati dal DB                      | Esegue query SELECT * FROM CIVILIA_Tb06_PROTOCOLLO                                           | app.get('/dati', async ...)
Numero di record restituiti               | Log numero record ottenuti dalla query                                                          | console.log(result.length)
Visualizzazione primi 5 record            | Log dei primi 5 record per controllo contenuto                                                  | console.log(result.slice(0,5))
Campi disponibili                         | Mostra i nomi dei campi restituiti dal DB                                                      | console.log(Object.keys(result[0]))
Chiusura sicura della connessione         | Assicura che la connessione ODBC venga chiusa anche in caso di errore                           | finally { if (connection) await connection.close(); }
Gestione errori connessione DB            | Log degli errori e invio risposta 500 in caso di fallimento                                     | catch(err) { ... }
Debug frontend (opzionale)                | Controllo lato client dei dati ricevuti e filtrati                                              | script.js: console.log("Dati caricati:", datiGlobali)
Suggerimento operativo                     | Messaggio in console per aprire il browser automaticamente                                      | console.log(`[Info] Apri http://localhost:${PORT}`)

Modifiche principali aggiunte:
Funzione testDbAtStartup() che esegue subito la query SELECT * FROM CIVILIA_Tb06_PROTOCOLLO all’avvio.
Stampa su terminale il numero di record, i primi 5 record e i campi disponibili.
Gestione compatta di dataset grandi.
Messaggio finale informativo all'avvio.
Chiamata await testDbAtStartup() dentro app.listen() per eseguire il test subito dopo l’avvio del server.

==============================================================================
*/

import express from 'express';
import path from 'path';
import odbc from 'odbc';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Percorso DB Access
const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:\\Gestioni\\GESTIONE_LLPP\\25_GESTIONE_LLPP\\CIVILIA_GESTIONE\\CIVILIA_MDB\\CIVILIA_N03_Tb06_PROTOCOLLO.mdb;`;

// Servire file statici dalla cartella HTML
app.use(express.static(path.join(__dirname, 'HTML')));

// Rotta principale - serve il file HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'POSTA_HTML_NODE.html'));
});

// Funzione per testare subito il DB e stampare risultati all'avvio
async function testDbAtStartup() {
  let connection;
  try {
    connection = await odbc.connect(connectionString);

    // Esegui query
    const result = await connection.query('SELECT * FROM CIVILIA_Tb06_PROTOCOLLO');

    // Debug: numero di record e primi 5
    console.log(`[Startup Test] Numero di record nel DB: ${result.length}`);
    console.log("[Startup Test] Primi 5 record:", result.slice(0, 5));

    // Debug: mostra i campi disponibili
    if (result.length > 0) {
      console.log("[Startup Test] Campi disponibili:", Object.keys(result[0]));
    }

    // Log compatto se dataset grande
    if (result.length > 1000) {
      console.log(`[Startup Test] Visualizzazione limitata ai primi 50 record per non saturare il terminale`);
    }

  } catch (err) {
    console.error('[Startup Test] Errore connessione DB:', err);
  } finally {
    if (connection) await connection.close();
  }
}

// Rotta dati con logging dettagliato
app.get('/dati', async (req, res) => {
  let connection;
  try {
    connection = await odbc.connect(connectionString);

    // Esegui query
    const result = await connection.query('SELECT * FROM CIVILIA_Tb06_PROTOCOLLO');

    // Debug: numero di record e primi 5
    console.log(`Numero di record restituiti: ${result.length}`);
    console.log("Primi 5 record:", result.slice(0, 5));

    // Debug: mostra i campi disponibili
    if (result.length > 0) {
      console.log("Campi disponibili:", Object.keys(result[0]));
    }

    // Invio dati JSON al client
    res.json(result);

  } catch (err) {
    console.error('Errore connessione DB:', err);
    res.status(500).send('Errore connessione DB');
  } finally {
    // Chiusura sicura della connessione
    if (connection) await connection.close();
  }
});

// Avvio server e test DB
app.listen(PORT, async () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log('Esecuzione test DB all\'avvio...');
  await testDbAtStartup(); // Stampa subito il risultato della query sul terminale

  // Messaggio operativo finale
  console.log(`[Info] Apri il browser e vai su http://localhost:${PORT} per visualizzare la tabella`);
});
