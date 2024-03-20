import { companySystemsHTML, createCompanyDisabled } from "../content-html/companyHTML.js"
import { getDataFormCompany } from "./gettingData/companyGettingData.js";

/* Las secciones de crear cuenta y nuevas obras solo estarán disponibles para el departamento de sistemas  */

const formsCompany = {
    Sistemas: companySystemsHTML,
    disabledSection: createCompanyDisabled,
}

const changeStyleItemsNav = ( liSelected, navElementsLi ) => {
    liSelected.classList.add('li-selected');

    navElementsLi.forEach( (elements, idx) => {
        const elementsNavLi = document.querySelectorAll(`#sectionCompany nav ul li`);
        if(elementsNavLi[idx] !== liSelected ) elementsNavLi[idx].classList.remove('li-selected');
    });
}

const functionalitiesFormCompany = () => {
    const button = document.getElementById('buttonCreateCompany');
    const navElementsLi = ['formCompany', 'formWork'];

    button.addEventListener('click', getDataFormCompany);
    navElementsLi.forEach( elements => {
        const li = document.querySelector(`.${elements}`);

        li.addEventListener('click', () => changeStyleItemsNav( li, navElementsLi ));
    });
}

export const formCreateCompany = ( forehead ) => {
    if( forehead === 'Sistemas' ) {
        document.getElementById('root-forms').innerHTML = formsCompany[forehead];
        functionalitiesFormCompany();

        return;
    }

    document.getElementById('root-forms').innerHTML = formsCompany.disabledSection;
}