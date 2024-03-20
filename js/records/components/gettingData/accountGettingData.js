import { sendDataServer } from "../../../utilities/sendDataServer.js";

const inputAccountIDs = [
  "firstNameUser",
  "secondNameUser",
  "firstSurnameUser",
  "secondSurnameUser",
  "foreheadUser",
  "userRol",
  "newEmailUser",
  "confirmEmailUser",
  "newPasswordUser",
  "confirmPasswordUser",
];

const excludedKeys = ['newEmailUser', 'confirmEmailUser', 'newPasswordUser', 'confirmPasswordUser', 'foreheadUser', 'userRol'];

const message = {
  notSpecialCharacters: 'Solo los campos de correo electrónico y contraseñas deben tener números y caracteres especiales.',
  emailDifferent: "Los correos electrónicos proporcionados no coinciden.",
  passwordDifferent: "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.",
  notStringEmpty: "Por favor completa todos los campos, a excepción del campo de segundo nombre, que es opcional.",
};

const SERVER_PATH = "../server/insert/account.php";
const DOMAIN = "@grupoopc.com";

const notStringEmpty = /^\s*$/;
const hasNumberOrSpecialChar = /[0-9!@#$%^&*]/;

const validateData = (objectDataInputs) => {
  for (let [key, value] of Object.entries(objectDataInputs)) {
    if (key === "secondNameUser") continue;

    if (notStringEmpty.test(value)) {
      alert(message.notStringEmpty);
      return false;
    }

    if(!excludedKeys.includes(key)) {
        if(hasNumberOrSpecialChar.test(value)) {
            alert(message.notSpecialCharacters);
            return false;
        }
    }
  }

  if (objectDataInputs.newEmailUser !== objectDataInputs.confirmEmailUser) {
    alert(message.emailDifferent);
    return false;
  }

  if (objectDataInputs.newPasswordUser !== objectDataInputs.confirmPasswordUser) {
    alert(message.passwordDifferent);
    return false;
  }

  return true;
};

const resetInputFields = (inputAccountIDs, objectDataInputs) => {
  inputAccountIDs.forEach((element) => {
    const elementHTML = document.getElementById(element); 
    if (element === "foreheadUser" || element === "userRol") {
        elementHTML.firstElementChild.setAttribute('selected', 'selected');
        return;
    }
    elementHTML.value = '';
  });

  if (notStringEmpty.test(objectDataInputs.secondNameUser)) delete objectDataInputs.secondNameUser;
  delete objectDataInputs.confirmEmailUser;
  delete objectDataInputs.confirmPasswordUser;
}

export const gettingDataAccountSystems = async () => {
  const secondSectionAccount = document.querySelector(".second-container__account");
  const prevSectionButton = document.getElementById("returnSection");

  const objectDataInputs = inputAccountIDs.reduce((acc, id) => {
    const element = document.getElementById(id);
    acc[id] = element.value.trim();
    return acc;
  }, {});

  objectDataInputs.newEmailUser = `${objectDataInputs.newEmailUser}${DOMAIN}`;
  objectDataInputs.confirmEmailUser = `${objectDataInputs.confirmEmailUser}${DOMAIN}`;

  const resultValidateData = validateData(objectDataInputs);

  if (resultValidateData) {
    if (await sendDataServer(SERVER_PATH, objectDataInputs)) {
      alert("El registro fue realizado con exito");
      resetInputFields(inputAccountIDs, objectDataInputs);
      secondSectionAccount.style.marginLeft = "-200%";
      prevSectionButton.style.right = "200%";
    }
  }
};