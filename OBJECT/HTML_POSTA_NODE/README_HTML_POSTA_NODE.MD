
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
            npm init -y
            npm install express body-parser node-adodb cors

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
            La connessione deve essere esguita su questo database:
            Per collegarti a MS Access e leggere la tabella CIVILIA_Tb06_PROTOCOLLO nel file .mdb indicato, serve:
               1. Installare i driver e librerie
                  Esegui nel progetto:
                     npm install odbc

               2. attiva il server e visualizza, ok funziona.


        @3@2@visualizzazione - modifica con la query protocollo


        4. Perfetto! 😄 Procediamo a separare il tuo progetto in tre file distinti:
            
            POSTA_HTML_NODE.html → struttura della pagina (HTML)


            style.css → stili
            script.js → logica JavaScript (fetch, filtro, rendering tabella)
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

