import { formCreateAccount, formCreateCompany, formRegisterEmployee, formRegisterEquipment } from './components/index.js';

const components = {
    firstItemNav: formRegisterEquipment,
    secondItemNav: formRegisterEmployee,
    thirdItemNav: formCreateCompany,
    fourthItemNav: formCreateAccount,
}

const foreheadCurrent = sessionStorage.getItem( 'forehead' );
const permissions = sessionStorage.getItem( 'rol' );

export const renderComponents = ( itemSelected ) => components[itemSelected.getAttribute('id')](foreheadCurrent, permissions);