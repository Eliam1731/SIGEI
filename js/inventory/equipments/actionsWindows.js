import { configureDownloadLink, createBlobFromBytes, decodeBase64ToBytes } from "../../utilities/decodeBase64ToBytes.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { finishMaintenanceDevice, initMaintenanceDevice } from "./formsMaintenance.js";

const firstSectionActions = (dataOriginal) => {
  const rootActions = document.getElementById("root-actions");
  const data = dataOriginal[0];

  console.log(data, "data");

  const html = `
      <h2>Información detallada del equipo</h2>

      <div class='container-info__device'>
          <dl>
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
                  <dd>${data.fechaCompra}</dd>
              </div>

              <div class='row-info__device'>
                  <dt>Fecha en la que expira la garantía</dt>
                  <dd>${data.fechaGarantia}</dd>
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
                  <dd>${data.referenciaCompaq}</dd>
              </div>

              <div class='row-info__device'>
                  <dt>Dirección MAC Ethernet</dt>
                  <dd>${data.direccionMacEthernet}</dd>
              </div>

              <div class='row-info__device'>
                  <dt>Dirección MAC Wi-Fi</dt>
                  <dd>${data.direccionMacWifi}</dd>
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
                <dt>Comentario acerca del equipo</dt>
                <dd>${data.comentarios}</dd>
              </div>

              <div class='row-info__device'>
                <dt>Estado</dt>
                <dd>
                    <span>${data.status}</span>

                    <button id='change-status__device'>Dar de baja</button>
                </dd>
              </div>
          </dl>
      </div>
  `;


  rootActions.innerHTML = html;
  const downloadInvoice = document.getElementById("download-invoice");
  const buttonsDownloadImage = document.querySelectorAll('.listItemImageDevice button');
  const spansViewImage = document.querySelectorAll('.listItemImageDevice span');
  const changeStatusDevice = document.getElementById('change-status__device');
  const detailsDevice = document.querySelector('.container-info__device');
  const rootFormLow = document.createElement('div');

  changeStatusDevice.addEventListener('click', () => {
    const existenceFormLow = document.getElementById('form-device-low');

    if(existenceFormLow) return;

    const formDeviceLow = `
        <form id='form-device-low'>
            <label for=''>Comentario acerca de la baja del equipo</label>
            <textarea id='commentary-device-low' name='comentario' placeholder='Escriba el comentario...' required></textarea>

            <div class='container-buttons-device-low'>
                <button id='cancel-device-low' type='button'>Cancelar</button>
                <button id='low-device' type='submit'>Aceptar</button>
            </div>
        </form>
    `;

    detailsDevice.appendChild(rootFormLow).innerHTML = formDeviceLow;
    rootFormLow.setAttribute('class', 'root-form-device-low');
    const cancelDeviceLow = document.getElementById('cancel-device-low');
    const commentaryDeviceLow = document.getElementById('commentary-device-low');
    const formEquipmentLow = document.getElementById('form-device-low');

    formEquipmentLow.addEventListener('submit', async (event) => {
      event.preventDefault();
      const comments = commentaryDeviceLow.value;
      const low = {
        equipo_id: data.idEquipo,
        correo: sessionStorage.getItem('email'),
        comentario: comments,
      }
      const confirmLow = confirm('¿Estás seguro de dar de baja el equipo?');

      if(!confirmLow) return;

      const response = await sendDataServer('../server/insert/low_equipment.php', low);
      console.warn(response, 'response');
      console.log(low, 'data');
    });

    commentaryDeviceLow.addEventListener('focus', () => formEquipmentLow.style.border = '2px solid #1A73E8');
    commentaryDeviceLow.addEventListener('blur', () => formEquipmentLow.style.border = '2px solid #EEEEEE');

    cancelDeviceLow.addEventListener('click', () => {
      const existenceFormLow = document.getElementById('form-device-low');
      const elementParent = existenceFormLow.parentElement;
  
      elementParent.remove();
    });
  });

  spansViewImage.forEach( span => {
    span.addEventListener('click', () => {
      const closeWindow = document.createElement('div');
      const rootImage = document.createElement('div');
      const image = document.createElement('img');
      const imageBlob = span.parentElement.getAttribute('data-image-blob');
      const type = span.parentElement.getAttribute('data-type-image');
      const imagedata = `data:${type};base64,${imageBlob}`;
      const deleteImage = document.createElement('div');
      const iconDelete = `
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9E9E9E"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
      `;

      closeWindow.setAttribute('class', 'close-window-image');
      rootImage.setAttribute('class', 'root-image');
      deleteImage.setAttribute('class', 'delete-image__device');
      image.src = imagedata;
      deleteImage.innerHTML = iconDelete;

      closeWindow.appendChild(rootImage);
      rootImage.appendChild(image);
      rootImage.appendChild(deleteImage);
      document.body.appendChild(closeWindow);

      closeWindow.addEventListener('click', event => { if(event.target === closeWindow) closeWindow.remove() });
      deleteImage.addEventListener('click', async() => {
        const confirmDelete = confirm('¿Estás seguro de eliminar la imagen?');
        const imageId = span.parentElement.getAttribute('data-imagen-id');
        const device = data.idEquipo;

        if(confirmDelete) {
          const response = await sendDataServer('../server/insert/delete_img.php', { Imagen_id: imageId, Equipo_id: device });
      
          if(response.message === 'No puede dejar sin imágenes el equipo') {
            alert('No puede dejar sin imágenes el equipo');
            return;
          }

          alert(response.message);
          closeWindow.remove();
          span.parentElement.remove();
        }
      });
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
    const invoice = data.invoices[0].Factura_file;
    const pdfBytes = decodeBase64ToBytes(invoice);
    const blob = createBlobFromBytes(pdfBytes);
    const url = URL.createObjectURL(blob);

    configureDownloadLink(url);
  });
};

const secondSectionActions = (data) => { 
  const rootActions = document.getElementById('root-actions');
  const { idEquipo: device } = data[0];

  const html = `
      <h2>Añadir gastos al equipo</h2>

      <form id='form-add-expenses'>
          <div class='firstInputs__expends'>
              <div>
                  <label for=''>Nombre del producto</label>
                  <input type='text' id='product' name='Piezas' required>
              </div>

              <div class='last-div'>
                  <label id='label_quantity' for=''>Orden de compra</label>

                  <div class='container-quantity-root'>
                      <input type='text' id='quantity' name='orden_compra' required>
                      
                      <div class='container-quantity'>
                          <span>Pza</span>
                      </div>
                  </div>
              </div>
          </div>

          <div class='secondInputs__expends'>
                <div class='secondInputs__expends-div'>
                      <label for=''>Fecha en la que se compro el producto</label>
                      <input type='date' id='date' name='Fecha' required>
                </div>

                <div class='secondInputs__expends-div'>
                      <label for=''>Importe</label>

                      <div class='secondInputs__expends-unitPrice'>
                          <input type='text' id='unitPrice' name='Importe' required>

                          <div class='container-pesos'>
                              <span>MXN</span>
                          </div>
                      </div>
                </div>
          </div>  

          <div class='container-file-pdf'>
                <input type="file" id="pdf" name="Recibo_pdf" accept=".pdf" required>

                <label for='pdf' id='label-pdf'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-460h40v-80h40q17 0 28.5-11.5T480-580v-40q0-17-11.5-28.5T440-660h-80v200Zm40-120v-40h40v40h-40Zm120 120h80q17 0 28.5-11.5T640-500v-120q0-17-11.5-28.5T600-660h-80v200Zm40-40v-120h40v120h-40Zm120 40h40v-80h40v-40h-40v-40h40v-40h-80v200ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>

                    <span id='message-file'>No hay archivo seleccionado</span>
                </label>
          </div>

          <button id='add-expenses' type='submit'>Añadir gasto</button>
      </form>
  `;

  rootActions.innerHTML = html;
  const formAddExpenses = document.getElementById('form-add-expenses');

  formAddExpenses.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(formAddExpenses);
    data.append('Equipo_id', device);

    try {
      const response = await fetch('../server/insert/equipment_expense.php', {
        method: 'POST',
        body: data,
      });

      // if (response === 'false') {
      //   alert('No se pudo añadir el gasto');
      //   return;
      // }

      const responseText = await response.text();

      console.log(responseText, 'response');  

      formAddExpenses.reset();
      alert('Gasto añadido correctamente');
    } catch (error) {
      console.log(error);
    }
  });
};

const thirdSectionActions = (data) => { 
  const rootActions = document.getElementById('root-actions');
  const expenses = data[0].expenses;
  let totalBuy = 0;
  let countBuy = 0;

  const notExpenses = `
      <h2 class='title-expenses'>El equipo no tiene gastos disponibles</h2>    
  `;

  console.log(expenses, 'expenses');
  if(expenses.message === 'Este equipo aún no tiene gastos extra') {
    rootActions.innerHTML = notExpenses;
    return;
  }

  const html = `
      <h2 class='title-expenses'>Gastos del equipo</h2>

      <div class='root-table__expenses'>
            <div class='table-expenses'>
                <table class='table-expenses-original'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Orden de compra</th>
                            <th>Nombre del producto </th>
                            <th>Factura</th>
                            <th>Importe</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${expenses.map((expense, index) => {
                          return `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${expense.Fecha}</td>
                                <td>${expense.orden_compra}</td>
                                <td>${expense.Piezas}</td>
                                <td>
                                    <button id='${expense.orden_compra}' class='download-expenses__bill' type='button'>Ver factura</button>
                                </td>
                                <td>${expense.Importe}</td>
                            </tr>
                          `;
                        }).join('')}
                    </tbody>
                </table>
            </div>

            <div class='container-pagination__expenses'>
                <div class='container-pagination__expenses-buttons'>
                
                </div>

                <div class='container-pagination__expenses-totalBuy'>
                        ${
                          expenses.map( expense => {
                              countBuy++;
                              totalBuy += parseFloat(expense.Importe);

                              if( countBuy === expenses.length) {
                                  return `
                                      <p>Total de gastos: $${totalBuy}</p>
                                  `;
                              }
                          }).join('')

                        }
                </div>
            </div>
      </div>
  `;

  rootActions.innerHTML = html;
  const downloadExpensesBill = document.querySelectorAll('.download-expenses__bill');

  const decodeBase64ToBytes = (base64) => {
    const bytes = atob(base64);
    const byteNumbers = new Array(bytes.length);
  
    for (let i = 0; i < bytes.length; i++) {
      byteNumbers[i] = bytes.charCodeAt(i);
    }
  
    return byteNumbers;
  }

  const createBlobFromBytes = (bytes) => {
    const blob = new Blob([new Uint8Array(bytes)], {type: 'application/pdf'});
    return blob;
  }
  
  const configureDownloadLink = (url) => {
    window.open(url, '_blank');
  };

  downloadExpensesBill.forEach( button => {
    button.addEventListener('click', () => {
      const order = parseInt(button.id);
      const expense = expenses.find(expense => expense.orden_compra === order);
      const pdfBytes = decodeBase64ToBytes(expense.Recibo_pdf);
      const blob = createBlobFromBytes(pdfBytes);
      const url = URL.createObjectURL(blob);

      configureDownloadLink(url);
    });
  });
};

const fourthSectionActions = (data) => {
  const rootActions = document.getElementById('root-actions');
  const { 
    correoElectronicoEmpleado: emailEmployee, 
    nombreEmpleado: name, 
    primerApellidoEmpleado: firstSurname, 
    numSeguroSocialEmpleado: sureSocial,
    segundoApellidoEmpleado: secondSurname,
    nombreEmpresa: company,
    nombreFrente: front,
    nombreObra: work,
  } = data[0];

  const notProtectiveEmployee = `
    <h2>Empleado resguardante</h2>

    <div class='message-not-protective'>
        </p>Este equipo no tiene un empleado resguardante asignado.</p>

        <img src='../images/capibara-table.png' alt='Imagen de empleado no resguardante'>
     
        <a href='safeguards.php' id='add-protective-employee'>Añadir resguardante</a>
    </div>
  `;  

  if(!name) {
    rootActions.innerHTML = notProtectiveEmployee;
    return;
  }

  const html = `
      <h2 class='title-employeeProtective'>Empleado resguardante</h2>

      <div class='container-protective-employee'>
          <div class='root-protective__card'>
              <div class='card-protective'>
                  <div class='circle-decoration-protective'></div>

                  <p><span>Nombre completo:</span> ${name} ${firstSurname} ${secondSurname}</p>
              </div>

              <div class='card-protective'>
                  <div class='line-decoration-protective'></div>
              </div>

              <div class='card-protective'>
                  <div class='circle-decoration-protective'></div>

                  <p><span>Número de seguro social:</span> ${sureSocial}</p>
              </div>

              <div class='card-protective'>
                  <div class='line-decoration-protective'></div>
              </div>

              <div class='card-protective'>
                  <div class='circle-decoration-protective'></div>

                  <p><span>Correo electrónico:</span> ${emailEmployee}</p>
              </div>

              <div class='card-protective'>
                  <div class='line-decoration-protective'></div>
              </div>

              <div class='card-protective'>
                  <div class='circle-decoration-protective'></div>

                  <p><span>Empresa a la que pertenece el empleado:</span> ${company}</p>
              </div>

              <div class='card-protective'>
                  <div class='line-decoration-protective'></div>
              </div>

              <div class='card-protective'>
                  <div class='circle-decoration-protective'></div>

                  <p><span>Obra a la que pertenece el empleado:</span> ${work}</p>
              </div>

              <div class='card-protective'>
                  <div class='line-decoration-protective'></div>
              </div>

              <div class='card-protective'>
                  <div class='circle-decoration-protective'></div>

                  <p><span>Frente a la que pertenece el empleado:</span> ${front}</p>
              </div>

              <div class='card-protective'>
                  <div class='line-decoration-protective'></div>
              </div>

              <div class='card-protective__email'>
                  <div class='circle-email-protective'>
                      <div class='circle-decorationImage-protective'>
                          <img src='../images/email.svg' alt='Icono de email'>
                      </div>
                  </div>

                  <div class='container-email-protective'>
                      <div class='card-email'>
                          <div class='container-title__email'>
                              <p>Enviar mensaje</p>
                          </div>

                          <form id='form-email-protective'>
                              <div>
                                  <label for='affair'>Asunto</label>
                                  <input type='text' id='affair' name='titulo' required>
                              </div>

                              <div class='container-message__form'>
                                  <textarea id='message' name='mensaje' placeholder='Mensaje...' required></textarea>
                              </div>

                              <button id='send-email' type='submit'>Enviar mensaje</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;

  rootActions.innerHTML = html;
  const inputAffair = document.getElementById('affair');
  const inputMessage = document.getElementById('message');
  const formEmailProtective = document.getElementById('form-email-protective');

  formEmailProtective.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(formEmailProtective);
    const email = emailEmployee;
  
    data.append('correo', email); 
  
    try {
      const response = await fetch('../server/data/send_email.php', {
        method: 'POST',
        body: data,
      });
  
      const result = await response.text();
      
      if( result === 'false') {
        alert('No se pudo enviar el mensaje');
        return;
      }

      inputAffair.value = '';
      inputMessage.value = '';

      alert('Mensaje enviado correctamente');
    } catch (error) {
      console.log(error);
    }
  });

  inputAffair.focus();
};

const fiveSectionActions = (data) => {
  const rootActions = document.getElementById('root-actions');
  const statusMaintenance = false;

  const htmlInitMaintenance = `
      <h2>Mantenimiento preventivo</h2>

      <form id='form-preventive-maintenance'>
          <div class='container-title-maintenance'><h3>Material requerido</h3></div>

          <div class='container-checkboc-maintenance'>
              <input type='checkbox' id='tool-1' name='material1' value='material1' data-tools-checkbox>
              <label for='tool-1'>HERRAMIENTAS <span>(PINZAS, DESARMADORES, ETC)</span></label>
          </div>

          <div class='container-checkboc-maintenance'>
              <input type='checkbox' id='tool-2' name='material2' value='material2' data-tools-checkbox>
              <label for='tool-2'>KIT DE LIMPIEZA <span>(ASPIRADORA, LIMPIADORES DE TECLADO, DE MONITORES, DE EQUIPO ELECTRONICO)</span></label>
          </div>

          <div class='container-checkboc-maintenance'>
              <input type='checkbox' id='tool-3' name='material3' value='material3' data-tools-checkbox>
              <label for='tool-3'>CONSUMIBLES DE COMPUTO <span>(TORNILLOS, CONECTORES, CABLES, ETC)</span></label>
          </div>

          <div class='container-checkboc-maintenance'>
              <label for='tool-4'>Otros (Especificar)</label>   
              <input type='text' id='tool-4' name='material4'>         
          </div>

          <button id='add-preventive-maintenance' type='submit'>Iniciar mantenimiento preventivo</button>
      </form>
  `;

  const htmlFinishMaintenance = `
      <h2>Finalizar mantenimiento preventivo</h2>

      <div id='root-finish-maintenance'></div>
  `;


  rootActions.innerHTML = (statusMaintenance) ?  htmlFinishMaintenance : htmlInitMaintenance;

  if(!statusMaintenance) {
    initMaintenanceDevice( data );
    return;
  };
  
  finishMaintenanceDevice( data );
}

export const windowActionsDevices = (data) => {
  const containerClose = document.createElement("div");
  const containerActions = document.createElement("div");
  const html = `
        <section id='root-actions'>
        
        </section> 

        <nav id='nav-actions'>
            <ul>
                <li class='selected-actions__li'>Actualizar datos del equipo</li>
                <li>Añadir gastos al equipo</li>
                <li>Gatos del equipo</li>
                <li>Resguardante</li>
                <li>Mantenimiento preventivo</li>
            </ul>
        </nav>

    `;

  containerActions.innerHTML = html;
  containerClose.setAttribute("class", "container-close");
  containerActions.setAttribute("class", "container-actions");
  document.body.appendChild(containerClose);
  containerClose.appendChild(containerActions);

  containerClose.addEventListener("click", (event) => {
    if (event.target === containerClose) {
      containerClose.remove();
    }
  });

  const updateDevice = document.querySelector("#nav-actions li:nth-child(1)");
  const addExpenses = document.querySelector("#nav-actions li:nth-child(2)");
  const expensesDevice = document.querySelector("#nav-actions li:nth-child(3)");
  const resguardante = document.querySelector("#nav-actions li:nth-child(4)");
  const preventiveMaintenance = document.querySelector("#nav-actions li:nth-child(5)");
  

  firstSectionActions(data);

  updateDevice.addEventListener("click", () => {
    firstSectionActions(data);
  });

  addExpenses.addEventListener("click", () => {
    secondSectionActions(data);
  });

  expensesDevice.addEventListener("click", () => {
    thirdSectionActions(data);
  });

  resguardante.addEventListener("click", () => {
    fourthSectionActions(data);
  });

  preventiveMaintenance.addEventListener("click", () => {
    fiveSectionActions(data);
  });
};
