import { checkboxAvailableEvent, checkboxInMaintenanceEvent, checkboxInResguardoEvent } from "./renderDevices.js";

const elementsEquipmentsDOM = {
    filterBtn: document.getElementById('enableWindowFilter'),
}

export const checkboxStates = {
    available: false,
    inResguardo: false,
    inMaintenance: false
};

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