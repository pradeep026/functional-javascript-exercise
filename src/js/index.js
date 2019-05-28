import { compose, pipe, filterByEq } from './utils';
const persons = require('../../assets/data/persons');
import '../../styles/style.css'

const outputEl = document.getElementById(`output`);
const outputEl1 = document.getElementById(`output1`) 

const printOutputToDOM = (el) => data => el.innerHTML = JSON.stringify(data);;

const filteredMen = (arr) => filterByEq(`gender`, 'Male', arr);
const filteredWomen = (arr) => filterByEq(`gender`, 'Female', arr);
const filteredSingles = (arr) => filterByEq(`married`, false, arr);
const filteredMarried = (arr) => filterByEq(`married`, true, arr);

//# Region function Composition - start//
const singleMen = pipe(filteredMen, filteredSingles);
const singleWomen = compose(filteredWomen, filteredSingles);
const marriedMen = compose(filteredMen, filteredMarried);
const marriedWomen = compose(filteredWomen, filteredMarried);
// Button Elements
const btnSingleMen = document.querySelector(`.btnSingleMen`);
const btnSingleWomen = document.querySelector(`.btnSingleWomen`);
const btnMarriedMen = document.querySelector(`.btnMarriedMen`);
const btnMarriedWomen = document.querySelector(`.btnMarriedWomen`);
// Add click event listeners for button action
btnSingleMen.addEventListener(`click`, () => {
    printOutputToDOM(outputEl)(singleMen(persons)); 
});

btnSingleWomen.addEventListener(`click`, () => {
    printOutputToDOM(outputEl)(singleWomen(persons)); 
});

btnMarriedMen.addEventListener(`click`, () => {
    printOutputToDOM(outputEl)(marriedMen(persons)); 
});

btnMarriedWomen.addEventListener(`click`, () => {
    printOutputToDOM(outputEl)(marriedWomen(persons)); 
});
//# Region function Composition - end//

//# Region Currying - start//
const isMarried = (value, arr) => filterByEq(`married`, value, arr);
const single = arr => isMarried(false, arr);
const married = arr => isMarried(true, arr);

const btnSingle = document.querySelector(`.btnSingle`);
const btnMarried = document.querySelector(`.btnMarried`);

btnSingle.addEventListener(`click`, () => {
    printOutputToDOM(outputEl1)(single(persons)); 
});

btnMarried.addEventListener(`click`, () => {
    printOutputToDOM(outputEl1)(married(persons)); 
});
//# Region Currying - end//