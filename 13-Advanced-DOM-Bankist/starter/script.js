'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

[...btnsOpenModal].forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//BUtton scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //old methods: calculate manually
  // window.scrollBy({ left: s1coords.x, top: s1coords.y, behavior: 'smooth' });

  //morden method:
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////
//Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//the exact event handler function is added to three elements
//that is unneccessary
//=>delegation: we use the fact that events bubble up
//by putting the eventListener on a common parent of all the elements
//1). Add event listener to common parent element
//2). Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  // console.log(content);
});

// Manu fade animation
const handleHover = function (e) {
  console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing 'argument' into handler
//impossible to pass another argument into an eventHandler function
//eventHandler function can only take one argument
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

/*
//////////////////////////////////////////
//Scroll to section1
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //old methods: calculate manually
  // window.scrollBy({ left: s1coords.x, top: s1coords.y, behavior: 'smooth' });

  //morden method:
  section1.scrollIntoView({ behavior: 'smooth' });
});

//1). we can add multiple event listeners to the same event
//2) we can remove a event handler in case we do not need it anymore, but we need to export it with a name first
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEvenListener: Great! You are reading the heading');

  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

//old school:
//1). the second function will overwrite the first one
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading');
// };
*/

/*
const h1 = document.querySelector('h1');
//Going downwards: child
//go deep as neccessary
console.log(h1.querySelectorAll('.highlight'));
//just direct child
console.log(h1.childNodes);
*/
