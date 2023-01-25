'use strict';
//Selecting elements
const score0El = document.querySelector('#score--0'); //#1 score for player 1
const score1El = document.getElementById('score--1'); // #2 A different way of doing #1. getElementById is faster but only relevant if there are 1000's of selections. Score for player 2.
const diceEl = document.querySelector('.dice'); //#3 the dice
const btnNew = document.querySelector('.btn--new'); //#6 add new game button
const btnRoll = document.querySelector('.btn--roll');//#7 add roll button
const btnHold = document.querySelector('.btn--hold'); //#8 add hold button
const current0El = document.getElementById('current--0'); //#11 Add variable to hold the current score for player 1
const current1El = document.getElementById('current--1'); //#11 Player 2
const player0El = document.querySelector('.player--0'); //#17 add variable to know which player is active aesthetically
const player1El = document.querySelector('.player--1'); //#17

score0El.textContent = 0; //#4 make intial value of the score to 0
score1El.textContent = 0; //#4 make intial value of the score to 0
diceEl.classList.add('hidden'); //#5 Add class '.hidden' to diceEl. Make sure it is not '.hidden'. Only include the class name. It was added from CSS. This will remove the dice from showing up.
let currentScore = 0; //#10 hold the current score
let activePlayer = 0; //#13 To know which player is active. Holds 0 for player 1, 1 for player 2.
const scores = [0, 0]; //#14 Hold total score for each player. [0] is player 1, [1] player 2.
let playing = true; //#27 value to hold if the game is still active or not. By default it is.

const switchPlayer = function() { //#21 switch player making it a function to make it DRY since it will be used twice
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0; // #17 Updates current score for the player to 0
  currentScore = 0; //#17
  activePlayer = activePlayer === 0 ? 1 : 0; //#16 Since the dice is === 1 then switch player
  player0El.classList.toggle('player--active'); //#18 Toggle = add the class player--active if it is not there, otherwise, it will remove it. player--active is for changing the CSS (background)
  player1El.classList.toggle('player--active'); //#18
}


//#9 Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){ //#29 set if condition to only execute if it is true
      //1. Generate random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;
      //2. display dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;

      //3. check for rolled 1: If true, switch to next player
      if (dice !== 1) {
        //Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore; //#15 Adding current score for each player
        // current0El.textContent = currentScore; //#12 update current score (Updated to #15)
      } else {
        //switch to next player
        document.getElementById(`current--${activePlayer}`).textContent = 0; // #17 Updates current score for the player to 0
        currentScore = 0; //#17
        activePlayer = activePlayer === 0 ? 1 : 0; //#16 Since the dice is === 1 then switch player
        player0El.classList.toggle('player--active'); //#18 Toggle = add the class player--active if it is not there, otherwise, it will remove it. player--active is for changing the CSS (background)
        player1El.classList.toggle('player--active'); //#18
      }
    }   
})

btnHold.addEventListener('click', function() {//#19 holding the score for each player
    if (playing) { //#29 set if condition to only execute if it is true
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore; //#20 Updating the score
    // scores[1] = scores[1] + currentScore; //Example if it was player 2 (array 0). Same equation as above.
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    
    //2. Check if player's score is >= 100 ..Finish the game
    if(scores[activePlayer] >= 10) { //#23 set condition that if the total score of the active player is equal or over 100 then..
        playing = false; //#28 set playing to false to indicate that the game is finished
        diceEl.classList.add('hidden'); //#30 remove the dice when game is finished
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner'); //#24 Apply the class list player--winner(CSS)
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); // #25 Remove the class list player--active (CSS)
    } else { // #26 Add else to switch the player
    //3. Switch to the next player
    switchPlayer(); //Same as line 49 to 53 //#22 call function (previous wasn't included in the else statement)
        };
    }
})

