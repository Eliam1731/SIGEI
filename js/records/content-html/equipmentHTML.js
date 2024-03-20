export const equipmentSystemsHTML = `
<h2>Registrar nuevo equipo informático</h2>
<div class="line-horizontal__decoration"></div>

<form id="form-equipment">
    <section> 
        <div> 
            <label for="select__category">Elija la categoría</label>
            <div class="container-category">
                <select id="select__category">
                    <option>No se ha seleccionado una categoría</option>
                </select>

                <button id="addCategory" type="button" title="Agregar nueva categoría">
                    <img src="../images/images-devices/add_circle.svg">
                </button>
            </div>

            <label for="brandDevices">Marca</label>
            <div class="container-brand">
                <select id="brandDevices">
                    <option>No se ha seleccionado una marca</option>
                </select>

                <button id="addBrand" type="button" title="Agregar nueva marca">
                    <img src="../images/images-devices/add_circle.svg">
                </button>
            </div>

            <label for="modelDevices">Modelo</label>
            <input id="modelDevices" type="text" placeholder="Ejemplo: SNL-002" class="input-forms">

            <label for="serialNumber">Número de serie</label>
            <input id="serialNumber" type="text" placeholder="Ejemplo: 080145780123" class="input-forms">
        </div>

        <div> 
            <label for="dateBuy">Fecha de compra</label>
            <input type="date" id="dateBuy" class="input-forms">

            <label for="dateExpiresWarranty">Fecha en la que expira la garantía</label>
            <input type="date" id="dateExpiresWarranty" class="input-forms">

            <label for="amountDevices">Importe del equipo</label>
            <input id="amountDevices" type="text" placeholder="Ejemplo: 20,000.00 MXN" class="input-forms">

            <label for="addressMacWifi">Dirección MAC WI-FI</label>
            <input id="addressMacWifi" type="text" placeholder="Ejemplo: f4:d6:20:ca:4f:d0" class="input-forms">
        </div>

        <div> 
            <button id="nextSectionDevices" class="button-action" type="button">
                <span>Siguiente</span>
                <img src="../images/images-devices/arrow_next.svg">
            </button>
        </div>
    </section>

    <section id='section-two'> 
        <div>
            <label for="imageDevices">Subir imagenes del equipo</label>
            <input type="file" id="imageDevices" accept="image/*" multiple>

            <label for="specificationDevices">Especificación del equipo</label>
            <textarea id="specificationDevices" class="textareaDevices" placeholder="Ejemplo: 8 de RAM, 500GB de espacio, etc."></textarea>

            <label for="detailsExtraDevices">Comentarios acerca del equipo</label>
            <textarea id="detailsExtraDevices" class="textareaDevices" placeholder="Colocar detalles extras sobre el equipo informático que se está registrando."></textarea>
        </div>

        <div class='second-container__section'>
            <label for="serviceTag" class='modify-label'>Service tag del equipo</label>
            <input id="serviceTag" type="text" placeholder="Ejemplo: 029SN01201J" class="input-forms modify">

            <label for="invoiceDevices" class='modify-label'>Subir factura del equipo</label>
            <input id="invoiceDevices" type="file" accept=".pdf,.xml" class='modify'>

            <label for="referenceCompaq" class='modify-label'>Numero de referencia de Compaq</label>
            <input id="referenceCompaq" type="text" placeholder="Ejemplo: 012832903" class="input-forms modify">

            <label for="addressEthernet" class='modify-label'>Dirección MAC Ethernet</label>
            <input id="addressEthernet" type="text" placeholder="Ejemplo: f4:d6:20:ca:4f:d0" class="input-forms modify">
        </div>

        <div>
            <button id="sendDataDevices" type="button" class="button-action">Registrar equipo</button>
        </div>
    </section>
</form>

<button id='returnSectionEquipment'>
    <img src='../images/images-records/return.svg'>
</button>
`;

export const equipmentStoreHTML = `
    <di>
        <h1>Registrar nuevo equipo de Almacen</h1>
    </di>
`;

export const equipmentMachineryHTML = `
    <di>
        <h1>Registrar nuevo equipo de Maquinaria</h1>
    </di>
`;