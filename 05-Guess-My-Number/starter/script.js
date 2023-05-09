'use strict';

/*
console.log(document.querySelector('.message').textContent);

//-----------------071 What's the DOM and DOM manipulation
//Document object model. It's a connection point between HTML documents and js code.
//DOM and DOM methods are part of web APIs which can interate with js
//APIs are libraries that are also written in js and that are automatically available for us to use

document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
*/

//-----------------073 Handling Click Events
//an event is sth that happens on the page, eg: a mouse click, a mouse moving, a key press
//we need to specify the reaction to the CLick event,
//we do that by defining a function, the event handler
//the funciton will contain the code that should be executed whenever this cilick event happens

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = document.querySelector('.score').textContent;
document.querySelector('.number').textContent = secretNumber;

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = 'No number!';

    //When player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'Correct Number!';
    document.querySelector('.number').textContent = secretNumber;

    //the value of style always has to be string
    //it's inline style
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    //When guess is too high
  } else if (guess > secretNumber) {
    if (score > 0) {
      document.querySelector('.message').textContent = 'Too high!';
      score--;
    } else {
      document.querySelector('.message').textContent = 'You lost the game!';
      score = 0;
    }
    document.querySelector('.score').textContent = score;

    //When guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too low!';
      score--;
    } else {
      document.querySelector('.message').textContent = 'You lost the game!';
      score = 0;
    }
    document.querySelector('.score').textContent = score;
  }
});
