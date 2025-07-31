// js/safeguards/returnMain.js
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { windowDeviceInformation } from "./windowInformation.js";

const cfg = {
  inputCode:      'codeEquipmentReturn',
  btnSearch:      'searchEquipmentReturn',
  pName:          'employeeName-return',
  pDate:          'dateSafeguard-return',
  tableBody:      'bodyTableReturnSafeguards',
  btnReturn:      'auth__button-return',
  btnCancel:      'cancel__button-return',
  btnObs:         'observation_button-return',
  txtObs:         'observation__auth-textarea-return',
  chkPhone:       'searchNumberReturn',
  spanCode:       'spanCodeOpcReturn'
};

const validateInput = /^\d{5}$/,
      phoneInput    = /^\d{10}$/,
      prefix        = 'OPCIC-COM-';

const inputCode    = document.getElementById(cfg.inputCode);
const btnSearch    = document.getElementById(cfg.btnSearch);
const pName        = document.getElementById(cfg.pName);
const pDate        = document.getElementById(cfg.pDate);
const tableBody    = document.getElementById(cfg.tableBody);
const btnReturn    = document.getElementById(cfg.btnReturn);
const btnCancel    = document.getElementById(cfg.btnCancel);
const btnObs       = document.getElementById(cfg.btnObs);
const txtObs       = document.getElementById(cfg.txtObs);
const chkPhone     = document.getElementById(cfg.chkPhone);
const spanCode     = document.getElementById(cfg.spanCode);

let employeeCurrent, nameEmployeeCurrent;
const devicesReturn = [];

// formatea fecha ISO “YYYY-MM-DD hh:mm:ss” a “DD de mes del YYYY”
const dateInFormatText = iso => {
  const [Y, M, D] = iso.split(' ')[0].split('-');
  const fecha = new Date(Y, M-1, D);
  const months = ['enero','febrero','marzo','abril','mayo','junio',
                  'julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${fecha.getDate()} de ${months[fecha.getMonth()]} del ${fecha.getFullYear()}`;
};

// toggle placeholder y prefijo
chkPhone.addEventListener('change', () => {
  if (chkPhone.checked) {
    inputCode.placeholder = 'Ejemplo: 9212735701';
    spanCode.textContent = '+52';
  } else {
    inputCode.placeholder = 'Ejemplo: 00012';
    spanCode.textContent = prefix;
  }
});

// pide al backend los datos del resguardo activo
async function requestDeviceGuard(id) {
  if (chkPhone.checked) {
    if (!phoneInput.test(id)) {
      alert('El teléfono debe tener 10 dígitos');
      return null;
    }
    return await sendDataServer(
      "../../server/data/returnEquipmentSection_num.php",
      { num_telefono: id }
    );
  }
  if (!validateInput.test(id)) {
    alert('El código debe tener exactamente 5 dígitos numéricos.');
    return null;
  }
  return await sendDataServer(
    '../../server/data/returnEquipmentSection.php',
    { id: `${prefix}${id}` }
  );
}

// resetea la sección
function cleanSection() {
  inputCode.value = '';
  pName.textContent = 'Aún no se ha seleccionado el equipo';
  pDate.textContent = 'Aún no se ha seleccionado el equipo';
  tableBody.innerHTML = '';
  employeeCurrent = undefined;
  nameEmployeeCurrent = '';
  devicesReturn.length = 0;
  txtObs.value = '';
}

// renderiza nombre y fecha
function renderNameEmployee(name, dateIso) {
  pName.textContent = name;
  pDate.textContent = dateInFormatText(dateIso);
}

// renderiza fila en la tabla
function renderDevice({ codigo, subcategoria, marca, modelo, serie, equipo_id }) {
  const tr = document.createElement('tr');
  tr.id = equipo_id;
  tr.innerHTML = `
    <td>${codigo}</td>
    <td>${subcategoria} ${marca} ${modelo} NS: ${serie}</td>
    <td><button class="btn btn-danger">Detalles</button></td>
  `;
  tableBody.appendChild(tr);
  tr.querySelector('.btn-danger')
    .addEventListener('click', () => windowDeviceInformation({ codigo, subcategoria, marca, modelo, serie }));
}

// valida la respuesta del backend
function validateGuardReturn(data) {
  if (!data) return;
  if (data.status === 'error') {
    alert(data.message);
    return;
  }
  // status === 'ok'
  const emp = data.empleado.empleado_id;
  if (employeeCurrent === undefined) {
    employeeCurrent = emp;
    nameEmployeeCurrent = data.empleado.nombreResguardante_completo;
  }
  if (employeeCurrent !== emp) {
    alert(`El empleado ${nameEmployeeCurrent} no puede devolver el equipo de ${data.empleado.nombreResguardante_completo}.`);
    return;
  }
  if (devicesReturn.includes(data.equipo.equipo_id)) {
    alert(`El equipo con el código ${data.equipo.codigo} ya está en la tabla.`);
    return;
  }
  devicesReturn.push(data.equipo.equipo_id);
  inputCode.value = '';
  renderNameEmployee(data.empleado.nombreResguardante_completo, data.fechaAutorizacion);
  renderDevice(data.equipo);
}

// buscador de resguardos para devolución
btnSearch.addEventListener('click', async () => {
  const val = inputCode.value.trim();
  const data = await requestDeviceGuard(val);
  validateGuardReturn(data);
});

// autorizar devolución
btnReturn.addEventListener('click', async () => {
  if (devicesReturn.length === 0) {
    alert('No hay equipos para devolver!');
    return;
  }
  const now = new Date();
  const date = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
  const payload = {
    devices:     [...devicesReturn],
    employee:    employeeCurrent,
    date:        date,
    user:        sessionStorage.getItem('email'),
    observation: txtObs.value.trim()
  };
  try {
    const resp = await sendDataServer('../../server/insert/return.php', payload);
    console.log('return.php →', resp);
    if (resp.status === 'ok') {
      alert(resp.message);
      cleanSection();
    } else {
      alert('Error: ' + resp.message);
    }
  } catch (err) {
    console.error('Error al devolver:', err);
    alert('Error al procesar la devolución');
  }
});

// cancelar
btnCancel.addEventListener('click', cleanSection);

// toggle observaciones
btnObs.addEventListener('click', () => {
  if (txtObs.classList.contains('textarea__hidden')) {
    txtObs.style.bottom = '15%';
    btnObs.textContent = 'Ocultar campo';
    txtObs.classList.remove('textarea__hidden');
  } else {
    txtObs.style.bottom = '200%';
    btnObs.textContent = 'Añadir observaciones';
    txtObs.classList.add('textarea__hidden');
  }
});
