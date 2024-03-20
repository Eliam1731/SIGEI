export const companySystemsHTML = `
    <h2>Crear nueva empresa</h2>
    <div class="line-horizontal__decoration"></div>

    <section id="sectionCompany">
        <form id="formCompany">
            <label for="nameCompany">Nombre de la empresa</label>
            <input class='input-forms' type="text" placeholder="Ejemplo: OPCIC-COM" id="nameCompany">

            <label for="shortName">Nombre corto de la empresa</label>
            <input class='input-forms' type="text" placeholder="Ejemplo: OPCIC" id="shortName">

            <button class='button-action' type="button" id="buttonCreateCompany">Crear empresa</button>
        </form>

        <form action="" id="formWork">
            <div>
                <label for="nameWork">Nombre de la obra</label>
                <input class='input-forms' type="text" id="nameWork" placeholder="Ejemplo: Eléctrica">

                <label for="shortNameWork">Nombre corto de la obra</label>
                <input class='input-forms' type="text" id="shortNameWork" placeholder="Ejemplo: Elec">

                <label for="numWork">Número de la obra</label>
                <input class='input-forms' type="text" id="numWork" placeholder="Ejemplo: 1909">

                <label for="companyBelongsWork">Empresa a la que pertenece la obra</label>
                <select id="companyBelongsWork">
                    <option>Seleccione una empresa</option>
                </select>
            </div>

            <div>
                <label for="foreheadAddWork">Seleccione los frentes</label>
                <select id="foreheadAddWork">
                    <option>No se ha seleccionado ningún frente</option>
                </select>

                <div id="groupsForehead">
                    <p>No se han añadido frentes</p>
                </div>
            </div>

            <div>
                <button class='button-action' id="buttonCreateWork"type='button'>Crear nueva obra</button>
            </div>
        </form>

        <nav>
            <ul>
                <li class="formCompany">Crear nueva empresa</li>
                <li class="formWork">Crear nueva obra</li>
            </ul>
        </nav>
    </section>
`;

export const createCompanyDisabled = `
    <h1>Esta sección esta deshabilitada para tu frente</h1>
`;