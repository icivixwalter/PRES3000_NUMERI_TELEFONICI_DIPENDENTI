/* 
   Elenco telefonico dipendenti per lettera
   ELENCO_JavaScript_NUMERI_TELEFONICI_DIPENDENTI_LETT_B.JS
/* ============================================================================*/


// elencoA.js
const elencoA = [
  { nome: "Allegrini Claudio",      email: "claudio.allegrini@comune.frosinone.it",       telefono: "0775.265.6618", note: "" },
  { nome: "Alonzi Rocco",           email: "rocco.alonzi@comune.frosinone.it",            telefono: "0775.265.6263", note: "" },
  { nome: "Andreone Mauro",         email: "mauro.andreone@comune.frosinone.it",          telefono: "0775.265.6552", note: "" },
  { nome: "Angelica",               email: "",                                            telefono: "0775.265.6636", note: "al posto di santoro enrica" },
  { nome: "Antonucci Maria Grazia", email: "mariagrazia.antonucci@comune.frosinone.it",   telefono: "0775.265.6208", note: "" },
  { nome: "Antonucci Pierluigi",    email: "pierluigi.antonucci@comune.frosinone.it",     telefono: "0775.265.6601", note: "" },
  { nome: "Archilletti Tiziana",    email: "tiziana.archilletti@comune.frosinone.it",     telefono: "0775.265.6230", note: "" },
  { nome: "Arduini Anna",           email: "anna.arduini@comune.frosinone.it",            telefono: "0775.265.6670", note: "" }
];

/*bloccato export default elencoA; 

Ma il tuo HTML lo carica come file <script src="...">, cioè in contesto globale, non come modulo JavaScript (type="module").
Quindi:

L’export genera un errore nei browser (file non è un modulo).

La costante elencoA non viene caricata nello script principale.

*/

