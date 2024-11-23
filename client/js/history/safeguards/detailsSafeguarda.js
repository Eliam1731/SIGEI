import { configureDownloadLink, createBlobFromBytes, decodeBase64ToBytes } from "../../utilities/decodeBase64ToBytes.js";
import { dateInFormatText } from "../../utilities/textDate.js";
const dateInFormatText1 = ( dateString ) => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let [ year, day, month ] = dateString.split('-'); 
    let date = new Date(year, month - 1, day);

    day = date.getDate();
    month = months[date.getMonth()];
    year = date.getFullYear();

    return `${day} de ${month} del ${year}`;
}

const windowDetailsDevice = ( data ) => {
    const { Fecha_inicio, Fecha_terminacion, NombreUsuarioResguardo, ApellidoUsuarioResguardo, SegundoApellidoUsuarioResguardo, NombreUsuarioDevolucion, ApellidoUsuarioDevolucion, SegundoApellidoUsuarioDevolucion } = data;

    const rootActions = document.createElement('div');
    const root = document.createElement('div');

    rootActions.classList.add('root-actions-details-device');
    document.body.appendChild( rootActions );
    rootActions.appendChild( root );

    rootActions.addEventListener('click', (event) => { if ( event.target === rootActions ) rootActions.remove() });
  
    const html = `
        <h2>Información detallada del equipo</h2>
  
        <div class='container-info__device'>
            <dl>
                <div class='row-info__device'>
                    <dt>Fecha de inicio de resguardo</dt>
                    <dd>${ dateInFormatText1( Fecha_inicio ) }</dd>
                </div>

                <div class='row-info__device'>
                    <dt>Fecha en la que finalizo el resguardo</dt>
                    <dd>${ dateInFormatText1( Fecha_terminacion ) }</dd>
                </div>

                <div class='row-info__device'>
                    <dt>Usuario quien autorizo el resguardo</dt>
                    <dd>${ NombreUsuarioResguardo } ${ ApellidoUsuarioResguardo } ${ SegundoApellidoUsuarioResguardo }</dd>
                </div>

                <div class='row-info__device'>
                    <dt>Usuario quien autorizo la devolución de equipos </dt>
                    <dd>${ NombreUsuarioDevolucion } ${ ApellidoUsuarioDevolucion } ${ SegundoApellidoUsuarioDevolucion }</dd>
                </div>

                <div class='row-info__device'>
                    <dt>Subcategoría del equipo</dt>
                    <dd>${ data.Nom_subcategoria }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Marca del equipo</dt>
                    <dd>${ data.Nom_marca }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Código OPC</dt>
                    <dd>${ data.miId }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Modelo del equipo</dt>
                    <dd>${ data.Modelo }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Número de serie</dt>
                    <dd>${ data.Num_serie }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Service tag del equipo</dt>
                    <dd>${ data.Service_tag }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Fecha de compra</dt>
                    <dd>${ (data.Fecha_compra === '0000-00-00') ? 'No se ha seleccionado una fecha de compra.' : dateInFormatText( data.Fecha_compra ) }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Fecha en la que expira la garantía</dt>
                    <dd>${ ( data.Fecha_garantia === '0000-00-00' ) ? 'No se ha seleccionado una fecha de vencimiento para la garantía.' : dateInFormatText( data.Fecha_garantia ) }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Importe del equipo</dt>
                    <dd>$${ data.Importe }</dd>
                </div>
                
                <div class='row-info__device'>
                    <dt>Especificación del equipo</dt>
                    <dd>${ data.Especificacion }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Numero de referencia de Compras</dt>
                    <dd>${ ( data.Num_ref_compaq === '' ) ? 'El equipo no tiene un número de referencia de compra.' : data.Num_ref_compaq }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Dirección MAC Ethernet</dt>
                    <dd>${ ( !data.Direccion_mac_ethernet ) ? 'El equipo no cuenta con una dirección MAC Ethernet.' : data.Direccion_mac_ethernet }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Dirección MAC Wi-Fi</dt>
                    <dd>${ ( !data.Direccion_mac_wifi ) ? 'El equipo no cuenta con una dirección MAC WI-FI.' : data.Direccion_mac_wifi }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Factura del equipo</dt>
                    <dd>
                        <button id='download-invoice'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#E0E0E0"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"/></svg>
                            <span>Descargar factura</span>
                        </button>
                    </dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Imagenes del equipo</dt>
                    <dd>
                        <ul class='list-image-device'>
                            ${data.images.map((image) => {
                              return `<li data-image-blob='${image.Datos_imagen}' data-type-image='${image.Tipo_mime}' data-name-image='${image.Nombre}' data-imagen-id='${image.Imagen_id}' class='listItemImageDevice'>
                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#E0E0E0"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"/></svg>
                                  <span>${image.Nombre}</span>
                                  <button>Descargar</button>
                              </li>`;
                            }).join('')}
                        </ul>
                    </dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Número de teléfono</dt>
                    <dd>${( !data.num_telefono ) ? 'El equipo no cuenta con un número telefónico.' : data.num_telefono}</dd>
                </div>
  
                <div class='row-info__device'>
                  <dt>Comentario acerca del equipo</dt>
                  <dd>${( !data.ComentariosEquipo ) ? 'El equipo no tienen comentarios.' : data.ComentariosEquipo}</dd>
                </div>
  
                <div class='row-info__device'>
                  <dt>Estado</dt>
                  <dd>
                      <span>${data.Status}</span>
                  </dd>
                </div>
            </dl>
        </div>
    `;
  
    root.innerHTML = html;
    const downloadInvoice = document.getElementById("download-invoice");
    const buttonsDownloadImage = document.querySelectorAll('.listItemImageDevice button');
    const spansViewImage = document.querySelectorAll('.listItemImageDevice span');
  
    spansViewImage.forEach( span => {
      span.addEventListener('click', () => {
        const closeWindow = document.createElement('div');
        const rootImage = document.createElement('div');
        const image = document.createElement('img');
        const imageBlob = span.parentElement.getAttribute('data-image-blob');
        const type = span.parentElement.getAttribute('data-type-image');
        const imagedata = `data:${type};base64,${imageBlob}`;
  
        closeWindow.setAttribute('class', 'close-window-image');
        rootImage.setAttribute('class', 'root-image');
        image.src = imagedata;
        closeWindow.appendChild(rootImage);
        rootImage.appendChild(image);
        document.body.appendChild(closeWindow);
  
        closeWindow.addEventListener('click', event => { if(event.target === closeWindow) closeWindow.remove() });
      });
    });
  
    buttonsDownloadImage.forEach( button => {
      button.addEventListener('click', () => {
        const image = button.parentElement.getAttribute('data-image-blob');
        const type = button.parentElement.getAttribute('data-type-image');
        const name = button.parentElement.getAttribute('data-name-image');
        const imagedata = `data:${type};base64,${image}`;
        const link = document.createElement('a');
  
        link.href = imagedata;
        link.download = name;
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    });
  
    downloadInvoice.addEventListener("click", async () => {
      if( data.invoices.length === 0) return alert('El equipo no tiene factura');
  
      const invoice = data.invoices[0].Factura_file;
      const pdfBytes = decodeBase64ToBytes(invoice);
      const blob = createBlobFromBytes(pdfBytes);
      const url = URL.createObjectURL(blob);
  
      configureDownloadLink(url);
    });
  };

const detailsSafeguard = ( safeguard, root ) => {
    const { Nombre, Primer_apellido, Segundo_apellido, Correo_electronico } = safeguard.DatosEmpleado;
    const { Nom_corto, Num_obra, Nom_frente, numero_frente, Nom_empresa, Nombre_obra } = safeguard.Equipos[0];

    const html = `
    <h2>Información detallada del resguardo finalizado</h2>

    <div class='container-info__device'>
        <dl>      
            <div class='row-info__device'>
                <dt>Nombre del empleado</dt>
                <dd>${ Nombre } ${ Primer_apellido } ${ Segundo_apellido }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Correo del empleado</dt>
                <dd>${ Correo_electronico }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Empresa a la que pertenece el empleado</dt>
                <dd>${ Nom_corto } | ${ Nom_empresa }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Obra a la que pertence el empleado</dt>
                <dd>${ Num_obra } | ${ Nombre_obra }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Frente al que pertence el empleado</dt>
                <dd>${ numero_frente } | ${ Nom_frente }</dd>
            </div>

            <div class='row-info__device row-info__device--modify'>
                <dt><span>Dispositivos que estuvieron en resguardo por el empleado</span></dt>
                <dd>
                    <ul class='list-safeguards-devices'>
                        ${safeguard.Equipos.map( equipo => {
                            return `<li>
                            <span>${ equipo.miId }</span> 
                            ${ equipo.Nom_subcategoria } ${ equipo.Nom_marca } ${ equipo.Modelo } 
                            <button class='details-devices-safeguards' id='${equipo.Devolucion_id}'}'>Mas detalles</button>
                            </li>`;
                        }).join('')}
                    </ul>
                </dd>
            </div>
        </dl>
    </div>
`;

    root.innerHTML = html;  
    const detailsDevicesBtn = document.querySelectorAll('.details-devices-safeguards');

    detailsDevicesBtn.forEach( button => {
        button.addEventListener('click', () => {
            const id = button.id;
            const device = safeguard.Equipos.find( equipo => equipo.Devolucion_id === parseInt(id) );

            windowDetailsDevice( device );
        });
    });
}

export const detailsSafeguardHistory = ( safeguard ) => {
    const root = document.createElement('div');
    const container = document.createElement('div');

    root.classList.add('root-details-safeguard');
    container.classList.add('container-details-safeguard');
    
    root.appendChild(container);
    document.body.appendChild(root);

    detailsSafeguard( safeguard, container );
    root.addEventListener('click', (event) => { if ( event.target === root ) root.remove() });
}