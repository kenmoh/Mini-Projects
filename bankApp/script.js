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
const alert = document.querySelector('.alert');
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


const displayTransactions = function (transactions, sort = false) {
    transactionsContainer.innerHTML = '';
    const trans = sort ? transactions.slice().sort((a, b) => a - b) : transactions;

    /* To goggle between highest to lowest sort
    const trans = sort ? transactions.slice().sort((a, b) => a - b) : transactions.slice().sort((a, b) => b - a);
    */
    trans.forEach((trans, index) => {
        const typeOfTransaction = trans > 0 ? 'deposit' : 'withdrawal';
        const html = `
            <div class="transactions__row">
                <div class="transactions__type transactions__type--${typeOfTransaction}">
                    ${index + 1} ${typeOfTransaction}
                </div>
                <div class="transactions__value">${trans} NGN</div>
            </div>
        `;
        transactionsContainer.insertAdjacentHTML('afterbegin', html);
    });
};
const euroToUsd = 1.1;
const transactionsUSD = transactions.map(trans => trans * euroToUsd);


const displayBalance = function (account) {
    account.balance = account.transactions.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${account.balance} NGN`;
    const receiver = account.receiver;
    const sender = account.sender;

};

const displaySummary = function (account) {
    const incomes = account.transactions
        .filter(trans => trans > 0)
        .reduce((acc, trans) => acc + trans, 0);
    labelSumIn.textContent = `${incomes} NGN`;

    const outcomes = account.transactions
        .filter(trans => trans < 0)
        .reduce((acc, trans) => acc + trans, 0);
    labelSumOut.textContent = `${Math.abs(outcomes)} NGN`;

    const interest = account.transactions
        .filter(trans => trans > 0)
        .map(deposit => deposit * account.interestRate / 100)
        .filter(int => int > 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.innerText = `${interest} NGN`;
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

const UI = function (user) {

    // Display Transactions
    displayTransactions(user.transactions);

    // Display Balance
    displayBalance(user);

    // Display Summary
    displaySummary(user);

};

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
    inputLoginUsername.value = inputLoginPin.value = '';
    // inputLoginPin.style.display = 'none';
    // inputLoginUsername.style.display = 'none';

    // Update UI
    UI(currentUser);
});

// Transfer Functionality
btnTransfer.addEventListener('click', e => {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

    inputTransferAmount.value = inputTransferTo.value = '';

    if (amount > 0 && receiver && currentUser.balance >= amount && receiver?.username !== currentUser.username) {
        const sender = currentUser.owner;
        console.log('Sender: ', sender, 'Receiver: ', receiver);
        currentUser.transactions.push(-amount);
        receiver.transactions.push(amount);
        // Update UI
        UI(currentUser);
    }
});

// Loan application functionality
btnLoan.addEventListener('click', e => {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);
    if (amount > 0 && currentUser.transactions.some(trans => trans >= amount * 0.1)) {
        currentUser.transactions.push(amount);
        // update the UI
        UI(currentUser);
    }
    inputLoanAmount.value = '';
});

// Close Account Functionality
btnClose.addEventListener('click', e => {
    e.preventDefault();
    if (inputCloseUsername.value === currentUser.username && Number(inputClosePin.value) === currentUser.pin) {
        const index = accounts.findIndex(acc => acc.username === currentUser.username);
        // Delete user account
        accounts.splice(index, 1);
        // Hide the UI
        appContainer.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
});


// Sorting Functionality
let sorted = false;
btnSort.addEventListener('click', e => {
    e.preventDefault();
    displayTransactions(currentUser.transactions, !sorted);
    sorted = !sorted;
});