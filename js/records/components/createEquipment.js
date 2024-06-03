import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServerEquipment } from "../../utilities/sendDataEquipment.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
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

const devicesWitchNumberPhone = ['Teléfono'];


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

const deleteCategoryAndBrand = () => {
    const root = document.getElementById('root__category-brand');
    root.remove();
}

const windowCategoryAndBrand = () => {
    const root = document.createElement('div');
    const container = document.createElement('div');

    root.id = 'root__category-brand';
    container.classList.add('container-category-brand');

    root.addEventListener('click', (event) => {
        if(event.target === root) root.remove();
    });

    document.body.appendChild(root);
    root.appendChild(container);
}

const addCategoryDevice = () => {
    const addCategory = document.getElementById('addCategory');
    const html = `
        <div class='containerTitle__category-brand'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1875 21.5625 14.3125 20.6875C13.4375 19.8125 13 18.75 13 17.5C13 16.25 13.4375 15.1875 14.3125 14.3125C15.1875 13.4375 16.25 13 17.5 13C18.75 13 19.8125 13.4375 20.6875 14.3125C21.5625 15.1875 22 16.25 22 17.5C22 18.75 21.5625 19.8125 20.6875 20.6875C19.8125 21.5625 18.75 22 17.5 22ZM3 21.5V13.5H11V21.5H3ZM17.5 20C18.2 20 18.7917 19.7583 19.275 19.275C19.7583 18.7917 20 18.2 20 17.5C20 16.8 19.7583 16.2083 19.275 15.725C18.7917 15.2417 18.2 15 17.5 15C16.8 15 16.2083 15.2417 15.725 15.725C15.2417 16.2083 15 16.8 15 17.5C15 18.2 15.2417 18.7917 15.725 19.275C16.2083 19.7583 16.8 20 17.5 20ZM5 19.5H9V15.5H5V19.5ZM10.05 9H13.95L12 5.85L10.05 9Z" fill="black"/></svg>

            <h2 class='title-category'>Agregar una nueva categoría</h2>

            <button class='close-category-brand'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/></svg>
            </button>
        </div>

        <p>
            Seleccione la categoría en la que se va agregar el nuevo elemento o haga click en el boton de + para agregar una nueva categoría. 
        </p>

        <form class='form-category-brand' id='form-add__category'>
            <label for='addCategoryWindow'>Elija la categoría</label>

            <div class='containerCategory__flex'>
                <select id='addCategoryWindow' name='addCategory' required>
                    <option value=''>No se ha seleccionado una categoría</option>
                </select>
            </div>

            <label for='addSubCategory'>Escriba el nombre de las nuevas subcategorías</label>

            <div class='containerCategory__flex'>
                <input type='text' id='addSubCategory' name='addSubCategory' placeholder='Ejemplo: Laptop'>

                <button id='addSubCategoryWindow' class='addCategory' type='button'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="#BDBDBD"/></svg>
                </button>
            </div>

            <ul id='listSubcategory'>

            </ul>

            <button type='submit' class='button__category'>Guardar</button>
        </form>
    `;

    addCategory.addEventListener('click', async() => {
        windowCategoryAndBrand();
        const container = document.querySelector('.container-category-brand');
        container.innerHTML = html;

        const butonClose = container.querySelector('.close-category-brand');
        const selectCategory = document.getElementById('addCategoryWindow');
        const listSubcategory = document.getElementById('listSubcategory');
        const inputAddSubCategory = document.getElementById('addSubCategory');
        const buttonAddSubCategory = document.getElementById('addSubCategoryWindow');
        const form = document.getElementById('form-add__category');

        butonClose.addEventListener('click', () => { deleteCategoryAndBrand() });

        try {
            const response = await getDataServer('../server/data/categories.php');
    
            for(let category in response) {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
    
                selectCategory.appendChild(option);
            }
        } catch (error) {
            console.log(error);
        }

        buttonAddSubCategory.addEventListener('click', () => {
            const subcategory = inputAddSubCategory.value;

            if(selectCategory.value === '') {
                alert('Primero debes seleccionar una categoría.');
                return;
            }

            if(subcategory.trim() === '') {
                alert('El campo de subcategoría no puede estar vacío.');
                return;
            }

            const listItem = `<li>
                <div class='circle-subcategory'></div> 
                <span>${subcategory}</span>
                
                <button class='delete-subcategory' type='button'>x</button>
            </li>`;

            listSubcategory.innerHTML += listItem;
            inputAddSubCategory.value = '';

            const buttonDeleteSubcategory = document.querySelectorAll('.delete-subcategory');

            buttonDeleteSubcategory.forEach(button => button.addEventListener('click', () => button.parentElement.remove()));
        });

        form.addEventListener('submit', async(event) => {
            event.preventDefault();

            const itemList = listSubcategory.querySelectorAll('li');
            const category = selectCategory.value;
            const subcategories = [...itemList].map(item => item.querySelector('span').textContent);

            if(subcategories.length === 0) {
                alert('Debes agregar al menos una subcategoría.');
                return;
             }

             try {
                const response = await sendDataServer('../server/insert/category_subcategory.php', { 
                    nom_categoria: category, 
                    subcategorias: subcategories 
                });

                if(response.message) {
                    alert(response.message);
                    window.location.reload();
                    
                    return;
                }

                alert(response.error);
             } catch (error) {
                 console.log(error);
             }
        });


    });
}

const addBrandDevice = () => {
    const addBrand = document.getElementById('addBrand');
    const html = `
        <div class='containerTitle__category-brand'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_147_20)"><path d="M3 21V7H7V3H17V11H21V21H13V17H11V21H3ZM5 19H7V17H5V19ZM5 15H7V13H5V15ZM5 11H7V9H5V11ZM9 15H11V13H9V15ZM9 11H11V9H9V11ZM9 7H11V5H9V7ZM13 15H15V13H13V15ZM13 11H15V9H13V11ZM13 7H15V5H13V7ZM17 19H19V17H17V19ZM17 15H19V13H17V15Z" fill="black"/></g><defs><clipPath id="clip0_147_20"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>

            <h2 class='title-category'>Agregar una nueva marca</h2>

            <button class='close-category-brand'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/></svg>
            </button>
        </div>

        <p>Asegurese de colocar el nombre de una marca existente para evitar errores en los datos.</p>

        <form class='form-category-brand' id='form-add__brand'>
            <label for='addBrandWindow'>Escriba el nombre de la marca</label>
            <input type='text' id='addBrandWindow' name='addBrand' placeholder='Ejemplo: SAMSUNG' required>

            <button type='submit' class='button__category'>Guardar</button>
        </form>
    `;

    addBrand.addEventListener('click', () => {
        windowCategoryAndBrand();
        const container = document.querySelector('.container-category-brand');
        container.innerHTML = html;

        const butonClose = container.querySelector('.close-category-brand');
        butonClose.addEventListener('click', () => { deleteCategoryAndBrand() });

        const form = document.getElementById('form-add__brand');

        form.addEventListener('submit', async(event) => {
            event.preventDefault();
            const inputBrand = document.getElementById('addBrandWindow');
            const brand = inputBrand.value;

            if(brand.trim() === '') {
                alert('El campo de marca no puede estar vacío.');
                return;
            }

            try {
                const response = await sendDataServer('../server/insert/brand.php', { nom_marca: brand });

                console.log(response);
                if(response.message) {
                    alert(response.message);
                    window.location.reload();
                    
                    return;
                }

                alert(response.error);
             } catch (error) {
                 console.log(error);
             }
        });
    });
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
    const spanInvoice = document.getElementById('spanInputFile');
    const inputImageDevices = document.getElementById('imageDevices');
    const spanImageDevices = document.getElementById('spanInputImage');

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

        if(valueInput.length < 8 || valueInput.length > 30) {
            alert('El número de serie del equipo debe tener mínimo 10 caracteres y un maximo de 30 caracteres.');
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
        const numberFiles = event.target.files.length;

        if(numberFiles === 1) {
            spanInvoice.textContent = `${numberFiles} archivo seleccionado.`;
            return;
        }

        spanInvoice.textContent = `No hay facturas seleccionadas.`;
    });

    inputImageDevices.addEventListener('change', (event) => {
        const numberFiles = event.target.files.length;

        if(numberFiles > 3) {
            alert('Sólo puedes seleccionar hasta 3 imágenes.');
            inputImageDevices.value = '';

            return;
        }

        if(numberFiles > 0) {
            spanImageDevices.textContent = `${numberFiles} archivo seleccionado.`;
            return;
        }

        spanImageDevices.textContent = `No hay imágenes seleccionadas.`;
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
        const inputNumberPhone = document.getElementById('num_telefono');
        const containerInputNumberPhone = document.getElementById('hiden-inputs-numberPhone');
    
        if(devicesWithAddresses.includes(value)) {
            inputsHiden.forEach(element => {
                element.style.display = 'flex';
                inputAddressEthernet.setAttribute('required', '');
                inputAddressWifi.setAttribute('required', '');
            });
        } else {
            inputsHiden.forEach(element => {
                element.style.display = 'none';
                inputAddressEthernet.removeAttribute('required');
                inputAddressWifi.removeAttribute('required');
                inputAddressEthernet.value = '';
                inputAddressWifi.value = '';
            });
        }
    
        if(devicesWitchNumberPhone.includes(value)) {
            containerInputNumberPhone.style.display = 'flex';
            inputNumberPhone.setAttribute('required', '');
        } else {
            containerInputNumberPhone.style.display = 'none';
            inputNumberPhone.removeAttribute('required');
            inputNumberPhone.value = '';
        }
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
        const spanFile = document.getElementById('spanInputFile');
        const spanImage = document.getElementById('spanInputImage');

        if(result.status === 'success') {
            alert(result.message);

            if(inputCodeEquipment.value.trim() === '' ) {
                generateCodeQR(imageQR, result.equipment_id, result.formatted_equipment_id);
            }
            cleanInputsForm('imageDevices', 'invoiceDevices');
            
            spanFile.textContent = 'No hay facturas seleccionadas.';
            spanImage.textContent = 'No hay imágenes seleccionadas.';

            return;
        }
        console.log(result);
        alert(result.message);
    });
}

export const formRegisterEquipment = ( foreheadCurrent ) => {
    document.getElementById('root-forms').innerHTML = formsEquipment[foreheadCurrent];
    functionalitiesRegisterEquipment();
    addCategoryDevice();
    addBrandDevice();
}