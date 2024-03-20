import { embedFrontsInSelect } from "../../utilities/frontsEmbedSelect.js";
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
    const foreheadUser = document.getElementById('foreheadUser');
    const sendDataAccountButton = document.getElementById('accountSendData');

    nextSectionButton.addEventListener('click', () => nextSectionAccount(secondSectionAccount, prevSectionButton ));
    prevSectionButton.addEventListener('click', () => prevSectionAccount( secondSectionAccount, prevSectionButton ));
    sendDataAccountButton.addEventListener('click', () => gettingDataAccountSystems());
    embedFrontsInSelect(foreheadUser, true);
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