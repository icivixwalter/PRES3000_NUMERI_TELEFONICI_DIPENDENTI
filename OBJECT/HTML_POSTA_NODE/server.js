/*
COME AVVIARE IL SERVER:
  POSIZIONATI IN:
    CD C:\GESTIONI\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA_NODE
  AVVIA IL SERVER
    node server.js

==============================================================================

Tabella attività / debug server.js (aggiornata)
==============================================================================

# | Attività                                | Segnalibro HTML/JS                  | Descrizione / Note
--|----------------------------------------|------------------------------------|---------------------------------------------------------
01 | Avvio server                            | app.listen(PORT)                    | Avvia Node.js su http://localhost:3000
02 | Servizio file statici                   | app.use(express.static(...))        | Permette al server di servire HTML, CSS e JS dalla cartella HTML
03 | Rotta principale                        | app.get('/', ...)                   | Serve la pagina HTML principale
04 | Rotta dati / Recupero DB                | app.get('/dati', async ...)         | Esegue query SELECT * FROM CIVILIA_Tb06_PROTOCOLLO
05 | Numero di record restituiti             | console.log(result.length)          | Log numero record ottenuti dalla query
06 | Visualizzazione primi 5 record          | console.log(result.slice(0,5))     | Log dei primi 5 record per controllo contenuto
07 | Campi disponibili                       | console.log(Object.keys(result[0]))| Mostra i nomi dei campi restituiti dal DB
08 | Chiusura sicura della connessione       | finally { if (connection) await connection.close(); } | Chiude la connessione ODBC
09 | Gestione errori connessione DB          | catch(err) {...}                    | Log errori e invio risposta 500
10 | Debug frontend (opzionale)              | script.js: console.log(...)         | Controllo lato client dei dati ricevuti e filtrati
11 | Messaggio operativo                     | console.log(`[Info] Apri ...`)     | Messaggio per aprire il browser automaticamente
12 | Timeout chiusura server                 | resetServerTimeout + setTimeout     | Termina server dopo 10 minuti di inattività

==============================================================================

Modifiche principali aggiunte:
- Funzione testDbAtStartup() che esegue subito la query all’avvio.
- Stampa numero record, primi 5 record e campi disponibili.
- Gestione compatta di dataset grandi.
- Messaggio finale informativo all'avvio.
- Timeout di chiusura automatica del server dopo 10 minuti di inattività, reset ad ogni richiesta.
          il server node non ricevendo notifiche si chiude comunque dopo 10 minuti e non si creano
          duplicati o serve orfani. Nel futuro si puo implementare anche la chiusura automatica del
          server alla chiusura della pagina Html ma occorre ma richiede un po’ di
          comunicazione lato client (websocket o ping)

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

// Percorso DB Access @percorso@assoluto@database@access
const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:\\Gestioni\\GESTIONE_LLPP\\25_GESTIONE_LLPP\\CIVILIA_GESTIONE\\CIVILIA_MDB\\CIVILIA_N03_Tb06_PROTOCOLLO.mdb;`;

// -----------------------------------------------------------------------------
// @01 Timeout server: chiusura automatica dopo 10 minuti di inattività
// -----------------------------------------------------------------------------
let serverTimeout;

/* --- Segnalibro @01: resetServerTimeout ---
     Funzione che resetta il timer per chiudere il server in caso di inattività.
     Ogni richiesta resetta il timer. Se nessuna richiesta arriva entro 10 minuti,
     il server si chiude automaticamente. --- */
function resetServerTimeout(server) {
  if (serverTimeout) clearTimeout(serverTimeout);
  serverTimeout = setTimeout(() => {
    console.log('[Server] Nessuna attività: chiusura automatica server dopo 10 minuti.');
    server.close(() => {
      process.exit(0);
    });
  }, 10 * 60 * 1000); // 10 minuti
}

// -----------------------------------------------------------------------------
// @02 Servizio file statici
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'HTML')));

// -----------------------------------------------------------------------------
// @03 Rotta principale
// -----------------------------------------------------------------------------
app.get('/', (req, res) => {
  resetServerTimeout(server); // reset timeout ad ogni richiesta
  res.sendFile(path.join(__dirname, 'HTML', 'POSTA_HTML_NODE.html'));
});

// -----------------------------------------------------------------------------
// Funzione test DB all'avvio
// -----------------------------------------------------------------------------
async function testDbAtStartup() {
  let connection;
  try {
    connection = await odbc.connect(connectionString);

    // @05 Numero di record restituiti
    const result = await connection.query('SELECT * FROM CIVILIA_Tb06_PROTOCOLLO');
    console.log(`[Startup Test] Numero di record nel DB: ${result.length}`);

    // @06 Visualizzazione primi 5 record
    console.log("[Startup Test] Primi 5 record:", result.slice(0, 5));

    // @07 Campi disponibili
    if (result.length > 0) {
      console.log("[Startup Test] Campi disponibili:", Object.keys(result[0]));
    }

    if (result.length > 1000) {
      console.log(`[Startup Test] Visualizzazione limitata ai primi 50 record per non saturare il terminale`);
    }

  } catch (err) {
    // @09 Gestione errori connessione DB
    console.error('[Startup Test] Errore connessione DB:', err);
  } finally {
    // @08 Chiusura sicura della connessione
    if (connection) await connection.close();
  }
}

// -----------------------------------------------------------------------------
// @04 Rotta dati
// -----------------------------------------------------------------------------
app.get('/dati', async (req, res) => {
  resetServerTimeout(server); // reset timeout ad ogni richiesta
  let connection;
  try {
    connection = await odbc.connect(connectionString);

    const result = await connection.query('SELECT * FROM CIVILIA_Tb06_PROTOCOLLO');

    // @05 Numero di record restituiti
    console.log(`Numero di record restituiti: ${result.length}`);

    // @06 Visualizzazione primi 5 record
    console.log("Primi 5 record:", result.slice(0, 5));

    // @07 Campi disponibili
    if (result.length > 0) {
      console.log("Campi disponibili:", Object.keys(result[0]));
    }

    // Invio dati JSON al client
    res.json(result);

  } catch (err) {
    // @09 Gestione errori connessione DB
    console.error('Errore connessione DB:', err);
    res.status(500).send('Errore connessione DB');
  } finally {
    // @08 Chiusura sicura della connessione
    if (connection) await connection.close();
  }
});

// -----------------------------------------------------------------------------
// @01 Avvio server e test DB
// -----------------------------------------------------------------------------
const server = app.listen(PORT, async () => {
  console.log(`Server avviato su http://localhost:${PORT}`);

  console.log('Esecuzione test DB all\'avvio...');
  await testDbAtStartup(); // stampa subito il risultato della query

  // @11 Messaggio operativo finale
  console.log(`[Info] Apri il browser e vai su http://localhost:${PORT} per visualizzare la tabella`);

  // @12 Timeout chiusura server
  resetServerTimeout(server);
});
