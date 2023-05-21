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

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
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

/*
//------114 coding challenge #4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  // const names = text.split('\n');
  // console.log(names);
  // for (const n of names) {
  //   const narr = n.trim().toLowerCase().split('_');
  //   narr[1] = narr[1][0].toUpperCase() + narr[1].slice(1);
  //   console.log(narr.join(''));
  // }

  const rows = text.split('/n');
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    console.log(`${output.padEnd(20)}${'✔'.repeat(i + 1)}`);
  }
});

//-------121-123 strings
//Why does strings, a primitive data type, have methods
//Boxing: js converts them to String objects behind the scence when string primitives call methods
*/
/*
//-------119 coding chanllenge #3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1
const events = [...new Set(gameEvents.values())];
// const events = [...new Set([...gameEvents.values()])];
console.log(events);
//??????????????? Iterator and spread operator
//2
gameEvents.delete(64);

//4
for (const [key, value] of gameEvents.entries()) {
  console.log(
    `${key < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`
  );
}
*/

/*
//-------117 maps
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'FirenzeItaly');
console.log(rest.set(2, Lisbon));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'we are open')
  .set(false, 'we are closed');

console.log(rest.get('name'));
console.log(rest.get('true'));
console.log(rest.get(true));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
rest.delete(1);

const arr = [1, 2];
// rest.set([1, 2], 'test');
rest.set(arr, 'test');
console.log(rest);
console.log(rest.size);
// rest.clear();
console.log(rest);

//two [1.2] are not the same objects in the heap
// console.log(rest.get([1, 2]));
console.log(rest.get(arr));
*/

/*
//---------116 Sets
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risoto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);
console.log(new Set('Jonas'));
console.log(ordersSet.size);
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);
//There is no need to get value out of a set
//if you need, just use an array

//the main use of set is to remove dupicate value of array

//Example
//sets is also iterable
//spread operator works on all iterable objects
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
console.log(new Set('Jonasschmedtman').size);
//Sets are not intended to replace array at all
*/
/*
///////////////////////////////////////
// Coding Challenge #2

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//1
for (const [score, player] of game.scored.entries())
  console.log(`Goal ${score + 1}: ${player}`);
//2
let sum = 0;
for (const odd of Object.values(game.odds)) sum += odd;
console.log(sum / Object.values(game.odds).length);
//3
for (const [key, value] of Object.entries(game.odds))
  console.log(`Odd of ${game[key] ?? 'draw'}: ${value}`);
//4
const scorers = {};
for (const player of game.scored)
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// (scorers[player] && scorers[player]++) || (scorers[player] = 1);
console.log(scorers);
*/
/*
///////////////////////////////////////
// Coding Challenge #1

//1
const [player1, player2] = game.players;
//2
const [gk, ...fieldPlayers] = player1;
//3
const allPlayers = [...player1, ...player2];
//4
const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
//5
// const { team1, draw, team2 } = game.odds;
const { team1, x: draw, team2 } = game.odds;
//6
const printGoals = (...playerNames) => {
  for (let i = 0; i < playerNames.length; i++) {
    console.log(playerNames[i]);
  }
  console.log(playerNames.length);
};
//7
console.log(
  (team1 < team2 && 'Team 1 is more likely to win') ||
    'Team 2 is more likely to win'
);
*/

/*
//---------109 logical assignment operator
//three new so called logcal assignment operators were introduced in ES2020

const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni',
};

//OR assignment operator
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

rest1.numGuests ||= 10;
rest2.numGuests ||= 10;

console.log(rest1);
console.log(rest2);

//AND asignment operator
//it assign a value to a variable if it is currentl truthy
rest1.owner = rest1.owner && '<ANONYMOUS>';
console.log(rest1); //undefiend
rest1.owner &&= '<ANONYMOUS>';
console.log(rest1); //
*/

/*
//----------108 hte nullish coalescing operator
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests3);

//solution

//nullish value instead of falsy value
//nullish: null and undefined(NOT 0 or "")
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/
/*
//-----------107 short circuiting(&& and ||)
//logic operator:
//use any data type, return any data type, short-circuiting
//in ||, short circuiting means if the first value is a truthy value, it will immediately return this value

console.log('------- OR ----------');
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
const guests2 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
console.log(guests2);
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests3);

console.log('------- AND ----------');
//in &&, short circuiting means if the first value is a false value, it will immediately return this value without even evaluate other operas
console.log(0 && 'jonas');

//pratical example
//use and operator to execute code in the second operan if the first one is ture
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms');
*/
/*
//-----------106 rest pattern -> pack
//1)destructuring
//spread, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];
//rest, because on LEFT side of =
//rest, because it will take the rest, it must be the last one
//usually work with destructuring
const [a, b, ...others] = [1, 2, 3, 4, 5];

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
//2)functions
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
*/

/*
//-----------105 spread operator -> upack
//we can use it to bulid a new array and pass arguments to functions
//copy array -> shallow copy
const mainMenuCopy = [...restaurant.mainMenu];
//Iterables: arrays, strings, maps, sets. NOT objects
const str = 'jonas';
const letters = [...str, '', 's'];
console.log(letters);
//we cannot use it in string template
// console.log(`${...str}`);

const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt("Let's make pasta! Ingredient 2?"),
  prompt("Let's make pasta! Ingredient 3?"),
];

console.log(ingredients);
restaurant.orderPasta([...ingredients]);

//spread operator in Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

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
*/

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
