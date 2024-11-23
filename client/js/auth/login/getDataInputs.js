import { validateInputEmail } from "../../utilities/emailValidate.js";
import { sendDataServer } from "../../utilities/sendDataServer.js";
export const getDataInputs = async( email, password, inputEmail ) => {
    const isNotEmptyOrWhitespace = /^\s*$/;
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const resultValidationEmail = validateInputEmail(emailValue);

    if( resultValidationEmail == false ) return;
    if( isNotEmptyOrWhitespace.test(passwordValue) ) {
        alert('El campo de contraseña no puede estar vacío.');

        return;
    }

    try {
        const responseServer = await sendDataServer('server/auth/login_validation.php', {
            email: emailValue,
            password: passwordValue,
        });

        if (responseServer.success) {
            inputEmail.value = '';
            window.location.href = 'client/pages/home.php';
        } else {
            alert(responseServer.error);
        }
    } catch(error) {
        console.error(error)
    }
}