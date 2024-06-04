import { dateInFormatText } from "../../utilities/textDate.js";
import { detailsLowDevice } from "./detailsLowDevice.js";

let indexTable = 0;
const itemsPerPage = 15; // Número de elementos por página
const buttonNext = document.getElementById('nextLowDevices');
const buttonPrevious = document.getElementById('prevLowDevices');
const root = document.getElementById('table-lowDevices'); 
let publicLowDevices = [];

buttonNext.addEventListener('click', () => {
    if (indexTable + itemsPerPage < publicLowDevices.length) {
        indexTable += itemsPerPage;
        renderTableOfLowDevices(publicLowDevices, root);
    }
});

buttonPrevious.addEventListener('click', () => {
    if (indexTable > 0) {
        indexTable -= itemsPerPage;
        renderTableOfLowDevices(publicLowDevices, root);
    }
});

export const renderTableOfLowDevices = (lowDevices, root) => {
    root.innerHTML = '';
    publicLowDevices = lowDevices;

    for(let i = indexTable; i < Math.min(indexTable + itemsPerPage, publicLowDevices.length); i++) {
        const device = publicLowDevices[i];
        const { codeOpc, modelo, numSerie, fechaBaja, subcategoria, marca } = device;
        const { nombre, primerApellido, segundoApellido } = device.usuarioBaja;

        const row = `
            <tr>
                <td>${ codeOpc }</td>
                <td>${ subcategoria } ${ marca } ${ modelo } ${ numSerie }</td>
                <td>${ nombre } ${ primerApellido } ${ segundoApellido }</td>
                <td>${ dateInFormatText( fechaBaja ) }</td>
                <td>
                    <button class='viewDetailsLowDevice'>Editar</button>
                </td>
            </tr>
        `;

        root.innerHTML += row;
    }

    const buttonsDetailsLow = document.getElementsByClassName('viewDetailsLowDevice');

    for(let i = 0; i < buttonsDetailsLow.length; i++) {
        buttonsDetailsLow[i].addEventListener('click', () => detailsLowDevice( publicLowDevices[indexTable + i] ) );
    }
}