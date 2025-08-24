
# README_HTML_POSTA_NODE.MD
   Note
      Progetto per la creazione di una pagina Html che carica una tabella posta di
      access con l'utilizzo di un server Node.js
      Il progetto per ora si trova in questa path:
         "path": "c:/GESTIONI/GESTIONE_LLPP/TMP/PRES3000_NUMERI_TELEFONICI_DIPENDENTI/OBJECT/HTML_POSTA_NODE/."
      Prevede varie fasi di sviluppo distinti in due fasi, la prima un progetto di prova in cui
      creato il server .js carico nella pagina Html la posta; la seconda la possibilita di 
      estendere a piu Pc il collegamento al mio indirizzo ID; ed in via temporarenea creare
      una copia esatta della pagina html che legge da vari file .js i flussi di posta divisi
      per data.

## FASI PROGETTO
### RIEPILOGO FASI
      Fase 1 – Test Locale sul Tuo PC
         Crei il progetto completo sul tuo PC:
            HTML per l'interfaccia.
            Node.js come server.
            Access come database.
      
         Verifichi:
            Connessione Node.js → Access.
            Lettura, aggiornamento, inserimento e cancellazione record.
      
         Visualizzazione dati nell'interfaccia.
   
   
   
   
      Fase 2 – Condivisione Parziale con Colleghi
         In una cartella condivisa di rete Y:\DIRIGENTE\POSTA\ pubblichi:
            Una copia statica dell’HTML.
            I file .js giornalieri generati o aggiornati.
   
         In questa fase:
            I colleghi possono aprire l’HTML in sola lettura dei dati dei .js.
            Non c'è ancora collegamento diretto con il database o le API del tuo Node.js.
            Serve solo per visualizzare i dati giornalieri.
   
      Fase 3 – Server Centralizzato
         Quando il progetto base funziona e vuoi la versione finale:
         Tutti i PC si collegheranno al tuo indirizzo IP via browser, es.:
         http://192.168.1.X:3000
   
         L'HTML verrà servito da Node.js e i dati verranno letti direttamente dal database tramite le API.
         I file .js giornalieri non saranno più necessari (sarà Access a fare da archivio centrale).
### FASE 1 - HTML - NODE.JS - ACCESS
      DOMANDA_CHATGBT_01
         Dalla tabella Access denominata CIVILIA_Tb06_PROTOCOLLO e che si trova in questo db:
            c:\Gestioni\GESTIONE_LLPP\25_GESTIONE_LLPP\CIVILIA_GESTIONE\CIVILIA_MDB\CIVILIA_N03_Tb06_PROTOCOLLO.mdb
         creo una query di estrazione degli atti denominata 
            CIVILIA_QryTb06_02_NODE_SERVER
               SELECT 
                     CIVILIA_Tb06_PROTOCOLLO.NUMERO_PROTOC_lng, 
                     CIVILIA_Tb06_PROTOCOLLO.DATA_PROTOC_s, 
                     CIVILIA_Tb06_PROTOCOLLO.OGGETTO_m, 
                     CIVILIA_Tb06_PROTOCOLLO.CORRISPON_m, 
                     CIVILIA_Tb06_PROTOCOLLO.NOTE_s, 
                     CIVILIA_Tb06_PROTOCOLLO.IdOrd_lng
                  FROM 
                     CIVILIA_Tb06_PROTOCOLLO;


         crea un Versione minima di server.js e index.html per la fase 1 (test locale con Access)?

      RISPOSTA_CHATGBT_01
         0 ROOT DEL PROGETTO
            Path e Progetto
               Nella path del progetto c:\GESTIONI\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA_NODE\
               inserisco questo schema:

               
                  HTML_POSTA_NODE/                     <- Cartella principale del progetto
                  │
                  ├─ node_modules/                     <- Moduli Node.js installati
                  ├─ package.json                       <- Configurazione NPM, script start
                  ├─ server.js                          <- Server Node.js
                  ├─ start.js.                          <- start.js
                  │
                  └─ HTML/                              <- Cartella frontend
                      ├─ POSTA_HTML_NODE.html           <- Pagina principale
                      ├─ script.js                      <- Logica JS per fetch e rendering
                      ├─ style.css                      <- Stile CSS
                    


         1. Installazione dipendenze
            Nel tuo progetto Node.js esegui:

             Ho chiesto chiarimenti.
            Mi trovo in questa directory c:\GESTIONI\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA_NODE\
            ed in sublime text seguo il progetto e node è gia installato;
            come primo passo devo installare questi pacchetti?
              
            Nel tuo progetto Node.js esegui:
               npm init -y
               npm install express body-parser node-adodb cors




         2. server.js
            Il server.js viene salvato nella rotto del progetto.

         3. creo la visualizzazione:

               <!DOCTYPE html>
                     <html lang="it">
                     <head>
                       <meta charset="UTF-8" />
                       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                       <title>Numeri Telefonici Dipendenti</title>
                       <style>
                         table { border-collapse: collapse; width: 100%; }
                         th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                         th { background-color: #f0f0f0; }
                       </style>
                     </head>
                     <body>
                       <h1>Rubrica Dipendenti</h1>
                       <table id="tabella-dati">
                         <thead>
                           <tr>
                             <th>ID</th>
                             <th>Nome</th>
                             <th>Telefono</th>
                           </tr>
                         </thead>
                         <tbody></tbody>
                       </table>

                       <script>
                         fetch('/dati')
                           .then(response => response.json())
                           .then(dati => {
                             const tbody = document.querySelector('#tabella-dati tbody');
                             dati.forEach(riga => {
                               const tr = document.createElement('tr');
                               tr.innerHTML = `<td>${riga.ID}</td><td>${riga.Nome}</td><td>${riga.Telefono}</td>`;
                               tbody.appendChild(tr);
                             });
                           });
                       </script>
                     </body>
                     </html>

         2.1 server.js modifica per la connessione access
            La connessione deve essere eseguita su questo database:
            Per collegarti a MS Access e leggere la tabella CIVILIA_Tb06_PROTOCOLLO nel file .mdb indicato, serve:
               1. Installare i driver e librerie
                  Esegui nel progetto:
                     npm install odbc

               2. attiva il server e visualizza, ok funziona.


        @3@2@visualizzazione - modifica con la query protocollo


        4. Perfetto! 😄 Procediamo a separare il tuo progetto in tre file distinti:
            
            @POSTA_HTML_NODE.html → struttura della pagina (HTML)


            @style.css → stili
            @script.js → logica JavaScript (fetch, filtro, rendering tabella)
            
            In questo modo sarà più chiaro dove cercare errori e la manutenzione sarà più semplice.


            Ecco un modello di struttura in formato testo, basato sul percorso indicato:
               c:\GESTIONI\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA_NODE\
              
              HTML_POSTA_NODE/                   <- Cartella principale del progetto
                  │
                  ├─ server.js                        <- Server Node.js
                  │
                  └─ HTML/                            <- Cartella contenente i file frontend
                      ├─ POSTA_HTML_NODE.html         <- Pagina HTML principale
                      │    ├─ <link rel="stylesheet" href="style.css">   <- Collegamento CSS
                      │    └─ <script src="script.js"></script>         <- Collegamento JS
                      │
                      ├─ style.css                    <- Foglio di stile per tabella e input
                      │
                      └─ script.js                    <- Logica JS: fetch, filtro, rendering tabella
                  

            Tutti e tre i file POSTA_HTML_NODE.html, script.js e style.css vanno nella stessa cartella HTML, così i riferimenti relativi funzionano senza modifiche.
            server.js può restare fuori dalla cartella HTML, ad esempio nella cartella HTML_POSTA_NODE/.
            Quando apri POSTA_HTML_NODE.html tramite il server Node.js, il server servirà il file HTML, 
            e i riferimenti a CSS e JS saranno risolti correttamente perché si trovano nella stessa cartella.

            MODIFICA
               ATTIVO L'APERTURA AUTOMATICA della pagina html ma prima:
                  1) Inizializza un progetto Node.js se non lo hai già:
                     npm init -y
                  2) Installa il pacchetto open:
                     npm install open
                  3) Crea un file start.js nella root del progetto: 
### FASE 1 - HTML - NODE.JS -ACCESS - RICOSTRUITO IN UFFICIO
   1. Preparazione dei file di progetto
      Copia l’intera cartella HTML_POSTA_NODE/ (con server.js, start.js, 
      package.json, HTML/, ecc.).

      Se utilizzi un database Access, assicurati di includere anche il file .accdb o .mdb 
      e di sapere il percorso corretto nel codice.

   2. Installazione di Node.js
         per assicurarti che sia correttamente installato.
         Nel tuo progetto Node.js esegui e deve essere eseguito nella cartella madre
               HTML_POSTA_NODE\

         Passaggi di installazione su Windows
         Vai su https://nodejs.org
         
            Clicca sul pulsante verde LTS.
            Scarica l’installer .msi per la tua architettura (64-bit o 32-bit).
            Avvia l’installer, lascia le opzioni di default (includendo npm).
            Dopo l’installazione, apri Prompt dei comandi e verifica:

            Scarica e installa Node.js LTS
         
            sulla macchina di destinazione.
            Dopo l’installazione, verifica con:
            
               node -v
               npm -v


               npm init -y
               npm install express body-parser node-adodb cors

   3. Installazione delle dipendenze
      Apri un terminale nella cartella principale del progetto: 
         cd percorso/del/progetto/HTML_POSTA_NODE
      Installa i moduli Node richiesti:
         npm install
      Questo ricostruirà la cartella node_modules/ basandosi sul file package.json.

   4. Installare le dipendenze per Access  
         Se il codice usa odbc  e deve essere eseguita la connessione ad access
            occorre installare i driver e le librerie:
               
               npm install odbc
         
         Se il codice usa node-adodb 
            npm install node-adodb

   5. Disposizione dei file
      Nella cartella madre HTML_POSTA_NODE/ saranno salvati i file:

         start.js                   <---------- l'avvio del server della 
                                                pagina html e della connessione ad access
         server.js                  <---------- il serve java script che si connette ad access
         package.json               <---------- le impostazioni di json
         package-lock.json          <---------- (se presente, aiuta a replicare le versioni esatte)
         node_modules               <---------- tutte le dipendenze di node create con node


      Struttura definitiva del progetto, se vuoi compiarla è senza module 
         HTML_POSTA_NODE/
            │
            ├─ start.js
            ├─ server.js
            ├─ package.json
            ├─ package-lock.json   (se presente, aiuta a replicare le versioni esatte)
            │
            └─ HTML/
               ├─ POSTA_HTML_NODE.html
               ├─ script.js
               ├─ style.css
               └─ ... (altre risorse frontend)

   6. RIEPILOGO PROCESSO DI INSTALLAZIONE
         package-lock.json   (se presente, aiuta a replicare le versioni esatte)

      Passaggi per preparare il nuovo PC
         6.1. Copia del progetto

            Porta sul nuovo PC la cartella madre senza node_modules/:
               
               HTML_POSTA_NODE/
                     │
                     ├─ HTML/                         # Cartella frontend con HTML, JS, CSS - DA COPIARE
                     │
                     ├─ OBJECT/                       # Eventuali altri oggetti o risorse - DA COPIARE
                     │
                     ├─ node_modules/                 # Dipendenze Node - NON COPIARE, SI RICREA con `npm install`
                     │
                     ├─ start.js                      # Script di avvio - DA COPIARE
                     ├─ server.js                     # Server principale - DA COPIARE
                     ├─ package.json                  # Configurazione progetto - DA COPIARE
                     ├─ package-lock.json             # Versioni esatte dei moduli (se presente) - DA COPIARE
                     │
                     ├─ Project                       # File di progetto Sublime Text - DA COPIARE
                     ├─ README_HTML_POSTA_NODE.MD     # File documentazione - DA COPIARE




         6.2. Installazione di Node.js (una sola volta)
            
            Scarica da https://nodejs.org
             la versione LTS e installala.

         6.3. Installazione dipendenze nella cartella madre
            Apri Prompt dei comandi nella cartella HTML_POSTA_NODE/ e lancia:
               npm install
            
            VISTO CHE LE DIPENDENZE SI TROVANO nel package.json il tuo progetto 
            richiede le seguenti dipendenze:
               express – framework per il server web
               body-parser – per leggere dati dalle richieste HTTP
               cors – per gestire richieste cross-origin
               node-adodb – per collegarsi a database Access tramite ADODB
               odbc – per connessione tramite driver ODBC
               open – per aprire automaticamente la pagina nel browser

            che possono essere eseguito o con il primo comando specifico e dettagliato, 
            oppure con il secondo comando che scarichera le dipendenze indicate nel package.json:

               npm install body-parser@^2.2.0 cors@^2.8.5 express@^5.1.0 node-adodb@^5.0.3 odbc@^2.4.9 open@^10.2.0
               
               npm install





   7. ATTENZIONE AI PERCORSI ASSOLUTI SE SPOSTI IL PROGETTO
       
       7.1. Dove controllare i percorsi
               Il progetto è costruito su questa path: 
                  c:\Gestioni\GESTIONE_LLPP\TMP\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT\HTML_POSTA_NODE\
               Se lo ricostruisci una un'altra posizione come ad esegmpio 
                  C:\UFFICIO\POSTA\HTML_POSTA
               Devi cambiare i percorsi assoluti.

               Quin devi controllare i percorsi, se sono relativi (es. ./HTML/script.js 
               o ../database/file.accdb), puoi spostare tutto senza problemi.
               
               Se invece usi percorsi assoluti dovrai modificarli con la nuova path:
                  es. C:\UFFICIO\POSTA\HTML_POSTA\

       7.2. Controlla questi file per i percorsi assoluti sui seguenti file:
               
               server.js 
                  // Percorso DB Access @percorso@assoluto@database@access
                  const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:\\Gestioni\\GESTIONE_LLPP\\25_GESTIONE_LLPP\\CIVILIA_GESTIONE\\CIVILIA_MDB\\CIVILIA_N03_Tb06_PROTOCOLLO.mdb;`;
               
               start.js 
                  non ci sono percrosi assoluti.

               file HTML.
                  non ci sono percrosi assoluti.
                  l'unico percorso relativo è 
                    <!-- @percorso@realtivo@script.js  finche rimane nella stessa cartella funziona  -->
                       <script src="script.js"></script>

### CARATTERISTICHE DEL PROGETTO E MODIFICHE EFFETTUATE
#### COMANDI A TITOLO FISSO  (2025.08.24)
         i comandi che rendono fissi titolo, barra di ricerca e intestazioni della tabella 
         vanno nel CSS, non nell’HTML. 
         
         Nell’HTML definisci solo gli elementi (<h1>, <input>, <thead>).
.........
         Nel CSS applichi position: sticky, top, z-index e background.
         1. position: sticky
            Tipo di posizionamento che combina relative e fixed.
            L’elemento resta relativo finché non raggiunge la posizione definita da top, 
            poi diventa “appiccicoso”.
            Documentazione ufficiale:
            MDN - position
         
         2. top
            
            Definisce la distanza dall’angolo superiore del contenitore o viewport quando l’elemento diventa sticky.
            Si può usare con sticky o fixed.
            Documentazione ufficiale:
            MDN - top

         3. z-index
            
            Gestisce la profondità degli elementi: chi ha valore più alto sta sopra gli altri.
            Funziona solo con elementi posizionati (relative, absolute, fixed, sticky).
            Documentazione ufficiale:
            MDN - z-index

         4. background
            
            Imposta colore o immagine di sfondo dell’elemento.
            Serve nelle intestazioni sticky e nella barra di ricerca per coprire i 
            contenuti sottostanti.
            Documentazione ufficiale:
            MDN - background  

         Raccomandazioni pratiche

               Puoi usare strumenti come DevTools in Chrome o Firefox 
               per vedere in tempo reale come sticky, top e z-index influenzano gli elementi.
               Se vuoi un riferimento rapido con esempi concreti per titolo, 
               barra e intestazioni sticky, posso prepararti una mini-tabella CSS con 
               valori consigliati pronta da copiare nel tuo progetto.


               @Barra@di@ricerca@fissa
               @Titolo@fisso
#### CHIUSURA AUTOMATICA SERVE NODE  (2025.08.24)
      Quando chiudi la pagina nel browser, il server Node.js NON si chiude automaticamente.
         
         Ecco perché:
            Il server Node.js gira come processo separato sul tuo computer 
            (tramite node server.js o npm start).
         
            Il browser è solo un client che fa richieste al server.
            Chiudere il browser interrompe solo la connessione client, 
            ma il server rimane attivo in background.
            Come fermare il server:

                     



