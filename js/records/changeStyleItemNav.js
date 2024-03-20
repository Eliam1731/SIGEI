export const changeStyleItemNav = ( itemSelected, parentItemsLi, allCircleBackground ) => {
    const itemSelectedCircle = document.querySelector(`#parentItemsLi #${itemSelected.getAttribute('id')} .circle-background`);
    const allItemsLi = Array.from(parentItemsLi.children).filter(element => element.nodeName === 'LI');

    allItemsLi.forEach((item, index) => {
        if(item !== itemSelected) item.classList.remove('li-selected');
        if(allCircleBackground[index] !== itemSelectedCircle) allCircleBackground[index].classList.remove('circle-background__selected');
    });

    itemSelected.classList.add('li-selected');
    itemSelectedCircle.classList.add('circle-background__selected');
}