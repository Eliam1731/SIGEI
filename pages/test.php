<form id="formWork">
            <div class="first_div">
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

                <button id="nextForm">Siguiente</button>
            </div>

            <div class="second_div">
                <p>Seleccione los frentes que desea añadir a la obra.</p>

                <div id="groupsForehead">
                    
                </div>
            </div>

            <div class="third_div">
                <button class='button-action' id="buttonCreateWork"type='button'>Crear nueva obra</button>
            </div>
        </form>