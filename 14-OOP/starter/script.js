'use strict';

//NOTE: Class 205: Constructor Functions and the new Operator.
const Person = function(firstName, birthYear){
    //Instances properties
    // console.log(this);
    this.firstName = firstName;
    this.birthYear = birthYear;

    //Never do this.
    // this.calcAge = function(){
    //     console.log(2037 - this.birthYear);
    // };

    // this.calcAge = 2037 - this.birthYear;
};

const jonas = new Person('Jonas',1991);
console.log(jonas);

//1. New {} is created
//2. function is called, this = {}
//3.{} linked to prototype
//4. functio automatically return {}

const matilda = new Person('Matild',2014);
const jack = new Person('Jack',2018);

console.log(matilda,jack);

const jay = 'jay';

console.log( jonas instanceof Person);
console.log( jay instanceof Person);

//NOTE: Class 206: Prototypes.

console.log(Person.prototype);
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

//.prototypeOfLinkedObjects
console.log(Person.prototype.isPrototypeOf(jonas));

console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species,matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);

//NOTE: Class 207: Prototypal Inheritance on Built-in Objects.

// const arr = [1,2,3,4,56,6,7,8,9,10];
const arr = [1,1,2,2,3,3,8];

console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //new Array === []

Array.prototype.unique = function(){
    return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);

//Challenge #1
const Cars = function(name,speed){
    this.name = name;
    this.speed = speed;
};

Cars.prototype.accelerate = function(){
    // console.log(this.speed + 10
    this.speed += 10;
    console.log(`${this.name} is going at ${this.speed} km/h`);
};

Cars.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.name} is going at ${this.speed} km/h`);
};

const car1 = new Cars('BMW',120);
const car2 = new Cars('Mercedes',95);

car1.accelerate();
car1.accelerate();
car2.accelerate();

car1.brake();
car2.brake();

//NOTE: Class 210:ES6 classes.

//class expression
// const PersonCl = class{};

//class declaration
class PersonCl{
    constructor(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    };
    calcAge(){
        console.log(2037 - this.birthYear);
    };
    greet(){
        console.log(`Hey ${this.firstName}`);
    };
};

const jessica = new PersonCl('Jessica',1996);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//     console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

//IMPORTANT
//1. Classes are NOT hoisted.
//2. Class are first-class citizes
//3. Classes are executed in strict mode

//NOTE: Clss 211: Setter and Getters

const account = {
    owner: 'jonas',
    movements: [200,530,120,300],
    get latest(){
        return this.movements.slice(-1).pop();
    },
    set latest(mov){
        this.movements.push(mov);
    },
};
console.log(account.latest);
account.latest = 50;

console.log(account.movements);

class PersonV{
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    };
    set fullName(name){
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name! 😑`);
    };
    get fullName(){
        return this._fullName;
    };
};
const saul = new PersonV('Saul Lainez',1998);
console.log(saul.fullName);
// PersonV.fullName = 'Jose';

//NOTE: Class 212: Static methods.
class PersonStatic {
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    };

    //Instance methods
    //Methods wil be added to .prototype property.
    calcAge(){
        console.log(2037 - this.birthYear);
    };
    greet(){
        console.log(`Hey ${this.fullName}`)
    };

    //Set a property that already exists.
    set fullName(name){
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name! 😑`);
    };
    get fullName(){
        return this._fullName;
    };

    //Static method
    static hey(){
        console.log('Hey there 👋🏻');
        console.log(this);
    };
};

const saulStatic = new PersonStatic('Saul Lainez',1998);

PersonStatic.hey();

//NOTE: Class 213: Object.create.

const PersonProto = {
    calcAge(){
        const date = new Date();
        console.log((date.getFullYear()) - this.birthYear);
    },
    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};

const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = '2010';
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah',1999);
sarah.calcAge();

//Challenge #2.

class Cars2 {
    constructor(name,speed){
        this.name = name;
        this.speed = speed;
    };
    accelerate() {
        console.log(this.speed + 10);
        this.speed += 10;
        console.log(`${this.name} is going at ${this.speed} km/h`);
    };
    brake() {
        this.speed -= 5;
        console.log(`${this.name} is going at ${this.speed} km/h`);
    };
    get speedUS(){
        return `Current speed is ${this.speed / 1.6} mi/h`
    };
    set speedUS(speed){
        this.speed = speed * 1.6;
    };
};

const car_1 = new Cars2('BMW',120);
const car_2 = new Cars2('Mercedes',95);
const ford = new Cars2('Ford',120);

car_1.accelerate();
car_1.accelerate();
car_2.accelerate();

car_1.brake();
car_2.brake();

console.log(car_1.speedUS);
car_1.speedUS = 15;
console.log(car_1);

console.log(ford.speedUS);
ford.speedUS = 150;
console.log(ford);

//NOTE: Class 215: Inheritance Between "Classes";

const PersonInher = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
};

PersonInher.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

const Student = function( firstName, birthYear,course){
    // this.firstName = firstName;
    // this.birthYear = birthYear;
    PersonInher.call(this, firstName, birthYear);
    this.course = course;
};

//Linking prototype
Student.prototype = Object.create(PersonInher.prototype);

Student.prototype.intoduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike',2020,'Computer Science');

console.log(mike);
mike.intoduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof PersonInher);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

//Challenge: #3

const CarsElc = function(make,speed){
    this.make = make;
    this.speed = speed;
};
CarsElc.prototype.accelerate = function(){
    // console.log(this.speed + 10
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

CarsElc.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

const Ev = function(name,speed,charge){
    CarsElc.call(this,name,speed);
    this.charge = charge;
};

//Linking prototype
Ev.prototype = Object.create(CarsElc.prototype);

Ev.prototype.chargeBattery = function(chargeTo){
    chargeTo = this.charge += 10;
    console.log(`Charge to ${chargeTo}%`);
};

Ev.prototype.accelerateE = function(){
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`);
};

Ev.prototype.brakeE = function(){
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

const tesla = new Ev('Tesla', 120, 23);
console.log(tesla);
// tesla.chargeBattery();
tesla.accelerate();
tesla.accelerate();
tesla.brake();

tesla.brakeE();
tesla.chargeBattery();
tesla.accelerateE();

//NOTE: Class 217: Inheritance Between "Classes": ES6 Classes.
class PersonCl2{
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    };
    calcAge(){
        console.log(2037 - this.birthYear);
    };
    greet(){
        console.log(`Hey ${this.fullName}`);
    };
    get age(){
        return 2037 - this.birthYear;
    };
    set fullName(name){
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name! 😑`);
    };
    get fullName(){
        return this._fullName;
    };
    static hey(){
        console.log('Hey there 👋🏻');
    };
};

class Student2 extends PersonCl2{
    constructor(fullName,birthYear,course){
        //Always needs to happen firtst!
        super(fullName, birthYear);
        this.course = course;
    };
    introduce(){
        console.log(`My name is ${this.fullName} and I study ${this.course}.`)
    };
    calcAge(){
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
    };
};

// const martha = new Student2 ('Martha Jones', 2012);
const martha = new Student2 ('Martha Jones', 2012,'Computer Science');

//NOTE: Class 218: Inheritance Between "Classes": Object.create

const PersonProto2 = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },
    init(firstName,birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steVen = Object.create(PersonProto2);

const StudentProto = Object.create(PersonProto2);
StudentProto.init = function(firstName, birthYear, course){
    PersonProto2.init.call(this,firstName,birthYear);
    this.course = course;
};
StudentProto.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}.`)
};
const jerry = Object.create(StudentProto);
jerry.init('Jerry', 2010, 'Science');
jerry.introduce();
jerry.calcAge();

//NOTE: Class 219: Another Class Example.

class Account {
    constructor(owner, currency,pin){
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.movements = [];
        this.locale = navigator.languages;
        console.log(`Thanks for opening an account, ${owner}`)
    };
    deposit(val){
        this.movements.push(val);
    };
    withdraw(val){
        this.deposit(-val);
    };
    approveLoan(val){
        return true;
    };
    requestLoan(val){
        if(this.approveLoan){
            this.deposit(val);
            console.log(`Loan approved 👌🏻`);
        }
    }
};

const acc1 = new Account('Jonas','EUR',1111);

// acc1.movements.push(140);
// acc1.movements.push(-50);

acc1.deposit(150);
acc1.withdraw(50);

acc1.requestLoan(200);

console.log(acc1);

//NOTE: Class 220: Encapsulation: Protected Properties and Methods.
class AccountP {
    constructor(owner, currency,pin){
        this.owner = owner;
        this.currency = currency;
        // Protected
        this._pin = pin;
        this._movements = [];
        this.locale = navigator.languages;
        console.log(`Thanks for opening an account, ${owner}`)
    };
    deposit(val){
        this._movements.push(val);
    };
    withdraw(val){
        this.deposit(-val);
    };
    _approveLoan(val){
        return true;
    };
    requestLoan(val){
        if(this._approveLoan){
            this.deposit(val);
            console.log(`Loan approved 👌🏻`);
        };
    };
    getMovements(){
        return this._movements;
    };
};

const acc2 = new AccountP ('June','EUR',2222);

// acc1.movements.push(140);
// acc1.movements.push(-50);

acc2.deposit(150);
acc2.withdraw(50);

acc2._movements.push(20);

acc2.requestLoan(200);

console.log(acc2.getMovements());

console.log(acc2);

//NOTE: Class 221: Encapsulation; Private Class Fields and Methods.

// 1:Public fields
// 2:Private fields
// 3:Public methods
// 4:Private methods
// (there is also the static version)
class AccountEn {
    
    // 1:Public fields (instances)
    locale = navigator.languages;
    // 2:Private fields (instances)
    #movements = [];
    #pin;

    constructor(owner, currency,pin){
        this.owner = owner;
        this.currency = currency;
        // Protected
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.languages;
        console.log(`Thanks for opening an account, ${owner}`)
    };

    // 3:Public methods

    deposit(val){
        this.#movements.push(val);
        return this;
    };
    withdraw(val){
        this.deposit(-val);
        return this;
    };
    requestLoan(val){
        if(this.#approveLoan){
            this.deposit(val);
            console.log(`Loan approved 👌🏻`);
        };
        return this;
    };
    getMovements(){
        return this.#movements;
    };

    // 4:Private methods.
    #approveLoan(val){
        return true;
    };
};

const acc3 = new AccountEn ('CornWall','EUR',3333);
acc3.deposit(200);
acc3.withdraw(140);

console.log(acc3);
console.log(acc3.getMovements());

// Not yet implemented
// console.log(acc3.#approveLoan());

// console.log(acc3.#movements());

//NOTE: Class 222: Chaining Methods

acc3.deposit(800).deposit(600).withdraw(320).requestLoan(8000).withdraw(900);
console.log(acc3.getMovements());

//Challenge #4.

console.log('================================================================')
console.log('Last challenge.');
// const CarsElc = function(make,speed){
//     this.make = make;
//     this.speed = speed;
// };
// CarsElc.prototype.accelerate = function(){
//     // console.log(this.speed + 10
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// CarsElc.prototype.brake = function(){
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const Ev = function(name,speed,charge){
//     CarsElc.call(this,name,speed);
//     this.charge = charge;
// };

// //Linking prototype
// Ev.prototype = Object.create(CarsElc.prototype);

// Ev.prototype.chargeBattery = function(chargeTo){
//     chargeTo = this.charge += 10;
//     console.log(`Charge to ${chargeTo}%`);
// };

// Ev.prototype.accelerateE = function(){
//     this.speed += 20;
//     this.charge -= 1;
//     console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`);
// };

// Ev.prototype.brakeE = function(){
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const tesla = new Ev('Tesla', 120, 23);
// console.log(tesla);
// // tesla.chargeBattery();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();

// tesla.brakeE();
// tesla.chargeBattery();
// tesla.accelerateE();

class CarsElc3{
    constructor(make,speed){
        this.make = make;
        this.speed = speed;
    };
    accelerate (sp) {
        // console.log(this.speed + 10
        sp = this.speed += 10;
        console.log(`${this.make} is going at ${sp} km/h`);
        return this;
    };
    brake (sp) {
        sp = this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this;
    };
    get speedUS(){
        return `Current speed is ${this.speed / 1.6} mi/h`
    };
    set speedUS(speed){
        this.speed = speed * 1.6;
    };
};

class Ev3 extends CarsElc3 {
    #charge;
    constructor(name,speed,charge){
        super(name,speed);
        this.#charge = charge;
    };
    chargeBattery(chargeTo){
        chargeTo = this.#charge += 10;
        console.log(`Charge to ${chargeTo}%`);
        return this;
    };
    // getCharge(){
    //     return this.#chargeBattery;
    // };
    accelerateE(sp,ch){
        sp = this.speed += 20; 
        ch = this.#charge -= 1;
        console.log(`${this.make} going at ${sp}km/h, with a charge of ${ch}%`);
        return this;
    };   
    brakeE(sp){
        sp = this.speed -= 5;
        console.log(`${this.make} is going at ${sp} km/h`);
        return this;
    };
};

const teslal = new Ev3('Tesla', 120, 23);
console.log(teslal);

teslal.chargeBattery();
teslal.accelerate().accelerateE().brakeE().brakeE().accelerateE().chargeBattery(50).brake().accelerate().chargeBattery();

console.log(teslal.speedUS);