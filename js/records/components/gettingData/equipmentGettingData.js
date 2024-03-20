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

export const gettingDataInputsEquipment = ( images, invoice ) => {
    const objectDataInputs = inputsIDs.reduce((acc, id) => {
        const input = document.getElementById(id);
        acc[id] = input.value;

        return acc;
    }, {});

    console.log(objectDataInputs);
    console.log(images);
}