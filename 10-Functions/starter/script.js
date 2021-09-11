'use strict';

//class 1.

// const bookings = [];

// const createBooking = function(flightName, numPassengers = 0, price = 0){
//     const booking = {
//         flightName,
//         numPassengers,
//         price
//     }
//     console.log(booking);
//     bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('NH345', 2, 1)
// createBooking('YU345', undefined,25);

//Class 2.

const fligth = 'LH123';
const sam = {
    name: 'Saul Lainez',
    passport: 2565856564563,
};

const checkIn = function(flightName, passenger){
    flightName = 'LH987';
    passenger.name = 'Mr.' + passenger.name;
    if(passenger.passport === 2565856564563){
        alert('Check in!!');
    }else{
        alert('Wrong passport');
    };
};
// checkIn(fligth, sam);
// console.log(fligth);
// console.log(sam);

// const newPassport = function(person){
//     person.passport = Math.trunc(Math.random() * 10000000000);
// };

// newPassport(sam);
// checkIn(fligth, sam);
// console.log(fligth);
// console.log(sam);

//Class 4. (class 3 was just theoretical.)

const oneWord = function(str){
    return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return[first.toUpperCase(), ...others].join(' ');
};

const transformer = function(str, fn){
    console.log(`Original string: ${str}`);
    console.log(`transformed string: ${fn(str)}`);
    console.log(`transformed by: ${fn.name}`);
};

// transformer('JavaScript is the best!!', upperFirstWord);
// transformer('JavaScript is the best!!', oneWord);

//Class 5

const greet = function(greeting){
    return function(name){
        console.log(`${greeting} ${name}`);
    };
};

const greeterHey = greet('Hey');
greeterHey('Sam');
greeterHey('LAMn');

//Second form.

const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hello')('Sam');

//Class 6.

const lufthansa = {
    airline: 'lufthansa',
    iataCode: 'LH',
    booking: [],
    book(flightNum, name){
        console.log(`${name} booked a set on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.booking.push({fligth: `${this.iataCode}${flightNum}`, passenger: name});
    },
};

lufthansa.book(415,'Saul Lainez');
lufthansa.book(345, 'HEDU jije');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    booking: [],
};

const book = lufthansa.book;

book.call(eurowings, 278, 'Sam Lam');

console.log(eurowings);

const swiss = {
    airline: 'Swiss',
    iataCode: 'EWI',
    booking: [],
};

const flightData = [503, 'Jonas Cooper'];

book.call(swiss, ...flightData);

const bookEW = book.bind(eurowings, 43);

bookEW('Honas Nodeh');

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23);
//const addVat = (value) => value + value * 0.23;

console.log(addVat(234));

const addRate = (rate) => (value) => value + value * rate;

const tax = addRate(0.23);

console.log(tax(100));

//Challenge #1.

const poll = {
    question: "What is your favourite programming language ?",
    options: ["0: Javascript", "1: Python", "2: Rust", "3: C++"],
    answers: new Array(4).fill(0),
    //[0,0,0,0]
    registerNewAnswer () {
        const answer = Number 
        (
            prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number).`)
        );

        console.log(answer);
        if(answer <= this.answers.length){
            typeof answer === 'number' && answer <= this.answers.length && this.answers[answer]++;
            this.displayResults();
            this.displayResults(this.answers);

            // if(answer <= 3){
            //     this.answers[answer]++;
            //     console.log(this.answers);
            // }else{
            //     console.log("52 wouldn't make sense, right?");
                // }
        }else{
            console.log("52 wouldn't make sense, right?");
        };
    },
    displayResults (type = 'array') {
        if(type === 'array'){
            console.log(this.answers);
        }else if(type === 'string'){
            console.log(`The poll results are ${this.answers.join(',')}`);
        };
    },
};

// poll.registerNewAnswer();
// console.log(poll.answers);
// poll.options;
// console.log(poll.answers);
// console.log(poll.options);

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({answers: [2,5,3]}, 'string');

poll.displayResults.call({answers: [1,7,8,9,5]});

//Class 7.

const runOnce = function(){
    console.log('This will never run again.');
};
runOnce();

(function(){
    console.log('This will never run again.');
})();

(()=> console.log('This ALSO will never run again.'))();

//Class 9 (class 8 was just theoretical).

let f;
const g = function(){
    const a = 23;
    f = function(){
        console.log(a*2);
    };
};

const h = function() {
    const b = 777;
    f = function(){
        console.log(b*2);
    };
};

g();
f();

h();
f();

const boardPassengers = function(n, wait){
    const perGroup = n / 3;
    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers.`);
        console.log(`There are 3 groups, each with ${perGroup} passengers.`);
    }, wait * 1000);
    console.log(`Wait start boarding in ${wait} seconds.`);
};

boardPassengers(600,3);

//Challenge #2: Section 10.

(function(){
    const header = document.querySelector('h1');
    header.style.color = 'red';

    const toggleColor = () => {
            // header.style.color = 'blue';
            header.style.color = 'red' ? 'blue' : 'red';
    };

    document.querySelector('body').addEventListener('click', toggleColor); 
})();

// (function () {
//     const header = document.querySelector("h1");
//     let n = 1;
//     header.style.color = "red";
//       //The changeColor function has access to the header variable due to the closure 
//     const changeColor = function () {
//       n++;
//       if (n % 2 == 0) {
//         header.style.color = "blue";
//         console.log("par");
//       } else {
//         header.style.color = "red";
//         console.log("impar");
//       }
//     };
//       //the addEventListener will still work even when this context dissapear
//     document.querySelector("body").addEventListener("click", changeColor);
//   })();