'use strict';

//a tip og the iceberg:
//js is a high-level, object-oriented, multi-paradigm programming language

//high-level, prototype-based object-oriented, multi-paradigm, interpreted or just-in-time complied, dynamic
//single-threaded, garbage-collected, firt-class functions, non-blocking event loop concurrency model

//--------compilation vs. interpretation
//compilation: the whole source code is converted to machine code as a portable file first, and then this portable file will be executed.
//interpretation: the source code is converted and executed line by line.
//js is a purely interpreted language. and the problem of it is that this kind of language is much more slower than complied language.
//But modern js engine is now a mix between compilation and interpretation, which is called just-in-time(JIT) compilation.
//JIT compilation: Entire code is converted into machine code at once and then executed immediately. There is no prtable file in this compilation.

//lexical scopig: the scop chain only works upward, not sideway
//var is function-scoped. In strict mode, it's block-scoped
//let and const are block-scoped

//scope chain vs. call stack

//small summary:
//scoping is all about where do variables live and where can we accesss variables
//THere are 3 types of scope in js: global, function, block
//lexical scoping defines where we can access varialbes and it based on where funcitons and blocks are written in the code
//so it means scopes always have access to all the variables from their outer scopes. Ana that os scope chain.
//so when a varibale is not in the current scope, the engine looks up in the scope chain until it find the variable. And that is called variable lookup
//THe scope chain has noting to do with the order in which the functions were called. It dose not affect the scope chain at all.

//------Hoisting
//var can hoist, but it will be undifined
//let and const,
//WHy create hoisting? it's mainly for calling functions before they are decalaration, and var hositing is just a byproduct
//var variable will be a property of the window object

//------this keyword
//IN event listener, this points to the DOM element that the handler attached to
//arrow function will use the lexical this keyword, which means its parent scope's this keyword
//but in function expressions(regular functions), the this keyword will be undefined.

//never ever use arrow functions as methods.
//WHen you use this keyword in an arrow function method
//this is refer to window object

//IF you use this in a regular function which is defined in a method.
//when you call it, this is refer to undefined, just the same as a function with this outside the object
//to solve this, you can assign this to a variable, called self for example
//and because of the scope chain, self in a function in a method refer to the object

const jonas = {
  firstName: 'Jonas',
  year: 1991,

  //solution 1
  //   calAge: function () {
  //     const self = this;
  //     const isMillenial = function () {
  //       console.log(self);
  //     };
  //     isMillenial();
  //   },

  //solution 2
  //ES6 uses an arrow function to solve it.
  //because arrow function will simply use its parent's scope
  calAge: function () {
    const isMillenial = () => {
      console.log(self);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this.firstName);
  },
};

//Argument keyword only exists in regular functions
//this is useful when we need to accept more parameters than we specify
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

//Now in mordern js, we have another way for more parameters situation.

//---------Primitive types vs. Refernce types(object)
//Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const jessicaCopy = Object.assign({}, jessica2); //it merge two objects
//But it only works the first level.(shallow copy)
jessicaCopy.lastName = 'Davis';
console.log('Before marriage', jessica2);
console.log('After marriage', jessicaCopy);
