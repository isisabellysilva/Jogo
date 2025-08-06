let cartas = [
  { id: 'carta1', nome: 'Bela', valor: 120 },
  { id: 'carta2', nome: 'Branca de Neve', valor: 130 },
  { id: 'carta3', nome: 'Merida', valor: 190 },
  { id: 'carta4', nome: 'Moana', valor: 110 },
  { id: 'carta5', nome: 'Rapunzel', valor: 180 },
  { id: 'carta6', nome: 'Tiana', valor: 150 }
];

let jogadorCartas = [], computadorCartas = [], escolha = null;
let pontosJogador = 0, pontosComputador = 0, rodada = 1;

function distribuirCartas() {
  let embaralhadas = [...cartas].sort(() => Math.random() - 0.5);
  jogadorCartas = embaralhadas.slice(0, 3);
  computadorCartas = embaralhadas.slice(3, 6);
  atualizarCartasJogador();
  atualizarCartasComputador();
  document.querySelector('.area-duelo').classList.remove('ativo');
}

function atualizarCartasJogador() {
  const div = document.querySelector('.cartas_jogo');
  div.innerHTML = '';
  jogadorCartas.forEach(carta => {
    const img = document.createElement('img');
    img.src = `/static/img/cartas/${carta.id}.png`;
    img.alt = carta.nome;
    img.id = carta.id;
    img.addEventListener('click', selecionarCarta);
    div.appendChild(img);
  });
}

function atualizarCartasComputador() {
  const div = document.querySelector('.computador');
  div.innerHTML = '';
  computadorCartas.forEach(carta => {
    const img = document.createElement('img');
    img.src = '/static/img/verso.png';
    img.alt = 'Carta Oculta';
    img.id = `pc-${carta.id}`;
    div.appendChild(img);
  });
}

function selecionarCarta(e) {
  document.querySelectorAll('.cartas_jogo img').forEach(i => i.classList.remove('selecionada'));
  e.target.classList.add('selecionada');
  escolha = jogadorCartas.find(c => c.id === e.target.id);
}

function jogar() {
  if (!escolha) return alert('Escolha uma carta!');
  
  // Esconde o botão "Jogar"
  document.getElementById('jogar').style.display = 'none';

  const escolhaPC = computadorCartas[Math.floor(Math.random() * computadorCartas.length)];
  const areaDuelo = document.querySelector('.area-duelo');
  const cartaJogador = document.querySelector('.carta-jogador');
  const cartaComputador = document.querySelector('.carta-computador');
  const resultadoDuelo = document.querySelector('.resultado-duelo');

  cartaJogador.style.backgroundImage = `url(/static/img/cartas/${escolha.id}.png)`;
  cartaComputador.style.backgroundImage = `url(/static/img/cartas/${escolhaPC.id}.png)`;

  let resultado = '';
  if (escolha.valor > escolhaPC.valor) {
    pontosJogador += escolha.valor - escolhaPC.valor;
    resultado = `Você ganhou! +${escolha.valor - escolhaPC.valor} pontos`;
  } else if (escolha.valor < escolhaPC.valor) {
    pontosComputador += escolhaPC.valor - escolha.valor;
    resultado = `Computador ganhou! +${escolhaPC.valor - escolha.valor} pontos`;
  } else {
    resultado = 'Empate!';
  }

  resultadoDuelo.textContent = resultado;
  areaDuelo.classList.add('ativo');

  document.getElementById('pontos-jogador').innerText = pontosJogador;
  document.getElementById('pontos-maquina').innerText = pontosComputador;

  jogadorCartas = jogadorCartas.filter(c => c.id !== escolha.id);
  computadorCartas = computadorCartas.filter(c => c.id !== escolhaPC.id);
  escolha = null;

  setTimeout(() => {
    areaDuelo.classList.remove('ativo');
    if (jogadorCartas.length === 0) {
      fimDeJogo();
    } else {
      atualizarCartasJogador();
      atualizarCartasComputador();
      // Mostra o botão "Jogar" novamente
      document.getElementById('jogar').style.display = 'inline';
    }
  }, 3000);
}

function fimDeJogo() {
  setTimeout(() => {
    if (pontosJogador > pontosComputador) {
      alert(`Você venceu com ${pontosJogador} pontos!`);
    } else if (pontosJogador < pontosComputador) {
      alert(`Computador venceu com ${pontosComputador} pontos!`);
    } else {
      alert(`Empate com ${pontosJogador} pontos!`);
    }
    reiniciarJogo();
  }, 500);
}

function reiniciarJogo() {
  rodada = 1;
  pontosJogador = 0;
  pontosComputador = 0;
  document.getElementById('pontos-jogador').innerText = '0';
  document.getElementById('pontos-maquina').innerText = '0';
  distribuirCartas();
  // Mostra o botão "Jogar" novamente ao reiniciar
  document.getElementById('jogar').style.display = 'inline';
}

document.addEventListener('DOMContentLoaded', () => {
  distribuirCartas();
  document.getElementById('jogar').addEventListener('click', jogar);
});
