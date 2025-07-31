// client/js/equipos/renderDevices.js

import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { windowActionsDevices } from "./actionsWindows.js";
import { checkboxStates } from "./main.js";
import { messageTableDevice } from "./messageTable.js";

let devicesArray     = [];
let filteredDevices  = [];
let pageIndex        = 1;
const PAGE_SIZE      = 10;

// Mapea tus Status_id de la base
const FILTER_IDS = {
  disponible:      1,
  enResguardo:     2,
  enMantenimiento: 3,
  deBaja:          4
};

const codeOpcPrefix  = "OPCIC-COM-";
const numberValid    = /^\d{10}$/;
const formatCode     = /^\d{5}$/;

const btnSearch      = document.getElementById("buttonSearchEquipment");
const btnClear       = document.getElementById("deleteFiltrosDevices");
const tblBody        = document.getElementById("renderDataEquipments");
const inputSearch    = document.getElementById("inputSearchEquipment");
const spanCodePrefix = document.getElementById("spanCodeOpc");
const chkPhone       = document.getElementById("searchNumberReturn");

// Alterna placeholder para búsqueda por teléfono
chkPhone.addEventListener("change", () => {
  if (chkPhone.checked) {
    spanCodePrefix.textContent = "+52";
    inputSearch.placeholder = "Ejemplo: 9212039080";
  } else {
    spanCodePrefix.textContent = codeOpcPrefix;
    inputSearch.placeholder = "Ejemplo: 00090";
  }
});

// Limpiar filtros
btnClear.addEventListener("click", () => {
  checkboxStates.available     = false;
  checkboxStates.inResguardo   = false;
  checkboxStates.inMaintenance = false;
  pageIndex = 1;
  document.getElementById("disponible").checked      = false;
  document.getElementById("enResguardo").checked     = false;
  document.getElementById("enMantenimiento").checked = false;
  applyAndRender(devicesArray);
});

// 1) Filtrar según checkboxStates
function applyFiltersTo(list) {
  const { available, inResguardo, inMaintenance } = checkboxStates;
  if (!available && !inResguardo && !inMaintenance) return list;
  return list.filter(d => {
    if (available     && d.Status_id === FILTER_IDS.disponible)      return true;
    if (inResguardo   && d.Status_id === FILTER_IDS.enResguardo)     return true;
    if (inMaintenance && d.Status_id === FILTER_IDS.enMantenimiento) return true;
    return false;
  });
}

// 2) Aplica filtros + paginación + render
function applyAndRender(source) {
  filteredDevices = applyFiltersTo(source);
  const start = (pageIndex - 1) * PAGE_SIZE;
  const page  = filteredDevices.slice(start, start + PAGE_SIZE);
  renderPage(page);
}

// 3) Exports para main.js
export function checkboxAvailableEvent(cb) {
  checkboxStates.available = cb.checked;
  pageIndex = 1;
  applyAndRender(devicesArray);
}
export function checkboxInResguardoEvent(cb) {
  checkboxStates.inResguardo = cb.checked;
  pageIndex = 1;
  applyAndRender(devicesArray);
}
export function checkboxInMaintenanceEvent(cb) {
  checkboxStates.inMaintenance = cb.checked;
  pageIndex = 1;
  applyAndRender(devicesArray);
}

// 4) Carga inicial
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getDataServer("../../server/data/equipmentvisualization.php");
    devicesArray = Object.values(data).flat();
    applyAndRender(devicesArray);
  } catch (err) {
    console.error("Error cargando equipos:", err);
  }
});

// 5) Búsqueda
btnSearch.addEventListener("click", async () => {
  const term = inputSearch.value.trim();
  if (chkPhone.checked) {
    if (!numberValid.test(term)) return alert("Número inválido");
    const resp = await sendDataServer("../../server/data/seacher_equipment_num.php", { num_telefono: term });
    if (!resp?.length) return alert("No encontrado");
    windowActionsDevices(resp);
    inputSearch.value = "";
    return;
  }
  if (!formatCode.test(term)) return alert("Código inválido");
  const resp = await sendDataServer("../../server/data/searcher_equipment.php", { opcicCode: `${codeOpcPrefix}${term}` });
  if (!resp?.length) return alert("No encontrado");
  windowActionsDevices(resp);
  inputSearch.value = "";
});

// 6) Render de una página
function renderPage(list) {
  tblBody.innerHTML = "";
  list.forEach(d => {
    const { codeOpc, subcategoria, marca, modelo, numSerie, Status_id, idEquipo } = d;
    let statusText, cls;
    switch (Status_id) {
      case FILTER_IDS.disponible:
        statusText = "Disponible";    cls = "active-devices";      break;
      case FILTER_IDS.enResguardo:
        statusText = "En Resguardo";  cls = "not-available__devices"; break;
      case FILTER_IDS.enMantenimiento:
        statusText = "En Mantenimiento"; cls = "not-available__devices"; break;
      default:
        statusText = "De Baja";       cls = "not-available__devices";
    }
    const tr = document.createElement("tr");
    tr.id = idEquipo;
    tr.innerHTML = `
      <td>${codeOpc}</td>
      <td>${subcategoria} ${marca} ${modelo} ${numSerie}</td>
      <td><div class="background-paragraph ${cls}">${statusText}</div></td>
      <td id="columnActionsDevices"></td>
    `;
    const btn = document.createElement("button");
    btn.textContent = "Editar";
    btn.dataset.id = idEquipo;
    tr.querySelector("#columnActionsDevices").appendChild(btn);
    btn.addEventListener("click", () => windowActionsDevices([d]));
    tblBody.appendChild(tr);
  });
  // Mensaje “no hay datos” y paginación en messageTableDevice
  messageTableDevice(tblBody, filteredDevices, checkboxStates, PAGE_SIZE, pageIndex);
}

// 7) Navegación con flechas
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") {
    const maxPage = Math.ceil(filteredDevices.length / PAGE_SIZE);
    if (pageIndex < maxPage) {
      pageIndex++;
      applyAndRender(devicesArray);
    }
  }
  if (e.key === "ArrowLeft" && pageIndex > 1) {
    pageIndex--;
    applyAndRender(devicesArray);
  }
});
export { applyAndRender as updateDevicesFilter };