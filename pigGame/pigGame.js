const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const resetBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const currentScoreEl0 = document.getElementById('current--0');
const currentScoreEl1 = document.getElementById('current--1');

// Initial Conditions
scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
diceEl.classList.add('hidden');


let scores, currentScore, activePlayer, isPlaying;

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    currentScoreEl0.textContent = 0;
    currentScoreEl1.textContent = 0;

    playerEl0.classList.remove('player--winner');
    playerEl1.classList.remove('player--winner');
    playerEl0.classList.add('player--active');
    playerEl1.classList.remove('player--active');
    diceEl.classList.add('hidden');
};

init();

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    playerEl0.classList.toggle('player--active');
    playerEl1.classList.toggle('player--active');
};

// Rolling a dice
rollBtn.addEventListener('click', () => {
    // Generate a random number
    if (isPlaying) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display rolled dice
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${dice}.png`;

        // Check if rolled dice is 1. If it is, switch to next player, else add to current score
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch player
            switchPlayer();
        }
    }
});

holdBtn.addEventListener('click', () => {
    if (isPlaying) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

resetBtn.addEventListener('click', init);