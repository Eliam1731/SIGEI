import { getDataServer } from "./getDataServer.js"

export const embedFrontsInSelect = async( itemSelect, boolean ) => {
    const forehead = await getDataServer('../server/data/forehead.php');
    const foreheadOption = document.createElement('option');

    forehead.forEach( forehead => {
        if(forehead[1] == sessionStorage.getItem('forehead')) {
            foreheadOption.value = forehead[0];
            foreheadOption.textContent = forehead[1];
            
            itemSelect.append(foreheadOption);
        }
    });
}