import { GettingCodeVerify } from './GettingCode.js';

const elementsDOM = {
    sectionNewPassword: 'section-newPassword',
    returnButton: 'returnSection',
    formEmail: 'form-changePassword__email',
    cardConfirmEmail: 'confirm-email'
}

const sectionNewPassword = document.getElementById( elementsDOM.sectionNewPassword );
const returnButton = document.getElementById( elementsDOM.returnButton );
const formEmail = document.getElementById( elementsDOM.formEmail );
const cardConfirmEmail = document.getElementById( elementsDOM.cardConfirmEmail );

returnButton.addEventListener('click', () => sectionNewPassword.style.display = 'none' );

formEmail.addEventListener( 'submit', async( event ) => {
    event.preventDefault();

    const isVerified = GettingCodeVerify( event );

    if( isVerified ) cardConfirmEmail.style.display = 'none';
});