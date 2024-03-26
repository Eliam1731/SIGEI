import { companySystemsHTML, createCompanyDisabled } from "../content-html/companyHTML.js"
import { getDataFormCompany } from "./gettingData/companyGettingData.js";

const formsCompany = {
    Sistemas: companySystemsHTML,
    disabledSection: createCompanyDisabled,
}

const changeStyleItemsNav = ( liSelected, navElementsLi ) => {
    liSelected.classList.add('li-selected');

    navElementsLi.forEach( (elements, idx) => {
        const elementsNavLi = document.querySelectorAll(`#sectionCompany nav ul li`);
        const enableForm = document.getElementById(elements);

        if(elementsNavLi[idx] !== liSelected ) {
            elementsNavLi[idx].classList.remove('li-selected')
            enableForm.style.display = 'none';

            return;
        };

        enableForm.style.display = 'flex';
    });
}

const functionalitiesFormWork = () => {
    
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
        functionalitiesFormWork();

        return;
    }

    document.getElementById('root-forms').innerHTML = formsCompany.disabledSection;
}