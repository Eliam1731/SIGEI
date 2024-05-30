export const equipmentSystemsHTML = `
<h2>Registrar nuevo equipo informático</h2>
<div class="line-horizontal__decoration line-horizontal__modify"></div>

<form id="form-equipment">
    <div class='containerInput__flex'>
        <label for="select__category">Elija la categoría</label>

        <div class="container-category">
            <select id="select__category" required>
                <option value=''>No se ha seleccionado una categoría</option>
            </select>

            <button id="addCategory" type="button" title="Agregar nueva categoría">
                <img src="../images/images-devices/add_circle.svg">
            </button>
        </div>
    </div>

    <div class='containerInput__flex'>
        <label for="brandDevices">Marca</label>

        <div class="container-brand">
            <select id="brandDevices" required>
                <option value=''>No se ha seleccionado una marca</option>
            </select>

            <button id="addBrand" type="button" title="Agregar nueva marca">
                <img src="../images/images-devices/add_circle.svg">
            </button>
        </div>
    </div>

    <div class='containerInput__flex'>
        <label for="codeEquipment">Pegue el código aquí si ya conoce el código del equipo.</label>

        <div class="containe__codeequipment">
            <div><span>OPCIC-COM-</span></div>
            <input type="text" placeholder="Ejemplo: 00012" id="codeEquipment">
        </div>
    </div>

    <div class='containerInput__flex'>
        <label for="modelDevices">Modelo</label>

        <input id="modelDevices" type="text" placeholder="Ejemplo: SNL-002" required>
    </div>

    <div class='containerInput__flex'>
        <label for="serialNumber">Número de serie</label>

        <input id="serialNumber" type="text" placeholder="Ejemplo: 080145780123" required>
    </div>

    <div class='containerInput__flex'>
        <label for="serviceTag">Service tag del equipo</label>
        <input id="serviceTag" type="text" placeholder="Ejemplo: 029SN01201J" required>
    </div>

    <div class='containerInput__flex'>
        <label for="dateBuy">Fecha de compra</label>

        <input type="date" id="dateBuy">
    </div>

    <div class='containerInput__flex'>
        <label for="dateExpiresWarranty">Fecha en la que expira la garantía</label>

        <input type="date" id="dateExpiresWarranty">
    </div>

    <div class='containerInput__flex'>
        <label for="amountDevices">Importe del equipo</label>

        <input id="amountDevices" type="text" placeholder="Ejemplo: 20,000.00 MXN" required>
    </div>

    <div class='containerInput__flex'>
        <label for="specificationDevices">Especificación del equipo</label>

        <textarea id="specificationDevices" placeholder="Ejemplo: 8 de RAM, 500GB de espacio, etc." required title="Por favor, separe las especificaciones del equipo utilizando comas."></textarea>
    </div>

    <div class='containerInput__flex'>
        <label for="referenceCompaq" class='modify-label'>Numero de referencia de Compras</label>
        <input id="referenceCompaq" type="text" placeholder="Ejemplo: 012832903">
    </div>

    <div class='containerInput__flex hiden-inputs'>
        <label for="addressEthernet" class='modify-label'>Dirección MAC Ethernet</label>

        <input id="addressEthernet" type="text" placeholder="Ejemplo: f4:d6:20:ca:4f:d0" required>
    </div>

    <div class='containerInput__flex hiden-inputs'>
        <label for="addressMacWifi">Dirección MAC WI-FI</label>

        <input id="addressMacWifi" type="text" placeholder="Ejemplo: f4:d6:20:ca:4f:d0" required>
    </div>

    <div class='containerInput__flex'>
        <p>Subir factura del equipo</p>

        <div class="container__inputfile">
            <input id="invoiceDevices" type="file" accept=".pdf,.xml" multiple>

            <label for="invoiceDevices">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-460h40v-80h40q17 0 28.5-11.5T480-580v-40q0-17-11.5-28.5T440-660h-80v200Zm40-120v-40h40v40h-40Zm120 120h80q17 0 28.5-11.5T640-500v-120q0-17-11.5-28.5T600-660h-80v200Zm40-40v-120h40v120h-40Zm120 40h40v-80h40v-40h-40v-40h40v-40h-80v200ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>

                <span id='spanInputFile'>No hay facturas seleccionadas</span>
            </label>
        </div>
    </div>

    <div class='containerInput__flex'>
        <p>Subir imagenes del equipo</p>

        <div class="container__inputfile">
            <input type="file" id="imageDevices" accept="image/*" multiple required>

            <label for="imageDevices">
                <svg width="118" height="102" viewBox="0 0 118 102" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.9997 58.6667H96.333L77.933 34.6667L65.6663 50.6667L57.3997 40L42.9997 58.6667ZM10.9997 101.333C8.06634 101.333 5.55523 100.289 3.46634 98.2C1.37745 96.1111 0.333008 93.6 0.333008 90.6667V21.3333H10.9997V90.6667H101.666V101.333H10.9997ZM32.333 80C29.3997 80 26.8886 78.9556 24.7997 76.8667C22.7108 74.7778 21.6663 72.2667 21.6663 69.3333V10.6667C21.6663 7.73333 22.7108 5.22222 24.7997 3.13333C26.8886 1.04444 29.3997 0 32.333 0H58.9997L69.6663 10.6667H107C109.933 10.6667 112.444 11.7111 114.533 13.8C116.622 15.8889 117.666 18.4 117.666 21.3333V69.3333C117.666 72.2667 116.622 74.7778 114.533 76.8667C112.444 78.9556 109.933 80 107 80H32.333ZM32.333 69.3333H107V21.3333H65.2663L54.5997 10.6667H32.333V69.3333Z" fill="black"/></svg>

                <span id='spanInputImage'>No hay imagenes seleccionadas</span>
            </label>
        </div>
    </div>

    <div class='containerInput__flex' id='hiden-inputs-numberPhone'>
        <label for="num_telefono">Número de teléfono</label>

        <input id="num_telefono" type="text" placeholder="Ejemplo: 9212728910">
    </div>

    <div class='containerInput__flex'>
        <label for="detailsExtraDevices">Comentarios acerca del equipo</label>

        <textarea id="detailsExtraDevices" placeholder="Colocar detalles extras sobre el equipo informático que se está registrando."></textarea>
    </div>
        
    <button id="sendDataDevices">Registrar equipo</button>
</form>
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