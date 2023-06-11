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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

// console.log(containerMovements.innerHTML);
// console.log(containerMovements.textContent);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(s => s.at(0))
      .join('');

    // console.log(acc.owner, acc.username);
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  //DIsplay movements
  displayMovements(acc.movements);
  //Display balance
  calcPrintBalance(acc);
  //DIsplay summary
  calcDisplaySummary(acc);
};

//Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //DIsplay UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    //CLear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
    // console.log('LOGIN');
  }
});

//so the forEach() produce side effects. In this case is that it mutate the original arrays

//the philoshopy: each function should recieve the data that it should work with, instead of using a global variable.
//so the solution below is not working
//we should create that kind of fucntion which can recieve any data we pass into it and work with them
//we do not want to rely on the account array that we already have
// accounts.forEach(account => {
//   account.username = createUsernames(account.owner);
// });

createUsernames(accounts);

//accumulator -> SNOWBALL
const calcPrintBalance = function (acc) {
  const balance = acc.movements.reduce(function (acc, cur, i, arr) {
    return acc + cur;
  }, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance} EUR`;
};

// calcPrintBalance(currentAccount);

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // console.log('transfer valid!');
    //transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //update ui
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    //add amount
    currentAccount.movements.push(amount);
  }

  //update ui
  updateUI(currentAccount);
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const closeAccInd = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );

    //delete acc
    accounts.splice(closeAccInd, 1);
    currentAccount = '';

    //hide ui
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

/*
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

//REDUCE
//boil down an array into one single value
//Maximum value
const max = movements.reduce(
  (max, cur) => (max < cur ? cur : max),
  movements[0]
);

console.log(max);
*/
//-------coding challenge #2
//-------coding challenge #3
// const calcAverageHumanAge = function (dogAges) {
//   const humanAges = dogAges.map(d => (d <= 2 ? 2 * d : 16 + d * 4));
//   console.log(humanAges);
//   const humanAgesGreater18 = humanAges.filter(d => d >= 18);
//   console.log(humanAgesGreater18);
//   // const average =
//   //   humanAgesGreater18.reduce((acc, cur) => acc + cur, 0) /
//   //   humanAgesGreater18.length;

//   const average = humanAgesGreater18.reduce(
//     (acc, cur, i, arr) => acc + cur / arr.length,
//     0
//   );
//   console.log(average);
//   return average;
// };

const calcAverageHumanAge = Ages =>
  Ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

/*
//FIND
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
    break;
  }
}
*/

/*
//SOME
console.log(movements);
//EQUALITY
console.log(movements.includes(-130));
//CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

//EVERY

//SEPARATE CALLBACK
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/*
//FLAT
//default: one level deep
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
console.log(arrDeep.flat(1));
console.log(arrDeep.flat(2));

//flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatMap
//only go 1 level deep
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);
*/

/*
//SORINT
//Strings
const owners = ['j', 'z', 'a', 'm'];
console.log(owners.sort());
console.log(owners);

//Numbers
//does the sorting based on strings
console.log(movements);
// console.log(movements.sort());

//return <0, A,B (keep order)
//return >0, B,A (switch order)

// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);

console.log(movements);

//CREATE AND FILL ARRAY
//MANUALLY
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3));
//PROGRAMMATICALLY
//Empty arrays + fill method
const x = new Array(7);
console.log(x);
// x.fill(5);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

//Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

//nodelist VS. array
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('', 'eur')
  );
  console.log(movementsUI);
});
*/

//--------------coding challenge #4
// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//1.
dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);
//2.
dogs.forEach(dog => {
  if (dog.owners.includes('Sarah')) {
    console.log(
      `Sarash's dog is eating too ${
        dog.curFood > dog.recommendedFood ? 'much' : 'little'
      }`
    );
  }
});
//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
//4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs are eating too much!`);
//5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));
//6.
const checkEatingOaky = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(dog => checkEatingOaky(dog)));
//7.
const dogsEatOkay = dogs.filter(checkEatingOaky);
console.log(dogsEatOkay);
//8.
const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sortedDogs);
