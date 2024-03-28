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
        </select>

        <label for="workBelongs">Obra a la que pertenece</label>
        <select name="work_belongs" id="workBelongs" required>
            <option value="">No se ha seleccionado ninguna obra</option>
        </select>

        <label for="forehead_belongs">Frente a la que pertenece</label>
        <select name="forehead_belongs" id="forehead_belongs" required>
            <option value="">No se ha seleccionado ningun frente</option>
        </select>

        <label for="email">Correo electrónico</label>
        <input name='email' class='input-forms' type='email' id='email' placeholder='Ejemplo: pablo@grupoopc.com' required>
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