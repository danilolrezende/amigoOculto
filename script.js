let participantes = [];

function adicionar() {
    const nome = document.getElementById("nome").value.trim();
    if (!nome) return alert("Digite um nome");
    participantes.push(nome);
    document.getElementById("nome").value = "";
    atualizarLista();
}

function atualizarLista() {
    document.getElementById("lista").innerHTML =
        participantes.map(p => `<div class='card'>${p}</div>`).join("");
}

// embaralhar Fisher-Yates
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function gerarLinks() {
    if (participantes.length < 3)
        return alert("Adicione pelo menos 3 participantes.");

    let sorteio = embaralhar([...participantes]);
    
    // impede alguém tirar ele mesmo
    for (let i = 0; i < participantes.length; i++) {
        if (participantes[i] === sorteio[i]) {
            return gerarLinks(); // refaz
        }
    }

    const base = window.location.origin + window.location.pathname.replace("index.html", "") + "ver.html";
    
    let html = "";
    for (let i = 0; i < participantes.length; i++) {
        const giver = participantes[i];
        const receiver = sorteio[i];
        const codificado = btoa(encodeURIComponent(receiver));
        const link = `${base}?p=${encodeURIComponent(giver)}&c=${codificado}`;
        html += `<div class='card'><b>${giver}</b>: <a href="${link}" target="_blank">${link}</a></div>`;
    }

    document.getElementById("links").innerHTML = html;
}
