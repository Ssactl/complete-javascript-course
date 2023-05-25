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
