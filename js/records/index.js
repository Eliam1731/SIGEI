import { changeStyleItemNav } from "./changeStyleItemNav.js";
import { renderComponents } from "./renderComponents.js";

const elementsDOM = {
    parentNavUl: 'parentItemsLi', 
    firstItemNav: 'firstItemNav',
    secondItemNav: 'secondItemNav',
    thirdItemNav: 'thirdItemNav',
    fourthItemNav: 'fourthItemNav',
    sectionRoot: 'root-forms',
}

const parentItemsLi = document.getElementById(elementsDOM.parentNavUl);
const firstItemNavLi = document.getElementById(elementsDOM.firstItemNav);
const secondItemNavLi = document.getElementById(elementsDOM.secondItemNav);
const thirdItemNavLi = document.getElementById(elementsDOM.thirdItemNav);
const fourthItemNavLi = document.getElementById(elementsDOM.fourthItemNav);
const sectionRootForms = document.getElementById(elementsDOM.sectionRoot);
const allCircleBackground = document.querySelectorAll(`#${elementsDOM.parentNavUl} li .circle-background`);

document.addEventListener('DOMContentLoaded', () => {
    changeStyleItemNav( firstItemNavLi, parentItemsLi, allCircleBackground );
    renderComponents(firstItemNavLi);
})

firstItemNavLi.addEventListener('click', () => {
    changeStyleItemNav( firstItemNavLi, parentItemsLi, allCircleBackground );
    renderComponents( firstItemNavLi );
});

secondItemNavLi.addEventListener('click', () => {
    changeStyleItemNav( secondItemNavLi, parentItemsLi, allCircleBackground );
    renderComponents( secondItemNavLi );
});

thirdItemNavLi.addEventListener('click', () => {
    changeStyleItemNav( thirdItemNavLi, parentItemsLi, allCircleBackground );
    renderComponents( thirdItemNavLi );
});

fourthItemNavLi.addEventListener('click', () => {
    changeStyleItemNav( fourthItemNavLi, parentItemsLi, allCircleBackground );
    renderComponents( fourthItemNavLi );
});