import { getDataServer } from "../../utilities/getDataServer.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
import { windowActionsEmployee } from "./windowActionsEmployee.js";

const employeeElementsDOM = {
    tableBody: 'renderDataEmployee',
    listItemEmployee: 'listItemEmployee',
}

const bodyTableEmployee = document.getElementById( employeeElementsDOM.tableBody );
const listItemEmployee = document.getElementById( employeeElementsDOM.listItemEmployee );
const searchEmployee = document.getElementById('searcherEmployee');
let idx = 0; 

const renderDataEmployee = ( data ) => {
    bodyTableEmployee.innerHTML = '';

    data.forEach( employee => {
        const { 
            Empleado_id: employeeID, Nombre: name, Primer_apellido: firstLastName, Segundo_apellido: secondLastName, 
            Num_seguro_social: sureSocial, Correo_electronico: email, Empresa: companyID, Obra: workID, Frente: frontID, 
            Nom_corto_empresa: shortName } = employee;

        const employeeRow = `
            <tr>
                <td>${name} ${firstLastName} ${secondLastName}</td>
                <td>${shortName}</td>
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

searchEmployee.addEventListener('keyup', async( event ) => {
    const search = event.target.value.trim().toLowerCase();
   
    try {
        if(search !== '') {
            const response = await sendDataServer('../server/data/searcher.php', { search });

            
        }
    } catch (error) {
        console.error(error);
    }
});