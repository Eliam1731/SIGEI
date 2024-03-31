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

        <form id="formWork">
            <div class='first_div-work'>
                <label for="nameWork">Nombre de la obra</label>
                <input class='input-forms' type="text" id="nameWork" placeholder="Ejemplo: Eléctrica">

                <label for="shortNameWork">Nombre corto de la obra</label>
                <input class='input-forms' type="text" id="shortNameWork" placeholder="Ejemplo: Elec">

                <label for="numWork">Número de la obra</label>
                <input class='input-forms' type="text" id="numWork" placeholder="Ejemplo: 1909">

                <button class='button-action' id="nextFormWork" type='button'>Siguiente</button>
            </div>

            <div class='second_div-work'>
                <div>
                    <p>Seleccione las empresas a la que pewrtenece la obra</p>

                    <div id='groupsCompany'>
                    
                    </div>
                </div>

                <div>
                    <p>Seleccione los frentes que desea añadir a la obra.</p>

                    <div id='groupsForehead'>
                    
                    </div>
              </div>

                <button class='button-action' id="buttonCreateWork"type='button'>Crear nueva obra</button>
            </div>
        </form>

        <nav>
            <ul>
                <li class="formCompany li-selected">Crear nueva empresa</li>
                <li class="formWork">Crear nueva obra</li>
            </ul>
        </nav>
    </section>

    <button id='returnSection-work'>
        <img src='../images/images-records/return.svg'>
    </button>
`;

export const createCompanyDisabled = `
    <h1>Esta sección esta deshabilitada para tu frente</h1>
`;