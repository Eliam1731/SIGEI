export const accountSystemsHTML = `
    <h2>Crear nueva cuenta de usuario</h2>
    <div class='line-horizontal__decoration'></div>

    <form id='form-account'>
        <div class='first-container__account'> 
            <div>
                <label for='firstNameUser'>Primer nombre</label>
                <input class='input-forms' tabindex='1' type='text' placeholder='Ejemplo: Fernando' id='firstNameUser'>

                <label for='firstSurnameUser'>Primer apellido</label>
                <input class='input-forms' tabindex='3' type='text' placeholder='Ejemplo: Herrera' id='firstSurnameUser'>

                <label for='forehead-user'>Frente actual del usuario</label>
                <select id='departmentId' disabled>
                    <option value='1'>Sistemas</option>
                </select>
            </div>

            <div>
                <label for='secondNameUser'>Segundo nombre (Opcional)</label>
                <input class='input-forms' tabindex='2' type='text' placeholder='Ejemplo: Alejandro' id='secondNameUser'>

                <label for='secondSurnameUser'>Segundo apellido</label>
                <input class='input-forms' tabindex='4' type='text' placeholder='Ejemplo: Cruz' id='secondSurnameUser'>

                <label for='userRol'>Rol del usuario</label>
                <select tabindex='5' id='userRol'>
                    <option>No se ha seleccionado un rol</option>
                    <option value='1'>Administrador</option>
                    <option value='2'>Usuario Estándar</option>
                </select>
            </div>

            <div>
                <button tabindex='6' type='button' id='nextSectionAccount' class='button-action'>Siguiente</button>
            </div>
        </div>

        <div class='second-container__account'>
            <div>
                <label for='new-emailUser' class='label-account'>Correo electrónico</label>
                <div id='container-inputAccount'>
                    <input id='newEmailUser' type='text' placeholder='Ejemplo: fernandoherrera23'>
                    <div class='domain-email'>
                        <span>@grupoopc.com</span>
                    </div>
                </div>

                <label for='confirm-emailUser' class='label-account'>Confirmar correo electrónico</label>
                <div id='container-inputAccount'>
                    <input id='confirmEmailUser' type='text' placeholder='Ejemplo: fernandoherrera23'>
                    <div class='domain-email'>
                        <span>@grupoopc.com</span>
                    </div>
                </div>
            </div>

            <div>
                <label for='new-passwordUser' class='label-account'>Crear contraseña</label>
                <div id='container-inputAccount'>
                    <input id='newPasswordUser' type='password' placeholder='Ejemplo: AxS&24L%asd' data-password='input'>
                    <div class='domain-email' data-pass='view'>
                        <span id='spanPasswordView1'>Ver contraseña</span>
                    </div>
                </div>

                <label for='confirm-passwordUser' class='label-account'>Confirmar contraseña</label>
                <div id='container-inputAccount'>
                    <input id='confirmPasswordUser' type='password' placeholder='Ejemplo: AxS&24L%asd' data-password='input'>
                    <div class='domain-email' data-pass='view'>
                        <span id='spanPasswordView2'>Ver contraseña</span>
                    </div>
                </div>
            </div>

            <div>
                <button id="accountSendData" class='button-action' type='button'>Crear cuenta</button>
            </div>
        </div>
    </form>

    <button id='returnSection'>
        <img src='../images/images-records/return.svg'>
    </button>
`;  

export const accountStoreHTML = `
    <h2>Crear cuenta Almacen</h2>
`;

export const accountMachineryHTML = `
    <h2>Crear cuenta Maquinaria</h2>
`;

export const notPermissionCreateAccount = `
    <h2>Ups, No tienes permisos para crear cuentas de usuario!!</h2>
`;