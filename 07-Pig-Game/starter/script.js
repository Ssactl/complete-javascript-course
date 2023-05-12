'use strict';

//Selecting elements
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const scores = [0, 0];
let currentScore = 0;
let currentPlayer = 0;

let playing = true;

//Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;

  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//ROlling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const num = Math.trunc(Math.random() * 6 + 1);
    //2.DIsplay dice
    const pngUrl = `dice-${num}.png`;
    diceEL.src = pngUrl;
    console.log(diceEL.src);
    diceEL.classList.remove('hidden');

    //3. Check for rolled 1
    if (num !== 1) {
      //Add dice to the current score
      currentScore += num;
      // if(currentPlayer===0){
      //     current0EL.textContent=currentScore;
      // }else{
      //     current1EL.textContent=currentScore;
      // }
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      // if(currentPlayer===0){
      //     current0EL.textContent=0;
      // }else{
      //     current1EL.textContent=0;
      // }

      //swith to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to the current player;s score and display
    // if(currentPlayer===0){
    //     scores[0]+=currentScore;
    //     current0EL.textContent=0;
    //     score0EL.textContent=scores[0];
    // }else{
    //     scores[1]+=currentScore;
    //     current1EL.textContent=0;
    //     score1EL.textContent=scores[1];
    // }
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    //2.if score >= 100, currentplayer wins
    if (scores[currentPlayer] >= 100) {
      //finish the game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      //3.Swith to next player
      switchPlayer();
    }
  }
});

//Reset the game
btnNew.addEventListener('click', function () {
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  if (!playing) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--winner');

    document.querySelector(`.player--0`).classList.add('player--active');
  } else {
    diceEL.classList.add('hidden');
    if (currentPlayer === 1) {
      document.querySelector(`.player--0`).classList.add('player--active');
      document.querySelector(`.player--1`).classList.remove('player--active');
    }
  }
  currentPlayer = 0;
  playing = true;

  //classList.add(),if they are there, js will not add it again
  //classList.remove(), js can remove a class even  if it is not there
});
