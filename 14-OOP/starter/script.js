'use strict';

//-------------Constructor functions
//Function constructors are not a feature of JS. They are simply a pattern that has been developed by other developers

//convention: constructor functions always start with a capital letter
//arrow functions can not be used as constructor functions, because it does not have this key word

const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never create methods in constructor function
  // this.calcAge=function(){

  //   console.log(2037-this.birthYear);
  // }
  //if we create 1000 person objects then they all will carry the methods and this will be terrible for the performance of our code
  //instead, to solve this problem, we use prototypes and prototype inheritace
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//What will happens when we use the new operator
//1. New empty object, {}, is created
//2. function is called, and the {} will be assign to this (this = {})
//3. {} linked to prototype
//4. finally, function will automatically return {}

const jonas = new Person('Jonas', 1991);
console.log(jonas);

console.log(jonas instanceof Person);
//even though there is no traditional OOP in JS, which means there is no class or instances created from a class, we still can say jonas is an instance of Person, because we did create an object from a constructor function and construcotr functions have been used since the beginning of JS to kind of simulate classes

//static method in constructor functions
Person.hey = function () {
  console.log('hey there !!!!!!!!!!!!!!!!!!!');
  console.log(this);
};
Person.hey();

//-------------Prototypes
//1. each and every function in JS automatically has a peroperty called prototype, including constructor functions. And every object that's created by a certain constructor function will get access to all the methods and properties that are defined on the constructor prototype property, which is prototype inheritance
// prototype is actually a object

//????????????????????????????????????????????????????????????????????????????????????????????

//-----------------ES6 CLASSES
//classes in JS are just syntatic sugar over prototype inheritance, they still implement prototype inheritance behind the scenes but with a syntax that makes more sense to people coming from other programming languages, and that was basically the goal adding classes to JS

//a class is just a special type of function, it just like a fucntion but without the arguments

//behind the scene, classes are just still functions

//class expression
//const PersonCl = class {};

//class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //INSTANCE METHODS:
  //Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  //STATIC METHODS:
  //methods that are attached to the constructor itself
  static hey() {
    console.log('hey there !!!!!!!!!!!!!!!!!!!');
    console.log(this);
  }
}

const jessica = new PersonCl('jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

PersonCl.prototype.greet = function () {
  console.log(`hey, ${this.firstName}`);
};

jessica.greet();

PersonCl.hey();

//1. classes are not hoisted
//2. classes are first-class citizens
//3. classes are executed in strict mode

//---------------SETTER and GETTER
//are very useful for data validation
// const walter = new PersonCl('Walter', 1965);

//every object can have setter and getter properties, and we call these special properties assessor properties

//classes also have getter and setter and they work the same way as objects

const account = {
  owner: 'jonas',
  movements: [1, 2, 3, 4],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
//this is useful when we just want to get sth as property but still need to do some calculation first

account.latest = 50;
console.log(account.movements);
//we don't use it like methods, we use it like property

//that;s why they are condiered as special properties

//-------------STATIC METHODS
//eg.
Array.from(document.querySelectorAll('h1'));
// [1,2,3].from(); //error
//the from method is attached to Array constructor, and not to the prototype property of the constructor
//so therefore all the arrays do not inherit this method
//so developers know that it is related to Array. we also say that the from method is in the Arrar namespace
//we usually use static methods kind of as helpers that should be related to a certain constructor

//--------------------OBJECT.CREATE
//still the idea of prototype inheritance, but works different from constructor funcitons and classes

//manually set the prototype of an object to any other objects that we want

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;

console.log(steven);
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

//////////////////////////////////////////////////

//Inheritance Between "Classes": COnstruction Functions

const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person2.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person2.call(this, firstName, birthYear);
  this.course = course;
};

//linking prototype
Student.prototype = Object.create(Person2.prototype);
Student.prototype.constrcutor = Student;

//after link the prototype, otherwise methods will be overrided
Student.prototype.introduce = function () {
  console.log | `My name is ${this.firstName} and i study ${this.course}`;
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

//==================================
//Inheritance Between "Classes": ES6 classes
class StudentCl extends PersonCl {
  //if you do not need any new properties, you do not need to write this constructor function
  constructor(fulltName, birthYear, course) {
    //Always needs to happen first!
    //the call to the super function is responsible for creating the this keyword in this subclass
    super(fulltName, birthYear);
    this.course = course;
  }
}
//===========================================
//Inheritance Between "Classes": Object.create()
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Web');

////////////////////////////////////////////
//ANOTHER CLASS EXAMPLE

//PRIVATE CLASS FIELDS and METHODS
// 1)public fields
// 2)private fields
// 3)public methods
// 4)private methods
// (there is also the static version)

//DATA ENCAPSULATION and DATA PRIVACY
class Account {
  // 1)public fields (instances)
  //are gonna be present on all instances that we create through the class
  //they are not on the prototype
  locale = navigator.language;
  // _movements = [];

  // 2)private fields (instances)
  //we can make properties that are really, trule not accessible from the outside
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`thanks for opening an account, ${owner}`);
  }

  // 3) public methods
  //API: application public interface
  getMovements() {
    // return this._movements;
    return this.#movements;
  }

  deposit(val) {
    // this._movements.push(val);
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  //only be avalibale on the class itself, not on all the instances
  static helper() {
    console.log('Helper');
  }

  //we do not want some method or properties to be accessed by users
  //protected method
  _approveLoan(val) {
    return true;
  }

  // 4) private methods
  // #approveLoan(val) {
  //   return true;
  // }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);
console.log(acc1.getMovements());
// console.log(acc1.#movements);
// console.log(acc1.#approveLoan(100)); //now private methods are seen as private fields. Browsers do not implement private methods yet

////////////////////////
//chaining methods
//return object
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

///////////////////////////////////////////////////
//-----------coding challenge #1
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

const carBMW = new Car('BMW', 120);
const carMercedes = new Car('Mercedes', 95);

carBMW.accelerate();
carBMW.accelerate();
carMercedes.brake();

/////////////////////////////////////////////////
// Coding challenge #2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  get speedUS() {
    return `${this.speed / 1.6} mi/h`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
console.log(ford.speedUS);
ford.speedUS = 80;

/////////////////////////////////////////////////
// coding challenge #3
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constrcutor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);
console.log(tesla);

/////////////////////////////////////////////////
// coding challenge #4
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const rivian = new EVCl('rivian', 120, 23);
rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();
console.log(rivian);

console.log(rivian.speedUS);
