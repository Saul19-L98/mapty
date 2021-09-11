'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
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

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDates = (date,locale) => {
  const calcDaysPassed = ((date1, date2) => Math.abs(Math.ceil((date2 - date1)/(1000*60*60*24))));
  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);
  if(daysPassed === 0) return `TODAY`;
  else if(daysPassed === 1) return `YESTERDAY`;
  else if(daysPassed <= 30) return `${daysPassed} days ago.`;
  else{
    // const day = `${date.getDate()}`.padStart(2,0);
    // const month = `${date.getMonth()}`.padStart(2,0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;\
    return Intl.DateTimeFormat(locale).format(date);
  };
};

const formatCur = (value,locale,currency) => {
  return new Intl.NumberFormat(locale,{
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDates(date,acc.locale);

    // const formattedMov = new Intl.NumberFormat(acc.locale,{
    //   style: 'currency',
    //   currency: acc.currency,
    // }).format(mov);

    const formattedMov = formatCur(mov,acc.locale,acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale,acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes,acc.locale,acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out),acc.locale,acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest,acc.locale,acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//IMPORTANT
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLongOutTimer  = () => {

  const tick = ()=>{

    const min = String(Math.trunc((time / 60))).padStart(2,0);
    const sec = String(Math.trunc((time % 60))).padStart(2,0);
    //In each call, print the remainig time UI.
    labelTimer.textContent = `${min}:${sec}`;
    
    // When 0 seconds, stop timer and log out user.
    if(time === 0){
      clearTimeout(timer);
      labelWelcome.textContent = 'Long in to get started';
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

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
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

    //location taked from the browser;
    // const local = navigator.lenguage;
    // console.log(local);

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(now);
    // const day = `${now.getDate()}`.padStart(2,0);
    // const month = `${now.getMonth() + 1}`.padStart(2,0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2,0);
    // const min = `${now.getMinutes()}`.padStart(2,0);

    // //day/month/year
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Start timer (timer).
    if(timer) clearInterval(timer);
    timer = startLongOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfern date.
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    
    // Update UI
    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = startLongOutTimer(timer);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {// Add movement
    currentAccount.movements.push(amount);

    //Add transfern date.
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);}, 2500);

    //Reset timer
    clearInterval(timer);
    timer = startLongOutTimer(timer);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  //FIXED
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//NOTE: Class 168.
console.log(Number.parseInt(' 2.5rem ',10));
console.log(Number.parseFloat(' 2.5rem ',10));

console.log(Number.isNaN(20));
console.log(Number.isNaN('20',10));
console.log(Number.isNaN(+'20'));

console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(23/0));
console.log(Number.isFinite(+'20'));

console.log(Number.isInteger(+'37.68'));

//NOTE: Class 169.

console.log(Math.trunc(Math.random() * 6)+1);

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min)+1) + min;

console.log(randomInt(10,20));

//NOTE: Class 170.

console.log(5 % 2);

const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(267));

labelBalance.addEventListener('click',() => {
  const movementsRow = document.querySelectorAll('.movements__row');
  movementsRow.forEach((row,i) => {
    if( i % 2 === 0) row.style.backgroundColor = 'orangered';
    if( i % 3 === 0) row.style.backgroundColor = 'purple';
  });
});

//Mini Challenge.

const fizzBuzz = (min,max) => {
  for(let i = min; i <= max; i++){
    let output = '';
    if(i % 3 === 0) output += 'Fizz';
    if(i % 5 === 0) output += 'Buzz';
    if(i % 3 === 0 && i % 5 === 0) output + 'FizzBuzz';
    if( output === '') output += i;
    console.log(output);
  }
};

fizzBuzz(1,15);

//NOTE: Class 171.

console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 5);
console.log(2 ** 53 + 6);
console.log(2 ** 53 + 10);
console.log(2 ** 53 + 11);

console.log(485613156884845151651515688446511n);
console.log(BigInt(485613156884845151651515688446511));

const huge = 2354886621231345887854n;
const num = 23;
console.log(huge * BigInt(num));

console.log(huge + ' is realy big!!!!');

//NOTE: Class 172.

//Create a date;

// const now = new Date();

// console.log(now);
// console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037,9, 19,16,23,5));

const future = new Date(2038,0, 30,16,23,5);
console.log(future);
console.log(future.getFullYear());
console.log(future.getHours());
console.log(future.toISOString());

future.setFullYear(2100);
future.setHours(7);
console.log(future);

//NOTE: Class 173: back to the project.


//Fake log in.
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//NOTE: Class 174.

console.log(+(future));

// const calcDaysPassed = ((date1, date2) => Math.abs(Math.ceil((date2 - date1)/(1000*60*60*24))));

// console.log(calcDaysPassed( new Date(2038,0, 20,16,23,5),  new Date(2038,0, 10,11,30,30)));

//NOTE: Class 176.

const nuM = 3864256.84;

const options1 = {
  // style: 'unit',
  // unit: 'kilometer-per-second',
  style: 'currency',
  currency: 'EUR',
  useGrouping: false,
};

console.log('US: ',new Intl.NumberFormat('en-US',options1).format(nuM));
console.log('FR: ',new Intl.NumberFormat('fr-FR',options1).format(nuM));
console.log('SV: ',new Intl.NumberFormat('es-SV',options1).format(nuM));

//NOTE: Class 177.

const ingredients = ['olives🍐','tomato🍅']; 
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza 🍕 whit ${ing1} and ${ing2}`),3000,...ingredients);

console.log('Waiting...');

if( ingredients.includes('spinach🌿')) clearTimeout(pizzaTimer);

//---->Home made clock XD.

// setInterval(function(){
//   const date = new Date();
//   const hour = date.getHours();
//   const minute = date.getMinutes();
//   const sec = date.getSeconds();
//   console.log(`${hour}:${minute}:${sec} H:M:S`);
// }, 1000);








