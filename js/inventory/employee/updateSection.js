import { getDataServer } from "../../utilities/getDataServer.js";

export const updateInformationEmployee = async( data, root ) => {
    const { Correo_electronico, Empleado_id, Empresa, Nombre, Num_seguro_social, Obra, Primer_apellido, Segundo_apellido, Frente } = data[0];
    let business;

    try {
        business = await getDataServer('../server/data/business.php');
    } catch(error) {
        console.error(error);
    }

    const html = `
        <h2>Actualizar datos del empleado</h2>

        <form id='formUpdateInformationEmployee'>
            <label for='name_employee'>Nombre</label>
            <input id='name_employee' value='${Nombre}' name='Nombre' type='text' required>

            <label for='first_lastname'>Primer apellido</label>
            <input id='first_lastname' value='${Primer_apellido}' name='Primer_apellido' type='text' required>

            <label for='second_lastname'>Segundo apellido</label>
            <input id='second_lastname' value='${Segundo_apellido}' name='Segundo_apellido' type='text' required>

            <label for='numberSureSocial'>Número de seguro social</label>
            <input id='numberSureSocial' value='${Num_seguro_social}' name='Num_seguro_social' type='text' required>

            <label for='emailEmployee'>Número de seguro social</label>
            <input id='emailEmployee' value='${Correo_electronico}' name='Correo_electronico' type='email' required>

            <label for='company__belongs'>Empresa a la que pertenece</label>
            <select name='Empresa_id' id='company__belongs' required>
                <option value=''>No se ha seleccionado ninguna empresa</option>
                ${
                    business.company.map( companys => {
                        return `<option value='${companys[0]}' ${(companys[1] === Empresa) ? 'selected' : ''}>${companys[1]}</option>`
                    }).join(' ')
                }
            </select>

            <label for='work__belongs'>Obra a la que pertenece</label>
            <select name='Obra_id' id='work__belongs' required>
                <option value=''>No se ha seleccionado ninguna obra</option>
                ${
                    business.work.map( works => {
                        return `<option value='${works[0]}' ${(works[1] === Obra) ? 'selected' : ''}>${works[1]}</option>`
                    }).join(' ')
                }
            </select>

            <label for='front__belongs'>Frente al que pertenece</label>
            <select name='id_frente' id='front__belongs' required>
                <option value=''>No se ha seleccionado ningún frente</option>
                ${
                    business.forehead.map( fronts => {
                        return `<option value='${fronts[0]}' ${(fronts[1] === Frente) ? 'selected' : ''}>${fronts[1]}</option>`
                    }).join(' ')
                }
            </select>

            <button type='submit'>Actualizar</button>
        </form>
    `;

    root.innerHTML = html;
    const formUpdateInformationEmployee = document.getElementById('formUpdateInformationEmployee');

    formUpdateInformationEmployee.addEventListener('submit', async( event ) => {
        event.preventDefault();
        const formData = new FormData(formUpdateInformationEmployee);
        formData.append('Empleado_id', Empleado_id);

        try {
            let response = await fetch('../server/insert/update_employee.php', {
                method: 'POST',
                body: formData
            });

            let result = await response.json();
            
            if( result.message === 'Su actualización fue exitosa') {
                alert(result.message);
                return;
            }

            console.log(result);
            alert('Hubo un error al actualizar los datos');
        } catch (error) {
            console.error(error);
        }
    });

}