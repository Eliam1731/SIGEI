import { getDataServer } from "../../utilities/getDataServer.js";
import { setCurrentDateCalendary } from "../../utilities/setCurrentDate.js";
import { equipmentMachineryHTML, equipmentStoreHTML, equipmentSystemsHTML } from "../content-html/equipmentHTML.js";
import { gettingDataInputsEquipment } from "./gettingData/equipmentGettingData.js";

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
}

const functionalitiesRegisterEquipment = async() => {
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
    let imagesFormData;
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
    
    buttonRegisterEquipment.addEventListener('click', () => {
        if(imageCount === 0) {
            alert('Tiene que colocar mínimo una imagen del equipo.');
            return;
        }
        const data = gettingDataInputsEquipment(imagesFormData);
    });
}

export const formRegisterEquipment = ( foreheadCurrent ) => {
    document.getElementById('root-forms').innerHTML = formsEquipment[foreheadCurrent];
    functionalitiesRegisterEquipment();
}