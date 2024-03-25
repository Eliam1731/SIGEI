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

const elementsDOM = {
    selectBrand: 'brandDevices',
    selectCategories: 'select__category',
    calendaryBuy: 'dateBuy',
    buttonNextSection: 'nextSectionDevices',
    secondSection: 'section-two',
    buttonReturnSection: 'returnSectionEquipment',
    buttonRegister: 'sendDataDevices',
    inputImage: 'imageDevices',
    inputFile: 'invoiceDevices',
    imageQR: 'imageCodeQR'
}

const functionalitiesRegisterEquipment = async() => {
    const imageQR = document.getElementById('imageCodeQR');
    const selectBrandEquipment = document.getElementById(elementsDOM.selectBrand);
    const everyBrand = await getDataServer('../server/data/brand.php');
    const selectCategories = document.getElementById(elementsDOM.selectCategories);
    const everyCategories = await getDataServer('../server/data/categories.php');
    const calendaryBuy = document.getElementById(elementsDOM.calendaryBuy);
    const buttonNextSection = document.getElementById(elementsDOM.buttonNextSection);
    const secondSection = document.getElementById(elementsDOM.secondSection);
    const buttonReturnSection = document.getElementById(elementsDOM.buttonReturnSection);
    const buttonRegisterEquipment = document.getElementById(elementsDOM.buttonRegister);
    const inputImageDevices = document.getElementById(elementsDOM.inputImage);
    const inputFileEquipment = document.getElementById(elementsDOM.inputFile);  
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

                optgroup.appendChild(option);
            })

            selectCategories.appendChild(optgroup);
        }
    }

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

    buttonNextSection.addEventListener('click', () => {
        secondSection.style.left = 0;
        buttonReturnSection.style.right = '3%';
    });

    buttonReturnSection.addEventListener('click', () => {
        secondSection.style.left = '-200%';
        buttonReturnSection.style.right = '200%';
    });

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
    
    buttonRegisterEquipment.addEventListener('click', async() => {
        if(imageCount === 0) {
            alert('Tiene que colocar mínimo una imagen del equipo.');
            return;
        }
        const data = await gettingDataInputsEquipment(imagesFormData, fileFormData);
        const result = await sendDataServerEquipment('../server/insert/equipment.php', data);

        if(result.status === 'success') {
            alert(result.message);
            cleanInputsForm('imageDevices', 'invoiceDevices');

            secondSection.style.left = '-200%';
            buttonReturnSection.style.right = '200%';

            generateCodeQR(imageQR, result.equipment_id, result.formatted_equipment_id);

            return;
        }
        console.log(result.status);
    });
}

export const formRegisterEquipment = ( foreheadCurrent ) => {
    document.getElementById('root-forms').innerHTML = formsEquipment[foreheadCurrent];
    functionalitiesRegisterEquipment();
}