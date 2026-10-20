const PREZZO_KM = 0.21; // € per km 
const SCONTI = {
    maggiorenne: { nome: "Biglietto Maggiorenne", sconto: 0 },
    minorenne: { nome: "Biglietto Minorenne (-20%)", sconto: 0.20 },
    over65: { nome: "Biglietto Over 65 (-40%)", sconto: 0.40 }
};
const $ = id => document.getElementById(id);
const fmt = n => n.toFixed(2).replace(".", ",") + " €";

$("btn-Calcola").addEventListener("click", () => {
    const nome = $("nome").value.trim();
    const km = parseFloat($("km").value);
    const fascia = SCONTI[$("eta").value];

    if (!nome) {
        $("err").textContent = "Inserisci nome e cognome.";
        return;
    }
    if (!(km > 0)) {
        $("err").textContent = "Inserisci un numero di km valido.";
        return;
    }
    $("err").textContent = "";

    const base = km * PREZZO_KM;
    const finale = base * (1 - fascia.sconto);
    const risparmio = base - finale;

    $("tNome").textContent = nome;
    $("tOff").textContent = fascia.nome;
    $("tCar").textContent = Math.floor(Math.random() * 10) + 1;
    $("tCod").textContent = Math.floor(90000 + Math.random() * 10000);
    $("tPrezzo").innerHTML = fmt(finale) + (fascia.sconto ? '<span class="old">Prezzo pieno: ' + fmt(base) + '</span>' + '<span class="sconto">Sconto ' + (fascia.sconto * 100) + '%: -' + fmt(risparmio) + '</span>' : '');
    $("ticket").style.display = "block";
    $("ticket").scrollIntoView({ behavior: "smooth" });
});

$("btn-Annulla").addEventListener("click", () => {
    $("nome").value = "";
    $("km").value = "";
    $("eta").value = "maggiorenne";
    $("err").textContent = "";
    $("ticket").style.display = "none";
});

