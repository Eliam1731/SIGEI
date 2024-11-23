import { getDataServer } from "../../utilities/getDataServer.js";
import { checkboxAvailableEvent, checkboxInMaintenanceEvent, checkboxInResguardoEvent } from "./renderDevices.js";

const elementsEquipmentsDOM = {
    filterBtn: document.getElementById('enableWindowFilter'),
    formCodeDevice: document.getElementById('search_equipment'),
}

export const checkboxStates = {
    available: false,
    inResguardo: false,
    inMaintenance: false
};

const devicesSection = document.querySelector("#navigation-ul li:nth-child(1)");
const employeesSection = document.querySelector("#navigation-ul li:nth-child(2)");
const firstSection = document.getElementById('equipments_section');
const secondSection = document.getElementById('employee_section');
const redirectionRecords = document.getElementById('redirectionRecords');
const rootCountDevices = document.querySelector('.container-countDevices');

redirectionRecords.addEventListener('click', () => window.location.href = '../pages/records.php');

const renderCountDevice = async () => {
    const { disponible: countAvailableDevice } = await getDataServer('../../server/data/Count/counter_available.php');
    const { resguardo: countInGuardDevice } = await getDataServer('../../server/data/Count/counter_guard.php');
    const { mantenimiento: countInMaintenanceDevice} = await getDataServer('../../server/data/Count/counter_maintennance.php');
    const { total: countTotalDevice } = await getDataServer('../../server/data/Count/counter_total.php');

    rootCountDevices.innerHTML = `
        <h2>Dispositivos</h2>

        <ul class="countDevices">
            <li><span>Disponibles: </span>${countAvailableDevice}</li>
            <li><span>En resguardo: </span>${countInGuardDevice}</li>
            <li><span>En mantenimiento: </span>${countInMaintenanceDevice}</li>
            <li><span>Total de dispositivos: </span>${countTotalDevice}</li>
        </ul>
    `;
}

renderCountDevice();

document.addEventListener('DOMContentLoaded', () => {
    firstSection.style.display = 'block';
    employeesSection.style.color = 'black';
    secondSection.style.display = 'none';
    devicesSection.style.color = '#1A73E8';
});

devicesSection.addEventListener('click', () => {
    if (firstSection.style.display === 'none') {
        firstSection.style.display = 'block';
        employeesSection.style.color = 'black';
    };

    secondSection.style.display = 'none';
    devicesSection.style.color = '#1A73E8';
});

employeesSection.addEventListener('click', () => {
    if (secondSection.style.display === 'none') {
        secondSection.style.display = 'block';
        devicesSection.style.color = 'black';
    };

    firstSection.style.display = 'none';
    employeesSection.style.color = '#1A73E8';
});

elementsEquipmentsDOM.formCodeDevice.addEventListener('submit', (event) => event.preventDefault() );

elementsEquipmentsDOM.filterBtn.addEventListener('click', () => {
    if(document.querySelector('.filter-container')) {
        document.querySelector('.filter-container').remove();

        return;
    }

    const container = document.createElement('div');
    container.classList.add('filter-container');
    
    container.innerHTML = `
        <div class="filter">         
            <label for='disponible'><input type='checkbox' id='disponible' ${checkboxStates.available ? 'checked' : ''}><span>Disponible</span></label>
        </div>

        <div class="filter">
            <label for='enResguardo'><input type='checkbox' id='enResguardo' ${checkboxStates.inResguardo ? 'checked' : ''}><span>En resguardo</span></label>    
        </div>

        <div class="filter">    
            <label for='enMantenimiento'><input type='checkbox' id='enMantenimiento' ${checkboxStates.inMaintenance ? 'checked' : ''}><span>En mantenimiento</span></label>
        </div>
    `;

    document.body.appendChild(container);

    const checkboxAvailable = document.getElementById('disponible');
    const checkboxInResguardo = document.getElementById('enResguardo');
    const checkboxInMaintenance = document.getElementById('enMantenimiento');

    checkboxAvailable.addEventListener('change', () => {    
        checkboxStates.available = checkboxAvailable.checked;
        checkboxAvailableEvent( checkboxAvailable );
    }); 

    checkboxInResguardo.addEventListener('change', () => {
        checkboxStates.inResguardo = checkboxInResguardo.checked;
        checkboxInResguardoEvent( checkboxInResguardo );
    });

    checkboxInMaintenance.addEventListener('change', () => {
        checkboxStates.inMaintenance = checkboxInMaintenance.checked;
        checkboxInMaintenanceEvent( checkboxInMaintenance );
    });

    setTimeout(() => {
        document.addEventListener('click', (event) => {
            if (!container.contains(event.target) && event.target !== elementsEquipmentsDOM.filterBtn) container.remove();
        });
    }, 0);
});