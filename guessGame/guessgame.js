// Getting and Setting DOM Elements
/*
console.log(document.querySelector('.message'));
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number !';
document.querySelector('.number').textContent = 12;
document.querySelector('.score').textContent = 19;

document.querySelector('.guess').value = 30;
*/

// DOM Events 
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const guessNum = (lowHighMsg) => {
    if (score > 1) {
        score--;
        document.querySelector('.score').textContent = score;
        document.querySelector('.message').textContent = lowHighMsg;
    } else {
        document.querySelector('.message').textContent = 'You lost !';
        document.querySelector('.score').textContent = 0;
    }
};

document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.score').textContent = score;
    document.querySelector('body').style.backgroundColor = '';
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '';

});

document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value);
    // When input is empty
    if (!guess) {
        document.querySelector('.message').textContent = 'No Number !';
        // When guess is correct
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = 'Correct Number !';
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem ';
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
        // If guess is greater than secret number
    } else if (guess > secretNumber) {
        guessNum('Number is too high !');
        // if (score > 1) {
        //     score--;
        //     document.querySelector('.score').textContent = score;
        //     document.querySelector('.message').textContent = 'Number is too high !';
        // } else {
        //     document.querySelector('.message').textContent = 'You lost !';
        //     document.querySelector('.score').textContent = 0;
        // }
        // If guess is less than secret number
    } else if (guess < secretNumber) {
        guessNum('Number is too low !');
        // if (score > 1) {
        //     score--;
        //     document.querySelector('.score').textContent = score;
        //     document.querySelector('.message').textContent = 'Number is too low !';
        // } else {
        //     document.querySelector('.message').textContent = 'You lost !';
        //     document.querySelector('.score').textContent = 0;
        // }
    }
});


