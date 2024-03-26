export const employeeSystemsHTML = `
<h2>Registrar nuevo empleado resguardante </h2>
<div class='line-horizontal__decoration'></div>

<form id='form_employee'>
    <div class="first_div">
        <label for="nameEmployee">Nombre</label>
        <input class='input-forms' type="text" name="name" id="nameEmployee" placeholder="Ejemplo: Fernando" required>

        <label for="firstSurname">Primer apellido</label>
        <input class='input-forms' type="text" name="first_surname" id="firstSurname" placeholder="Ejemplo: Herrera" required>

        <label for="secondSurname">Segundo apellido</label>
        <input class='input-forms' type="text" name="second_surname" id="secondSurname" placeholder="Ejemplo: Dalto" required>

        <label for="numberSocial">Número de seguro social</label>
        <input class='input-forms' type="text" name="number_social" id="numberSocial" placeholder="Ejemplo: 91052412345" required>
    </div>

    <div class="second_div">
        <label for="companyBelongs">Empresa a la que pertenece</label>
        <select name="company_belongs" id="companyBelongs" required>
            <option value="">No se ha seleccionado ninguna empresa</option>
            <option value="1">OPC</option>
            <option value="2">OPCIC</option>
        </select>

        <label for="workBelongs">Obra a la que pertenece</label>
        <select name="work_belongs" id="workBelongs" required>
            <option value="">No se ha seleccionado ninguna obra</option>
            <option value="1">Primera obra</option>
            <option value="2">Segunda obra</option>
        </select>

        <label for="forehead_belongs">Frente a la que pertenece</label>
        <select name="forehead_belongs" id="forehead_belongs" required>
            <option value="">No se ha seleccionado ningun frente</option>
            <option value="1">Civil</option>
            <option value="2">Mecanico</option>
            <option value="3">Tuberias</option>
            <option value="4">Ingenieria</option>
            <option value="5">Procura</option>
            <option value="6">Electrico</option>
            <option value="7">Intrumentacion y Control</option>
            <option value="8">Pintura y Aislamiento</option>
            <option value="9">Seguridad industrial</option>
            <option value="10">Aire Acondicionado</option>
            <option value="11">Telecomunicaciones</option>
            <option value="12">Mantenimiento Industrial</option>
            <option value="13">Maquinaria</option>
            <option value="14">Indirectos</option>
            <option value="15">Centro de Servicio</option>
            <option value="16">Soldadura</option>
            <option value="17">Mantto. Inmuebles</option>
            <option value="18">Jisor</option>
            <option value="19">Indirectos Maq</option>
            <option value="20">Pilas y Estructura</option>
            <option value="21">Dirección operativa</option>
            <option value="22">Servicios Generales</option>
            <option value="23">DITE AIR</option>
            <option value="24">Sistemas</option>
            <option value="25">Almacén</option>
        </select>

        <label for="observationEmployee">Observaciones (Opcional)</label>
        <textarea name="observation_employee" id="observationEmployee" placeholder="Ejemplo:  Puede colocar número telefónico, email, etc. "></textarea>
    </div>

    <div class="third_div">
        <button class='button-action'>Registrar empleado</button>
    </div>
</form>
`;

export const employeeStoreHTML = `
    <h1>Registrar nuevo empleado Almacen</h1>
`;

export const employeeMachineryHTML = `
    <h1>Registrar nuevo empleado Maquinaria</h1>
`;