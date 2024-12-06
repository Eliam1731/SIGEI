import { createWindowActionsEmployee } from "./windowActionsEmployee.js";


const closeSearchEmployee = ( root ) => { root.remove() }

export const searchEmployeeList = ( data, input ) => {
    const existsRoot = document.querySelector('.rootSearchEmployee');

    if( input.value === '' ) {
        if( existsRoot ) existsRoot.remove();
        return;
    }
    
    if( existsRoot ) existsRoot.remove();

    const root = document.createElement('div');
    const container = document.createElement('div');
    const ul = document.createElement('ul');

    root.classList.add('rootSearchEmployee');
    root.addEventListener('click', ( event ) => { if( event.target.classList.contains('rootSearchEmployee') ) closeSearchEmployee( root ) });

    document.body.appendChild( root );
    root.appendChild( container );
    container.appendChild( ul );

    //Mostrar mensaje cuando no se encuentre empleados
    if(data.error || data.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron empleados';
        ul.appendChild( li );
        return;
    }

    data.forEach( employee => {
        const { Nombre: name, Primer_apellido: firstLastName, Segundo_apellido: secondLastName, Empleado_id: employeeID } = employee;

        const li = document.createElement('li');
        li.textContent = `${name} ${firstLastName} ${secondLastName}`;
        li.id = employeeID;

        li.addEventListener('click', () => {
            createWindowActionsEmployee( employee, employeeID );
            closeSearchEmployee( root );
            input.value = '';
        });

        ul.appendChild( li );
    });
}