// ============================================================
// file: @script.js - logica per POSTA_HTML_NODE.html
// ============================================================

/*
Tabella Segnalibri Numerati:
#   | Attività / Funzione                     | Segnalibro
--------------------------------------------------------
01  | Recupero dati dal server               | @01
02  | Salvataggio dati globali               | @02
03  | Render tabella completa                | @03
04  | Creazione righe                        | @04
05  | Inserimento righe nel tbody            | @05
06  | Filtro in tempo reale                  | @06
07  | Logica filtro                           | @07
08  | Aggiornamento tabella filtrata        | @08
09  | Gestione errori fetch                  | @09
10  | Recupero IP server                     | @10
*/

// @01 - Recupero dati dal server
let datiGlobali = []; // @02 - archivio globale dati per filtraggio

fetch('/dati') // @01
  .then(response => response.json())
  .then(dati => {
    datiGlobali = dati;                    // @02 - salva dati per filtro
    renderizzaTabella(datiGlobali);       // @03 - render tabella completa
    console.log("Dati caricati:", datiGlobali); // @09 - Debug: controlla dati caricati
  })
  .catch(err => {                         // @09 - gestione errori fetch
    console.error('Errore nel recupero dati:', err);
  });

// @03 - Funzione renderizza tabella da array dati
function renderizzaTabella(dati) {
  const tbody = document.querySelector('#tabella-dati tbody');
  tbody.innerHTML = ''; // pulisce tabella

  // @04 - iterazione e costruzione righe
  dati.forEach(riga => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${riga.NUMERO_PROTOC_lng}</td>
      <td>${riga.DATA_PROTOC_s}</td>
      <td>${riga.OGGETTO_m}</td>
      <td>${riga.CORRISPON_m}</td>
      <td>${riga.NOTE_s}</td>
      <td>${riga.IdOrd_lng}</td>
    `;
    tbody.appendChild(tr); // @05 - inserimento righe
  });
}

// @10 - Recupera e mostra IP del server
fetch('/server-ip')
  .then(res => res.json())
  .then(data => {
    const ipElem = document.getElementById('master-ip'); // span accanto al titolo
    if(ipElem) {
      ipElem.textContent = `IP: ${data.ip}`;
    } else {
      console.warn('Elemento #master-ip non trovato nella pagina');
    }
  })
  .catch(err => console.error('Errore recupero IP:', err)); // @09

// @06 - filtro in tempo reale sui campi specifici
document.getElementById('searchInput').addEventListener('input', function() {
  // @07 - ottiene il testo di ricerca in minuscolo
  const valore = this.value.toLowerCase();

  // @07 - filtra i dati confrontando tre campi
  const datiFiltrati = datiGlobali.filter(riga =>
    String(riga.NUMERO_PROTOC_lng).toLowerCase().includes(valore) ||
    String(riga.OGGETTO_m).toLowerCase().includes(valore) ||
    String(riga.CORRISPON_m).toLowerCase().includes(valore)
  );

  // @08 - aggiorna la tabella con i dati filtrati
  renderizzaTabella(datiFiltrati);
});
