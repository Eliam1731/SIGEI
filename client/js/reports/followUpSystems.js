import { dateInFormatText } from "../utilities/textDate.js";

const closeWindow = ( root ) => root.remove();

const renderDetailsDevice = ( device, root ) => {
    const { Equipo_id, Nom_subcategoria, Nom_marca, Modelo, Num_serie, Especificacion, Fecha_compra, Fecha_garantia, Importe, Direccion_mac_wifi, Direccion_mac_ethernet, Num_ref_compaq, Service_tag, Comentarios, miId, num_telefono  } = device;
    const rootDetails = document.createElement('div');
    const html = `
            <div class="container-closeForehead">
                <button id="prevSectionForehead">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.86875 6.75L7.06875 10.95L6 12L0 6L6 0L7.06875 1.05L2.86875 5.25H12V6.75H2.86875Z" fill="#9E9E9E"/></svg>
                </button>

                <h2>Información detallada del equipo</h2>
            </div>

            <div class='container-info__device'>
                <dl>
                    <div class='row-info__device'>
                        <dt>Subcategoría del equipo</dt>
                        <dd>${Nom_subcategoria}</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Marca del equipo</dt>
                        <dd>${Nom_marca}</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Código OPC</dt>
                        <dd>${miId}</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Modelo del equipo</dt>
                        <dd>${Modelo}</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Número de serie</dt>
                        <dd>${Num_serie}</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Service tag del equipo</dt>
                        <dd>${Service_tag}</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Fecha de compra</dt>
                        <dd>${ (Fecha_compra === '0000-00-00') ? 'No se ha seleccionado una fecha de compra.' : dateInFormatText( Fecha_compra ) }</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Fecha en la que expira la garantía</dt>
                        <dd>${ (Fecha_garantia === '0000-00-00') ? 'No se ha seleccionado una fecha de vencimiento para la garantía.' : dateInFormatText( Fecha_garantia ) }</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Importe del equipo</dt>
                        <dd>$${Importe}</dd>
                    </div>
                    
                    <div class='row-info__device'>
                        <dt>Especificación del equipo</dt>
                        <dd>${Especificacion}</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Numero de referencia de Compras</dt>
                        <dd>${ (Num_ref_compaq === '') ? 'El equipo no tiene un número de referencia de compra.' : Num_ref_compaq }</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Dirección MAC Ethernet</dt>
                        <dd>${ (!Direccion_mac_ethernet) ? 'El equipo no cuenta con una dirección MAC Ethernet.' : Direccion_mac_ethernet }</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Dirección MAC Wi-Fi</dt>
                        <dd>${ (!Direccion_mac_wifi) ? 'El equipo no cuenta con una dirección MAC WI-FI.' : Direccion_mac_wifi }</dd>
                    </div>

                    <div class='row-info__device'>
                        <dt>Número de teléfono</dt>
                        <dd>${(!num_telefono) ? 'El equipo no cuenta con un número telefónico.' : num_telefono}</dd>
                    </div>

                    <div class='row-info__device'>
                    <dt>Comentario acerca del equipo</dt>
                    <dd>${(!Comentarios) ? 'El equipo no tienen comentarios.' : Comentarios}</dd>
                    </div>
                </dl>
            </div>`;

    rootDetails.classList.add('root-details__device');
    root.appendChild(rootDetails);
    rootDetails.innerHTML = html;
    const prevSection = document.getElementById('prevSectionForehead');
    prevSection.addEventListener('click', () => rootDetails.remove());
}

const renderDataTable = ( devices, tbody) => {
    devices.forEach( device => {
        const { miId: code, Nom_subcategoria, Nom_marca, Modelo, Num_serie } = device;
        const tr = document.createElement('tr');
        const buttonDetails = document.createElement('button');
        buttonDetails.textContent = 'Ver detalles';
        buttonDetails.addEventListener('click', () => { renderDetailsDevice( device, document.getElementById('sectionTableDevices') )});

        const tdButton = document.createElement('td');
        tdButton.appendChild(buttonDetails);

        const html = `
            <td>${ code }</td>
            <td>${ Nom_subcategoria } ${ Nom_marca } ${ Modelo } ${ Num_serie }</td>
        `;

        tr.innerHTML = html;
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    });
}

const windowDetailsDevices = ( devices ) => {
    const root = document.createElement('div');
    const window = document.createElement('div');
    const html = `
        <section id='sectionTableDevices'>
            <h4>Dispositivos en resguardo por sistemas</h4>
            <p>Por favor, haga clic en la fila del equipo sobre el que desea obtener más información.</p>

            <div class="root_devices">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Información del equipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="renderDataEquipments"></tbody>
                </table>
            </div>
        </section>

        <section id='summary-safeguard'>
            <h4>Cantidad de dispositivos por categoría</h4>

            <div id='rootCard-category'></div>
        </section>
    `;

    root.classList.add('root-window-details__safeguards');
    document.body.appendChild(root);
    root.appendChild(window);
    root.addEventListener('click', event => { if( event.target === root ) closeWindow( root ) });
    window.innerHTML = html;
    renderDataTable( devices, document.getElementById('renderDataEquipments') );
    console.warn( devices );
}

export const followUpRenderSystems = ( data, root ) => {
    if(data.sistemas.length === 0) return;

    const { sistemas: devices } = data;
    const rootCard = document.createElement('div');
    const html = `
        <div>
            <h4>Nombre del frente</h4>
            <p>Sistemas</p>
        </div>
        <div>
            <h4>Cantidad de equipos</h4>
            <p>${ devices.length }</p>
        </div>
    `;  

    rootCard.classList.add('card-follow-up');
    root.appendChild(rootCard);
    rootCard.innerHTML = html;
    rootCard.addEventListener('click', () => windowDetailsDevices( devices ));
}