import { sendDataServer } from "../../utilities/sendDataServer.js";

const elementsSectionReturnEquipmentDOM = {
    inputCode: 'codeEquipmentReturn',
    buttonSearch: 'searchEquipmentReturn',
    paragraphName: 'employeeName-return',
    bodyTable: 'bodyTableReturnSafeguards',
    buttonReturnAuth: 'auth__button-return',
    buttonCancelReturn: 'cancel__button-return',
    buttonObservation: 'observation_button-return',
    textareaObservation: 'observation__auth-textarea-return',
}

const validateInput = /^\d{5}$/;
const codeOpcReturn = 'OPCIC-COM-';
const inputCodeEquipmentReturn = document.getElementById(elementsSectionReturnEquipmentDOM.inputCode);
const buttonSearchEquipmentReturn = document.getElementById(elementsSectionReturnEquipmentDOM.buttonSearch);
const bodyTableReturnSafeguards = document.getElementById(elementsSectionReturnEquipmentDOM.bodyTable);
const buttonReturnAuth = document.getElementById(elementsSectionReturnEquipmentDOM.buttonReturnAuth);
const buttonCancelReturnAuth = document.getElementById(elementsSectionReturnEquipmentDOM.buttonCancelReturn);
const buttonObservationReturn = document.getElementById(elementsSectionReturnEquipmentDOM.buttonObservation);
const textareaObservationReturn = document.getElementById(elementsSectionReturnEquipmentDOM.textareaObservation);
let employeCurrent;
let nameEmployeCurrent;
const devicesReturn = [];

const requestDeviceGuard  = async (id) => {
    if (!validateInput.test(id)) {
        alert('El código que usted esta colocando solo debe contener números, no debe tener espacios y exactamente 5 números!');
        return;
    }

    try {
        const response = await sendDataServer('../server/data/returnEquipmentSection.php', { id: `${codeOpcReturn}${id}` });
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

const cleanSectionReturnEquipment = () => {
    const paragraphName = document.getElementById(elementsSectionReturnEquipmentDOM.paragraphName);

    inputCodeEquipmentReturn.value = '';
    paragraphName.textContent = 'Aún no se ha seleccionado el equipo';
    bodyTableReturnSafeguards.innerHTML = '';
    employeCurrent = undefined;
    nameEmployeCurrent = '';
    devicesReturn.length = 0;
    textareaObservationReturn.value = '';
}

const renderNameEmployee = (name) => {
    const paragraphName = document.getElementById(elementsSectionReturnEquipmentDOM.paragraphName);
    paragraphName.textContent = name;
}

const renderDeviceGuard = ({codigo, subcategoria, marca, modelo, serie, equipo_id }) => {
    const tr = document.createElement('tr');
    tr.setAttribute('id', equipo_id);

    tr.innerHTML = `
        <td>${codigo}</td>
        <td>${subcategoria} ${marca} ${modelo} NS: ${serie}</td>
        <td>
            <button class="btn btn-danger">Devolver</button>
        </td>
    `;

    bodyTableReturnSafeguards.appendChild(tr);
    
}

buttonSearchEquipmentReturn.addEventListener('click', () => {
    const valueInputCode = inputCodeEquipmentReturn.value.trim();

    requestDeviceGuard(valueInputCode).then(( data ) => {
        if(data && employeCurrent === undefined) {
            employeCurrent = data.empleado.empleado_id;
            nameEmployeCurrent = data.empleado.nombreResguardante_completo;
        }

        if (employeCurrent !== data.empleado.empleado_id) {
            alert(`El empleado ${nameEmployeCurrent} no puede devolver el equipo de ${data.empleado.nombreResguardante_completo}!`);
            return;
        }

        if(devicesReturn.includes(data.equipo.equipo_id)) {
            alert(`El equipo con el código ${data.equipo.codigo} ya esta en la tabla.`);
            return;
        }

        devicesReturn.push(data.equipo.equipo_id);
        inputCodeEquipmentReturn.value = '';

        renderNameEmployee(data.empleado.nombreResguardante_completo);
        renderDeviceGuard(data.equipo);
    }).catch(( error ) => {
        console.error('Error:', error);
    });
});

buttonReturnAuth.addEventListener('click', () => {
    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;
    const data = {
        devices: [...devicesReturn],
        employee: employeCurrent,
        date: date,
        user: sessionStorage.getItem('email'),
        observation: textareaObservationReturn.value,
    }

    if(devicesReturn.length === 0) {
        alert('No hay equipos para devolver!');
        return;
    }

    console.log(data);
    cleanSectionReturnEquipment();
});

buttonCancelReturnAuth.addEventListener('click', () => cleanSectionReturnEquipment());

buttonObservationReturn.addEventListener('click', () => {
    if(textareaObservationReturn.classList.contains('textarea__hidden')) {
        textareaObservationReturn.style.bottom = '15%';
        buttonObservationReturn.textContent = 'Ocultar campo';
        textareaObservationReturn.classList.remove('textarea__hidden');

        return;
   }

   textareaObservationReturn.style.bottom = '200%';
   buttonObservationReturn.textContent = 'Añadir observaciones';
   textareaObservationReturn.classList.add('textarea__hidden');
});