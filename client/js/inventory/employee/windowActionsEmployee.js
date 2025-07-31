import { generateReportSafeguards } from "./generateReport.js";
import { deviceGuardEmployee } from "./guardDevice.js";
import { updateInformationEmployee } from "./updateSection.js";

const closeWindowActionsEmployee = ( elementHTML ) => elementHTML.remove();

export const createWindowActionsEmployee = ( employee ) => {
    const root = document.createElement('div');
    const container = document.createElement('div');
    const html = `
        <div class='root-employee'>

        </div>

        <nav class='windowActionsEmployee__nav'>
            <ul class='windowActionsEmployee__list'>
                <li id='updateSectionEmployee'>Actualizar datos del empleado</li>
            </ul>


        </nav>
    `;

    root.classList.add('rootWindowActionsEmployee');
    container.classList.add('windowActionsEmployee');

    root.addEventListener('click', ( event ) => {
        if( event.target.classList.contains('rootWindowActionsEmployee') ) closeWindowActionsEmployee( root );
    });

    container.innerHTML = html;
    root.appendChild( container );
    document.body.appendChild( root );

    const listItemUpdateData = document.getElementById('updateSectionEmployee');
    //const downloadGuardFile = document.getElementById('downloadGuard__file');
    const rootEmployee = document.querySelector('.root-employee')

    updateInformationEmployee( employee, rootEmployee );
    listItemUpdateData.addEventListener('click', () => updateInformationEmployee( employee, rootEmployee ));


    //downloadGuardFile.addEventListener('click', () => {
    //    const {
      //      Num_obra: work, Nombre, Primer_apellido, Segundo_apellido, Equipos
        //} = (employee[0] !== undefined) ? employee[0] : employee;

        //if( Equipos.length === 0 ) return alert('El empleado no tiene equipos asignados');

        //const employeeName = `${Nombre} ${Primer_apellido} ${Segundo_apellido}`;
        //const amount = '1';
        //const code = [];
        //const description = [];

        //Equipos.forEach( equipment => {
        //    const descriptionEquipment = `${equipment.Subcategoria} ${equipment.Marca} ${equipment.Modelo} ${equipment.Num_serie}`;
//
  //          code.push( equipment.miId );
    //        description.push( descriptionEquipment );
      //  });

        //generateReportSafeguards( work, amount, code, description, employeeName );
    //});
}

export const windowActionsEmployee = ( data, employee ) => {
    console.log("Empleado que se quiere buscar:", employee);
    console.log("Data recibida:", data);

    const filterEmployee = data.filter(
  employeeData => parseInt(employeeData.Empleado_id) === parseInt(employee)
);

    if (filterEmployee.length === 0) {
        console.error(`Empleado no encontrado con ID: ${employee}`);
        return;
    }

    createWindowActionsEmployee( filterEmployee );
} 