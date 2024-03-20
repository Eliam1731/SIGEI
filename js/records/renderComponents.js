import { formCreateAccount } from "./components/createAccount.js";
import { formCreateCompany } from "./components/createCompany.js";
import { formRegisterEmployee } from "./components/createEmployee.js";
import { formRegisterEquipment } from "./components/createEquipment.js";

const components = {
    firstItemNav: formRegisterEquipment,
    secondItemNav: formRegisterEmployee,
    thirdItemNav: formCreateCompany,
    fourthItemNav: formCreateAccount,
}

const foreheadCurrent = sessionStorage.getItem('forehead');
const permissions = sessionStorage.getItem('rol')

export const renderComponents = ( itemSelected ) => {
    components[itemSelected.getAttribute('id')](foreheadCurrent, permissions);
} 