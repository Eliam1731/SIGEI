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
    'observationEmployee',
];

const cleanInputs = () => {
    inputsIDs.forEach( id => {
        const input = document.getElementById(id);
        input.value = '';
    });
}

const functionalitiesFormSystem = () => {
    const form = document.getElementById( elementsDOM.formEmployee );

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            const response = await fetch('../server/insert/employee.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            if(data) {
                cleanInputs();
                alert(data);

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