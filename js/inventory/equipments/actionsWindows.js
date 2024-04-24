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
                        <label for='billInput' id='label-bill'>No hay factura seleccionada</label>
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
  const imagesDeleteArray = []; //Array para guardar las imagenes que se eliminaran
  let currentImage = 0;
  const imageInput = document.getElementById('imageInput');
  const formUpdateDevice = document.getElementById('form-update-device');
  const downloadBill = document.getElementById('download-bill');

  console.log(data.invoices[0].Factura_file, 'data.invoices');

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
    // Evita que el evento de clic original se propague
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
          Datos_imagen: reader.result.split(',')[1], // Obtenemos solo la parte de datos de la imagen en base64
          Imagen_id: Date.now(), // Generamos un id único basado en la fecha actual
          Nombre: file.name,
          Tipo_mime: file.type,
          isNew: true // Indicamos que la imagen es nueva
        };
  
        data.images.push(newImage);
        updateImage();
        controlerImage.style.display = 'flex';
      }
  
      reader.readAsDataURL(file);
    }
  });

  //Evento que elimina imagenes del DOM
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
  updateImageInputValue(); // Actualizamos el valor del input de imagen
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

const secondSectionActions = (data) => { };

const thirdSectionActions = (data) => { };

const fourthSectionActions = (data) => { };

export const windowActionsDevices = (data) => {
  const containerClose = document.createElement("div");
  const containerActions = document.createElement("div");
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
};
