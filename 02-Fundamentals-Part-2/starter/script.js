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

//-----------------------041 Introduction to Objects
//(vs. array) key/property value pairs, so we can get a value by its name
//array for order data, object for unstructed data
const jonas = {
  firstName: "jonas",
  lastName: "schemdmann",
  age: 2037 - 1991,
  job: "techer",
  friends: ["michael", "steven", "peter"],
};

//-----------------------042 DOT vs. bracket notation
console.log(jonas.lastName);
console.log(jonas["lastName"]); //can out any expression

const nameKey = "Name";
console.log(jonas["last" + nameKey]);

// const interestedIn = prompt(
//   "What do you want to about Jonas? Choose between firstName, lastName, age, job, and friends"
// );

// if (jonas[interestedIn]) {
//   console.log(jonas[interestedIn]);
// } else {
//   console.log(
//     "Wrong request! Choose between firstName, lastName, age, job, and friends"
//   );
// }

// jonas.location = "Portugal";
// jonas["twitter"] = "@jonasschmedtman";
// console.log(jonas);

//challenge
const challengeSentence = `${jonas["firstName"]} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}}`;
console.log(challengeSentence);

//-----------------------043 object methods
const jonas2 = {
  firstName: "jonas",
  lastName: "schemdmann",
  birthYeah: 1991,
  job: "techer",
  friends: ["michael", "steven", "peter"],
  hasDriverLicense: true,

  // calAge: function (birthYeah) {
  //   return 2037 - birthYeah;
  // },

  // calAge: function () {
  //   console.log(this);
  //   return 2037 - this.birthYeah;
  // },

  //only need to calculate the age once
  calAge: function () {
    this.age = 2037 - this.birthYeah;
    return this.age;
  },

  //
  getSummary: function () {
    return `${this.firstName} is a ${this.calAge()}-year old ${
      this.job
    }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
  },
};

console.log(jonas2.calAge());
// console.log(jonas2["calAge"](1991));

console.log(jonas2.age);

console.log(jonas2.getSummary());

//so, arrays are actually also objects, they ar just special kind of object,
//so they have funcitons/methods that we can use to manipulate them
