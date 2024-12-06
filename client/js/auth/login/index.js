import { viewPassword } from '../../utilities/viewPassword.js';
import { getDataInputs } from './getDataInputs.js';

const elementsDOM = {
    email: 'email',
    password: 'password',
    button: 'button-login',
    checkbox: 'viewPassword',
    spanNewPassword: 'span-newPassword',
    sectionNewPassword: 'section-newPassword',
}

const emailInput = document.getElementById( elementsDOM.email );
const passwordInput = document.getElementById( elementsDOM.password );
const loginButton = document.getElementById( elementsDOM.button );
const checkboxPassword = document.getElementById( elementsDOM.checkbox );
const spanNewPassword = document.getElementById( elementsDOM.spanNewPassword );
const sectionNewPassword = document.getElementById( elementsDOM.sectionNewPassword );

loginButton.addEventListener( 'click', () => getDataInputs( emailInput, passwordInput, emailInput ) );
checkboxPassword.addEventListener( 'change', () => viewPassword( passwordInput ) );

// window.addEventListener('keydown', (event) => {
//     if(event.key === 'Enter') getDataInputs( emailInput, passwordInput, emailInput );
// });

spanNewPassword.addEventListener( 'click', () => sectionNewPassword.style.display = 'flex' );