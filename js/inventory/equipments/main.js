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

redirectionRecords.addEventListener('click', () => window.location.href = '../pages/records.php');

devicesSection.addEventListener('click', () => {
    if (firstSection.style.display === 'none') firstSection.style.display = 'block';

    secondSection.style.display = 'none';
});

employeesSection.addEventListener('click', () => {
    if (secondSection.style.display === 'none') secondSection.style.display = 'block';

    firstSection.style.display = 'none';
});



elementsEquipmentsDOM.formCodeDevice.addEventListener('submit', (event) => {
    event.preventDefault();
});

elementsEquipmentsDOM.filterBtn.addEventListener('click', () => {
    if(document.querySelector('.filter-container')) {
        document.querySelector('.filter-container').remove();

        return;
    }

    const container = document.createElement('div');
    container.classList.add('filter-container');
    
    container.innerHTML = `
        <div class="filter">         
            <label for='1'><input type='checkbox' id='disponible' ${checkboxStates.available ? 'checked' : ''}><span>Disponible</span></label>
        </div>

        <div class="filter">
            <label for='2'><input type='checkbox' id='enResguardo' ${checkboxStates.inResguardo ? 'checked' : ''}><span>En resguardo</span></label>    
        </div>

        <div class="filter">    
            <label for='3'><input type='checkbox' id='enMantenimiento' ${checkboxStates.inMaintenance ? 'checked' : ''}><span>En mantenimiento</span></label>
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
            if (!container.contains(event.target) && event.target !== elementsEquipmentsDOM.filterBtn) {
                container.remove();
            }
        });
    }, 0);
});