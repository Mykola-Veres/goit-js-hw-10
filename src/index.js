import './css/styles.css';
var debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import allCountries from '../templates/allCountries.hbs';
import country from '../templates/country';
import '@fortawesome/fontawesome-free/js/all';
import '@fortawesome/fontawesome-free/css/all.css';

const DEBOUNCE_DELAY = 300;
const countryRequest = document.querySelector('#search-box');
countryRequest.addEventListener('input', debounce(handlerInput, DEBOUNCE_DELAY));
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

async function handlerInput(event) {
  event.preventDefault();
  const countryName = countryRequest.value.trim();
  await fetchCountries(countryName).then(renderMarkap).catch(showError);
  // .finally(() => countryRequest.reset());
}
function showError() {
  Notify.failure('Oops, there is no country with that name', { width: '400px' });
}
function renderMarkap(countryUser) {
  const numberOfCountries = countryUser.length;

  if (numberOfCountries <= 10 && numberOfCountries >= 2) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    countryList.innerHTML = allCountries(countryUser);
  } else if (numberOfCountries === 1) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    countryInfo.innerHTML = country(countryUser);
  } else {
    Notify.info('Too many matches found. Please enter a more specific name.', { width: '400px' });
  }
}

const input1 = [4, 1, 3]; // 2
const input2 = [2, 1, 5, 2, 7, 4, 10]; // 7
const input3 = [2, 0, 1, 5, 2, 7]; // 6

function loadGrain(levels) {
  let maxLeftSide = levels[0];
  let maxRightSide = levels[levels.length - 1];

  let leftStep = levels[1];
  let rightStep = levels.length - 2;
  let totalGrain = 0;

  while (leftStep <= rightStep) {
    if (maxLeftSide <= maxRightSide) {
      maxLeftSide = maxLeftSide > levels[leftStep] ? maxLeftSide : levels[leftStep];
      totalGrain += maxLeftSide - levels[leftStep];
      leftStep += 1;
    } else {
      maxRightSide = maxRightSide > levels[rightStep] ? maxRightSide : levels[rightStep];
      totalGrain += maxRightSide - levels[rightStep];
      rightStep -= 1;
    }
  }
  return totalGrain;
}
console.log(loadGrain([4, 1, 3]));
console.log(loadGrain([2, 0, 1, 5, 2, 7]));
console.log(loadGrain([2, 1, 5, 2, 7, 4, 10]));
console.log(loadGrain([2, 4, 2]));
console.log(loadGrain([7, 4]));
console.log(loadGrain([]));

// function loadGrain(levels) {
//   let leftSide = levels[0];
//   let rightSide = levels[levels.length - 1];

//   let left = levels[1];
//   let right = levels.length - 2;
//   let totalGrain = 0;

//   while (left <= right) {
//     if (leftSide <= rightSide) {
//       leftSide = maxLeft > height[left] ? maxLeft : height[left];
//       totalGrain += leftSide - levels[left];
//       left += 1;
//     } else {
//       rightSide = Math.max(rightSide, levels[right]);
//       totalGrain += rightSide - levels[right];
//       right -= 1;
//     }
//     return totalGrain;
//   }
// }
// console.log('loadGrain', loadGrain(input1));
