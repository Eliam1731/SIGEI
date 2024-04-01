const inputsIDs = [
    'select__category',
    'brandDevices',
    'modelDevices',
    'serialNumber',
    'dateBuy',
    'dateExpiresWarranty',
    'amountDevices',
    'addressMacWifi',
    'specificationDevices',
    'detailsExtraDevices',
    'serviceTag',
    'referenceCompaq',
    'addressEthernet',
    'codeEquipment'
];

export const generateCodeQR = ( image, equipmentID, nameImage  ) => {
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${nameImage}`;

    image.addEventListener('load', ()=> {
        let pathImg = image.getAttribute('src');
        let fileName = nameImage;

        fetch(pathImg)
        .then( response => response.blob())
        .then(blob => saveAs( blob, fileName + '.png' ));
    });
}

export const cleanInputsForm = ( inputImage, inputFile ) => {
    const inputsFile = [inputImage, inputFile];
    const inputRestoreValue = inputsIDs.concat(inputsFile);

    inputRestoreValue.forEach(element => {
        const input = document.getElementById(element);

        if(element === 'select__category' || element === 'brandDevices') {
            input.selectedIndex = 0;

            return
        };
        
        input.value = '';
    });
}

export const gettingDataInputsEquipment = async(images, invoice) => {
    const objectDataInputs = inputsIDs.reduce((acc, id) => {
        const input = document.getElementById(id);
        acc[id] = input.value;

        return acc;
    }, {});

    const formData = new FormData();

    for (let key in objectDataInputs) {
        formData.append(key, objectDataInputs[key]);
    }

    for (let image of images.values()) {
        formData.append('images[]', image);
    }

    for (let invoiceFile of invoice.values()) {
        formData.append('invoices[]', invoiceFile);
    }

    return formData;
}