import {
    configureDownloadLink,
    createBlobFromBytes,
    decodeBase64ToBytes,
} from "../../utilities/decodeBase64ToBytes.js";

export const windowDeviceInformation = (data, divActions) => {
    const stringEmpty = /^\s*$/;
    const parentDiv = document.createElement("div");
    const containerItemsModal = document.createElement("div");
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
                        ${data.images
            .map((image) => {
                return `<li data-image-blob='${image.Datos_imagen}' data-type-image='${image.Tipo_mime}' data-name-image='${image.Nombre}' data-imagen-id='${image.Imagen_id}' class='listItemImageDevice'>
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#E0E0E0"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"/></svg>
                              <span>${image.Nombre}</span>
                              <button>Descargar</button>
                          </li>`;
            })
            .join("")}
                    </ul>
                </dd>
            </div>

            <div class='row-info__device'>
              <dt>Comentario acerca del equipo</dt>
              <dd>${(stringEmpty.test(data.comentarios) ? 'Sin comentarios.' : data.comentarios)}</dd>
            </div>
        </dl>
    </div>`;

    parentDiv.setAttribute("class", "root-information-device");
    divActions.remove();
    document.body.appendChild(parentDiv);
    parentDiv.appendChild(containerItemsModal);
    containerItemsModal.innerHTML = html;

    parentDiv.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) parentDiv.remove();
    });

    const downloadInvoice = document.getElementById("download-invoice");
    const buttonsDownloadImage = document.querySelectorAll(
        ".listItemImageDevice button"
    );
    const spansViewImage = document.querySelectorAll(".listItemImageDevice span");

    spansViewImage.forEach((span) => {
        span.addEventListener("click", () => {
            const closeWindow = document.createElement("div");
            const rootImage = document.createElement("div");
            const image = document.createElement("img");
            const imageBlob = span.parentElement.getAttribute("data-image-blob");
            const type = span.parentElement.getAttribute("data-type-image");
            const imagedata = `data:${type};base64,${imageBlob}`;

            closeWindow.setAttribute("class", "close-window-image");
            rootImage.setAttribute("class", "root-image");
            image.src = imagedata;
   
            closeWindow.appendChild(rootImage);
            rootImage.appendChild(image);
            document.body.appendChild(closeWindow);

            closeWindow.addEventListener("click", (event) => {
                if (event.target === closeWindow) closeWindow.remove();
            });
        });
    });

    buttonsDownloadImage.forEach((button) => {
        button.addEventListener("click", () => {
            const image = button.parentElement.getAttribute("data-image-blob");
            const type = button.parentElement.getAttribute("data-type-image");
            const name = button.parentElement.getAttribute("data-name-image");
            const imagedata = `data:${type};base64,${image}`;
            const link = document.createElement("a");

            link.href = imagedata;
            link.download = name;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

    downloadInvoice.addEventListener("click", async () => {
        const invoice = data.invoices[0].Factura_file;
        const pdfBytes = decodeBase64ToBytes(invoice);
        const blob = createBlobFromBytes(pdfBytes);
        const url = URL.createObjectURL(blob);

        configureDownloadLink(url);
    });
};
