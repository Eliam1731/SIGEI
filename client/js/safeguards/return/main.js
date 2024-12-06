import { sendDataServer } from "../../utilities/sendDataServer.js";
import { windowDeviceInformation } from "./windowInformation.js";

const elementsSectionReturnEquipmentDOM = {
    inputCode: 'codeEquipmentReturn',
    buttonSearch: 'searchEquipmentReturn',
    paragraphName: 'employeeName-return',
    paragraphDate: 'dateSafeguard-return',
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
let employeeCurrent;
let nameEmployeeCurrent;
const devicesReturn = [];
const checkboxSearchPhoneReturn = document.getElementById('searchNumberReturn');
const spanCodeOpcReturn = document.getElementById('spanCodeOpcReturn');
const numberValid = /^\d{10}$/;
const paragraphDateReturn = document.getElementById( elementsSectionReturnEquipmentDOM.paragraphDate );

const dateInFormatText = ( dateString ) => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let [ year, day, month ] = dateString.split('-'); 
    let date = new Date(year, month - 1, day);

    day = date.getDate();
    month = months[date.getMonth()];
    year = date.getFullYear();

    return `${day} de ${month} del ${year}`;
}

checkboxSearchPhoneReturn.addEventListener('change', () => {
    if(checkboxSearchPhoneReturn.checked) {
        inputCodeEquipmentReturn.setAttribute('placeholder', 'Ejemplo: 9212735701');
        spanCodeOpcReturn.textContent = '+52';

        return;
    }

    inputCodeEquipmentReturn.setAttribute('placeholder', 'Ejemplo: 00012');
    spanCodeOpcReturn.textContent = codeOpcReturn;
});

const requestDeviceGuard  = async (id) => {
    if(numberValid.test(id)) {
        try {
            const response = await sendDataServer("../../server/data/returnEquipmentSection_num.php", { num_telefono: id });

            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (!validateInput.test(id)) {
        alert('El código que usted esta colocando solo debe contener números, no debe tener espacios y exactamente 5 números!');
        return;
    }

    try {
        const response = await sendDataServer('../../server/data/returnEquipmentSection.php', { id: `${codeOpcReturn}${id}` });
     
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

const cleanSectionReturnEquipment = () => {
    const paragraphName = document.getElementById(elementsSectionReturnEquipmentDOM.paragraphName);

    inputCodeEquipmentReturn.value = '';
    paragraphName.textContent = 'Aún no se ha seleccionado el equipo';
    paragraphDateReturn.textContent = 'Aún no se ha seleccionado el equipo';
    bodyTableReturnSafeguards.innerHTML = '';
    employeeCurrent = undefined;
    nameEmployeeCurrent = '';
    devicesReturn.length = 0;
    textareaObservationReturn.value = '';
}

const renderNameEmployee = (name, date) => {
    const paragraphName = document.getElementById(elementsSectionReturnEquipmentDOM.paragraphName);
    paragraphName.textContent = name;

    console.log(date)
    paragraphDateReturn.textContent = dateInFormatText( date );
}

const renderDeviceGuard = (data) => {
    const {codigo, subcategoria, marca, modelo, serie, equipo_id } = data;
    const tr = document.createElement('tr');
    tr.setAttribute('id', equipo_id);

    tr.innerHTML = `
        <td>${codigo}</td>
        <td>${subcategoria} ${marca} ${modelo} NS: ${serie}</td>
        <td>
            <button' class="btn btn-danger">Detalles</button>
        </td>
    `;

    bodyTableReturnSafeguards.appendChild(tr);
    const button = tr.querySelector('.btn-danger');
    
    button.addEventListener('click', () => {windowDeviceInformation(data);});
}

const validateGuardReturn = ( data ) => {
    if(data.status === 'error') {
        alert(data.message);
        return;
    }

    if(data && employeeCurrent === undefined) {
        employeeCurrent = data.empleado.empleado_id;
        nameEmployeeCurrent = data.empleado.nombreResguardante_completo;
    }

    if (employeeCurrent !== data.empleado.empleado_id) {
        alert(`El empleado ${nameEmployeeCurrent} no puede devolver el equipo de ${data.empleado.nombreResguardante_completo}!`);
        return;
    }

    if(devicesReturn.includes(data.equipo.equipo_id)) {
        alert(`El equipo con el código ${data.equipo.codigo} ya esta en la tabla.`);
        return;
    }

    devicesReturn.push(data.equipo.equipo_id);
    inputCodeEquipmentReturn.value = '';

    renderNameEmployee(data.empleado.nombreResguardante_completo, data.fechaAutorizacion);
    renderDeviceGuard(data.equipo);
}

buttonSearchEquipmentReturn.addEventListener('click', () => {
    const valueInputCode = inputCodeEquipmentReturn.value.trim();

    if(checkboxSearchPhoneReturn.checked) {
        if (!numberValid.test(valueInputCode)) {
            alert('El número de teléfono debe tener 10 dígitos.');
            return;
        }

        requestDeviceGuard(valueInputCode).then(( data ) => {
            validateGuardReturn(data);
        }).catch(( error ) => {
            console.error('Error:', error);
        });

        return;
    }

    requestDeviceGuard(valueInputCode).then(( data ) => {
       validateGuardReturn(data);
    }).catch(( error ) => {
        console.error('Error:', error);
    });
});

buttonReturnAuth.addEventListener('click', async() => {
    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;
    const data = {
        devices: [...devicesReturn],
        employee: employeeCurrent,
        date: date,
        user: sessionStorage.getItem('email'),
        observation: textareaObservationReturn.value,
    }

    if(devicesReturn.length === 0) {
        alert('No hay equipos para devolver!');
        return;
    }

    try {
        const response = await sendDataServer('../../server/insert/return.php', data);
        if(response) {
            alert('Los equipos se han devuelto correctamente!');
            cleanSectionReturnEquipment();
        }
    } catch (error) {
        console.error('Error:', error);
    }
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
