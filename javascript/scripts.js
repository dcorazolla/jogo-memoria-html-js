const cartas = document.querySelectorAll('.carta');

let cartaVirada = false;
let bloqueado = false;
let primeiraCarta, segundaCarta;
let erros = 0;
let viradas = 0;

/**
* Vira as cartas ao clicar
*/
function virarCarta()
{
    // se estiver bloqueado não faz nada
    if (bloqueado) return;
    // se o clique for na mesma carta já virada
    if (this === primeiraCarta) return;
    // vira a carta
    this.classList.add('virada');
    // se estiver virando a primeira carta
    if (!cartaVirada)
    {
        // marca que já virou carta nesta rodada
        cartaVirada = true;
        // adiciona a carta virada à variavel
        primeiraCarta = this;
        // retorna
        return;
    }
    viradas++;
    document.getElementById("spnTentativas").innerHTML = viradas;
    // se chegou até aqui significa que está virando a segunda carta da rodada
    // atribui a carta à variavel
    segundaCarta = this;
    // chama função para verificar se são iguais
    verificaIgualdade();
}

/**
* Verifica se as cartas viradas são iguais
*/
function verificaIgualdade() {
    // se as cartas viradas foram iguais
    if (primeiraCarta.dataset.linguagem === segundaCarta.dataset.linguagem)
    {
        // pisca bordas em verde
        //piscaBorda(1);
        // desativa as cartas, mantendo as mesmas viradas
        desativaCartas();
        return;
    }
    erros++;
    document.getElementById("spnErros").innerHTML = erros;
    // pisca bordas em vermelho
    piscaBorda(2);
    // desvira as cartas
    desvirarCartas();
}

/**
* Efeito de cor na borda da carta
*/
function piscaBorda(tipo)
{
    var classe = "bordaok";
    if (tipo !== 1) classe = "bordaerro";

    primeiraCarta.classList.add(classe);
    segundaCarta.classList.add(classe);

    setTimeout(() => {
        primeiraCarta.classList.remove(classe);
        segundaCarta.classList.remove(classe);
    }, 1000);
}

/**
* Remove listener click das cartas
*/
function desativaCartas()
{
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    zeraVariaveis();
}

/**
* Desvira as cartas voltando à posição inicial
*/
function desvirarCartas()
{
    bloqueado = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        zeraVariaveis();
    }, 1000);
}

/**
* Reseta valores das variaveis do jogo
*/
function zeraVariaveis() 
{
    [cartaVirada, bloqueado] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

/**
* Embaralha cartas
*/
(function shuffle() {
    cartas.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cartas.forEach(card => card.addEventListener('click', virarCarta));