import { getDataServer } from "../../utilities/getDataServer.js";
import { employeeMachineryHTML, employeeStoreHTML, employeeSystemsHTML } from "../content-html/employeeHTML.js"

const formEmployee = {
    Sistemas: employeeSystemsHTML,
    Almacen: employeeStoreHTML,
    Maquinaria: employeeMachineryHTML,
}

const elementsDOM = {
    formEmployee: 'form_employee',
}

const inputsIDs = [
    'nameEmployee',
    'firstSurname',
    'secondSurname',
    'numberSocial',
    'companyBelongs',
    'workBelongs',
    'forehead_belongs',
    'email',
];

const insertingDataSelect = async(selectCompany, selectWork, selectForehead) => {
    const data = await getDataServer('../server/data/business.php')

    data.company.forEach( company => {
        const option = document.createElement('option');

        option.value = company[0];
        option.textContent = company[1];

        selectCompany.appendChild(option);
    });

    data.forehead.forEach( forehead => {
        const option = document.createElement('option');

        option.value = forehead[0];
        option.textContent = forehead[1];

        selectForehead.appendChild(option);
    });

    data.work.forEach ( work => {
        const option = document.createElement('option');

        option.value = work[0];
        option.textContent = work[1];

        selectWork.appendChild(option);
    });
}

const cleanInputs = () => {
    inputsIDs.forEach( id => {
        const input = document.getElementById(id);
        input.value = '';
    });
}

const functionalitiesFormSystem = () => {
    const form = document.getElementById( elementsDOM.formEmployee );
    const selectCompany = document.getElementById('companyBelongs');
    const selectWork = document.getElementById('workBelongs');
    const selectForehead = document.getElementById('forehead_belongs');

    insertingDataSelect(selectCompany, selectWork, selectForehead);

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            const response = await fetch('../server/insert/employee.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if(data.error) {
                alert(data.message);
                return;
            }

            if(data) {
                cleanInputs();
                alert(data.message);

                return;
            }
        } catch(error) {
            console.log(error);
        }
    });
}

export const formRegisterEmployee = ( forehead ) => {
    document.getElementById('root-forms').innerHTML = formEmployee[forehead];
    functionalitiesFormSystem();
}