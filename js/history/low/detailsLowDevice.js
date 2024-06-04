export const detailsLowDevice = ( data ) => {
    const { nombre, primerApellido, segundoApellido } = data.usuarioBaja;
    const rootActions = document.createElement('div');
    const root = document.createElement('div');

    rootActions.classList.add('root-actions-details-device');
    rootActions.classList.add('root-actions-details-device--active');
    document.body.appendChild( rootActions );
    rootActions.appendChild( root );

    rootActions.addEventListener('click', (event) => { if ( event.target === rootActions ) rootActions.remove() });
  
    const html = `
        <h2>Información detallada del equipo dado de baja</h2>
  
        <div class='container-info__device'>
            <dl>
                <div class='row-info__device'>
                    <dt>Usuario quien dio de baja el equipo</dt>
                    <dd>${ nombre } ${ primerApellido } ${ segundoApellido }</dd>
                </div>

                <div class='row-info__device'>
                    <dt>Fecha de baja</dt>
                    <dd>${ data.fechaBaja }</dd>
                </div>

                <div class='row-info__device'>
                    <dt>Motivo de baja</dt>
                    <dd>${ data.motivoBaja }</dd>
                </div>

                <div class='row-info__device'>
                    <dt>Subcategoría del equipo</dt>
                    <dd>${data.subcategoria}</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Marca del equipo</dt>
                    <dd>${data.marca}</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Código OPC</dt>
                    <dd>${data.codeOpc}</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Modelo del equipo</dt>
                    <dd>${data.modelo}</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Número de serie</dt>
                    <dd>${data.numSerie}</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Service tag del equipo</dt>
                    <dd>${data.serviceTag}</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Fecha de compra</dt>
                    <dd>${ (data.fechaCompra === '0000-00-00') ? 'No se ha seleccionado una fecha de compra.' : data.fechaCompra }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Fecha en la que expira la garantía</dt>
                    <dd>${ (data.fechaGarantia === '0000-00-00') ? 'No se ha seleccionado una fecha de vencimiento para la garantía.' : data.fechaGarantia }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Importe del equipo</dt>
                    <dd>$${data.importe}</dd>
                </div>
                
                <div class='row-info__device'>
                    <dt>Especificación del equipo</dt>
                    <dd>${data.especificacion}</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Numero de referencia de Compras</dt>
                    <dd>${ (data.referenciaCompaq === '') ? 'El equipo no tiene un número de referencia de compra.' : data.referenciaCompaq }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Dirección MAC Ethernet</dt>
                    <dd>${ (!data.direccionMacEthernet) ? 'El equipo no cuenta con una dirección MAC Ethernet.' : data.direccionMacEthernet }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Dirección MAC Wi-Fi</dt>
                    <dd>${ (!data.direccionMacWifi) ? 'El equipo no cuenta con una dirección MAC WI-FI.' : data.direccionMacWifi }</dd>
                </div>
  
                <div class='row-info__device'>
                    <dt>Número de teléfono</dt>
                    <dd>${(!data.telefono) ? 'El equipo no cuenta con un número telefónico.' : data.telefono}</dd>
                </div>
  
                <div class='row-info__device'>
                  <dt>Comentario acerca del equipo</dt>
                  <dd>${(!data.comentarios) ? 'El equipo no tienen comentarios.' : data.comentarios}</dd>
                </div>
            </dl>
        </div>
    `;
  
    root.innerHTML = html;
}