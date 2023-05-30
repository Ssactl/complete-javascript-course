'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
       `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);
// console.log(containerMovements.textContent);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(s => s.at(0))
      .join('');
  });
};

//so the forEach() produce side effects. In this case is that it mutate the original arrays

//the philoshopy: each function should recieve the data that it should work with, instead of using a global variable.
//so the solution below is not working
//we should create that kind of fucntion which can recieve any data we pass into it and work with them
//we do not want to rely on the account array that we already have
// accounts.forEach(account => {
//   account.username = createUsernames(account.owner);
// });

createUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
//SLICE
// immutate the original array
console.log(arr.slice(2));
//shallow copy
console.log(arr.slice());
console.log([...arr]);

//SPLICE
// mutate the original array
//the original array will lose tha part that is extracted
//a common use case: remove the last element of an array
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//REVERSE
//it mutate the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'i'];
console.log(arr2.reverse());
console.log(arr2);

//CONAT
//it won't mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
const letters2 = [...arr, ...arr2];
console.log(letters2);

//JOIN
console.log(letters.join(' - '));

//AT
const arr3 = [11, 23, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

//getting last element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));
console.log(arr3.at(-2));

console.log('jonas'.at(0));

//FOREACH
//looping array
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements)
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`movement ${i + 1}:You withdraw ${Math.abs(movement)}`);
  }
}

console.log('------FOREACH-----');
//order matters
//1: current element
//2: current index
//3: the entire array
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`movement ${index + 1}:You withdraw ${Math.abs(movement)}`);
  }
});
//continue and break statement do not work in forEach lopp at all!!!!!!!!!!!!!!!!

//
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR']);

console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

// _ means a variable that is completely unnecessary
*/
/*
//------coding challenge #1
const checkDogs = function (dogsJulia, dogsKate) {
  //1
  const dogsJuliaCorrected = [...dogsJulia];
  console.log(dogsJuliaCorrected);
  // dogsJuliaCorrected.shift();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);

  //2
  const remainDogs = [...dogsJuliaCorrected, ...dogsKate];

  //3
  remainDogs.forEach(function (age, i) {
    // (age >= 3 &&
    //   console.log(`Dog number ${i+1} is an adult, and is ${age} years old`)) ||
    //   console.log(`Dog number ${i+1} is still a puppy 🐶`);

    const boolean =
      age >= 3 &&
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    console.log(boolean);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
