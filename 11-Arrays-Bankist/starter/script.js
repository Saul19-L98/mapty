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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
/////////////////////////////////////////////////
// VARIABLES.
let sorted = false;
let currentAcc;

/////////////////////////////////////////////////


/*NOTE:Class 2 */
////////////////////////////////////////////////////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
////////////////////////////////////////////////////////////////////////////////////////////////

for(const [index, movement] of movements.entries()){
  if(movement > 0){
    console.log(`Movement ${index}: You deposited ${movement}`);
  }else{
    console.log(`Movement ${index}: You withdrew ${Math.abs(movement)}`)
  };
};
console.log('------------------------ForEach------------------------');
movements.forEach((mov, i)=>{
  // if(movement > 0){
  //   console.log(`Movement ${index}: You deposited ${movement}`);
  // }else{
  //   console.log(`Movement ${index}: You withdrew ${Math.abs(movement)}`)
  // };
  const check = mov > 0;
  console.log(`Movement ${i+1}: You ${check ? 'deposited' : 'withdrew'} ${check ? mov : Math.abs(mov)}`);
});

/*NOTE:Class 3.*/
////////////////////////////////////////////////////////////////////////////////////////////////
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
////////////////////////////////////////////////////////////////////////////////////////////////

currencies.forEach((value,key,map)=>{
  console.log(`${key}: ${value}`)
});

const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR']);

console.log(currenciesUnique);

currenciesUnique.forEach((value, _ , map)=>{
  console.log(`${value}: ${value}`);
});

//NOTE: Class 4: The begging of the proyect.

const displayMovements = function( movements, sort = false){
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach(function(mov,i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov} €</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin',html);
  });
};

// displayMovements(account1.movements);

//Challenge #1.

//Type 1.

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

// const onlyDosgsJulia = dogsJulia.slice(1,-2);
// console.log(onlyDosgsJulia);

// const dogs = (arr1, arr2) => {
//   const arrComplete = arr1.concat(arr2);
//   arrComplete.forEach((dogAge,index)=>{
//     const type = dogAge > 2 ? 'adult🐕' : 'puppy🐶';
//     console.log(`Dog number ${index + 1} is an ${type}, and is ${dogAge} years old.`)
//   });
// };

// dogs(onlyDosgsJulia, dogsKate);

//Type 2.

const dogs = (arr1, arr2) => {
  const onlyDosgs = arr1.splice(1,2);
  console.log(onlyDosgs);
  const arrComplete = onlyDosgs.concat(arr2);
  arrComplete.forEach((dogAge,index)=>{
    const type = dogAge > 2 ? 'adult🐕' : 'puppy🐶';
    console.log(`Dog number ${index + 1} is an ${type}, and is ${dogAge} years old.`)
  });
};

dogs(dogsJulia, dogsKate);

//NOTE: Class 5.

//First form.
const eurToUsd = 1.1;
// const movementUSD = movements.map((mov) => {
//   return (mov * eurToUsd).toFixed(2);
// });
const movementUSD = movements.map(mov => (mov * eurToUsd).toFixed(2));

console.log(movements);
console.log(movementUSD);

//Second form.
const movementsUSDfor = [];
for(const mov of movements) movementsUSDfor.push((mov * eurToUsd).toFixed());
console.log(movementsUSDfor);


//Comparison between map and forEach methods
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);
console.log(movementsDescriptions);

//NOTE: Class 6.
////////////////////////////////////////////////////////////////////////////////////
//returning a value
////////////////////////////////////////////////////////////////////////////////////
// const name = 'Saul Alejandro Lainez Mejia';

// const createUserNames = (account) => {
//   const username = account.toLowerCase().split(' ').map(name => name[0]).join('');
//   return username;
// };
// console.log(createUserNames(name));
////////////////////////////////////////////////////////////////////////////////////
//Just doing some work.
////////////////////////////////////////////////////////////////////////////////////
const createUserNames = (accounts) => {
  accounts.forEach((account)=>{
    account.username = account.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
};
createUserNames(accounts);
console.log(accounts);

//NOTE: Class 7: Back into the project.
const deposits = movements.filter((mov) => mov > 0 );
console.log(deposits);

const withdrawal = movements.filter((mov) => mov < 0 );

console.log(withdrawal);

const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc,cur) => acc + cur,0);
  labelBalance.textContent = `${acc.balance} EUR`;
  // console.log(acc.movements);
  // console.log(acc.balance);
};
// calcDisplayBalance(account1.movements);

//Challenge #2: Section 10.
const calcAverageHumanAge = (arrDogs) => {
  const dogToHuman = arrDogs.map((dogAge) => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4).filter((humanAge) => humanAge > 18 ).reduce((acc, age, _ ,arr) => acc + age / arr.length , 0 );
  console.log(dogToHuman);
};

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];
calcAverageHumanAge(data1);
calcAverageHumanAge(data2);

//NOTE: Class 8: Back into the project.

const calcDisplaySummary = function(acc){
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => (deposit * acc.interestRate) / 100)
  .filter((int, i, arr) => {return int >= 1})
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};
// calcDisplaySummary(account1.movements);

//NOTE: Class 9.
const accountFind = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(accountFind);

//NOTE: Class 10: Back into the project.

/////////////////////////////////////////////////////////////////////////////////////
//NOTE: This part is from class 11.
const updateUI = (acc) => {
  //Diplay movements
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};
/////////////////////////////////////////////////////////////////////////////////////

btnLogin.addEventListener('click', (e,sorted = false) => {
  //Prevent form from submitting.
  e.preventDefault();
  console.log('LOGIN');
  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAcc);

  if(currentAcc?.pin === Number(inputLoginPin.value)){
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAcc.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;
    //Claer input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAcc);
  }
});

//NOTE: class 11: Back into the project.

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find( acc => acc.username === inputTransferTo.value);
  console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  if( amount > 0 && receiverAcc && currentAcc.balance >= amount && receiverAcc?.username !== currentAcc.username){
    currentAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //UPDATE UI.
    updateUI(currentAcc);
  };
});

//NOTE: class 12: Back into the project.
btnClose.addEventListener('click', (e)=>{
  e.preventDefault();
  // console.log('DELETE')
  if(inputCloseUsername.value === currentAcc.username && Number(inputClosePin.value) === currentAcc.pin ){
    const index = accounts.findIndex(acc => acc.username === currentAcc.username);
    // console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  };
  labelWelcome.textContent="Log in to get started";
  inputCloseUsername.value = inputClosePin.value = '';
});

//NOTE: class 13: Back into the project.
/////////////////////////////////////////////////
//Example.
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);
/////////////////////////////////////////////////
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  
  const amount = Number(inputLoanAmount.value);

  if(amount > 0  && currentAcc.movements.some( mov => mov >= amount * 0.1)){
    //Add movement
    currentAcc.movements.push(amount);

    //Update UI.
    updateUI(currentAcc);
  };
  inputLoanAmount.value = '';
});

//NOTE: class 14.

//flat
const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov);
console.log(overalBalance);

//flatMap
const overalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov)=> acc + mov,0);
console.log(overalBalance2);

//NOTE: Class 15.
const owners = ['Jonas','Zach','Adam','Martha'];
console.log(owners.sort());
console.log(owners);

console.log(movements.sort());
console.log(movements);

//LOGIC
//return < 0, A,B
//return > 0, B,A

//Ascending
movements.sort((a,b) => {
  if( a > b)
    return 1;
  if( b > a )
    return -1;
});
console.log(movements);

//Descending
movements.sort((a,b) => {
  if( a > b)
    return -1;
  if( b > a )
    return 1;
});
console.log(movements);
//////////////////////////////////////////
//NOTE: Back to the project.

btnSort.addEventListener('click', (e)=>{
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;
});

//NOTE: Class 162: fill().

const z = Array.from({ length: 7}, (_, i) => i + 1 );
console.log(z);

//Challenge not yet the real one of this section.
// const ran = Array.from({length: 100}, (_,i) => Math.trunc(Math.random(i) * 100) );

// console.log(ran);

labelBalance.addEventListener('click', ()=> {
  const movementsUI = Array.from( document.querySelectorAll('.movements__value'));
  console.log(movementsUI.map((el) => Number(el.textContent.replace('€',''))).sort((a,b) => a - b ));
});

//NOTE: Practice of the lecture.
console.log('---------------REVIEW---------------')

const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur,0);

console.log(bankDepositSum);

//Challenge #4 section 11.

console.log('---------------CHALLENGE---------------')

// TEST DATA:
const studyDogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];


//Part 1.

// for (let n of studyDogs) n.recommendedFood = Math.round(n.weight ** 0.75 * 28);

const recomPortion = (studyDogs) => {
  studyDogs.forEach((studydog) => {
    studydog.recommendedFood = Number((studydog.weight ** 0.75 * 28).toFixed(2));
  });
};
recomPortion(studyDogs);
console.log(studyDogs);

//Part 2.

// const findowner = studyDogs.owners.filter( owner => owner === 'Sarah' ? 'Your dog eat to little' : 'not the owner of this dog');
// console.log(findowner);

const findOwner = studyDogs.find(dog => dog.owners.includes('Sarah'));

console.log(findOwner);

console.log(`Sarah's dog is eating too ${findOwner.curFood > findOwner.recommendedFood ? 'much' : 'little'}`);

//Part 3.
const ownersEatTooMuch = studyDogs.filter(food => food.curFood > food.recommendedFood).flatMap( owner => owner.owners);

const ownersEatTooLittle = studyDogs.filter(food => food.curFood < food.recommendedFood).flatMap( owner => owner.owners);

//Part 4.

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much and ${ownersEatTooLittle.join(' and ')}'s dogs eat too little.`);

//Part 5.

const exactlyTheAmount = studyDogs.some( dog => dog.curFood === dog.recommendedFood );
console.log(exactlyTheAmount);

//Part 6.

const  okayAmount = (dog) => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10);

console.log(studyDogs.some(okayAmount));

//Part 7.

// const newOkeyAmount = studyDogs.map(dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)).includes(true);

console.log(studyDogs.filter(okayAmount));

//Part 8.

const orderDogs = studyDogs.sort((a,b) => a.recommendedFood - b.recommendedFood );
console.log(orderDogs);









