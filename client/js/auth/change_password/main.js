import { sendDataServer } from '../../utilities/sendDataServer.js';
import { GettingCodeVerify } from './GettingCode.js';

const elementsDOM = {
    sectionNewPassword: 'section-newPassword',
    returnButton: 'returnSection',
    formEmail: 'form-changePassword__email',
    formCodeVerify: 'formCodeVerify',
    cardConfirmEmail: 'confirm-email',
    cardCodeVerify: 'code-verify',
    paragraphCodeIncorrect: 'codeIncorrect',
    buttonForwardCodeVerify: 'forwardCodeVerify',
    spanUserEmail: 'userEmailChangePass',
    cardChangePass: 'cardChangePass',
    formChangePassword: 'formChangePass',
    followingStepBtn: 'followingStep'
}

const sectionNewPassword = document.getElementById( elementsDOM.sectionNewPassword );
const returnButton = document.getElementById( elementsDOM.returnButton );
const formEmail = document.getElementById( elementsDOM.formEmail );
const cardConfirmEmail = document.getElementById( elementsDOM.cardConfirmEmail );
const cardCodeVerify = document.getElementById( elementsDOM.cardCodeVerify );
const formCodeVerify = document.getElementById( elementsDOM.formCodeVerify );
const inputsCodeVerify = Array.from(formCodeVerify.elements).filter(el => el.tagName === 'INPUT');
const regex = /^[a-zA-Z0-9]+$/;
const paragraphCodeIncorrect = document.getElementById( elementsDOM.paragraphCodeIncorrect );
const forwardCodeVerifyBtn = document.getElementById( elementsDOM.buttonForwardCodeVerify );
const spanUserEmail = document.getElementById( elementsDOM.spanUserEmail );
const cardChangePassword = document.getElementById( elementsDOM.cardChangePass );
const formChangePassword = document.getElementById( elementsDOM.formChangePassword );
const followingStepBtn = document.getElementById( elementsDOM.followingStepBtn );
let codeVerify = {
    oneCode: '',
    twoCode: '',
    threeCode: '',
    fourCode: '',
    fiveCode: ''
}

returnButton.addEventListener('click', () => sectionNewPassword.style.display = 'none' );

formEmail.addEventListener( 'submit', async( event ) => {
    event.preventDefault();

    followingStepBtn.textContent = 'Cargando...';
    followingStepBtn.disabled = true;

    const isVerified = await GettingCodeVerify( event );

    if( isVerified ) {
        cardConfirmEmail.style.display = 'none';
        cardCodeVerify.style.display = 'flex';
        spanUserEmail.textContent = sessionStorage.getItem('email_verify');
    };
});

inputsCodeVerify.forEach((input, index) => {
    input.addEventListener('input', (event) => {
        const { value, name } = event.target;

        if( !regex.test( value ) || value.length > 1 ) {
            event.target.value = '';

            return;
        }

        codeVerify = { ...codeVerify, [name]: value }

        if( index === 4 ) {
            const { oneCode, twoCode, threeCode, fourCode, fiveCode } = codeVerify;
            const codeUser = `${ oneCode }${ twoCode }${ threeCode }${ fourCode }${ fiveCode }`;
            const codeServer = sessionStorage.getItem('code_verification');

            if( codeUser === codeServer ) {
                inputsCodeVerify.forEach( input => {
                    input.style.border = '1px solid green';
                    input.style.outline = '1px solid green';

                    setTimeout( () => {
                        cardCodeVerify.style.display = 'none';
                        cardChangePassword.style.display = 'flex';

                    }, 1500);
                })

                return;
            }

            inputsCodeVerify.forEach( input => {
                input.style.border = '1px solid red';
                input.style.outline = '1px solid red';

                paragraphCodeIncorrect.textContent = 'Código de verificación incorrecto';
            });
        }

        if ( index < inputsCodeVerify.length - 1 ) inputsCodeVerify[index + 1].focus();
    });
});

forwardCodeVerifyBtn.addEventListener( 'click', async() => {
    const email = sessionStorage.getItem('email_verify');

    if( !email ) {
        alert('No se ha proporcionado un correo electrónico');
        cardCodeVerify.style.display = 'none';
        cardConfirmEmail.style.display = 'flex';

        return;
    }

    try {
        const response = await sendDataServer('server/data/new_pass.php', { email });
        const { status, message, verification_code: code } = response;

        if( status === 'success' ) {
            alert( message );

            sessionStorage.setItem('code_verification', code);

            return;
        }

        throw new Error( message );
    } catch( error ) {
        alert('Error interno del servidor, por favor, inténtelo más tardé.')

        sectionNewPassword.style.display = 'none';
    }
});

formChangePassword.addEventListener( 'submit', async( event ) => {
    event.preventDefault();

    const data = Object.fromEntries(
        new FormData( event.target )
    );

    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\w\s]).*$/;

    const { newPass, confirmPassword } = data;

    if( newPass !== confirmPassword ) return alert('Las contraseñas no coinciden.');

    if( !regex.test( newPass ) || newPass.length < 5 ) {
        return alert('La contraseña debe tener al menos una palabra en mayúscula, un numero, un carácter especial y mayor a 5 caracteres.');
    }

    const response = await sendDataServer('server/insert/pass_change.php', {
        newPass,
        email: sessionStorage.getItem('email_verify')
    });

    const { message, error } = response;

    if( !error ) {
        alert( message );
        sessionStorage.removeItem('code_verification');
        sessionStorage.removeItem('email_verify');

        window.location.reload();

        return;
    }

    alert('Error interno del servidor, por favor intentelo mas tarde');
    sessionStorage.removeItem('code_verification');
    sessionStorage.removeItem('email_verify');

    window.location.reload();
});