// ============================================================
// file: @script.js - logica per POSTA_HTML_NODE.html
// ============================================================

// @fetch - archivio globale dati per filtraggio
let datiGlobali = [];

// @fetch - recupero dati dal server
fetch('/dati')
  .then(response => response.json())
  .then(dati => {
    datiGlobali = dati;                    // @search - salva dati per filtro
    renderizzaTabella(datiGlobali);        // @renderFunction
    console.log("Dati caricati:", datiGlobali); // Debug: controlla dati caricati
  })
  .catch(err => {                         // @errorHandling
    console.error('Errore nel recupero dati:', err);
  });

// @renderFunction - costruisce tabella da array dati
function renderizzaTabella(dati) {
  const tbody = document.querySelector('#tabella-dati tbody');
  tbody.innerHTML = ''; // pulisce tabella

  // @renderRows - iterazione e costruzione righe
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
    tbody.appendChild(tr); // @appendRows
  });
}

// @searchEvent - filtro in tempo reale sui campi specifici
document.getElementById('searchInput').addEventListener('input', function() {
  // @filterLogic - ottiene il testo di ricerca in minuscolo
  const valore = this.value.toLowerCase();

  // @filterData - filtra i dati confrontando tre campi
  const datiFiltrati = datiGlobali.filter(riga =>
    String(riga.NUMERO_PROTOC_lng).toLowerCase().includes(valore) ||
    String(riga.OGGETTO_m).toLowerCase().includes(valore) ||
    String(riga.CORRISPON_m).toLowerCase().includes(valore)
  );

  // @updateTable - aggiorna la tabella con i dati filtrati
  renderizzaTabella(datiFiltrati);
});
