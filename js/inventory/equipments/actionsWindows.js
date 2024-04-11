const firstSectionActions = ( dataOriginal ) => {
    const rootActions = document.getElementById('root-actions');
    const data = dataOriginal[0];

    const html = `
            <h2>Actualizar datos del equipo</h2>

            <form id='form-update-device'>
                <label for='category'>Elija la categoría del equipo (opcional).</label>
                <select id='category' name='category' required>
                    <option value='${data.subcategoria}' selected>${data.subcategoria}</option>
                </select>

                <label for='brand'>Elija la marca del equipo (opcional).</label>
                <select id='brand' name='brand' required>
                    <option value='${data.marca}' selected>${data.marca}</option>
                </select>

                <label for='model'>Actualice el modelo del equipo (opcional).</label>
                <input type='text' id='model' name='model' value='${data.modelo}' required>

                <label for='serial'>Actualice el número de serie del equipo (opcional).</label>
                <input type='text' id='serial' name='serial' value='${data.numSerie}' required>

                <label for='dateBuys'>Actualice la fecha de la compra (opcional).</label>
                <input class='input-forms' type='date' id='dateBuys' name='dateBuys' value='${data.fechaCompra}' required>

                <label for='dateWarranty'>Actualice la fecha en la que expira la garantía (opcional).</label>
                <input class='input-forms' type='date' id='dateWarranty' name='dateWarranty' value='${data.fechaGarantia}' required>

                <label for='price'>Actualice el importe del equipo (opcional).</label>
                <input type='number' id='price' name='price' value='${data.importe}' required>

                <label for='specification'>Actualice la especificación del equipo (opcional).</label>
                <textarea id='specification' name='specification' required>${data.especificacion}</textarea>

                <label for='comments'>Actualice los comentarios del equipo (opcional).</label>
                <textarea id='comments' name='comments' required>${data.comentarios}</textarea>

                <label for='serviceTag'>Actualice el service tag del equipo (opcional).</label>
                <input type='text' id='serviceTag' name='serviceTag' value='${data.serviceTag}' required>

                <label for='numberReferencePurchases'>Actualice el numero de referencia de compras (opcional).</label>
                <input type='text' id='numberReferencePurchases' name='numberReferencePurchases' value='${data.referenciaCompaq}' required>

                <label for='macEthernet'>Actualice la dirección MAC Ethernet (opcional).</label>
                <input type='text' id='macEthernet' name='macEthernet' value='${data.direccionMacEthernet}'>

                <label for='macWifi'>Actualice la dirección MAC Wifi (opcional).</label>
                <input type='text' id='macWifi' name='macWifi' value='${data.direccionMacWifi}'>

                <button type='submit'>Actualizar</button>
            </form>
    `;

    rootActions.innerHTML = html;
}

const secondSectionActions = ( data ) => {
    
}

const thirdSectionActions = ( data ) => {
        
}

const fourthSectionActions = ( data ) => {
        
}

export const windowActionsDevices = ( data ) => {
    const containerClose = document.createElement('div');
    const containerActions = document.createElement('div');
    const html = `
        <section id='root-actions'>
        
        </section> 

        <nav id='nav-actions'>
            <ul>
                <li>Actualizar datos del equipo</li>
                <li>Añadir gastos al equipo</li>
                <li>Gatos del equipo</li>
                <li>Resguardante</li>
            </ul>
        </nav>

    `;

    containerActions.innerHTML = html;
    containerClose.classList.add('actions-container');
    document.body.appendChild(containerClose);
    containerClose.appendChild(containerActions);

    containerClose.addEventListener('click', (event) => {
        if(event.target === containerClose) {
            containerClose.remove();
        }
    });

    const updateDevice = document.querySelector('#nav-actions li:nth-child(1)');
    const addExpenses = document.querySelector('#nav-actions li:nth-child(2)');
    const expensesDevice = document.querySelector('#nav-actions li:nth-child(3)');
    const resguardante = document.querySelector('#nav-actions li:nth-child(4)');

    firstSectionActions(data);

    updateDevice.addEventListener('click', () => {
        firstSectionActions(data);
    });

    addExpenses.addEventListener('click', () => {
        secondSectionActions(data);
    });

    expensesDevice.addEventListener('click', () => {
        thirdSectionActions(data);
    });

    resguardante.addEventListener('click', () => {
        fourthSectionActions(data);
    });
  
}