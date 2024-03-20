import { employeeMachineryHTML, employeeStoreHTML, employeeSystemsHTML } from "../content-html/employeeHTML.js"

//Variables con el contenido HTML 
const formEmployee = {
    Sistemas: employeeSystemsHTML,
    Almacen: employeeStoreHTML,
    Maquinaria: employeeMachineryHTML,
}

//Funcion que se encarga de renderizar el contenido HTML de acuerdo al frente
export const formRegisterEmployee = ( forehead ) => {
    document.getElementById('root-forms').innerHTML = formEmployee[forehead];
}