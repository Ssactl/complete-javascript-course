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

/*
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
*/

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
