import { getDataServer } from "../../utilities/getDataServer.js";
import { windowActionsDevices } from "./actionsWindows.js";
import { checkboxStates } from "./main.js";

let data;
let indexTable = 1;
const prevIndexTableDevices = document.getElementById('prevIndexButton');
const nextIndexTableDevices = document.getElementById('nextIndexButton');
let paragraphMessageIndex = document.getElementById('textIndexCurrent');
const deleteFiltersTable = document.getElementById('deleteFiltrosDevices');
const messageTable = document.getElementById('none-equipment');
const tableDevices = document.getElementById('renderDataEquipments');
let devicesArray;
let devicesFilter = [];
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
    paragraphMessageIndex.textContent = indexTable;
    renderDevices(devicesArray);
});

export const checkboxAvailableEvent = ( checkboxAvailable ) => {
    devicesFilter = devicesFilter.filter(device => device.status !== filters.disponible);

    if (checkboxAvailable.checked) {
        const newDevices = devicesArray.filter(device => device.status === filters.disponible);
        devicesFilter = [...devicesFilter, ...newDevices];
    }
    
    indexTable = 1;
    paragraphMessageIndex.textContent = indexTable;

    if (devicesFilter.length === 0) {
        renderDevices(devicesArray);
    } else {
        renderDevices(devicesFilter);
    }
}

export const checkboxInResguardoEvent = ( checkboxInResguardo ) => {
    devicesFilter = devicesFilter.filter(device => device.status !== filters.enResguardo);

    if (checkboxInResguardo.checked) {
        const newDevices = devicesArray.filter(device => device.status === filters.enResguardo);
        devicesFilter = [...devicesFilter, ...newDevices];
    }
    
    indexTable = 1; 
    paragraphMessageIndex.textContent = indexTable;

    if (devicesFilter.length === 0) {
        renderDevices(devicesArray);
    } else {
        renderDevices(devicesFilter);
    }
}

export const checkboxInMaintenanceEvent = ( checkboxInMaintenance ) => {
    devicesFilter = devicesFilter.filter(device => device.status !== filters.enMantenimiento);

    if (checkboxInMaintenance.checked) {
        const newDevices = devicesArray.filter(device => device.status === filters.enMantenimiento);
        devicesFilter = [...devicesFilter, ...newDevices];
    }
    
    indexTable = 1;
    paragraphMessageIndex.textContent = indexTable;

    if (devicesFilter.length === 0) {
        renderDevices(devicesArray);
    } else {
        renderDevices(devicesFilter);
    }
}

document.addEventListener('DOMContentLoaded', async() => {  
   try {
       data = await getDataServer('../server/data/equipmentvisualization.php');

       devicesArray = Object.values(data).flat();
       renderDevices(data);
   } catch(error) { 
       console.error('Error:', error);
   }
});

export const renderDevices = (devices) => {
    tableDevices.innerHTML = '';

    const devicesArray = Object.values(devices).flat();

    const start = (indexTable - 1) * 6;
    const end = indexTable * 6;

    const slicedDevices = devicesArray.slice(start, end);

    slicedDevices.forEach(device => {
        const { codeOpc, subcategoria, marca, modelo, numSerie, status, idEquipo } = device;
        const tr = document.createElement('tr');
        const buttonActions = document.createElement('button');
        const paragraphButton = document.createElement('p');
        paragraphButton.textContent = '. . .';

        tr.setAttribute('id', idEquipo);
        tr.setAttribute('class', 'table-row');
        buttonActions.append(paragraphButton);
        buttonActions.setAttribute('data-id', idEquipo);

        tr.innerHTML = `
            <td>${codeOpc}</td>
            <td>${subcategoria} ${marca} ${modelo} ${numSerie}</td>
            <td>${status}</td>
            <td id='columnActionsDevices'></td>
        `;
        
        tr.querySelector('#columnActionsDevices').appendChild(buttonActions);
        tableDevices.appendChild(tr);

        buttonActions.addEventListener('click', () => {
            const devicesID = buttonActions.getAttribute('data-id');
            const filterDevice = devicesArray.filter(device => device.idEquipo === Number(devicesID));
            
            windowActionsDevices(filterDevice);
            console.log('ID:', idEquipo);
        })
    });
}

nextIndexTableDevices.addEventListener('click', () => {
    const devicesToRender = devicesFilter.length > 0 ? devicesFilter : devicesArray;
    if(indexTable === Math.ceil(devicesToRender.length / 6)) return;
    paragraphMessageIndex.textContent = indexTable + 1;

    indexTable++;
    renderDevices(devicesToRender);
});

prevIndexTableDevices.addEventListener('click', () => {
    if(indexTable === 1) {
        return;
    };
    paragraphMessageIndex.textContent = indexTable - 1;

    indexTable--;
    const devicesToRender = devicesFilter.length > 0 ? devicesFilter : devicesArray;
    renderDevices(devicesToRender);
});