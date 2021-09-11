'use strict';


// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 23;

// document.querySelector('.guess').value = 10;
// console.log(document.querySelector('.guess').value);
let secretNumber = Math.trunc(Math.random()*20) + 1;
let score = 20;
let heightScore = 0;

let message = document.querySelector('.message');
let number = document.querySelector('.number');
let highscoreEle = document.querySelector('.highscore');
let body = document.querySelector('body');
let scoreEle = document.querySelector('.score');

const displayMessage = (msg) => {
    message.textContent = msg;
};

const displayBody = (color) => {
    body.style.backgroundColor = color;
};

document.querySelector('.check').addEventListener('click',function(){
    const guess = Number(document.querySelector('.guess').value);
    if(!guess){
        displayMessage('Out of range 🙄');
    }else if(guess === secretNumber){
        displayBody(`#60b347`);
        number.style.widht = '30rem';
        displayMessage('Correct number! 😀😋');
        number.textContent = secretNumber;
        if (score > heightScore){
            heightScore = score;
            highscoreEle.textContent = heightScore;
        };
    }else if ( guess !== secretNumber){
        if(score > 1){
            displayMessage(guess > secretNumber ? 'Too Heigh 🥱' : 'Too low 😯');
            score--;
            scoreEle.textContent = score;
        }else{
            displayMessage('You are dead 💀');
            scoreEle.textContent = 0;
        };
    };
});

document.querySelector('.again').addEventListener('click',()=>{
    // location.reload();
    secretNumber = Math.trunc(Math.random()*20) + 1;
    score = 20;

    scoreEle.textContent = score;

    number.style.widht = '15rem';

    displayMessage('Start guessing...');

    number.textContent = '?';

    document.querySelector('.guess').value = '';

    displayBody(`#222`);
});

