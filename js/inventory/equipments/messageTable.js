import { updateDevicesFilter } from "./renderDevices.js";

export const messageTableDevice = ( root, data, checkbox ) => {
    if( data.length > 0 ) return;
    if( !checkbox.available && !checkbox.inResguardo && !checkbox.inMaintenance ) {
        updateDevicesFilter();
        return;
    };

    const message = `
        <div class='message-table'>
            <img src='../images/capibara-table.png'>
            <h3>No hay dispositivos en esta categoría.</h3>
        </div>
    `;
    root.innerHTML = '';
    root.insertAdjacentHTML('beforeend', message);
}