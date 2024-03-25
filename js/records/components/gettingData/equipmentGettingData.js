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
];

export const generateCodeQR = ( image, equipmentID, nameImage  ) => {
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${equipmentID}`;

    image.addEventListener('load', ()=> {
        let pathImg = image.getAttribute('src');
        let fileName = nameImage;

        fetch(pathImg)
        .then( response => response.blob())
        .then(blob => saveAs( blob, fileName + '.png' ));
    });

    let pathImg = image.getAttribute('src');
    let fileName = nameImage;

    fetch(pathImg)
    .then( response => response.blob())
    .then(blob => saveAs( blob, fileName + '.png' ));
}

export const cleanInputsForm = ( inputImage, inputFile ) => {
    const inputsFile = [inputImage, inputFile];
    const inputRestoreValue = inputsIDs.concat(inputsFile);

    inputRestoreValue.forEach(element => {
        if(element === 'select__category' || element === 'brandDevices') return;

        const input = document.getElementById(element);
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