'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2020-11-18T21:31:17.178Z',
        '2020-12-23T07:42:02.383Z',
        '2021-01-28T09:15:04.904Z',
        '2021-04-01T10:17:24.185Z',
        '2021-05-08T14:11:59.604Z',
        '2021-05-27T17:01:17.194Z',
        '2021-07-11T23:36:17.929Z',
        '2021-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2020-11-01T13:15:33.035Z',
        '2020-11-30T09:48:16.867Z',
        '2020-12-25T06:04:23.907Z',
        '2021-01-25T14:18:46.235Z',
        '2021-02-05T16:33:06.386Z',
        '2021-04-10T14:43:26.374Z',
        '2021-06-25T18:49:59.371Z',
        '2021-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2021-01-01T13:15:33.035Z',
        '2021-02-30T09:48:16.867Z',
        '2021-03-25T06:04:23.907Z',
        '2021-04-25T14:18:46.235Z',
        '2021-06-05T16:33:06.386Z',
        '2021-07-10T14:43:26.374Z',
        '2021-07-25T18:49:59.371Z',
        '2021-07-26T19:01:20.894Z',
    ],
    currency: 'EGP',
    locale: 'ar-EG',
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2021-06-01T13:15:33.035Z',
        '2021-06-30T09:48:16.867Z',
        '2021-02-25T06:04:23.907Z',
        '2021-03-25T14:18:46.235Z',
        '2021-07-05T16:33:06.386Z',
        '2021-07-10T14:43:26.374Z',
        '2021-07-25T18:49:59.371Z',
        '2021-07-26T12:01:20.894Z',
    ],
    currency: 'BRL',
    locale: 'pt-br',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
//FUNCTIONS
const formatMovementDates = (date,locale) => {
    const calcDaysPassed = ((date1, date2) => Math.abs(Math.ceil((date2 - date1)/(1000*60*60*24))));
    const daysPassed = calcDaysPassed(new Date(), date);
    // console.log(daysPassed);
    //FIXED
    if(daysPassed === 0) return `Ahora`;
    else if(daysPassed === 1) return `Ayer`;
    else if(daysPassed <= 30) return `hace ${daysPassed} dias.`;
    else{
        return Intl.DateTimeFormat(locale).format(date);
    };
};

const formatCur = (value,locale,currency) => {
    return new Intl.NumberFormat(locale,{
    style: 'currency',
    currency: currency,
    }).format(value);
};

//FIXED
const displayMovements = function( acc, sort = false){
    containerMovements.innerHTML = '';
    const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;
    movs.forEach(function(mov,i){
        const type = mov > 0 ? 'depositar' : 'retirar';

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDates(date,acc.locale);

        const formattedMov = formatCur(mov,acc.locale,acc.currency);

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formattedMov}</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin',html);
    });
};

const calcDisplayBalance = (acc) => {
    acc.balance = acc.movements.reduce((acc,cur) => acc + cur,0);
    labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function(acc){
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(incomes,acc.locale,acc.currency);

    const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov, 0);
    labelSumOut.textContent = formatCur(Math.abs(outcomes),acc.locale,acc.currency);

    const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {return int >= 1})
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCur(interest,acc.locale,acc.currency);
};

const createUserNames = (accounts) => {
    accounts.forEach((account)=>{
    account.username = account.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    });
};
createUserNames(accounts);

/////////////////////////////////////////////////
//IMPORTANT.
const updateUI = (acc) => {
    //Diplay movements
    displayMovements(acc);
    //Display balance
    calcDisplayBalance(acc);
    //Display summary
    calcDisplaySummary(acc);
};

const startLongOutTimer  = () => {

    const tick = ()=>{  
        const min = String(Math.trunc((time / 60))).padStart(2,0);
        const sec = String(Math.trunc((time % 60))).padStart(2,0);

        //In each call, print the remainig time UI.
        labelTimer.textContent = `${min}:${sec}`;

        // When 0 seconds, stop timer and log out user.
//FIXED
        if(time === 0){
            clearTimeout(timer);
            labelWelcome.textContent = 'Inicie sesion para comenzar😅';
            containerApp.style.opacity = 0;
        };

        //Decrese 1s.
        time--;
    };

    //Set time to 5 minutes.
    let time = 300;

    //Call the timer every second.
    tick();
    const timer = setInterval(tick,1000);
    return timer;
};

/////////////////////////////////////////////////
// Event handlers
/////////////////////////////////////////////////
// VARIABLES.
let sorted = false;
let currentAcc,timer;

btnLogin.addEventListener('click', (e,sorted = false) => {
    //Prevent form from submitting.
    e.preventDefault();
    console.log('LOGIN');
    currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAcc);
    if(currentAcc?.pin === Number(inputLoginPin.value)){
        //Display UI and message
        labelWelcome.textContent = `Bienvenido, ${currentAcc.owner.split(' ')[0]}`
        containerApp.style.opacity = 100;

        //Create current date an time.
        const now = new Date();
        const options = {
            hour: 'numeric',
            minute:'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long',
        };
        labelDate.textContent = new Intl.DateTimeFormat(currentAcc.locale,options).format(now);

        //Claer input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        //Start timer (timer).
        if(timer) clearInterval(timer);
        timer = startLongOutTimer();

        //Update UI
        updateUI(currentAcc);
    }
});

btnTransfer.addEventListener('click', (e) => {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find( acc => acc.username === inputTransferTo.value);
    console.log(amount, receiverAcc);
    inputTransferAmount.value = inputTransferTo.value = '';
    if( amount > 0 && receiverAcc && currentAcc.balance >= amount && receiverAcc?.username !== currentAcc.username){
        currentAcc.movements.push(-amount);
        receiverAcc.movements.push(amount);

        //Add transfern date.
        currentAcc.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        //UPDATE UI.
        updateUI(currentAcc);

        //Reset timer
        clearInterval(timer);
        timer = startLongOutTimer(timer);
    };
});

btnClose.addEventListener('click', (e)=>{
    e.preventDefault();
    // console.log('DELETE')
    if(inputCloseUsername.value === currentAcc.username && Number(inputClosePin.value) === currentAcc.pin ){
        const index = accounts.findIndex(acc => acc.username === currentAcc.username);
        // console.log(index);
        accounts.splice(index, 1);
        containerApp.style.opacity = 0;
    };
    //FIXED
    labelWelcome.textContent="nicie sesion para comenzar😅";
    inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', (e) => {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if(amount > 0  && currentAcc.movements.some( mov => mov >= amount * 0.1)){
        setTimeout(() => {
            //Add movement
            currentAcc.movements.push(amount);

            //Add transfern date.
            currentAcc.movementsDates.push(new Date().toISOString());

            //Reset timer
            clearInterval(timer);
            timer = startLongOutTimer(timer);

            //Update UI.
            updateUI(currentAcc);
        }, 2500);
    };
    inputLoanAmount.value = '';
});

btnSort.addEventListener('click', (e)=>{
    e.preventDefault();
    displayMovements(currentAcc, !sorted);
    sorted = !sorted;
});



