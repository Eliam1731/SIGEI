import { generateReportSafeguards } from "./generateReport.js";

const bodyTable = document.getElementById('bodyTableAuthSafeguards');
const cancelButton = document.getElementById('cancel__button');
const selectCompanyClean = document.getElementById('companyBelongsEmployee')
const textareaAuthObservation = document.getElementById('observation__auth-textarea');
const buttonAuth = document.getElementById('auth__button');
let equipmentIDs = [];

const cleanSectionAuth = () => {
    equipmentIDs = [];

    bodyTable.innerHTML = '';
    textareaAuthObservation.value = '';
    selectCompanyClean.selectedIndex = 0;
}

cancelButton.addEventListener('click', () => cleanSectionAuth());

const renderTableAllData = (equipment) => {
  const {
    codeOpc: code,
    comentarios,
    direccionMacEthernet: ethernet,
    direccionMacWifi: wifi,
    especificacion,
    fechaCompra,
    fechaGarantia,
    idEquipo: id,
    images,
    importe,
    invoices,
    marca,
    modelo,
    numSerie,
    referenciaCompaq: referenciaCompra,
    serviceTag,
    status,
    subcategoria,
  } = equipment;
};

const deleteItemTable = ( elementHTMl, parentDiv ) => {
    const itemDeleteID = elementHTMl.getAttribute('class');
    const itemDeleteHTML = document.getElementById(itemDeleteID);

    itemDeleteHTML.remove();
    equipmentIDs = equipmentIDs.filter( item => item !== parseInt(itemDeleteID));
    parentDiv.remove();
}

const modalActions = ( equipment, buttonActions) => {
    const parentDiv = document.createElement('div');
    const containerItemsModal = document.createElement('div');
    const containerTitle = document.createElement('div');
    const title = document.createElement('p');
    const containerButtons = document.createElement('div');
    const buttonDetails = document.createElement('button');
    const buttonDelete = document.createElement('button');

    parentDiv.setAttribute('class', 'divParent__modal');
    containerItemsModal.setAttribute('class', 'containerItems__modal')
    containerTitle.setAttribute('class', 'containerTitle__modal')
    title.textContent = 'Elija la acción que desea realizar';
    buttonDetails.textContent = 'Más detalles del equipo.';
    buttonDelete.textContent = 'Eliminar de esta tabla.';

    parentDiv.addEventListener('click', () => parentDiv.remove());
    containerItemsModal.addEventListener('click', (event) => event.stopPropagation());
    buttonDelete.addEventListener('click', () => deleteItemTable(buttonActions, parentDiv));

    containerTitle.append(title);
    containerButtons.append(buttonDelete, buttonDetails)
    containerItemsModal.append(containerTitle, containerButtons);
    parentDiv.append(containerItemsModal);
    document.body.appendChild(parentDiv);
}

export const renderingEquipmentInTable = (equipment) => {
  const {
    codeOpc: code,
    idEquipo: id,
    marca,
    modelo,
    numSerie,
    subcategoria,
  } = equipment;

  if (equipmentIDs.includes(id)) {
    alert(`El equipo con el codigo ${code} ya esta en la tabla.`);
    return;
  }

  equipmentIDs.push(id);
  console.log(equipmentIDs, 'Array que se mandara al server');

  const tr = document.createElement("tr");
  const columnCodeOpc = document.createElement("td");
  const columnEquipment = document.createElement("td");
  const columnActions = document.createElement("td");
  const buttonActions = document.createElement("button");

  tr.setAttribute("id", id);
  buttonActions.setAttribute("class", id);
  columnCodeOpc.textContent = code;
  columnEquipment.textContent = `${subcategoria} ${marca} ${modelo} ${numSerie}`;
  buttonActions.textContent = "Acciones";

  buttonActions.addEventListener('click', () => modalActions(equipment, buttonActions));

  columnActions.append(buttonActions);
  tr.append(columnCodeOpc, columnEquipment, columnActions);
  bodyTable.appendChild(tr);
};

buttonAuth.addEventListener('click', () => {
  const work = '8004';
  const amount = '1 Pza';
  const code = ['OPCIC-COM-00010', 'OPCIC-COM-00020', 'OPCIC-COM-00030', 'OPCIC-COM-00040', 'OPCIC-COM-00050'];
  const description = ['Laptop Huawei BoDE-DH9 N/S: V5MPM23412000893', 'Laptop Huawei BoDE-DH9 N/S: V5MPM23412000893', 'Laptop Huawei BoDE-DH9 N/S: V5MPM23412000893', 'Laptop Huawei BoDE-DH9 N/S: V5MPM23412000893', 'Laptop Huawei BoDE-DH9 N/S: V5MPM23412000893'];
  const employee = 'Jesús Pérez Hidalgo';
  const email = 'becariosistemas1@grupoopc.com';

  generateReportSafeguards( work, amount, code, description, employee, email );
});



// const data = {
//   equipos: [1, 2, 3],
//   employee: 1,
//   fechaAuth: "",
//   user: 1,
//   coments: "",
// };
