import { viewPassword } from "../utilities/viewPassword.js";
import { getDataInputs } from "./getDataInputs.js";

const elementsDOM = {
    email: 'email',
    password: 'password',
    button: 'button-login',
    checkbox: 'viewPassword',
}

const emailInput = document.getElementById( elementsDOM.email );
const passwordInput = document.getElementById( elementsDOM.password );
const loginButton = document.getElementById( elementsDOM.button );
const checkboxPassword = document.getElementById( elementsDOM.checkbox );

loginButton.addEventListener('click', () => getDataInputs( emailInput, passwordInput, emailInput ));
checkboxPassword.addEventListener('change', () => viewPassword( passwordInput ));
window.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') getDataInputs( emailInput, passwordInput, emailInput );
});