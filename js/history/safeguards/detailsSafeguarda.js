import { dateInFormatText } from "../../utilities/textDate.js";

const detailsSafeguard = ( safeguard, root ) => {
    const { Nombre, Primer_apellido, Segundo_apellido, Correo_electronico } = safeguard.DatosEmpleado;
    const { 
        Nom_corto, Num_obra, Nom_frente, Fecha_inicio, Fecha_terminacion, NombreUsuarioResguardo, ApellidoUsuarioResguardo, SegundoApellidoUsuarioResguardo, 
        NombreUsuarioDevolucion, ApellidoUsuarioDevolucion, SegundoApellidoUsuarioDevolucion, Nom_empresa, Nombre_obra
    } = safeguard.Equipos[0];

    console.log(safeguard);

    const html = `
    <h2>Información detallada del resguardo finalizado</h2>

    <div class='container-info__device'>
        <dl>      
            <div class='row-info__device'>
                <dt>Fecha de inicio de resguardo</dt>
                <dd>${ dateInFormatText( Fecha_inicio ) } | ${ Fecha_inicio }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Fecha en la que finalizo el resguardo</dt>
                <dd>${ dateInFormatText( Fecha_terminacion ) } | ${ Fecha_terminacion }</dd>
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
                <dt>Nombre del resguardante</dt>
                <dd>${ Nombre } ${ Primer_apellido } ${ Segundo_apellido }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Correo del empleado resguardante</dt>
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
                <dt>Número de serie</dt>
                <dd>${safeguard.numSerie}</dd>
            </div>

            <div class='row-info__device'>
                <dt>Service tag del equipo</dt>
                <dd>${safeguard.serviceTag}</dd>
            </div>

            <div class='row-info__device'>
                <dt>Fecha de compra</dt>
                <dd>${ (safeguard.fechaCompra === '0000-00-00') ? 'No se ha seleccionado una fecha de compra.' : safeguard.fechaCompra }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Fecha en la que expira la garantía</dt>
                <dd>${ (safeguard.fechaGarantia === '0000-00-00') ? 'No se ha seleccionado una fecha de vencimiento para la garantía.' : safeguard.fechaGarantia }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Importe del equipo</dt>
                <dd>$${safeguard.importe}</dd>
            </div>
            
            <div class='row-info__device'>
                <dt>Especificación del equipo</dt>
                <dd>${safeguard.especificacion}</dd>
            </div>

            <div class='row-info__device'>
                <dt>Numero de referencia de Compras</dt>
                <dd>${ (safeguard.referenciaCompaq === '') ? 'El equipo no tiene un número de referencia de compra.' : safeguard.referenciaCompaq }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Dirección MAC Ethernet</dt>
                <dd>${ (!safeguard.direccionMacEthernet) ? 'El equipo no cuenta con una dirección MAC Ethernet.' : safeguard.direccionMacEthernet }</dd>
            </div>

            <div class='row-info__device'>
                <dt>Dirección MAC Wi-Fi</dt>
                <dd>${ (!safeguard.direccionMacWifi) ? 'El equipo no cuenta con una dirección MAC WI-FI.' : safeguard.direccionMacWifi }</dd>
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
            
            <!-- Aqui va las imagenes -->

            <div class='row-info__device'>
                <dt>Número de teléfono</dt>
                <dd>${(!safeguard.telefono) ? 'El equipo no cuenta con un número telefónico.' : safeguard.telefono}</dd>
            </div>

            <div class='row-info__device'>
              <dt>Comentario acerca del equipo</dt>
              <dd>${(!safeguard.comentarios) ? 'El equipo no tienen comentarios.' : safeguard.comentarios}</dd>
            </div>

            <div class='row-info__device'>
              <dt>Estado</dt>
              <dd>
                  <span>${safeguard.status}</span>

                  <button id='change-status__device'>Dar de baja</button>
              </dd>
            </div>
        </dl>
    </div>
`;

    root.innerHTML = html;  
}


export const detailsSafeguardHistory = ( safeguard ) => {
    const root = document.createElement('div');
    const container = document.createElement('div');

    root.classList.add('root-details-safeguard');
    container.classList.add('container-details-safeguard');
    
    root.appendChild(container);
    document.body.appendChild(root);

    detailsSafeguard( safeguard, container );
}