let quantityCards = 0;
let turnedCards = [];

function getQuantityOfCards() {
  while (quantityCards % 2 !== 0 || quantityCards < 4 || quantityCards > 14) {
    quantityCards = prompt(
      'Com quantas cartas você quer jogar (digite um número par entre 4 e 14)?'
    );
  }

  createGame();
}

function createGame() {
  const list = document.querySelector('ul');

  for (let i = 0; i < quantityCards; i++) {
    list.innerHTML += `<li class="card" onclick="handleTurnCard(this, ${i})">
    <div class="face closed">
      <img src="assets/back.png" alt="" />
    </div>
    <div class="face opened">
      <img src="assets/bobrossparrot.gif" alt="" />
    </div>
  </li>`;
  }
}

function handleTurnAllCardsBack() {
  const list = document.querySelector('ul');
  const cardOne = list.children[turnedCards[0]];
  const cardTwo = list.children[turnedCards[1]];

  setTimeout(() => {
    cardOne.children[0].style.transform = 'rotateY(0deg)';
    cardOne.children[1].style.transform = 'rotateY(-180deg)';

    cardTwo.children[0].style.transform = 'rotateY(0deg)';
    cardTwo.children[1].style.transform = 'rotateY(-180deg)';
  }, '1000');

  turnedCards = [];
}

function handleTurnCard(card, index) {
  const back = card.querySelector('.closed');
  const opened = card.querySelector('.opened');

  opened.style.transform = 'rotateY(0deg)';
  back.style.transform = 'rotateY(-180deg)';

  turnedCards.push(index);

  if (turnedCards.length === 2) {
    handleTurnAllCardsBack();
  }
}

getQuantityOfCards();
