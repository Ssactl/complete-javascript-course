'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*
///////////////////////////////////////
// Coding challenge #1
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${
        data.languages[Object.keys(data.languages)[0]]
      }</p>
      <p class="country__row"><span>💰</span>${
        data.currencies[Object.keys(data.currencies)[0]].name
      }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

function whereAmI(lat, lng) {
  // reverse geocoding
  fetch(
    `https://geocode.xyz/${lat},${lng}?json=1&auth=349881567513101339201x113516`
  )
    .then(response => {
      // console.log(response);
      if (!response.ok)
        throw new Error(`Problem with gecoding ${response.status}}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (!data.country) throw new Error(`${data.error.message}`);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(`Problem with country ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(error => console.error(error));
}

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

/////////////////////////////////////////////
//coding challenge #2
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
let currentImg;
function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;

    imgEl.addEventListener('load', function () {
      imgContainer.append(imgEl);
      resolve(imgEl);
    });

    imgEl.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
}

const imgPath = './img/img-1.jpg';
/*
createImage(imgPath)
  .then((img) => {
    currentImg=img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('./img/img-2.jpg');
  })
  .then((img) => {
    currentImg=img;
    wait(2)})
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('./img/img-3.jpg');
  })
  .catch(err => console.error(err));
*/
/////////////////////////////////////////////
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`1:${city}`);
//   } catch (err) {
//     console.log(`2:${err.message}`);
//   }
//   console.log(`3: Finished getting location`);
// })();

/////////////////////////////////////////////
//coding challenge #3

const loadPause = async function () {
  try {
    currentImg = await createImage('./img/img-1.jpg');
    await wait(2);
    currentImg.style.display = 'none';
    currentImg = await createImage('./img/img-2.jpg');
    await wait(2);
    currentImg.style.display = 'none';
    currentImg = await createImage('./img/img-3.jpg');
    await wait(2);
    currentImg.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadPause();

let imgs;
async function loadAll(imgArr) {
  // const imgs = await Promise.all(imgArr.map(img => createImage(img)));
  imgs = imgArr.map(img => createImage(img));
  //?????????????????????????????????????????????????????
  // Do we need to use async/await in map() ????????
  // imgs.forEach(i => i.classList.add('parallel'));
  console.log(imgs);
}

const imgArr = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg'];
loadAll(imgArr);
