import { dateInFormatText } from "../utilities/textDate.js";

const colorsCard = ['#EAB308', '#22C55E', '#9333EA', '#DB2777', '#0F172A', '#0EA5E9', '#833F0E', '#03A9F4', '#00BCD4', '#009688', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF9800', '#795548', '#9E9E9E', '#607D8B'];

const closeWindowDetails = ( root ) => root.remove();

const windowDetailsDeviceEmployee = ( device, employee ) => {
    const rootWindow = document.createElement('div');
    const windowDetails = document.createElement('div');
    const html = `
            <div class="container-closeForehead">
                <button id="prevSectionForehead__employee">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.86875 6.75L7.06875 10.95L6 12L0 6L6 0L7.06875 1.05L2.86875 5.25H12V6.75H2.86875Z" fill="#9E9E9E"/></svg>
                </button>

                <h4>Dispositivos en resguardo por ${ employee }</h4> 
            </div>

            <div id='root-data__devices'></div>
    `;

    rootWindow.classList.add('root-window-details__employee-devices');
    rootWindow.append(windowDetails);
    document.body.appendChild(rootWindow);
    windowDetails.innerHTML = html;
    const rootDataDevices = document.getElementById('root-data__devices');
    const prevSectionForehead__employee = document.getElementById('prevSectionForehead__employee');

    prevSectionForehead__employee.addEventListener('click', () => closeWindowDetails( rootWindow ));

    device.forEach( (device, idx) => {
        const { Comentarios, Direccion_mac_ethernet, Direccion_mac_wifi, Especificacion, Fecha_compra, Fecha_garantia, Importe, Modelo, Nom_categoria, Nom_marca, Nom_subcategoria, Num_ref_compaq, Num_serie, Service_tag, miId, num_telefono } = device;

        const html = `
            <h2>Información detallada del equipo núm. ${ idx + 1 }</h2>

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

            rootDataDevices.innerHTML += html;
    });
}

const createCardTotalDeviceEmployee = ( data, root ) => {
    const devicesCountCategory = {};

    Object.keys(data.empleados).forEach( employee => {
        data.empleados[employee].equipos.forEach( device => {
            const { Nom_subcategoria: subcategory } = device;

            ( devicesCountCategory[subcategory] ) ? devicesCountCategory[subcategory]++ : devicesCountCategory[subcategory] = 1;
        });
    });

    Object.keys(devicesCountCategory).forEach( (category, idx) => {
        const card = `
            <div class='card-category-count'>
                <div style='background: ${ ( colorsCard[idx] ) ? colorsCard[idx] : colorsCard[0] }'>
                    <h5>${ category.split(' ').map( word => word[0].toUpperCase()).join('') }</h5>
                </div>

                <div>
                    <h5>${category}</h5>
                    <p>${devicesCountCategory[category]} ${ ( devicesCountCategory[category] > 1 ) ? 'dispositivos' : 'dispositivo' }</p>
                </div>
            </div>
        `;

        root.innerHTML += card;
    });
}

const windowEmployeeDetails = ( data, nameForehead ) => {
    const rootWindow = document.createElement('div');
    const windowDetails = document.createElement('div');
    const html = `
        <section id="rootDetailsForehead">
            <div class="container-closeForehead">
                <button id="prevSectionForehead">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.86875 6.75L7.06875 10.95L6 12L0 6L6 0L7.06875 1.05L2.86875 5.25H12V6.75H2.86875Z" fill="#9E9E9E"/></svg>
                </button>

                <h4>Información general de ${ nameForehead }</h4>
            </div>

            <div id='root-table__employeeFront'>
                <table>
                    <thead>
                        <tr>
                            <th>Empleado</th>
                            <th>Correo</th>
                            <th>Cantidad de equipos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="renderEmployeeForehead"></tbody>
                </table>
            </div>
        </section>

        <section id='summary-work'>
            <h4>Dispositivos en resguardo por el frente</h4>

            <div id='rootCard-category__forehead'></div>
        </section>
    `;

    rootWindow.classList.add('root-window-details__employee');  
    document.body.appendChild(rootWindow);
    rootWindow.append(windowDetails);
    windowDetails.innerHTML = html;
    const prevSectionForehead = document.getElementById('prevSectionForehead');
    const tbody = document.getElementById('renderEmployeeForehead');

    prevSectionForehead.addEventListener('click', () => closeWindowDetails( rootWindow ));

    Object.keys(data.empleados).forEach( employee => {
        const { Correo_electronico, Nombre, Primer_apellido, Segundo_apellido, equipos } = data.empleados[employee];
        const button = document.createElement('button');

        button.textContent = 'Ver detalles';
        button.addEventListener('click', () => windowDetailsDeviceEmployee( data.empleados[employee].equipos, `${ Nombre }${ Primer_apellido }${ Segundo_apellido }` ));

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${Nombre} ${Primer_apellido} ${Segundo_apellido}</td>
            <td>${Correo_electronico}</td>
            <td>${equipos.length}</td>
            <td></td>
        `;
        row.children[3].appendChild(button);

        tbody.appendChild(row);
    });

    createCardTotalDeviceEmployee( data, document.getElementById('rootCard-category__forehead') );
}

const createCardTotalDeviceFront = ( data, root ) => {
    const devicesCountCategory = {};

    Object.keys(data).forEach( front => {
        Object.keys(data[front].empleados).forEach( employee => {
            data[front].empleados[employee].equipos.forEach( device => {
                const { Nom_subcategoria: subcategory } = device;

                ( devicesCountCategory[subcategory] ) ? devicesCountCategory[subcategory]++ : devicesCountCategory[subcategory] = 1;
            });
        });
    });

    Object.keys(devicesCountCategory).forEach( (category, idx) => {
        const card = `
            <div class='card-category-count'>
                <div style='background: ${ ( colorsCard[idx] ) ? colorsCard[idx] : colorsCard[0] }'>
                    <h5>${ category.split(' ').map( word => word[0].toUpperCase()).join('') }</h5>
                </div>

                <div>
                    <h5>${category}</h5>
                    <p>${devicesCountCategory[category]} ${ ( devicesCountCategory[category] > 1 ) ? 'dispositivos' : 'dispositivo' }</p>
                </div>
            </div>
        `;

        root.innerHTML += card;
    });
}

const createCardForehead = ( data, root ) => {
    Object.keys( data ).forEach( front => {
        const createCard = document.createElement('div');
        const totalEquipos = Object.values(data[front].empleados).reduce((total, empleado) => total + empleado.equipos.length, 0);
        const html = `
            <div>
                <h5>Nombre del frente</h5>

                <p>${front} <span>| núm. ${ data[front].numero_frente }</span></p>
            </div>

            <div>
                <div>
                    <h5>Cantidad de empleados</h5>

                    <span>${ Object.keys(data[front].empleados).length }</span>
                </div>

                <div>
                    <h5>Cantidad de equipos</h5>

                    <span>${ totalEquipos }</span>
                </div>
            </div>
        `;

        createCard.innerHTML = html;
        createCard.classList.add('card-forehead-summary');
        root.appendChild(createCard);
        createCard.addEventListener('click', () => windowEmployeeDetails( data[front], front ));
    });

    const rootCardCategory = document.getElementById('rootCard-category__work');
    createCardTotalDeviceFront( data, rootCardCategory );
}

const windowDetailsForehead = ( forehead, nameWork ) => {
    const rootWindow = document.createElement('div');
    const windowDetails = document.createElement('div');
    const htmlForehead = `
        <section id="rootDetailsForehead">
            <div class="container-closeForehead">
                <button id="prevSectionWork">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.86875 6.75L7.06875 10.95L6 12L0 6L6 0L7.06875 1.05L2.86875 5.25H12V6.75H2.86875Z" fill="#9E9E9E"/></svg>
                </button>

                <h4>Información general de la obra</h4>
            </div>

            <h4>${ nameWork }</h4>

            <p>Por favor, haga clic en el frente sobre la que desea obtener más información.</p>

            <div id='rootCard-forehead'></div>
        </section>

        <section id='summary-work'>
            <h4>Dispositivos en resguardo por la obra</h4>

            <div id='rootCard-category__work'></div>
        </section>
    `;

    rootWindow.classList.add('root-window-details__Forehead');

    rootWindow.append(windowDetails);
    document.body.appendChild(rootWindow);
    windowDetails.innerHTML = htmlForehead;

    const buttonPrevSection = document.getElementById('prevSectionWork');
    const rootCards = document.getElementById('rootCard-forehead');

    buttonPrevSection.addEventListener('click', () => closeWindowDetails( rootWindow ));
    createCardForehead( forehead, rootCards );
}

const createCardWorks = ( data, root ) => {
    Object.keys(data).forEach( work => {
        const createCard = document.createElement('div');
        const card = `
            <div>
                <h5>Nombre de la obra</h5>

                <p>${work} <span>| núm. ${ data[work].Num_obra }</span></p>
            </div>
            <div>
                <div>
                    <h5>Cantidad de frentes</h5>

                    <span>${ Object.keys(data[work].frentes).length }</span>
                </div>
                <div>
                    <h5>Cantidad de empleados</h5>

                    <span>${
                        Object.values(data[work].frentes).reduce((count, currentFront) => {
                            return count + Object.keys(currentFront.empleados).length;
                        }, 0)
                    }</span>
                </div>
                <div>
                    <h5>Cantidad de equipos</h5>

                    <span>
                        ${
                            Object.values(data[work].frentes).reduce((count, currentFront) => {
                                return count + Object.values(currentFront.empleados).reduce((countEmployees, currentEmployee) => {
                                    return countEmployees + Object.keys(currentEmployee.equipos).length;
                                }, 0);
                            }, 0)
                        }
                    </span>
                </div>
            </div>
        `;

        createCard.classList.add('card-work-summary');
        createCard.innerHTML = card;

        root.appendChild(createCard);
        createCard.addEventListener('click', () => windowDetailsForehead( data[work].frentes, work ));
    });
}

const createCardTotalDevice = ( data, root ) => {
    const devicesCountCategory = {};

    Object.keys(data).forEach( work => {
        Object.keys(data[work].frentes).forEach( front => {
            Object.keys(data[work].frentes[front].empleados).forEach( employee => {
                data[work].frentes[front].empleados[employee].equipos.forEach( device => {
                    const { Nom_subcategoria: subcategory } = device;

                    ( devicesCountCategory[subcategory] ) ? devicesCountCategory[subcategory]++ : devicesCountCategory[subcategory] = 1;
                });
            });
        });
    });

    Object.keys(devicesCountCategory).forEach( (category, idx) => {
        const card = `
            <div class='card-category-count'>
                <div style='background: ${ ( colorsCard[idx] ) ? colorsCard[idx] : colorsCard[0] }'>
                    <h5>${ category.split(' ').map( word => word[0].toUpperCase()).join('') }</h5>
                </div>

                <div>
                    <h5>${category}</h5>
                    <p>${devicesCountCategory[category]} ${ ( devicesCountCategory[category] > 1 ) ? 'dispositivos' : 'dispositivo' }</p>
                </div>
            </div>
        `;

        root.innerHTML += card;
    });
}

export const windowDetailsDevice = ( data ) => {
    const rootDetails = document.createElement('div');
    const windowDetails = document.createElement('div');
    const htmlRoots = `
        <section id='rootDetailsSafeguars'>
            <h4>Información general de la empresa</h4>

            <p>Por favor, haga clic en la obra sobre la que desea obtener más información.</p>

            <div id='rootCard-works'></div>
        </section>
        <section id='summary-safeguard'>
            <h4>Dispositivos en resguardo por la empresa</h4>

            <div id='rootCard-category'></div>
        </section>
    `;

    rootDetails.classList.add('root-window-details__safeguards');
    rootDetails.append(windowDetails);
    document.body.appendChild(rootDetails);
    rootDetails.addEventListener('click', event => {if( event.target === rootDetails ) closeWindowDetails( rootDetails ) });
    windowDetails.innerHTML = htmlRoots;
    const rootCardCategory = document.getElementById('rootCard-category');
    const rootCardWorks = document.getElementById('rootCard-works');

    createCardTotalDevice( data.obras, rootCardCategory );
    createCardWorks( data.obras, rootCardWorks );
}