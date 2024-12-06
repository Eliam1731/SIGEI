import { sendDataServer } from "../../../utilities/sendDataServer.js";

const elementsFormCompany = [
    'nameCompany',
    'shortName',
];

const message = {
    nameCompany: 'El campo de Nombre de la empresa no puede estar vacío.',
    shortName: 'El campo de Nombre corto de la empresa no puede estar vacío.',
}

const notStringEmpty = /^\s*$/;

const cleanValueInputs = ( object ) => {
    for(let key in object) {
        const input = document.getElementById(key);
        input.value = '';
    }
}

const validateData = ( object ) => {
    for(let key in object) {
        if(notStringEmpty.test(object[key])) {
            alert(message[key]);

            return false;
        }
    }

    return true;
}

export const getDataFormCompany = async() => {
    const objectValueInputs = elementsFormCompany.reduce((acc, id) => {
        const input = document.getElementById(id);
        acc[id] = input.value.trim();

        return acc;
    }, {});

    const resultOfValidation = validateData( objectValueInputs );

    if(resultOfValidation) {
        try {
            const response = await sendDataServer('../../server/insert/company.php', objectValueInputs);
            if(response.error) {
                alert(response.message);
                return
            }
            alert(response);
            cleanValueInputs(objectValueInputs);
        } catch(error) {
            console.error(error);
        }
    }
}