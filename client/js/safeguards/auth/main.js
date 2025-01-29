import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { renderingEquipmentInTable } from "./guardsAuth.js";

const elementAuthDOM = {
  inputCode: "codeEquipment",
  buttonSearch: "searchEquipment",
  buttonObservation: "observation_button",
  textarea: "observation__auth-textarea",
  companySelect: "companyBelongsEmployee",
  workSelect: "workBelongsEmployee",
  foreheadSelect: "forehead_belongs",
  employeeSelect: "protectiveEmployee",
  bodyTable: "bodyTableAuthSafeguards",
  cancelButton: "cancel__button",
  firstLi: "first_article",
  secondLI: "second_article",
  secondSection: ".second_article",
  firstArticle: ".first_article",
};

const inputCodeEquipment = document.getElementById( elementAuthDOM.inputCode );
const buttonSearchEquipment = document.getElementById( elementAuthDOM.buttonSearch );
const buttonObservation = document.getElementById( elementAuthDOM.buttonObservation );
const observationTextarea = document.getElementById(elementAuthDOM.textarea);
const selectCompany = document.getElementById(elementAuthDOM.companySelect);
const selectWork = document.getElementById(elementAuthDOM.workSelect);
const selectForehead = document.getElementById(elementAuthDOM.foreheadSelect);
const selectEmployee = document.getElementById(elementAuthDOM.employeeSelect);
const firstLi = document.getElementById(elementAuthDOM.firstLi);
const secondLi = document.getElementById(elementAuthDOM.secondLI);
const firstSection = document.querySelector(elementAuthDOM.firstArticle);
const secondSection = document.querySelector(elementAuthDOM.secondSection);
const formatCode = /^\d{5}$/;
const codeOPC = "OPCIC-COM-";
const checkboxSearchPhone = document.getElementById("searchNumberAuth");
const spanCodeOpc = document.getElementById("spanCodeOpc");

firstLi.addEventListener("click", () => {
  secondLi.classList.remove("li-selected");
  firstLi.classList.add("li-selected");

  secondSection.style.display = "none";
  firstSection.style.display = "flex";
});

secondLi.addEventListener("click", () => {
  firstLi.classList.remove("li-selected");
  secondLi.classList.add("li-selected");

  firstSection.style.display = "none";
  secondSection.style.display = "flex";
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await getDataServer("../../server/data/business.php");
    const { company } = response;

    company.forEach((element) => {
      const option = document.createElement("option");
      option.value = element[0];
      option.textContent = element[1];

      selectCompany.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
});

selectCompany.addEventListener("change", async () => {
  const companyID = selectCompany.value;

  while (selectWork.options.length > 1) {
    selectWork.remove(1);
  }
  while (selectForehead.options.length > 1) {
    selectForehead.remove(1);
  }
  while (selectEmployee.options.length > 1) {
    selectEmployee.remove(1);
  }

  selectWork.setAttribute("disabled", "");
  selectForehead.setAttribute("disabled", "");
  selectEmployee.setAttribute("disabled", "");

  try {
    const response = await sendDataServer(
      "../../server/data/protective_employees.php",
      { empresa_id: companyID }
    );

    response.forEach((element) => {
      const option = document.createElement("option");

      option.value = element.Obra_id;
      option.textContent = element.Nombre_obra;

      selectWork.appendChild(option);
      selectWork.removeAttribute("disabled");
    });
  } catch (error) {
    console.error(error);
  }
});

selectWork.addEventListener("change", async () => {
  const workID = selectWork.value;
  const companyID = selectCompany.value;

  while (selectForehead.options.length > 1) {
    selectForehead.remove(1);
  }
  while (selectEmployee.options.length > 1) {
    selectEmployee.remove(1);
  }

  selectForehead.setAttribute("disabled", "");
  selectEmployee.setAttribute("disabled", "");

  try {
    const response = await sendDataServer(
      "../../server/data/protective_employees.php",
      {
        empresa_id: companyID,
        obra_id: workID,
      }
    );

    response.forEach((element) => {
      const option = document.createElement("option");

      option.value = element.Frente_id;
      option.textContent = element.Nom_frente;

      selectForehead.appendChild(option);
      selectForehead.removeAttribute("disabled");
    });
  } catch (error) {
    console.error(error);
  }
});

selectForehead.addEventListener("change", async () => {
  const companyID = selectCompany.value;
  const workID = selectWork.value;
  const foreheadID = selectForehead.value;

  while (selectEmployee.options.length > 1) {
    selectEmployee.remove(1);
  }

  selectEmployee.setAttribute("disabled", "");

  try {
    const response = await sendDataServer(
      "../../server/data/protective_employees.php",
      {
        empresa_id: companyID,
        obra_id: workID,
        frente_id: foreheadID,
      }
    );

    response.forEach((element) => {
      const option = document.createElement("option");

      option.value = element.Empleado_id;
      option.textContent = `${element.Nombre} ${element.Primer_apellido} ${element.Segundo_apellido}`;

      selectEmployee.appendChild(option);
      selectEmployee.removeAttribute("disabled");
    });
  } catch (error) {
    console.error(error);
  }
});

selectEmployee.addEventListener("change", () => {
  console.error(selectEmployee.value);
});

buttonObservation.addEventListener("click", () => {
  if (observationTextarea.classList.contains("textarea__hidden")) {
    observationTextarea.style.bottom = "15%";
    buttonObservation.textContent = "Ocultar campo";
    observationTextarea.classList.remove("textarea__hidden");

    return;
  }

  observationTextarea.style.bottom = "200%";
  buttonObservation.textContent = "Añadir observaciones";
  observationTextarea.classList.add("textarea__hidden");
});

checkboxSearchPhone.addEventListener("change", () => {
  if (checkboxSearchPhone.checked) {
    inputCodeEquipment.setAttribute("placeholder", "Ejemplo: 9212735701");
    spanCodeOpc.textContent = "+52";

    return;
  }

  inputCodeEquipment.setAttribute("placeholder", "Ejemplo: 00012");
  spanCodeOpc.textContent = codeOPC;
});

buttonSearchEquipment.addEventListener("click", async () => {
  if (checkboxSearchPhone.checked) {
    const numberPhone = inputCodeEquipment.value.trim();
    const numberValid = /^\d{10}$/;

     if (!numberValid.test(numberPhone)) {
          alert("El número de teléfono debe tener 10 dígitos.");
          return;
     }

     try {
          const response = await sendDataServer("../../server/data/equipmentSafeguards_num.php", { num_telefono: numberPhone } );

          if (response.error) {
              alert(response.error);

            return;
          }

          ( response.length === 0 ) ? alert("No se encontró ningún dispositivo.") : renderingEquipmentInTable(response);
          inputCodeEquipment.value = "";
     } catch (error) { console.error(error) }

    return;
  }

  if (!formatCode.test(inputCodeEquipment.value.trim())) {
    alert(
      "El código que usted esta colocando solo debe contener números, no debe tener espacios y exactamente 5 números."
    );
    return;
  }

  const codeEquipmentOpc = `${codeOPC}${inputCodeEquipment.value}`;

  try {
    const response = await sendDataServer('../../server/data/equipmentSafeguards.php', { code: codeEquipmentOpc } );

    if (response.error) {
      alert(response.error);

      return;
    }

    inputCodeEquipment.value = "";
    renderingEquipmentInTable(response);
  } catch (error) {
    console.error(error);
  }
});
