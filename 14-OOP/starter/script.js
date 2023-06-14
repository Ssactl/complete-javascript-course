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

//-------------Prototypes
//1. each and every function in JS automatically has a peroperty called prototype, including constructor functions. And every object that's created by a certain constructor function will get access to all the methods and properties that are defined on the constructor prototype property, which is prototype inheritance
// prototype is actually a object

//????????????????????????????????????????????????????????????????????????????????????????????

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
