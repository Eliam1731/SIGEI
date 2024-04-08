import { sendDataServer } from "../../utilities/sendDataServer.js";
import { generateReportSafeguards } from "./generateReport.js";

const bodyTable = document.getElementById('bodyTableAuthSafeguards');
const cancelButton = document.getElementById('cancel__button');
const selectCompanyClean = document.getElementById('companyBelongsEmployee')
const selectWorkClean = document.getElementById('workBelongsEmployee');
const selectForeheadClean = document.getElementById('forehead_belongs');
const selectEmployeeClean = document.getElementById('protectiveEmployee');
const textareaAuthObservation = document.getElementById('observation__auth-textarea');
const buttonAuth = document.getElementById('auth__button');
const safeguardsData = {
  equipments: [],
  description: [],
  codeOpc: [],
  employee: undefined,
  work: undefined,
  dateAuth: undefined,
  userAuth: undefined,
  observation: undefined,
};

const cleanSectionAuth = () => {
    safeguardsData.equipments = [];
    safeguardsData.description = [];
    safeguardsData.employee = undefined;
    safeguardsData.work = undefined;
    safeguardsData.dateAuth = undefined;
    safeguardsData.userAuth = undefined;
    safeguardsData.observation = undefined;
    safeguardsData.codeOpc = [];

    bodyTable.innerHTML = '';
    textareaAuthObservation.value = '';

    selectCompanyClean.selectedIndex = 0;
    selectWorkClean.selectedIndex = 0;
    selectForeheadClean.selectedIndex = 0;
    selectEmployeeClean.selectedIndex = 0;

    selectWorkClean.setAttribute('disabled', 'disabled')
    selectForeheadClean.setAttribute('disabled', 'disabled')
    selectEmployeeClean.setAttribute('disabled', 'disabled')

    console.log(safeguardsData, '-------- Data clean ------------');
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
    let positionDeleteDescription;

    safeguardsData.description = safeguardsData.description.filter( item => {
      positionDeleteDescription = safeguardsData.equipments.indexOf(parseInt(itemDeleteID));
      return item !== safeguardsData.description[positionDeleteDescription];
    });

    safeguardsData.codeOpc = safeguardsData.codeOpc.filter( item => {
      positionDeleteDescription = safeguardsData.equipments.indexOf(parseInt(itemDeleteID));
      return item !== safeguardsData.codeOpc[positionDeleteDescription];
    });

    safeguardsData.equipments = safeguardsData.equipments.filter( item => {
      return item !== parseInt(itemDeleteID)
    });

    itemDeleteHTML.remove();
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

  if (safeguardsData.equipments.includes(id)) {
    alert(`El equipo con el codigo ${code} ya esta en la tabla.`);
    return;
  }

  safeguardsData.equipments.push(id);
  safeguardsData.codeOpc.push(code);
  safeguardsData.description.push(`${subcategoria} ${marca} ${modelo} ${numSerie}`);

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

buttonAuth.addEventListener('click', async() => {
  try {
    const response = await sendDataServer('../server/data/numberwork.php', {
      obra_id: selectWorkClean.value,
    });

    safeguardsData.work = response.Num_obra;
  } catch(error) {
    console.log(error);
  }

  const now = new Date();
  const date = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;
  safeguardsData.observation = textareaAuthObservation.value;
  safeguardsData.userAuth = sessionStorage.getItem('email');
  safeguardsData.employee = selectEmployeeClean.value;
  safeguardsData.dateAuth = date;
  const nameComplete = selectEmployeeClean.options[selectEmployeeClean.selectedIndex].text

  try {
    const response = await sendDataServer('../server/insert/resguard.php', {
      equipments: safeguardsData.equipments,
      employee: safeguardsData.employee,
      user: safeguardsData.userAuth,
      observation: safeguardsData.observation,
      date_auth: safeguardsData.dateAuth,
    });

    if(response.message === 'Su resguardo fue exitoso' ) {
      alert(response.message);

      generateReportSafeguards( 
        safeguardsData.work, 
        '1 Pza', 
        safeguardsData.codeOpc, 
        safeguardsData.description, 
        nameComplete,
        response.employeeEmail,
      );

      cleanSectionAuth();
    }

    console.log(response);
  } catch(error) {
    console.log(error);
  }
});