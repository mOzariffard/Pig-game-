const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const showMessageWinner = document.querySelector(".modal-content");

let currentScore, scores, activePlayer, playing;
const init = function () {
  scores = [0, 0]; // this is for the total score
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init(); //Call this function ;

btnCloseModal.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating the Random Number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Displaying the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `picture/dice-${dice}.png`;

    //3. Check for rolled 1 :
    if (dice !== 1) {
      // Add Dice to current Score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; // scores[1]= scores[1]+ currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score is >=100
    if (scores[activePlayer] >= 20) {
      playing = false;
      // Finish the Game
      diceEl.classList.add("hidden");
      overlay.classList.add("overlay");
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      // styling the winner
      if (activePlayer === 0) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");
        // show the winner in modal
        showMessageWinner.textContent = "Winner of this match : player 1 🎉";
      } else {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");
        showMessageWinner.textContent = "Winner of this match : player 2 🎉";
      }
    } else {
      // 3.Switch to the next Player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
