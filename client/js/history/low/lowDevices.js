// js/safeguards/lowDevices.js
import { dateInFormatText } from "../../utilities/textDate.js";
import { detailsLowDevice } from "./detailsLowDevice.js";

let indexTable = 0;
const itemsPerPage = 15;
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

export const renderTableOfLowDevices = (lowDevices, rootElem) => {
  rootElem.innerHTML = '';
  publicLowDevices = lowDevices;

  for (let i = indexTable; i < Math.min(indexTable + itemsPerPage, publicLowDevices.length); i++) {
    const device = publicLowDevices[i];
    const { codeOpc, modelo, numSerie, fechaBaja, subcategoria, marca } = device;
    const { nombre, primerApellido, segundoApellido } = device.usuarioBaja;

    // formatea fechaBaja antes de incrustar
    const fechaFormateada = fechaBaja && fechaBaja !== '0000-00-00'
      ? dateInFormatText(fechaBaja)
      : 'Sin fecha';

    const row = `
      <tr>
        <td>${codeOpc}</td>
        <td>${subcategoria} ${marca} ${modelo} ${numSerie}</td>
        <td>${nombre} ${primerApellido} ${segundoApellido}</td>
        <td>${fechaFormateada}</td>
        <td><button class="viewDetailsLowDevice">Editar</button></td>
      </tr>
    `;
    rootElem.innerHTML += row;
  }

  const buttonsDetails = rootElem.getElementsByClassName('viewDetailsLowDevice');
  for (let j = 0; j < buttonsDetails.length; j++) {
    buttonsDetails[j].addEventListener('click', () => {
      detailsLowDevice(publicLowDevices[indexTable + j]);
    });
  }
};
