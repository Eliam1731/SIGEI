// js/safeguards/guardsAuth.js
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { windowDeviceInformation } from "./allDataDevice.js";
import { generateReportSafeguards } from "./generateReport.js";

// ——————————————————————————————
// 1) Exportamos la función de renderizado AL NIVEL SUPERIOR
// ——————————————————————————————
export function renderingEquipmentInTable(equipment) {
  const bodyTable = document.getElementById('bodyTableAuthSafeguards');
  const { codeOpc: code, idEquipo: id, marca, modelo, numSerie, subcategoria } = equipment;

  // Creamos y anexamos la fila
  const tr = document.createElement("tr");
  tr.id = id;

  const tdCode = document.createElement("td");
  tdCode.textContent = code;

  const tdDesc = document.createElement("td");
  tdDesc.textContent = `${subcategoria} ${marca} ${modelo} ${numSerie}`;

  const tdActions = document.createElement("td");
  const btnAct    = document.createElement("button");
  btnAct.textContent = "Acciones";
  btnAct.addEventListener('click', () => modalActions(equipment, btnAct));

  tdActions.append(btnAct);
  tr.append(tdCode, tdDesc, tdActions);
  bodyTable.appendChild(tr);

  // Añadimos al estado interno
  safeguardsData.equipments.push(id);
  safeguardsData.codeOpc.push(code);
  safeguardsData.description.push(`${subcategoria} ${marca} ${modelo} ${numSerie}`);
}

// ——————————————————————————————
// 2) Estado interno compartido y helpers (no export)
// ——————————————————————————————
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

function modalActions(equipment, buttonActions) {
  // ... tu código actual de modalActions …
}

function cleanSectionAuth() {
  const bodyTable = document.getElementById('bodyTableAuthSafeguards');
  const textarea  = document.getElementById('observation__auth-textarea');
  const selectCompany  = document.getElementById('companyBelongsEmployee');
  const selectWork     = document.getElementById('workBelongsEmployee');
  const selectForehead = document.getElementById('forehead_belongs');
  const selectEmployee = document.getElementById('protectiveEmployee');

  safeguardsData.equipments = [];
  safeguardsData.description = [];
  safeguardsData.codeOpc = [];
  safeguardsData.employee = undefined;
  safeguardsData.work = undefined;
  safeguardsData.dateAuth = undefined;
  safeguardsData.userAuth = undefined;
  safeguardsData.observation = undefined;

  bodyTable.innerHTML = '';
  textarea.value = '';

  selectCompany.selectedIndex = 0;
  selectWork.selectedIndex = 0;
  selectForehead.selectedIndex = 0;
  selectEmployee.selectedIndex = 0;

  selectWork.setAttribute('disabled', 'disabled');
  selectForehead.setAttribute('disabled', 'disabled');
  selectEmployee.setAttribute('disabled', 'disabled');
}

// ——————————————————————————————
// 3) Listener de DOMContentLoaded para atar eventos
// ——————————————————————————————
document.addEventListener("DOMContentLoaded", () => {
  const cancelButton = document.getElementById('cancel__button');
  const buttonAuth   = document.getElementById('auth__button');
  const selectWork   = document.getElementById('workBelongsEmployee');
  const selectEmp    = document.getElementById('protectiveEmployee');
  const textareaObs  = document.getElementById('observation__auth-textarea');

  console.log('buttonAuth →', buttonAuth); // Debe mostrar tu botón

  // Cancelar limpia todo
  cancelButton.addEventListener('click', cleanSectionAuth);

  // Autorizar resguardo
  buttonAuth.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('🔥 Click en Autorizar resguardo detectado');

    if (safeguardsData.equipments.length === 0) {
      return alert('No hay equipos en la tabla.');
    }
    if (!selectEmp.value) {
      return alert('Seleccione un empleado.');
    }

    // Obtener número de obra
    try {
      const respWork = await sendDataServer(
        '../../server/data/numberwork.php',
        { obra_id: selectWork.value }
      );
      safeguardsData.work = respWork.Num_obra;
    } catch (err) {
      console.error(err);
      return alert('Error al obtener número de obra');
    }

    // Rellenar datos
    const now = new Date();
    // <-- Aquí corregimos a DD/MM/YYYY -->
    safeguardsData.dateAuth    = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
    safeguardsData.observation = textareaObs.value.trim();
    safeguardsData.userAuth    = sessionStorage.getItem('email');
    safeguardsData.employee    = selectEmp.value;
    const nameComplete = selectEmp.options[selectEmp.selectedIndex].text; 

    // Enviar al backend
    try {
      const response = await sendDataServer(
        '../../server/insert/resguard.php',
        {
          equipments:  safeguardsData.equipments,
          employee:    safeguardsData.employee,
          user:        safeguardsData.userAuth,
          observation: safeguardsData.observation,
          date_auth:   safeguardsData.dateAuth
        }
      );
      console.log('📬 respuesta resguard.php →', response);

      if (response.message === 'Su resguardo fue exitoso') {
        alert(response.message);
        generateReportSafeguards(
          safeguardsData.work,
          '1 Pza',
          safeguardsData.codeOpc,
          safeguardsData.description,
          nameComplete,
          response.employeeEmail
        );
        cleanSectionAuth();
      } else {
        alert('Error: ' + (response.message || 'Respuesta inesperada'));
      }
    } catch (err) {
      console.error('💥 fallo autorizando:', err);
      alert('Error al autorizar resguardo');
    }
  });
});
