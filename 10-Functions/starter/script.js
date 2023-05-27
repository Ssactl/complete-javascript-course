'use strict';

/*
//-----128 Default parameters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassangers = 1,
  price = 199 * numPassangers
) {
  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

//How to skip argument
createBooking('LH123', undefined, 1000);
*/

//-----129 How passing arguments work Value vs. Reference
//js does not have pass by reference, only pass by value
//but the value of objects is memory address
//so basically we pass a reference to the function but we do not pass by reference

//----130
//first-class function:
//1.js treats functions as first-class functions
//2. it means that functions are also values
//3. functions are just another type of object
//so we can store functions in variables or properties; pass them as arguments to other functions; return them from funcitons; and even call methods, properties like name on functions;
//higher-order functions:\
//1.it means that a function recieve another funciton as an argument or returna a new function or both
//2.THis is only possible because of first-class function
//!!!!!!!!!!!!!!!
//vs: first-class functions is just a concept. It is a feature that a programming language does or does not have. THere is no first-class functions in practice;
//But there are higher order functions in practice. WHich are poosible because the language supports first-class functions

//-----131
//higher order functions take callback functions
//callback functions: call it later
//callback functions help build seperate and reusable code
//and more important of it is to help build abstraction on the code so that the higher order funcitons do not need to care about what is exactly going on in the lower level functions; they do not need know all the lower level details

//-----132
// const greet = greeting =>
//   function (name) {
//     console.log(`${greeting} ${name}`);
//   };

const greet = greeting => name => console.log(`${greeting} ${name}`);

greet('hello')('jonas');

//-----133 & 134
//function has call and apply method to specify its this object when we not using the object itself to call the function;
//call(object, argument1, arguemnt2...), apply(object, [arrgumens])
//because now we have spread operator, so we no longer use apply method
//to be more effective, js now has the bind method, it will return a new function
//advantages: 1.it's reusable. we can just specify the stone arguments once, and then keep using the new fucntion; 2.now we can pass it as callback funciton to elements' event listeners without worrying the this keyword will point to elements; 3.to set the object argument as null, we also can use it to create partial application.

//partial application
const addTax = (rate, value) => value + value * rate;
//const addVAT=addTax.bind(null,0.23);
const addVAT = value => addTax(0.23, value);

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);

/*
//-----135 coding challeng #1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0:JavaScript', '1:Python', '2:Rust', '3"C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //Display a prompt window
    // prompt(
    //   `What is your favourite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3:C++`
    // );
    const answer = Number(
      prompt(`${this.question}\n${this.options.join('\n')}`)
    );
    //Based on the input number, update the answers array
    console.log(typeof answer);
    if (typeof answer === 'number' && answer < this.options.length) {
      this.answers[answer]++;
      console.log(this.answers);
    }
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers}`);
    }
  },
};

poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const testData1 = {
  answers: [5, 2, 3],
};
const testData2 = {
  answers: [1, 5, 3, 9, 6, 1],
};
const displayResultsTest = poll.displayResults;
displayResultsTest.call(testData1);
displayResultsTest.call(testData1, 'string');
displayResultsTest.call(testData2);
displayResultsTest.call(testData2, 'string');
*/

//------136
//we can use IIFE when we just want to call a funciton once and remenber to warp them into parethises
//and we also can use use curly brace to keep data privacy. curly braces can create block scope and of because it does not work on var

//-------137
//closures is something like a backpack of a function. It carries the variable envrionment in it where and when the function is given birth
//so when the parent scope of a function, the execution content gone, the function still has access to the variable in that EC.
//and we can not access that parent scope directly from our code. but we can use console.dir() to see them.
//[[]] means interal property
//and closures has propority over other scopes

//A closure is the closed-over variable enviroment of the execution context in which a function was created, even after that EC is gone

//-----139 coding challenge #2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
