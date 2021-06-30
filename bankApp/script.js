// Data
const account1 = {
    owner: 'Aremoh kenneth Asunumhe',
    transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Adams Abednego',
    transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Emmanuel Ukpoke',
    transactions: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Adaji Andrew Joseph',
    transactions: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
const transactions = [200, 450, -400, 3000, -650, -130, 70, 1300];
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

// Containers
const appContainer = document.querySelector('.app');
const transactionsContainer = document.querySelector('.transactions');

// Buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

// Input Elements
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayTransactions = function (transactions) {
    transactionsContainer.innerHTML = '';
    transactions.forEach((trans, index) => {
        const typeOfTransaction = trans > 0 ? 'deposit' : 'withdrawal';
        const html = `
            <div class="transactions__row">
                <div class="transactions__type transactions__type--${typeOfTransaction}">
                    ${index + 1} ${typeOfTransaction}
                </div>
                <div class="transactions__value">${trans} EUR</div>
            </div>
        `;
        transactionsContainer.insertAdjacentHTML('afterbegin', html);
    });
};
const euroToUsd = 1.1;
const transactionsUSD = transactions.map(trans => trans * euroToUsd);


const displayBalance = function (transactions) {
    const balance = transactions.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${balance} EUR`;
};

const displaySummary = function (transactions) {
    const incomes = transactions
        .filter(trans => trans > 0)
        .reduce((acc, trans) => acc + trans, 0);
    labelSumIn.textContent = `${incomes} EUR`;

    const outcomes = transactions
        .filter(trans => trans < 0)
        .reduce((acc, trans) => acc + trans, 0);
    labelSumOut.textContent = `${Math.abs(outcomes)} EUR`;

    const interest = transactions
        .filter(trans => trans > 0)
        .map(deposit => deposit * 1.2 / 100)
        .filter(int => int > 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.innerText = `${interest} EUR`;
};

console.log(transactions);
console.log(transactionsUSD);

const transDescriptions = transactions.map((trans, i) =>
    `Transaction ${i + 1}: You 
    ${trans > 0 ? 'deposited' : 'withdrew'}
    ${Math.abs(trans)}`

    // Or
    // return trans > 0 ? `Transaction ${i + 1}: You deposited ${trans}` : `Transaction ${i + 1}: You withdrew ${Math.abs(trans)}`;
);

const user = 'Aremoh Kenneth';
const createUserName = function (accs) {
    accs.forEach(acc => {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUserName(accounts);


const deposit = transactions.filter(trans => trans > 0);
const withdrawal = transactions.filter(trans => trans < 0);
const totalDepositInUSD = transactions.
    filter(trans => trans > 0)
    .map(trans => trans * euroToUsd)
    .reduce((acc, trans) => acc + trans, 0);

let currentUser;

btnLogin.addEventListener('click', e => {
    e.preventDefault();

    currentUser = accounts.find(acc => acc.username === inputLoginUsername.value);
    if (currentUser?.pin === Number(inputLoginPin.value)) {
        //    Display Welcome Message
        labelWelcome.innerText = `Welcome back ${currentUser.owner.split(' ')[0].toLocaleUpperCase()}`;
    }

    // Show UI
    appContainer.style.opacity = 100;

    // Clear Input
    // inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.style.display = 'none';
    inputLoginUsername.style.display = 'none';

    // Display Transactions
    displayTransactions(currentUser.transactions);

    // Display Balance
    displayBalance(currentUser.transactions);

    // Display Summary
    displaySummary(currentUser.transactions);
});