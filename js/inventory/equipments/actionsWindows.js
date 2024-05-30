import { currentYearUser } from "../../utilities/MaximumYearCurrent.js";
import { configureDownloadLink, createBlobFromBytes, decodeBase64ToBytes } from "../../utilities/decodeBase64ToBytes.js";
import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServerEquipment } from "../../utilities/sendDataEquipment.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { finishMaintenanceDevice, initMaintenanceDevice } from "./formsMaintenance.js";

let billsDevice = [];

const firstSectionActions = (dataOriginal) => {
  const rootActions = document.getElementById("root-actions");
  const data = dataOriginal[0];

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
                  <dd>${ (!data.direccionMacEthernet) ? 'El equipo no cuenta con una dirección MAC Ethernet.' : data.direccionMacEthernet }</dd>
              </div>

              <div class='row-info__device'>
                  <dt>Dirección MAC Wi-Fi</dt>
                  <dd>${ (!data.direccionMacWifi) ? 'El equipo no cuenta con una dirección MAC WI-FI.' : data.direccionMacWifi }</dd>
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
                <dd>${(!data.comentarios) ? 'El equipo no tienen comentarios.' : data.comentarios}</dd>
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
    if(data.status === 'De baja') {
      alert('El equipo ya se encuentra de baja.');
      return;
    };

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
      console.log(response, 'response');  
      
      if(response.message) {
        alert(response.message);
        window.location.reload();

        return;
      }

      alert('No se pudo dar de baja el equipo');
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

          const imagesUpdate = data.images.filter( image => image.Imagen_id !== parseInt(imageId));
          data.images = imagesUpdate;
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
  const inputPdf = document.getElementById('pdf');
  const messageCountFile = document.getElementById('message-file');
  const inputDate = document.getElementById('date');
  const inputPrice = document.getElementById('unitPrice');
  const regexPrice = /^\d+(\.\d{0,2})?$/;

  inputPrice.addEventListener('change', (event) => {
    const valueInput = event.target.value;

    if(valueInput.trim() === '') return;

    if(!regexPrice.test(valueInput)) {
        alert('Formato inválido. Asegúrate de ingresar un número sin comas, que puede ser entero o un decimal con dos dígitos después del punto. Ejemplo válido: 20000.00; ejemplo no válido: 20,000.00.');
        inputPrice.focus();


        return;
    }
  });

  inputDate.max = currentYearUser(new Date());

  inputPdf.addEventListener('change', () => {
    const file = inputPdf.files[0];
    const name = file.name;

    messageCountFile.textContent = name;
  });

  formAddExpenses.addEventListener('submit', async (event) => {
    event.preventDefault();
    if(!regexPrice.test(inputPrice.value)) {
      alert('Formato inválido. Asegúrate de ingresar un número sin comas, que puede ser entero o un decimal con dos dígitos después del punto. Ejemplo válido: 20000.00; ejemplo no válido: 20,000.00.');
      inputPrice.focus();

      return;
    } 

    function getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });
    }

    const dataUrl = await getBase64(inputPdf.files[0]);
    const Recibo_pdf = dataUrl.split(',')[1];

    //Obtener los value de los inputs
    const objectExpenses = {
      Fecha: inputDate.value,
      Importe: inputPrice.value,
      Piezas: document.getElementById('product').value,
      Recibo_pdf: Recibo_pdf,
      orden_compra: document.getElementById('quantity').value,
    }
    //Colocar el objeto en el array de expenses 
    billsDevice.push(objectExpenses);
    console.log(billsDevice, 'billsDevice');

    const data = new FormData(formAddExpenses);
    data.append('Equipo_id', device);

    try {
      const response = await fetch('../server/insert/equipment_expense.php', { method: 'POST', body: data });
      const responseText = await response.text();

     if( responseText === 'Los gastos fueron subidos con éxito') {
        alert(responseText);

        formAddExpenses.reset();
        return;
     }

      alert('No se pudo añadir el gasto');
    } catch (error) { console.log(error); }
  });
};

const thirdSectionActions = () => { 
  const rootActions = document.getElementById('root-actions');
  const expenses = billsDevice;
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

const sixSectionActions = async( dataOriginal ) => {
  const rootActions = document.getElementById("root-actions");
  const data = dataOriginal[0];

  const html = `
      <h2>Actualizar datos del equipo</h2>


      <form id="form-equipment">
        <div class='containerInput__flex'>
            <label for="select__category">Elija la categoría</label>

            <div class="container-category">
                <select id="select__category" required name='Subcategoria'>
                    <option value=''>No se ha seleccionado una categoría</option>
                </select>
            </div>
        </div>

        <div class='containerInput__flex'>
            <label for="brandDevices">Marca</label>

            <div class="container-brand">
                <select id="brandDevices" required name='Marca'>
                    <option value=''>No se ha seleccionado una marca</option>
                </select>
            </div>
        </div>

        <div class='containerInput__flex'>
            <label for="codeEquipment">Pegue el código aquí si ya conoce el código del equipo.</label>

            <div class="containe__codeequipment">
                <div><span>OPCIC-COM-</span></div>
                <input type="text" placeholder="Ejemplo: 00012" id="codeEquipment" value='${ data.codeOpc.slice(-5) }' required disabled>
            </div>
        </div>

        <div class='containerInput__flex'>
            <label for="modelDevices">Modelo</label>

            <input name='Modelo' id="modelDevices" type="text" placeholder="Ejemplo: SNL-002" required value='${ data.modelo }'>
        </div>

        <div class='containerInput__flex'>
            <label for="serialNumber">Número de serie</label>

            <input name='N_serie' id="serialNumber" type="text" placeholder="Ejemplo: 080145780123" required value='${ data.numSerie }'>
        </div>

        <div class='containerInput__flex'>
            <label for="serviceTag">Service tag del equipo</label>
            <input name='Service_tag' id="serviceTag" type="text" placeholder="Ejemplo: 029SN01201J" required value='${ data.serviceTag }'>
        </div>

        <div class='containerInput__flex'>
            <label for="dateBuy">Fecha de compra</label>

            <input name='Fecha_compra' type="date" id="dateBuy" required value='${ data.fechaCompra }'>
        </div>

        <div class='containerInput__flex'>
            <label for="dateExpiresWarranty">Fecha en la que expira la garantía</label>

            <input name='Fecha_garantía' type="date" id="dateExpiresWarranty" required value='${ data.fechaGarantia }'>
        </div>

        <div class='containerInput__flex'>
            <label for="amountDevices">Importe del equipo</label>

            <input name='Importe' id="amountDevices" type="text" placeholder="Ejemplo: 20,000.00 MXN" required value='${ data.importe }' >
        </div>

        <div class='containerInput__flex'>
            <label for="specificationDevices">Especificación del equipo</label>

            <textarea name='Especificación' id="specificationDevices" placeholder="Ejemplo: 8 de RAM, 500GB de espacio, etc." required title="Por favor, separe las especificaciones del equipo utilizando comas.">${ data.especificacion }</textarea>
        </div>

        <div class='containerInput__flex'>
            <label for="referenceCompaq" class='modify-label'>Numero de referencia de Compras</label>
            <input name='N_referencia_Compras' id="referenceCompaq" type="text" placeholder="Ejemplo: 012832903" required value='${ data.referenciaCompaq }'>
        </div>

        <div class='containerInput__flex hiden-inputs'>
            <label for="addressEthernet" class='modify-label'>Dirección MAC Ethernet</label>

            <input name='MAC_Ethernet' id="addressEthernet" type="text" placeholder="Ejemplo: f4:d6:20:ca:4f:d0" required value='${ data.direccionMacEthernet }'>
        </div>

        <div class='containerInput__flex hiden-inputs'>
            <label for="addressMacWifi">Dirección MAC WI-FI</label>

            <input name='MAC_WIFI' id="addressMacWifi" type="text" placeholder="Ejemplo: f4:d6:20:ca:4f:d0" required value='${ data.direccionMacWifi }'>
        </div>

        <div class='containerInput__flex'>
            <p>Subir factura del equipo</p>

            <div class="container__inputfile">
                <input name='Factura' id="invoiceDevices" type="file" accept=".pdf,.xml" multiple>

                <label for="invoiceDevices">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-460h40v-80h40q17 0 28.5-11.5T480-580v-40q0-17-11.5-28.5T440-660h-80v200Zm40-120v-40h40v40h-40Zm120 120h80q17 0 28.5-11.5T640-500v-120q0-17-11.5-28.5T600-660h-80v200Zm40-40v-120h40v120h-40Zm120 40h40v-80h40v-40h-40v-40h40v-40h-80v200ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>

                    <span id='spanInputFile'>No hay facturas seleccionadas</span>
                </label>
            </div>
        </div>

        <div class='containerInput__flex'>
            <p>Subir imagenes del equipo</p>

            <div class="container__inputfile">
                <input name='new_images' type="file" id="imageDevices" accept="image/*" multiple>

                <label for="imageDevices">
                    <svg width="118" height="102" viewBox="0 0 118 102" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.9997 58.6667H96.333L77.933 34.6667L65.6663 50.6667L57.3997 40L42.9997 58.6667ZM10.9997 101.333C8.06634 101.333 5.55523 100.289 3.46634 98.2C1.37745 96.1111 0.333008 93.6 0.333008 90.6667V21.3333H10.9997V90.6667H101.666V101.333H10.9997ZM32.333 80C29.3997 80 26.8886 78.9556 24.7997 76.8667C22.7108 74.7778 21.6663 72.2667 21.6663 69.3333V10.6667C21.6663 7.73333 22.7108 5.22222 24.7997 3.13333C26.8886 1.04444 29.3997 0 32.333 0H58.9997L69.6663 10.6667H107C109.933 10.6667 112.444 11.7111 114.533 13.8C116.622 15.8889 117.666 18.4 117.666 21.3333V69.3333C117.666 72.2667 116.622 74.7778 114.533 76.8667C112.444 78.9556 109.933 80 107 80H32.333ZM32.333 69.3333H107V21.3333H65.2663L54.5997 10.6667H32.333V69.3333Z" fill="black"/></svg>

                    <span id='spanInputImage'>No hay imagenes seleccionadas</span>
                </label>
            </div>
        </div>

        <div class='containerInput__flex hiden-inputs'>
            <label for="numberPhone">Número de teléfono</label>

            <input name='num_telefono' id="numberPhone" type="text" placeholder="Ejemplo: 9212728910" required value='${ (data.telefono === null) ? '' : data.telefono}'>
        </div>

        <div class='containerInput__flex'>
            <label for="detailsExtraDevices">Comentarios acerca del equipo</label>

            <textarea name='Comentarios' id="detailsExtraDevices" placeholder="Colocar detalles extras sobre el equipo informático que se está registrando.">${ data.comentarios }</textarea>
        </div>
            
        <button id="sendDataDevices">Actualizar datos del equipo</button>
    </form>
    `;

  rootActions.innerHTML = html;
  const selectCategory = document.getElementById("select__category");
  const brandDevices = document.getElementById("brandDevices");
  const codeDevice = document.getElementById("codeEquipment");
  const imageDevices = document.getElementById("imageDevices");
  const spanInputImage = document.getElementById('spanInputImage');
  const formUpdate = document.getElementById('form-equipment');
  console.log(data);

  try {
    const response = await getDataServer('../server/data/categories.php');
    
    for(let key in response) {
      if(response.hasOwnProperty(key)) {
          const optgroup = document.createElement('optgroup');
          optgroup.setAttribute('label', key);

          response[key].forEach( element => {
              const option = document.createElement('option');
              option.textContent = element;
              option.value = element;

              if(element === data.subcategoria) option.selected = true;

              optgroup.appendChild(option);
          })

          selectCategory.appendChild(optgroup);
      }
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await getDataServer('../server/data/brand.php');
  
    response.forEach( element => {
      const option = document.createElement('option');

      for(let i = 0; i < element.length; i++) {
          if(i == 0) {
              option.value = element[i];
              continue;
          };

          if(element[i] === data.marca) option.selected = true;

          option.innerText = element[i];
      }

      brandDevices.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }

  codeDevice.addEventListener('change', () => {
    const code = codeDevice.value;

    if(code !== data.codeOpc.slice(-5)) {
      alert('No puede modificar el código del equipo');

      codeDevice.value = data.codeOpc.slice(-5);
    }
  });

  imageDevices.addEventListener('change', () => {
    const countNewImages = imageDevices.files.length;
    const currentImages = data.images.length;

    if(countNewImages + currentImages > 3) {
      alert('No puede subir más de 3 imágenes');
      imageDevices.value = '';
      spanInputImage.textContent = 'No hay imagenes seleccionadas';

      return;
    }

    spanInputImage.textContent = `${countNewImages} imagenes seleccionadas.`;
  });

  formUpdate.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(formUpdate);
    const dataImages = new FormData();
    const images = imageDevices.files;

    dataImages.append('equipo_id', dataOriginal[0].idEquipo);
    data.append('Equipo_id', dataOriginal[0].idEquipo);

    for(let i = 0; i < images.length; i++) {
      dataImages.append('image[]', images[i]);
    }

    try {
      const response = await sendDataServerEquipment('../server/insert/update.php', data);

      if(response.message === 'Su actualización fue exitosa') {
        const responseImage = await sendDataServerEquipment('../server/insert/update_img.php', dataImages);
        if(responseImage.error) { alert(responseImage.error); }

        alert(response.message);
        window.location.reload();
        return;
      }

      alert(response.error);
    } catch (error) {
      console.error(error);
    }

  });
}

export const windowActionsDevices = (data) => {
  billsDevice = [];
  const containerClose = document.createElement("div");
  const containerActions = document.createElement("div");
  const html = `
        <section id='root-actions'></section> 

        <nav id='nav-actions'>
            <ul>
                <li class='selected-actions__li'>Información detallada del equipo</li>
                <li>Actualizar datos del equipo</li>
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
    if (event.target === containerClose) containerClose.remove();
  });

  const detailsDevice = document.querySelector("#nav-actions li:nth-child(1)");
  const updateDataDevice = document.querySelector("#nav-actions li:nth-child(2)");
  const addExpenses = document.querySelector("#nav-actions li:nth-child(3)");
  const expensesDevice = document.querySelector("#nav-actions li:nth-child(4)");
  const resguardante = document.querySelector("#nav-actions li:nth-child(5)");
  const preventiveMaintenance = document.querySelector("#nav-actions li:nth-child(6)");
  const childrenNav = document.querySelectorAll("#nav-actions ul li");

  firstSectionActions(data);

  detailsDevice.addEventListener( "click", () => {
    childrenNav.forEach((child) => child.classList.remove("selected-actions__li"));
    detailsDevice.classList.add("selected-actions__li");

    firstSectionActions(data);
  });

  updateDataDevice.addEventListener("click", () => {
    childrenNav.forEach((child) => child.classList.remove("selected-actions__li"));
    updateDataDevice.classList.add("selected-actions__li");

    sixSectionActions(data);
  });

  addExpenses.addEventListener("click", () => {
    childrenNav.forEach((child) => child.classList.remove("selected-actions__li"));
    addExpenses.classList.add("selected-actions__li");

    secondSectionActions(data);
  });

  expensesDevice.addEventListener("click", () => {
    childrenNav.forEach((child) => child.classList.remove("selected-actions__li"));
    expensesDevice.classList.add("selected-actions__li");

    thirdSectionActions(data);
  });

  resguardante.addEventListener("click", () => {
    childrenNav.forEach((child) => child.classList.remove("selected-actions__li"));
    resguardante.classList.add("selected-actions__li");

    fourthSectionActions(data);
  });

  preventiveMaintenance.addEventListener("click", () => {
    childrenNav.forEach((child) => child.classList.remove("selected-actions__li"));
    preventiveMaintenance.classList.add("selected-actions__li");

    fiveSectionActions(data);
  });

  if(data[0].expenses.message) return;

  billsDevice = [...data[0].expenses];
  console.log(billsDevice, 'billsDevice');
};
