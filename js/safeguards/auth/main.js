import { sendDataServer } from "../../utilities/sendDataServer.js";
import { renderingEquipmentInTable } from "./guardsAuth.js";

const elementAuthDOM = {
    inputCode: 'codeEquipment',
    buttonSearch: 'searchEquipment',
}

const inputCodeEquipment = document.getElementById(elementAuthDOM.inputCode);
const buttonSearchEquipment = document.getElementById(elementAuthDOM.buttonSearch);
const formatCode = /^\d{5}$/;
const codeOPC = 'OPCIC-COM-';

buttonSearchEquipment.addEventListener('click', async() => {
    if(!formatCode.test(inputCodeEquipment.value.trim())) {
        alert('El código que usted esta colocando solo debe contener números, no debe tener espacios y exactamente 5 números.');
        return;
   }

   const codeEquipmentOpc = `${codeOPC}${inputCodeEquipment.value}`;
   
   try {
        const response = await sendDataServer('../server/data/equipmentSafeguards.php', {code: codeEquipmentOpc});

        if(response.error) {
          alert(response.error);

          return;
        }

        inputCodeEquipment.value = '';
        renderingEquipmentInTable(response);

        console.log(response);
   } catch(error) {
        console.error(error)
   }
});