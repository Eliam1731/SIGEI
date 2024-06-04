import { getDataServer } from "../utilities/getDataServer.js";
import { renderTableOfLowDevices } from "./low/lowDevices.js";
import { renderTableOfSafeguardsFinished } from "./safeguards/safeguardsFinished.js";

const elementsDOM = {
    listItemSafeguards: 'listItemSafeguards',
    listItemDeviceLow: 'listItemDevicesLow',
    articleSafeguards: 'table-safeguards',
    articleDevicesLow: 'table-devices__low',
    tbodySafeguards: 'table-safeguards__finished',
    tbodyDevicesLow: 'table-lowDevices',
}

const itemNavSafeguard = document.getElementById( elementsDOM.listItemSafeguards );
const itemNavDeviceLow = document.getElementById( elementsDOM.listItemDeviceLow );
const articleSafeguards = document.getElementById( elementsDOM.articleSafeguards );
const articleDevicesLow = document.getElementById( elementsDOM.articleDevicesLow );
const tbodySafeguards = document.getElementById( elementsDOM.tbodySafeguards );
const tbodyDevicesLow = document.getElementById( elementsDOM.tbodyDevicesLow );

document.addEventListener('DOMContentLoaded', () => itemNavSafeguard.click());

itemNavSafeguard.addEventListener('click', async() => {
    articleSafeguards.style.display = 'flex';
    articleDevicesLow.style.display = 'none';

    itemNavSafeguard.classList.add('li-selected');
    itemNavDeviceLow.classList.remove('li-selected');

    try {
        const safeguardsFinished = await getDataServer('../server/data/historyvisualization.php');
 
        renderTableOfSafeguardsFinished(safeguardsFinished, tbodySafeguards);
    } catch(error) {
        throw new Error(error);
    }
});

itemNavDeviceLow.addEventListener('click', async() => {
    articleDevicesLow.style.display = 'flex';
    articleSafeguards.style.display = 'none';

    itemNavDeviceLow.classList.add('li-selected');
    itemNavSafeguard.classList.remove('li-selected');

    try {
        const devicesLow = await getDataServer('../server/data/low_history.php');
        console.log(devicesLow);
  
        renderTableOfLowDevices( devicesLow, tbodyDevicesLow );
    } catch(error) {
        throw new Error(error);
    }
});