let quantityCards = 0;
let quantityOfClicks = 0;
let time = 0;

let listOfGifs = [];
let turnedCards = [];
let listOfRightCards = [];

let cardOneSelected;
let cardTwoSelected;
let id;

let response = '';
let clickable = true;

const data = [
  'bobrossparrot.gif',
  'explodyparrot.gif',
  'fiestaparrot.gif',
  'metalparrot.gif',
  'revertitparrot.gif',
  'tripletsparrot.gif',
  'unicornparrot.gif'
];

function comparator() {
  return Math.random() - 0.5;
}

function timer() {
  id = setInterval(() => {
    addTime();
  }, 1000);
}

function addTime() {
  const h2 = document.querySelector('h2');
  time++;

  h2.innerHTML = time;
}

function clearGame() {
  clearInterval(id);

  quantityCards = 0;
  quantityOfClicks = 0;
  time = 0;

  listOfGifs = [];
  turnedCards = [];
  listOfRightCards = [];

  cardOneSelected = null;
  cardTwoSelected = null;

  const list = document.querySelector('ul');

  list.innerHTML = '';
}

function endGame() {
  clearInterval(id);
}

function getQuantityOfCards() {
  while (quantityCards % 2 !== 0 || quantityCards < 4 || quantityCards > 14) {
    quantityCards = prompt(
      'Com quantas cartas você quer jogar (digite um número par entre 4 e 14)?'
    );
  }

  createGame();
}

function getGifs() {
  data.sort(comparator);

  for (let i = 0; i < quantityCards / 2; i++) {
    const item = data[i];
    listOfGifs.push(item);
    listOfGifs.push(item);
  }

  listOfGifs.sort(comparator);
}

function createGame() {
  const list = document.querySelector('ul');

  timer();
  getGifs();

  for (let i = 0; i < quantityCards; i++) {
    list.innerHTML += `<li class="card" data-test="card" onclick="handleTurnCard(this, ${i})">
    <div class="face closed">
      <img src="assets/back.png" alt="" data-test="face-down-image" />
    </div>
    <div class="face opened">
      <img src="assets/${listOfGifs[i]}" alt="" data-test="face-up-image" />
    </div>
  </li>`;
  }
}

function handleTurnAllCardsBack() {
  clickable = false;

  setTimeout(() => {
    cardOneSelected.children[0].style.transform = 'rotateY(0deg)';
    cardOneSelected.children[1].style.transform = 'rotateY(-180deg)';

    cardTwoSelected.children[0].style.transform = 'rotateY(0deg)';
    cardTwoSelected.children[1].style.transform = 'rotateY(-180deg)';

    clickable = true;
  }, '1000');

  turnedCards = [];
}

function willPlayAgain() {
  while (response !== 'sim' && response !== 'não') {
    response = prompt('Gostaria de reiniciar a partida? (digite sim ou não)');
  }

  if (response === 'sim') {
    clearGame();
    getQuantityOfCards();
  } else if (response === 'não') {
    endGame();
  } else {
    willPlayAgain();
  }
}

function handleAddRightCards() {
  listOfRightCards = [...listOfRightCards, ...turnedCards];

  turnedCards = [];

  if (listOfRightCards.length === Number(quantityCards)) {
    setTimeout(() => {
      alert(
        `Você ganhou em ${quantityOfClicks} jogadas! A duração do jogo foi de ${time} segundos!`
      );

      willPlayAgain();
    }, 200);
  }
}

function handleTurnCard(card, index) {
  const back = card.querySelector('.closed');
  const opened = card.querySelector('.opened');

  if (!listOfRightCards.includes(index) && clickable) {
    quantityOfClicks++;
    opened.style.transform = 'rotateY(0deg)';
    back.style.transform = 'rotateY(-180deg)';

    turnedCards.push(index);

    if (turnedCards.length === 1) {
      cardOneSelected = card;
    } else if (turnedCards.length === 2) {
      cardTwoSelected = card;

      const currentCard = card.querySelector('.opened img').getAttribute('src');
      const selectedCard = cardOneSelected
        .querySelector('.opened img')
        .getAttribute('src');

      currentCard === selectedCard
        ? handleAddRightCards()
        : handleTurnAllCardsBack();
    }
  }
}

getQuantityOfCards();
