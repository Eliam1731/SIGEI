import { getDataServer } from "../utilities/getDataServer.js";
import { renderFollowUp } from "./followUpRender.js";
import { followUpRenderSystems } from "./followUpSystems.js";
const root = document.querySelector('.container-details-resguards')

document.addEventListener('DOMContentLoaded', async() => {
    try {
        const followUpDevice = await getDataServer('../server/data/resguardvisualization.php');
        const guardDevicesSystemsUsers = await getDataServer('../server/data/resguard_systems.php');

        followUpRenderSystems( guardDevicesSystemsUsers, root);
        renderFollowUp( followUpDevice, root);
    } catch(error) {
        console.error('Error:', error);
    }
});