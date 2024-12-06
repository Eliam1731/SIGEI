import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { companySystemsHTML, createCompanyDisabled } from "../content-html/companyHTML.js"
import { getDataFormCompany } from "./gettingData/companyGettingData.js";

const formsCompany = {
    Sistemas: companySystemsHTML,
    disabledSection: createCompanyDisabled,
}

const workIDs = [
    'nameWork',
    'shortNameWork',
    'numWork',
];

const regex = /^\s*$/;

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

const functionalitiesFormWork = async() => {
    const { company, forehead } = await getDataServer('../../server/data/business.php');
    const buttonNextSectionWork = document.getElementById('nextFormWork');
    const buttonReturnSectionWork = document.getElementById('returnSection-work');
    const secondSectionWork = document.querySelector('.second_div-work');
    const divGroupsForehead = document.getElementById('groupsForehead');
    const divGroupsCompany = document.getElementById('groupsCompany');
    const registerWork = document.getElementById('buttonCreateWork');

    company.forEach( element => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        const divDivisorForehead = document.createElement('div');

        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', element[0]);
        label.setAttribute('for', element[0]);
        divDivisorForehead.setAttribute('class', 'divDivisorForehead');

        checkbox.value = element[0];
        label.textContent = element[1];

        divDivisorForehead.append(checkbox, label);
        divGroupsCompany.append(divDivisorForehead)
    })

    forehead.forEach( element => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        const divDivisorForehead = document.createElement('div');

        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', element[0]);
        label.setAttribute('for', element[0]);
        divDivisorForehead.setAttribute('class', 'divDivisorForehead');

        checkbox.value = element[0];
        label.textContent = element[1];

        divDivisorForehead.append(checkbox, label);
        divGroupsForehead.append(divDivisorForehead)
    });

    buttonNextSectionWork.addEventListener('click', () => {
        secondSectionWork.style.right = '0';
        buttonReturnSectionWork.style.right = '3%'
    });

    buttonReturnSectionWork.addEventListener('click', () => {
        secondSectionWork.style.right = '200%';
        buttonReturnSectionWork.style.right = '200%'
    })

    registerWork.addEventListener('click', async() => {
        let state = true;
        const checkboxes = document.querySelectorAll('#groupsForehead .divDivisorForehead input[type="checkbox"]');
        const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
        const checkboxesCompany = document.querySelectorAll('#groupsCompany .divDivisorForehead input[type="checkbox"]');
        const selectedCheckboxesCompnay = Array.from(checkboxesCompany).filter(checkbox => checkbox.checked);
        let foreheadArr = [];
        let companyArr = [];

        const data = workIDs.reduce((acc, id) => {
            const input = document.getElementById(id);
            acc[id] = input.value;

            return acc;
        }, {});

        selectedCheckboxes.forEach(element => {
            foreheadArr.push(element.value);
        });

        selectedCheckboxesCompnay.forEach(element => {
            companyArr.push(element.value);
        })

        data.groupForeheads = foreheadArr;
        data.groupCompany = companyArr;

        for(let i = 0; i < workIDs.length; i++) {
            const input = document.getElementById(workIDs[i]);

            if(regex.test(input.value)) {
                alert('Ninguno de los campos puede estar vacío');
                state = false;
                return;
            }
        }

        if(companyArr.length === 0) {
            state = false;
            alert('Tiene que elegir mínimo una empresa.');
            return;
        }

        if(foreheadArr.length === 0) {
            state = false;
            alert('Tiene que elegir mínimo un frente');
            return;
        }

        if(state) {
            const response = await sendDataServer('../../server/insert/work.php', data);
           
            if(response.error) {
                alert(response.message);
                return
            }

            alert(response);

            secondSectionWork.style.right = '200%';
            buttonReturnSectionWork.style.right = '200%'

            workIDs.forEach( IDs => {
                const input = document.getElementById(IDs);
                input.value = '';
            });
        }

        selectedCheckboxesCompnay.forEach( input => {
            input.checked = false;
            companyArr = [];
        });

        selectedCheckboxes.forEach( input => {
            input.checked = false;
            foreheadArr = [];
        });
    })
}

const functionalitiesFormForehead = () => {
    const button = document.getElementById('buttonCreateForehead');

    button.addEventListener('click', async() => {
        const nameForehead = document.getElementById('nameForehead');
        const numberForehead = document.getElementById('numberForehead');
        const data = { nombre_frente: nameForehead.value, numero_frente: numberForehead.value }

        if(regex.test(data.nombre_frente) || regex.test(data.numero_frente)) {
            alert('Ninguno de los campos puede estar vacío');
            return;
        }

        if(isNaN(data.numero_frente)) {
            alert('El número de frente tiene que ser un número');
            return;
        }

        const response = await sendDataServer('../../server/insert/front.php', data);
        console.log(response);

        if(response.error) {
            alert(response.error);
            return;
        }

        alert(response.message);
        window.location.reload();
    });
}

const functionalitiesFormCompany = () => {
    const button = document.getElementById('buttonCreateCompany');
    const navElementsLi = ['formCompany', 'formWork', 'formForehead'];

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
        functionalitiesFormForehead();

        return;
    }

    document.getElementById('root-forms').innerHTML = formsCompany.disabledSection;
}