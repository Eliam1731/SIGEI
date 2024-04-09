import { getDataServer } from "../../utilities/getDataServer.js";

let data;
//Renderizar maximo 10 elementos por indexTable
let indexTable = 1;
const prevIndexTableDevices = document.getElementById('prevIndexButton');
const nextIndexTableDevices = document.getElementById('nextIndexButton');
const messageTable = document.getElementById('none-equipment');
const tableDevices = document.getElementById('renderDataEquipments');
const filters = {
    disponible: 'disponible',
    enResguardo: 'enResguardo',
    enMantenimiento: 'enMantenimiento',
    deBaja: 'deBaja',
}

document.addEventListener('DOMContentLoaded', async() => {  
   try {
       data = await getDataServer('../server/data/equipmentvisualization.php');
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

        tr.setAttribute('id', idEquipo);
        tr.setAttribute('class', 'table-row');
        buttonActions.textContent = 'Acciones';
        buttonActions.setAttribute('data-id', idEquipo);

        tr.innerHTML = `
            <td>${codeOpc}</td>
            <td>${subcategoria} ${marca} ${modelo} ${numSerie}</td>
            <td>${status}</td>
            <td id='columnActionsDevices'></td>
        `;
        
        tr.querySelector('#columnActionsDevices').appendChild(buttonActions);
        tableDevices.appendChild(tr);
    });
}

nextIndexTableDevices.addEventListener('click', () => {
    indexTable++;
    renderDevices(data);
});