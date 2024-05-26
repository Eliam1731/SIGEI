import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { windowActionsDevices } from "./actionsWindows.js";
import { checkboxStates } from "./main.js";
import { messageTableDevice } from "./messageTable.js";

let data;
let indexTable = 1;
const inputSearch = document.getElementById('inputSearchEquipment');
const buttonSearch = document.getElementById('buttonSearchEquipment');
let paragraphMessageIndex = document.getElementById('textIndexCurrent');
const deleteFiltersTable = document.getElementById('deleteFiltrosDevices');
const messageTable = document.getElementById('none-equipment');
const tableDevices = document.getElementById('renderDataEquipments'); //Tbody de la tabla de dispositivos
let devicesArray;
let devicesFilter = []; // Array que almacena los dispositivos filtrados
const filters = {
    disponible: 'Disponible',
    enResguardo: 'En Resguardo',
    enMantenimiento: 'En Mantenimiento',
    deBaja: 'De Baja',
}

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
        renderDevices(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

buttonSearch.addEventListener('click', async() => {
    const codeOpc = 'OPCIC-COM-';
    const search = inputSearch.value;

    if (search === '') {
        alert('Ingrese el codigo de equipo');
        return;
    }

    try {
        const response = await sendDataServer('../server/data/searcher_equipment.php', {
            opcicCode: `${codeOpc}${search}`
        });

        console.log('Response:', response);
        if (response.length === 0) {
            alert('No se encontro el equipo');
            return;
        }

        inputSearch.value = '';
 
        windowActionsDevices(response);
    } catch (error) {
        console.error('Error:', error);
    }

    console.log('Search');
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

        buttonActions.addEventListener('click', () => {
            const devicesID = buttonActions.getAttribute('data-id');
            const filterDevice = devicesArray.filter(device => device.idEquipo === Number(devicesID));

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
        if (indexTable === 1) {
            return;
        };

        indexTable--;
        const devicesToRender = devicesFilter.length > 0 ? devicesFilter : devicesArray;
        renderDevices(devicesToRender);
    }
});