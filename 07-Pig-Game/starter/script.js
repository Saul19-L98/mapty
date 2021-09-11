'use strict';

let player0Ele = document.querySelector('.player--0');
let player1Ele = document.querySelector('.player--1');

let score0Ele = document.getElementById('score--0');
let score1Ele = document.querySelector('#score--1');

let currentScore0Ele = document.getElementById('current--0');
let currentScore1Ele = document.getElementById('current--1');

let btnRoll = document.querySelector('.btn--roll');
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
let dice = document.querySelector('.dice');
let score = [0,0];
//While playing is true.
let playing = true;

const currentPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Ele.classList.toggle('player--active');
    player1Ele.classList.toggle('player--active');
};

const diceRoll = () => {
    if (playing){
        const diceNumber = Math.trunc(Math.random()*6) + 1;
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNumber}.png`;
        if( diceNumber !== 1){
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent =currentScore;
        }else{
            currentPlayer();
        };
    };
}; 

const holdValue = () => {
    if(playing){
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer]; 
        if(score[activePlayer] >= 100){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            dice.classList.add('hidden');
        }else{
            currentPlayer();
        };
    };
};

const newGame = () => {
    playing = true;
    currentScore = 0;
    activePlayer = 0;
    score = [0,0];

    currentScore0Ele.textContent = 0;
    currentScore1Ele.textContent = 0;
    score0Ele.textContent = 0;
    score1Ele.textContent = 0;

    dice.classList.add('hidden');
    player0Ele.classList.remove('player--winner');
    player1Ele.classList.remove('player--winner');
    player0Ele.classList.add('player--active');
    player1Ele.classList.remove('player--active');
};

newGame();

btnRoll.addEventListener('click', diceRoll);

btnHold.addEventListener('click', holdValue);

btnNew.addEventListener('click', newGame);