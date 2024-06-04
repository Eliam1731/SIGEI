import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { windowActionsDevices } from "./actionsWindows.js";
import { checkboxStates } from "./main.js";
import { messageTableDevice } from "./messageTable.js";

let data;
let indexTable = 1;
const buttonSearch = document.getElementById('buttonSearchEquipment');
const deleteFiltersTable = document.getElementById('deleteFiltrosDevices');
const tableDevices = document.getElementById('renderDataEquipments');
let devicesArray;
let devicesFilter = []; 
const filters = {
    disponible: 'Disponible',
    enResguardo: 'En Resguardo',
    enMantenimiento: 'En Mantenimiento',
    deBaja: 'De Baja',
}
const codeOpc = 'OPCIC-COM-';
const inputSearch = document.getElementById('inputSearchEquipment');
const spanCodeOpc = document.getElementById('spanCodeOpc');
const checkboxSearchPhone = document.getElementById('searchNumberReturn');
const numberValid = /^\d{10}$/;
const formatCode = /^\d{5}$/;

checkboxSearchPhone.addEventListener('change', () => {
    if (checkboxSearchPhone.checked) {
        spanCodeOpc.textContent = '+52';
        inputSearch.placeholder = 'Ejemplo: 9212039080';

        return;
    }

    spanCodeOpc.textContent = codeOpc;
    inputSearch.placeholder = 'Ejemplo: 00090';
});

deleteFiltersTable.addEventListener('click', () => {
    devicesFilter = [];

    checkboxStates.available = false;
    checkboxStates.inResguardo = false;
    checkboxStates.inMaintenance = false;

    const checkboxAvailable = document.getElementById('disponible');
    const checkboxInResguardo = document.getElementById('enResguardo');
    const checkboxInMaintenance = document.getElementById('enMantenimiento');

    if (checkboxAvailable) checkboxAvailable.checked = false;
    if (checkboxInResguardo) checkboxInResguardo.checked = false;
    if (checkboxInMaintenance) checkboxInMaintenance.checked = false;

    indexTable = 1;
    renderDevices(devicesArray);
});

export const checkboxAvailableEvent = (checkboxAvailable) => {
    checkboxStates.available = checkboxAvailable.checked;
    
    updateDevicesFilter();
    messageTableDevice( tableDevices, devicesFilter, checkboxStates );
}

export const checkboxInResguardoEvent = (checkboxInResguardo) => {
    checkboxStates.inResguardo = checkboxInResguardo.checked;

    updateDevicesFilter();
    messageTableDevice( tableDevices, devicesFilter, checkboxStates );
}

export const checkboxInMaintenanceEvent = (checkboxInMaintenance) => {
    checkboxStates.inMaintenance = checkboxInMaintenance.checked;

    updateDevicesFilter();
    messageTableDevice( tableDevices, devicesFilter, checkboxStates );
}

export const updateDevicesFilter = () => {
    if (!checkboxStates.available && !checkboxStates.inResguardo && !checkboxStates.inMaintenance) {
        devicesFilter = [];
    } else {
        devicesFilter = devicesArray.filter(device => {
            if (checkboxStates.available && device.status.toLowerCase() === filters.disponible.toLowerCase()) {
                return true;
            }
            if (checkboxStates.inResguardo && device.status.toLowerCase() === filters.enResguardo.toLowerCase()) {
                return true;
            }
            if (checkboxStates.inMaintenance && device.status.toLowerCase() === filters.enMantenimiento.toLowerCase()) {
                return true;
            }
            return false;
        });
    }

    indexTable = 1;
    renderDevices(devicesFilter.length > 0 ? devicesFilter : devicesArray);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        data = await getDataServer('../server/data/equipmentvisualization.php');
        devicesArray = Object.values(data).flat();

        console.log(devicesArray);
        renderDevices(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

buttonSearch.addEventListener('click', async() => {
    const search = inputSearch.value;

    if(checkboxSearchPhone.checked) {
        if (!numberValid.test(search))  return alert('Ingrese un número de teléfono valido');

        try {
            const response = await sendDataServer('../server/data/seacher_equipment_num.php', { num_telefono: search });

            if(response.length === 0) return alert('No se encontro el equipo.');

            inputSearch.value = '';
            windowActionsDevices(response);
        } catch (error) {
            console.error('Error:', error);
        }

        return;
    }

    if (!formatCode.test(search)) return alert('El código que usted esta colocando solo debe contener números, no debe tener espacios y exactamente 5 números.');
    
    try {
        const response = await sendDataServer('../server/data/searcher_equipment.php', { opcicCode: `${codeOpc}${search}` });

        if (response.length === 0) return alert('No se encontro el equipo');

        inputSearch.value = '';
        windowActionsDevices(response);
    } catch (error) {
        console.error('Error:', error);
    }
});

export const renderDevices = (devices) => {
    tableDevices.innerHTML = '';

    const devicesArray = Object.values(devices).flat();
    const start = (indexTable - 1) * 8;
    const end = indexTable * 8;
    const slicedDevices = devicesArray.slice(start, end);

    slicedDevices.forEach(device => {
        const { codeOpc, subcategoria, marca, modelo, numSerie, status, idEquipo } = device;
        let className = status === 'Disponible' ? 'active-devices' : 'not-available__devices';
        const tr = document.createElement('tr');
        const buttonActions = document.createElement('button');
        const paragraphButton = document.createElement('p');
        paragraphButton.textContent = 'Editar';

        tr.setAttribute('id', idEquipo);
        tr.setAttribute('class', 'table-row');
        buttonActions.append(paragraphButton);
        buttonActions.setAttribute('data-id', idEquipo);

        tr.innerHTML = `
        <td>${codeOpc}</td>
        <td>${subcategoria} ${marca} ${modelo} ${numSerie}</td>
        <td>
            <div class="background-paragraph ${className}">${status}</div>
        </td>
        <td id='columnActionsDevices'></td>
    `;

        tr.querySelector('#columnActionsDevices').appendChild(buttonActions);
        tableDevices.appendChild(tr);

        function switchType(value) {
            if (typeof value === 'string') {
                return Number(value);
            } else if (typeof value === 'number') {
                return String(value);
            } else {
                return value; 
            }
        }

        buttonActions.addEventListener('click', () => {
            const devicesID = buttonActions.getAttribute('data-id');
            const transformingNumber = switchType(devicesID);
            const filterDevice = devicesArray.filter(device => device.idEquipo === transformingNumber);

            console.log(devicesArray);
            console.log(filterDevice);

            windowActionsDevices(filterDevice);
        })
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        const devicesToRender = devicesFilter.length > 0 ? devicesFilter : devicesArray;
        if (indexTable === Math.ceil(devicesToRender.length / 8)) return;

        indexTable++;
        renderDevices(devicesToRender);
    }

    if (event.key === 'ArrowLeft') {
        if (indexTable === 1) return;

        indexTable--;
        const devicesToRender = devicesFilter.length > 0 ? devicesFilter : devicesArray;
        renderDevices(devicesToRender);
    }
});