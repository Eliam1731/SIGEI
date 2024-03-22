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