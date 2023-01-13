let quantityCards = 0;
let quantityOfClicks = 0;
let time = 0;

let listOfGifs = [];
let turnedCards = [];
let listOfRightCards = [];

let cardSelected;

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

// function addTime() {
//   time++;
// }

function clearGame() {
  quantityCards = 0;
  turnedCards = [];
  listOfGifs = [];
  quantityOfClicks = 0;
  cardSelected = '';
  listOfRightCards = [];

  const list = document.querySelector('ul');

  list.innerHTML = '';
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

  getGifs();

  for (let i = 0; i < quantityCards; i++) {
    list.innerHTML += `<li class="card" onclick="handleTurnCard(this, ${i})">
    <div class="face closed">
      <img src="assets/back.png" alt="" />
    </div>
    <div class="face opened">
      <img src="assets/${listOfGifs[i]}" alt="" />
    </div>
  </li>`;
  }
}

function handleTurnAllCardsBack() {
  const list = document.querySelector('ul');
  const cardOne = list.children[turnedCards[0]];
  const cardTwo = list.children[turnedCards[1]];

  setTimeout(() => {
    cardOne.querySelector('.closed img').style.transform = 'rotateY(0deg)';
    cardOne.querySelector('.opened img').style.transform = 'rotateY(-180deg)';

    cardTwo.querySelector('.closed img').style.transform = 'rotateY(0deg)';
    cardTwo.querySelector('.opened img').style.transform = 'rotateY(-180deg)';
  }, '1000');

  turnedCards = [];
}

function handleAddRightCards() {
  listOfRightCards = [...listOfRightCards, ...turnedCards];

  turnedCards = [];

  if (listOfRightCards.length === Number(quantityCards)) {
    setTimeout(() => {
      alert(`Você ganhou em ${quantityOfClicks} jogadas!`);
      clearGame();
    }, 500);
  }
}

function handleTurnCard(card, index) {
  const back = card.querySelector('.closed');
  const opened = card.querySelector('.opened');

  if (!listOfRightCards.includes(index)) {
    quantityOfClicks++;
    opened.style.transform = 'rotateY(0deg)';
    back.style.transform = 'rotateY(-180deg)';

    turnedCards.push(index);

    if (turnedCards.length === 1) {
      cardSelected = card;
    } else if (turnedCards.length === 2) {
      const currentCard = card.querySelector('.opened img').getAttribute('src');
      const selectedCard = cardSelected
        .querySelector('.opened img')
        .getAttribute('src');

      currentCard === selectedCard
        ? handleAddRightCards()
        : handleTurnAllCardsBack();
    }
  }
}

getQuantityOfCards();
