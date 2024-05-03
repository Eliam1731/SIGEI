import { sendDataServer } from "../../utilities/sendDataServer.js";

const firstSectionActions = (dataOriginal) => {
  const rootActions = document.getElementById("root-actions");
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

                <label for='dateBuys'>Actualice la fecha de compra del equipo (opcional).</label>
                <input type='date' id='dateBuys' name='dateBuys' value=${data.fechaCompra} required>

                <label for='dateWarranty'>Actualice la fecha en la que expira la garantía (opcional).</label>
                <input type='date' id='dateWarranty' name='dateWarranty' value='${data.fechaGarantia}' required>

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
            
                <h3 class='title-images'>Imagenes del equipo</h3>
                
                <div class='container-image'>
                    <div class='image-device'>
                      <div class='root-image'>
                        <img class='html-image' src="" alt='Imagen del equipo'>
                      </div>
                    </div>

                    <div class='container-navigation__images'>
                        <button id='left-image' type='button'>
                            <img src='../images/arrowPrev.svg' alt='Flecha izquierda'>
                        </button>

                        <button id='delete-image2' class='delete-image' type='button'>
                            <img src='../images/delete_image.svg' alt='Eliminar imagen'>
                        </button>

                        <button id='right-image' type='button'>
                            <img src='../images/arrowNext.svg' alt='Flecha derecha'>
                        </button>
                    </div>
                </div>

                <div class='container-input__image'>
                    <input type='file' id='imageInput' name='image' accept='image/*' multiple>
                    <label for='imageInput' id='label-image'>No hay imagenes seleccionadas</label>
                </div>

                <h3 class='title-images'>Factura del equipo</h3>

                <p class='description_action-bill'>
                    Al elegir una factura, se reemplazará la factura actual del equipo.
                </p>

                <div class='container-file__bill'>
                    <div class='file-bill'>
                        <input type='file' id='billInput' name='bill' accept='application/pdf, text/xml'>
                        <label for='billInput' id='label-bill'>Cargar nueva factura del equipo</label>
                    </div>
                    
                    <div class='control__bill'>
                        <button id='download-bill' type='button'>Ver factura del equipo</button>
                    </div>
                </div>

                <button id='update-data' type='submit'>Actualizar datos del equipo</button>
            </form>
    `;

  rootActions.innerHTML = html;
  const deleteImage = document.querySelector('.delete-image');
  const image = document.querySelector('.html-image');
  const leftImage = document.getElementById('left-image');
  const rightImage = document.getElementById('right-image');
  const controlerImage = document.querySelector('.container-navigation__images');
  const imagesDeleteArray = [];
  let currentImage = 0;
  const imageInput = document.getElementById('imageInput');
  const formUpdateDevice = document.getElementById('form-update-device');
  const downloadBill = document.getElementById('download-bill');

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
  
  downloadBill.addEventListener('click', (event) => {
    event.preventDefault();
  
    const pdfBytes = decodeBase64ToBytes(data.invoices[0].Factura_file);
    const blob = createBlobFromBytes(pdfBytes);
    const url = URL.createObjectURL(blob);
  
    configureDownloadLink(url);
  });
  

  formUpdateDevice.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(data.images, 'data.images en el submit');
  });

  if (data.images.length < 3) {
    imageInput.style.display = 'block';
  }

  const updateImageInputValue = () => {
    const newFiles = new DataTransfer();
  
    data.images.forEach((image) => {
      if (!image.isNew) {
        return;
      }
  
      const file = new File([image.Datos_imagen], image.Nombre, { type: image.Tipo_mime });
      newFiles.items.add(file);
    });
  
    if (newFiles.items.length === 0) {
      imageInput.value = '';
      console.log('El input de archivo está vacío');
    } else {
      imageInput.files = newFiles.files;
      console.log('El input de archivo no está vacío');
    }
  };

  imageInput.addEventListener('change', function () {
    const files = this.files;
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onloadend = function () {
        const newImage = {
          Datos_imagen: reader.result.split(',')[1], 
          Imagen_id: Date.now(), 
          Nombre: file.name,
          Tipo_mime: file.type,
          isNew: true 
        };
  
        data.images.push(newImage);
        updateImage();
        controlerImage.style.display = 'flex';
      }
  
      reader.readAsDataURL(file);
    }
  });

deleteImage.addEventListener('click', async () => {
  const imageDelete = parseInt(image.id);
  const imageToDelete = data.images.find((image) => image.Imagen_id === imageDelete);

  if (!imageToDelete.isNew) {
    imagesDeleteArray.push(imageDelete);
  }

  const updateImageCarousel = data.images.filter((image) => image.Imagen_id !== imageDelete);

  data.images = updateImageCarousel;
  currentImage = 0;

  console.log(imagesDeleteArray, 'imagesDeleteArray');

  if (data.images.length === 0) {
    image.src = '../images/notImage.png';
    image.id = '';
    controlerImage.style.display = 'none';

    return;
  }

  updateImage();
  updateImageInputValue(); 
});

  leftImage.addEventListener('click', () => {
    if (currentImage === 0) {
      currentImage = data.images.length - 1;
    } else {
      currentImage--;
    }

    updateImage();
  });

  rightImage.addEventListener('click', () => {
    if (currentImage === data.images.length - 1) {
      currentImage = 0;
    } else {
      currentImage++;
    }

    updateImage();
  });

  const updateImage = () => {
    image.src = `data:${data.images[currentImage].Tipo_mime};base64,${data.images[currentImage].Datos_imagen}`;
    image.id = data.images[currentImage].Imagen_id;
  };

  updateImage();
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

  const html = `
      <h2>Mantenimiento preventivo</h2>
  `;


  rootActions.innerHTML = html;
}

export const windowActionsDevices = (data) => {
  console.log(data, 'data')
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
