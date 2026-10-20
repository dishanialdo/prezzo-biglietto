const PREZZO_KM = 0.21; // € per km
const SCONTI = {
    maggiorenne: { nome: "Biglietto Standard", sconto: 0 },
    minorenne: { nome: "Biglietto Minorenne (-20%)", sconto: 0.20 },
    over65: { nome: "Biglietto Over 65 (-40%)", sconto: 0.40 }
};
const $ = id => document.getElementById(id);
const fmt = n => n.toFixed(2).replace(".", ",") + " €";

$("genera").addEventListener("click", () => {
    const nome = $("nome").value.trim();
    const km = parseFloat($("km").value);
    const fascia = SCONTI[$("eta").value];

    if (!nome) return $("err").textContent = "Inserisci nome e cognome.";
    if (!km > 0) return $("err").textContent = "Inserisci un numero di km valido.";
    $("err").textContent = "";

    const base = km * PREZZO_KM;
    const finale = base * (1 - fascia.sconto);
    $("tNome").textContent = nome;
    $("tOff").textContent = fascia.nome;
    $("tCar").textContent = Math.floor(Math.random() * 10) + 1;
    $("tCod").textContent = Math.floor(90000 + Math.random() * 10000);
    $("tPrezzo").innerHTML = (fascia.sconto ? '<span class="old>' + fmt(base) + '</span>' : '') + fmt(finale);

    $("ticket").style.display = "block";
    $("ticket").scrollIntoView({ behavior: "smooth" });
});

$("annulla").addEventListener("click", () => {
    $("nome").value = "";
    $("km").value = "";
    $("eta").value = "maggiorenne";
    $("err").textContent = "";
    $("ticket").style.display = "none";

});
