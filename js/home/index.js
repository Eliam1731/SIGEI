import { getDataServer } from "../utilities/getDataServer.js";

const elementsDOM = {
    span: 'span-nameUser',
}

const spanUserName = document.getElementById( elementsDOM.span );

document.addEventListener('DOMContentLoaded', async() => {
    const {
        usuario_id,
        correo_electronico,
        departamento_nombre:frente_nombre,
        nombre,
        primer_apellido,
        rol_nombre,
        segundo_apellido,
    } = await getDataServer('../server/auth/get_user.php')
    
    sessionStorage.setItem('userId', usuario_id);
    sessionStorage.setItem('email', correo_electronico);
    sessionStorage.setItem('forehead', frente_nombre);
    sessionStorage.setItem('name', nombre);
    sessionStorage.setItem('firstSurname', primer_apellido);
    sessionStorage.setItem('rol', rol_nombre);
    sessionStorage.setItem('secondSurname', segundo_apellido);
    spanUserName.textContent = `¡Hola ${sessionStorage.getItem('name')}!`;
});