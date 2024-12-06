import { validateInputEmail } from '../../utilities/emailValidate.js';
import { sendDataServer } from '../../utilities/sendDataServer.js';

export const GettingCodeVerify = async ( event ) => {
    const data = Object.fromEntries(
        new FormData( event.target )
    );

    const validateEmail = validateInputEmail( data.email );

    if( validateEmail !== undefined ) return false;

    try {
        const response = await sendDataServer( 'server/data/new_pass.php', data );
        const { status, message, verification_code: code } = response;

        if( status === 'error' ) {
            alert( message );

            return false;
        }


        alert( message );

        sessionStorage.setItem( 'code_verification', code );
        sessionStorage.setItem( 'email_verify', data.email );

        event.target.reset();

        return true;
    } catch ( error ) {
        console.error( error );
    }
}