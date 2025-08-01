import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { searchEmployeeList } from "./viewSearchEmployee.js";
import { windowActionsEmployee } from "./windowActionsEmployee.js";

const employeeElementsDOM = {
    tableBody: 'renderDataEmployee',
    listItemEmployee: 'listItemEmployee',
}

const bodyTableEmployee = document.getElementById( employeeElementsDOM.tableBody );
const listItemEmployee = document.getElementById( employeeElementsDOM.listItemEmployee );
const searchEmployee = document.getElementById('searcherEmployee');
const buttonRedirectSection = document.getElementById('redirectionRecordsEmployee');

buttonRedirectSection.addEventListener('click', () => { window.location.href = '../pages/records.php'; });

const renderDataEmployee = ( data ) => {
    bodyTableEmployee.innerHTML = '';

    data.forEach( employee => {
        const { Empleado_id: employeeID, Nombre: name, Primer_apellido: firstLastName, Segundo_apellido: secondLastName, Obra: workID, Frente: frontID, Nom_corto_empresa: shortName } = employee;

        const employeeRow = `
            <tr>
                <td>${name} ${firstLastName} ${secondLastName}</td>
                <td>${shortName}</td>
                <td>${workID}</td>
                <td>${frontID}</td>
                <td id='${ employeeID }'>
                    <button class='editInformation__employee'>
                        Editar
                    </button>
                </td
            </tr>
        `;

        bodyTableEmployee.innerHTML += employeeRow;
    });

    const buttonEdit = document.querySelectorAll('.editInformation__employee');

    buttonEdit.forEach(  button => {
        button.addEventListener('click', () => {
            const idEmployee = button.parentElement.id;
            windowActionsEmployee(data, idEmployee);
        });
    });
}

listItemEmployee.addEventListener('click', async() => {
    try {
        let response = await getDataServer('../../server/data/employeevisualization.php');

        renderDataEmployee(response);
    } catch (error) {
        console.error(error);
    }
});

searchEmployee.addEventListener('keyup', async( event ) => {
    const search = event.target.value.trim().toLowerCase();

    try {
        const response = await sendDataServer('../../server/data/searcher.php', { search });

        searchEmployeeList(response, searchEmployee);
    } catch (error) {
        console.error(error);
    }
});