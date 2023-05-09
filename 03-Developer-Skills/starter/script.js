// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = 23;

const calAge = birthYear => 2017 - birthYear;

console.log();

//Live Server extension can reload brower automatically
//a more profession workfolw is use Node.js and a npm package called Live Server
//npm is the Node package manager, which is bascially a program to download tools

//debugging
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',

    //C) FIX
    value: Number(prompt('Degrees celsius:')),
  };

  //B) FIND
  console.table(measurement);

  const kelvin = measurement.value + 273;
  return kelvin;
};

//A) IDENTIFY
console.log(measureKelvin());
