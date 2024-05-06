import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServerEquipment } from "../../utilities/sendDataEquipment.js";
import { setCurrentDateCalendary } from "../../utilities/setCurrentDate.js";
import { equipmentMachineryHTML, equipmentStoreHTML, equipmentSystemsHTML } from "../content-html/equipmentHTML.js";
import { cleanInputsForm, generateCodeQR, gettingDataInputsEquipment } from "./gettingData/equipmentGettingData.js";

const formsEquipment = {
    Sistemas: equipmentSystemsHTML,
    Almacen: equipmentStoreHTML,
    Maquinaria: equipmentMachineryHTML,
}

export const devicesWithAddresses = [
    'Laptop',
    'Computadora de escritorio',
    'All In One',
    'Impresora',
    'Servidor',
    'Teléfono',
    'Teléfonos IP',
    'Router',
    'Modem',
    'Switch',
    'Acesspoint',
    'Fortinet',
];

const elementsDOM = {
    selectBrand: 'brandDevices',
    selectCategories: 'select__category',
    calendaryBuy: 'dateBuy',
    secondSection: 'section-two',
    buttonRegister: 'sendDataDevices',
    inputImage: 'imageDevices',
    inputFile: 'invoiceDevices',
    imageQR: 'imageCodeQR',
    inputsHiden: '.hiden-inputs',
}

const validateInputs = () => {
    const regexPrice = /^\d+(\.\d{2})?$/;
    const inputCodeDevice = document.getElementById('codeEquipment');
    const inputModelDevice = document.getElementById('modelDevices');
    const inputSerialNumber = document.getElementById('serialNumber');
    const inputServiceTag = document.getElementById('serviceTag');
    const inputDateBuy = document.getElementById('dateBuy');
    const inputDateExpiresWarranty = document.getElementById('dateExpiresWarranty');
    const inputAmountDevices = document.getElementById('amountDevices');
    const inputInvoice = document.getElementById('invoiceDevices');

    inputCodeDevice.addEventListener('change', (event) => {
        const valueInput = event.target.value;

        if(valueInput.trim() === '') return;
        
        if(valueInput.length !== 5 ) {
            alert('El código del equipo debe tener exactamente 5 números.');
            inputCodeDevice.focus();
            return;
        }

        if(isNaN(valueInput)) {
            alert('El código del equipo debe ser numérico.');
            inputCodeDevice.focus();
            return;
        }
    });

    inputModelDevice.addEventListener('change', (event) => {
        const valueInput = event.target.value;

        if(valueInput.trim() === '') return;

        if(valueInput.length < 4 || valueInput.length > 15) {
            alert('El modelo del equipo debe tener mínimo 4 caracteres y un maximo de 15 caracteres.');
            inputModelDevice.focus();
            return;
        }
    });

    inputSerialNumber.addEventListener('change', (event) => {
        const valueInput = event.target.value;

        if(valueInput.trim() === '') return;

        if(valueInput.length < 8 || valueInput.length > 20) {
            alert('El número de serie del equipo debe tener mínimo 10 caracteres y un maximo de 20 caracteres.');
            inputSerialNumber.focus();
            return;
        }
    });

    inputServiceTag.addEventListener('change', (event) => {
        const valueInput = event.target.value;

        if(valueInput.trim() === '') return;

        if(valueInput.length < 8 || valueInput.length > 20) {
            alert('El service tag del equipo debe tener mínimo 10 caracteres y un maximo de 20 caracteres.');
            inputServiceTag.focus();
            return;
        }
    });

    inputDateExpiresWarranty.addEventListener('focus', () => {
        if(inputDateBuy.value.trim() === '') {
            alert('Primero debe seleccionar la fecha de compra.');
            inputDateBuy.focus();
            return;
        }
    });

    inputDateExpiresWarranty.addEventListener('change', (event) => {
        const dateBuy = new Date(inputDateBuy.value);
        const dateExpiresWarranty = new Date(event.target.value);

        if(dateExpiresWarranty < dateBuy) {
            alert('La fecha de expiración de la garantía no puede ser menor a la fecha de compra.');
            inputDateExpiresWarranty.focus();
            return;
        }
    });

    inputAmountDevices.addEventListener('change', (event) => {
        const valueInput = event.target.value;

        if(valueInput.trim() === '') return;

        if(!regexPrice.test(valueInput)) {
            alert('Formato inválido. Asegúrate de ingresar un número sin comas, que puede ser entero o un decimal con dos dígitos después del punto. Ejemplo válido: 20000.00; ejemplo no válido: 20,000.00.');
            inputAmountDevices.focus();
            return;
        }
    });


    inputInvoice.addEventListener('change', (event) => {
        console.log('popo');
    });
}

const functionalitiesRegisterEquipment = async() => {
    const form = document.getElementById('form-equipment');
    const inputCodeEquipment = document.getElementById('codeEquipment');
    const imageQR = document.getElementById('imageCodeQR');
    const selectBrandEquipment = document.getElementById(elementsDOM.selectBrand);
    const everyBrand = await getDataServer('../server/data/brand.php');
    const selectCategories = document.getElementById(elementsDOM.selectCategories);
    const everyCategories = await getDataServer('../server/data/categories.php');
    const calendaryBuy = document.getElementById(elementsDOM.calendaryBuy);
    const inputImageDevices = document.getElementById(elementsDOM.inputImage);
    const inputFileEquipment = document.getElementById(elementsDOM.inputFile);  
    const inputsHiden = document.querySelectorAll(elementsDOM.inputsHiden);
    let imagesFormData;
    let fileFormData;
    let imageCount = 0;

    for(let key in everyCategories) {
        if(everyCategories.hasOwnProperty(key)) {
            const optgroup = document.createElement('optgroup');
            optgroup.setAttribute('label', key);

            everyCategories[key].forEach( element => {
                const option = document.createElement('option');
                option.textContent = element;
                option.value = element;

                if(element === 'Laptop') option.selected = true;

                optgroup.appendChild(option);
            })

            selectCategories.appendChild(optgroup);
        }
    }

    selectCategories.addEventListener('change', (event) => {
        const value = event.target.value;
        const inputAddressEthernet = document.getElementById('addressEthernet');   
        const inputAddressWifi = document.getElementById('addressMacWifi');

        if(devicesWithAddresses.includes(value)) {
            inputsHiden.forEach(element => {
                element.style.display = 'flex';
                inputAddressEthernet.setAttribute('required', '');
                inputAddressWifi.setAttribute('required', '');
            });

            return;
        }

        inputsHiden.forEach(element => {
            element.style.display = 'none';
            inputAddressEthernet.removeAttribute('required');
            inputAddressWifi.removeAttribute('required');
        });
    });

    everyBrand.forEach(element => {
        const option = document.createElement('option');

        for(let i = 0; i < element.length; i++) {
            if(i == 0) {
                option.value = element[i];
                continue;
            };

            option.innerText = element[i];
        }

        selectBrandEquipment.appendChild(option);
    });

    setCurrentDateCalendary(calendaryBuy);

    inputImageDevices.addEventListener('change', (event) => {
        const images = event.target.files;
        imagesFormData = new FormData();
    
        Array.from(images).forEach(image => {
            imagesFormData.append('images[]', image);
            imageCount++;
        });
    });

    inputFileEquipment.addEventListener('change', () => {
        const files = inputFileEquipment.files;
        fileFormData = new FormData();
    
        Array.from(files).forEach(file => {
            fileFormData.append('invoices[]', file);
        });
    });

    validateInputs();

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        if(imageCount === 0) {
            alert('Tiene que colocar mínimo una imagen del equipo.');
            return;
        }

        const data = await gettingDataInputsEquipment(imagesFormData, fileFormData);
        const result = await sendDataServerEquipment('../server/insert/equipment.php', data);

        if(result.status === 'success') {
            alert(result.message);

            if(inputCodeEquipment.value.trim() === '' ) {
                generateCodeQR(imageQR, result.equipment_id, result.formatted_equipment_id);
            }
            cleanInputsForm('imageDevices', 'invoiceDevices');

            return;
        }
        alert(result.message);
    });
}

export const formRegisterEquipment = ( foreheadCurrent ) => {
    document.getElementById('root-forms').innerHTML = formsEquipment[foreheadCurrent];
    functionalitiesRegisterEquipment();
}