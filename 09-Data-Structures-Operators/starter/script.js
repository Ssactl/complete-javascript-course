'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIdex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIdex]];
  },

  //!!!!!!!!!!!!!the power of destructuring objects when receiving object(many) parameter
  //(retrive value by property name & set default value)
  orderDelivery: function ({
    starterIndex = 1,
    mainIdex = 0,
    time = '20.00',
    address,
  }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIdex]} will be delivered to ${address} at ${time}`
    );
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//!!!!!!!!!!!!!the power of destructuring objects when receiving object parameter
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

//----------104 destructuring objects
//object retrive value by property name vs. array retrive value by order
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//rename
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
//if we start a curly brace, js expects a code block
//but since we cannot assign anything to a code block, we get an error, unexpected token with the equal there.
//to solveit, wrap all of this into a parenthesis
console.log(a, b);

//nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//----------103 destructuring arrays
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// //unpacking it
// const [x, y, z] = arr;
// let [main, , secondary] = restaurant.categories;

// //swithing
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main,secondary)；

// [main,secondary]=[secondary, main];
// console.log(main,secondary)；

// //Recieve 2 return values from a function
// const [starter,mainCourse]=restaurant.order(2,0);

// //Nested destructuring
// const nested=[2,4,[5,6]];
// // const [i,,j]=nested;
// // console.log(i,j);
// const [i,,[j,k]]=nested; //do destructuring inside the destructuring
// console.log(i,j,k);

// //Default values
// const [p=1,q=1,r=1]=[8,9];
// console.log(p,q,r);
