import Deck from './deck.js';
import { Card } from './deck.js';

const CARD_WEIGHTS = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

let playerDeck, computerDeck, gameOver;

const playerCardElement = document.querySelector(".player-card");
const computerCardElement = document.querySelector(".computer-card");
const playerDeckElement = document.querySelector(".player-deck");
const computerDeckElement = document.querySelector(".computer-deck");
const playerCount = document.querySelector(".player-count");
const computerCount = document.querySelector(".computer-count");

const deck = new Deck();
deck.shuffle();


playerCardElement.addEventListener('click', () => flipCards());

const startGame = () => {
    gameOver = false;
    let deck = new Deck();
    deck.shuffle();
    playerDeck = new Deck(deck.cards.slice(0, deck.midPoint));
    computerDeck = new Deck(deck.cards.slice(deck.midPoint, deck.noOfCards));
    updateCount();
}

const flipCards = () => {
    if (!gameOver) {
        const playerCard = playerDeck.cards.pop();
        const computerCard = computerDeck.cards.pop();
        console.log(playerCard, computerCard);
        playerCardElement.innerHTML = playerCard.value;
        playerCardElement.dataset.value = `${playerCard.value} ${playerCard.suit}`
        computerCardElement.dataset.value = `${computerCard.value} ${computerCard.suit}`

        computerCardElement.innerHTML = computerCard.value;
        if (playerDeck.noOfCards == 0 || computerDeck.noOfCards == 0) {
            gameOver = true;
        } else {
            if (CARD_WEIGHTS[playerCard.value] > CARD_WEIGHTS[computerCard.value]) {
                playerDeck.cards.unshift(playerCard);
                playerDeck.cards.unshift(computerCard);
            } else if (CARD_WEIGHTS[playerCard.value] < CARD_WEIGHTS[computerCard.value]) {
                computerDeck.cards.unshift(playerCard);
                computerDeck.cards.unshift(computerCard);
            } else {
                computerDeck.cards.unshift(computerCard);
                playerDeck.cards.unshift(playerCard);
            }
        }
    }

    playerCount.innerText = playerDeck.noOfCards;
    computerCount.innerText = computerDeck.noOfCards;

}

const updateCount = () => {
    playerCount.innerText = playerDeck.noOfCards;
    computerCount.innerText = computerDeck.noOfCards;
}

startGame();

