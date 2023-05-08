//-----------------------activating strict mode
//help us to write a secure javascript code
//and it has to be the very first statement in the script
//1.strcit mode forbids us to do certain things
//2.it creates visibal errors and the developer console. where in other situations
//javascript would just fail silently
//3.it introduces a short list of variable names that are reserved for features that might be added to the language a bit later

"use strict";

let hasDriversLicense = false;
const passTest = true;

if (passTest) {
  hasDriversLicense = true;
}

if (hasDriversLicense) {
  console.log("i can drive :D");
}

// const interface = "Audio";
// const private = 1;
// const if=2;

//-----------------------Functions
//the fundemental building block of js are functions

//-----------------------Function declarations vs. expressions
//declaration, with function keyword, just like declaring a variable

const age1 = calAge1(1991);

function calAge1(birthYeah) {
  return 2037 - birthYeah;
}

console.log(age1);

//expression, with = operator, assgin a function to a variable
//function is a value, too
const calAge2 = function (birthYeah) {
  //it's a anomynous function
  return 2037 - birthYeah;
};
const age2 = calAge2(1991);

//difference: we can call function before its declaration instead of expression
//it is because of a process called hoisting

//-----------------------Arrow function
//it's a function expression acutally
const calAge3 = (birthYeah) => 2037 - birthYeah;

const yearsUntilRetirement = (birthYeah, firstname) => {
  const age = 2037 - birthYeah;
  const retirement = 65 - age;
  // return retirement;
  return `${firstname} return in ${retirement}`;
};

//difference: arrow functions do not get a so-called this keyword

//-----------------------039 Introduction to Arrays
//only primitive values are immutable
//arrays is not primitive value, so it is mutable

//-----------------------040 array methods
const friends = ["michael", "steven", "peter"];

//add elements
const newLength = friends.push("jay");
console.log(friends);
console.log(newLength);

friends.unshift("John");
console.log(friends);

//remove elements
const popped = friends.pop(); //Last
console.log(friends);
console.log(popped);

friends.shift(); //First
console.log(friends);

console.log(friends.indexOf("steven"));

console.log(friends.includes("steven"));
