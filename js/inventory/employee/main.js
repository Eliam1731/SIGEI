import { getDataServer } from "../../utilities/getDataServer.js";
import { windowActionsEmployee } from "./windowActionsEmployee.js";

const employeeElementsDOM = {
    tableBody: 'renderDataEmployee',
    listItemEmployee: 'listItemEmployee',
}

const bodyTableEmployee = document.getElementById( employeeElementsDOM.tableBody );
const listItemEmployee = document.getElementById( employeeElementsDOM.listItemEmployee );

const renderDataEmployee = ( data ) => {
    bodyTableEmployee.innerHTML = '';
    data.forEach( employee => {
        const { Empleado_id: employeeID, Nombre: name, Primer_apellido: firstLastName, Segundo_apellido: secondLastName, Num_seguro_social: sureSocial, Correo_electronico: email, Empresa: companyID, Obra: workID, Frente: frontID } = employee;

        const employeeRow = `
            <tr>
                <td>${name} ${firstLastName} ${secondLastName}</td>
                <td>${companyID}</td>
                <td>${workID}</td>
                <td>${frontID}</td>   
                <td id='${ sureSocial }'>
                    <button class='editInformation__employee'>
                        Editar
                    </button>
                </td>            
            </tr>
        `;

        bodyTableEmployee.innerHTML += employeeRow;
    });

    const buttonEdit = document.querySelectorAll('.editInformation__employee');

    buttonEdit.forEach(  button => {
        button.addEventListener('click', () => {
            const sureSocial = button.parentElement.id;
            windowActionsEmployee(data, sureSocial);
        });
    });
}

listItemEmployee.addEventListener('click', async() => {
    try {
        let response = await getDataServer('../server/data/employeevisualization.php');
        console.log(response);
        renderDataEmployee(response);
    } catch (error) {
        console.error(error);
    }
});
