import { viewPassword } from "../../utilities/viewPassword.js";
import { accountMachineryHTML, accountStoreHTML, accountSystemsHTML, notPermissionCreateAccount } from "../content-html/accountHTML.js";
import { gettingDataAccountSystems } from "./gettingData/accountGettingData.js";

const formsAccount = {
    Sistemas: accountSystemsHTML,
    Almacen: accountStoreHTML,
    Maquinaria: accountMachineryHTML,
    notPermissions: notPermissionCreateAccount,
}

const nextSectionAccount = ( secondSection, prevSectionButton ) => {
        secondSection.style.margin = 0
        prevSectionButton.style.right = '2%';
}

const prevSectionAccount = ( secondSection, prevSectionButton ) => {
    secondSection.style.marginLeft = '-200%';
    prevSectionButton.style.right = '200%'
}

const functionalitiesSystemsForm = ( root ) => {
    root.innerHTML = formsAccount.Sistemas;

    const secondSectionAccount = document.querySelector('.second-container__account');
    const nextSectionButton = document.getElementById('nextSectionAccount');
    const prevSectionButton = document.getElementById('returnSection');
    const sendDataAccountButton = document.getElementById('accountSendData');
    const validateEmail = /@/;
    const inputEmail = document.getElementById('newEmailUser');
    const inputEmailConfirm = document.getElementById('confirmEmailUser');
    const inputNewPassword = document.getElementById('newPasswordUser');
    const inputConfirmPassword = document.getElementById('confirmPasswordUser');
    const spanPasswordView1 = document.getElementById('spanPasswordView1');
    const spanPasswordView2 = document.getElementById('spanPasswordView2');

    nextSectionButton.addEventListener('click', () => nextSectionAccount(secondSectionAccount, prevSectionButton ));
    prevSectionButton.addEventListener('click', () => prevSectionAccount( secondSectionAccount, prevSectionButton ));
    sendDataAccountButton.addEventListener('click', () => gettingDataAccountSystems());


    inputEmail.addEventListener('change', () => {
        if(validateEmail.test(inputEmail.value)) {
            alert('No es necesario agregar el dominio @grupoopc.com, este se agregará automáticamente.');
            inputEmail.value = inputEmail.value.replace(/@.*/, '');
        }
    });

    inputEmailConfirm.addEventListener('change', () => {
        if(validateEmail.test(inputEmailConfirm.value)) {
            alert('No es necesario agregar el dominio @grupoopc.com, este se agregará automáticamente.');
            inputEmailConfirm.value = inputEmailConfirm.value.replace(/@.*/, '');
        }
    }); 

   spanPasswordView1.addEventListener('click', () => viewPassword(inputNewPassword));
    spanPasswordView2.addEventListener('click', () => viewPassword(inputConfirmPassword));
}

const functionalitiesStoreForm = ( root ) => {
    root.innerHTML = formsAccount.Almacen;
}

const functionalitiesMachineryForms = ( root ) => {
    root.innerHTML = formsAccount.Maquinaria;
}

export const formCreateAccount = ( foreheadCurrent, permissions ) => {
    const rootForms = document.getElementById('root-forms');

    if(permissions == 'Usuario Estandar') {
        rootForms.innerHTML = formsAccount.notPermissions;
        return;
    }

    if( foreheadCurrent === 'Sistemas' ) functionalitiesSystemsForm( rootForms );
    if( foreheadCurrent === 'Almacen' ) functionalitiesStoreForm( rootForms );
    if( foreheadCurrent == 'Maquinaria' ) functionalitiesMachineryForms( rootForms );
}