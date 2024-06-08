import { windowDetailsDevice } from "./windowDetails.js";

const countWorks = (work) => { return Object.keys(work).length }

const countFronts = (work) => {
    return Object.keys(work).reduce((count, key) => {
        return count + Object.keys(work[key].frentes).length;
    }, 0);
}

const countEmployees = (work) => {
    return Object.values(work).reduce((count, currentWork) => {
        return count + Object.values(currentWork.frentes).reduce((countFrentes, currentFrente) => {
            return countFrentes + Object.keys(currentFrente.empleados).length;
        }, 0);
    }, 0);
}

const countEquipments = (work) => {
    return Object.values(work).reduce((count, currentWork) => {
        return count + Object.values(currentWork.frentes).reduce((countFrentes, currentFrente) => {
            return countFrentes + Object.values(currentFrente.empleados).reduce((countEmployees, currentEmployee) => {
                return countEmployees + Object.keys(currentEmployee.equipos).length;
            }, 0);
        }, 0);
    }, 0);
}

const cardCompany = ( name, data, root, work ) => {
    const rootCard = document.createElement('div');
    const firstCard = document.createElement('div');
    const secondCard = document.createElement('div');
    const thirdCard = document.createElement('div');
    const fourthCard = document.createElement('div');
    const fifthCard = document.createElement('div');
    const htmlFirstCard = `<h4>Nombre de la empresa</h4> <p>${name}</p>`;
    const htmlSecondCard = `<h4>Cantidad de obras</h4> <p>${ countWorks(data.obras) }</p>`;
    const htmlThirdCard = `<h4>Cantidad de frentes</h4> <p>${ countFronts(data.obras) }</p>`;
    const htmlFourthCard = `<h4>Cantidad de empleados</h4> <p>${ countEmployees(data.obras) }</p>`;
    const htmlFifthCard = `<h4>Cantidad de equipos</h4> <p>${ countEquipments( data.obras ) }</p>`;

    rootCard.classList.add('card-follow-up');
    firstCard.innerHTML = htmlFirstCard;
    secondCard.innerHTML = htmlSecondCard;
    thirdCard.innerHTML = htmlThirdCard;
    fourthCard.innerHTML = htmlFourthCard;
    fifthCard.innerHTML = htmlFifthCard;
    
    root.appendChild(rootCard);
    rootCard.append(firstCard, secondCard, thirdCard, fourthCard, fifthCard);

    rootCard.addEventListener('click', () => windowDetailsDevice( data ));
}

//Root es el contenedor padre de cada tarjeta
export const renderFollowUp = ( data, root ) => {
    for( let key in data) {
        if(data.hasOwnProperty(key)) {
            cardCompany( key, data[key], root);
        }
    }
}