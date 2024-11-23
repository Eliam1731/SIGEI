const messageEmail = {
    empty: 'El campo de correo electrónico no puede estar vacío.',
    spaceBetweenWords: 'No puede haber espacios entre el correo electrónico.',
    emailValid: 'Coloque un correo electrónico valido.',
}

export const validateInputEmail = ( email ) => {
    const isNotEmptyOrWhitespace = /^\s*$/;
    const spaceBetweenWords = /\s/;
    const domain = '@grupoopc.com';

    if(isNotEmptyOrWhitespace.test(email)) {
        alert(messageEmail.empty)

        return false; 
    };

    if(spaceBetweenWords.test(email)) {
        alert(messageEmail.spaceBetweenWords);

        return false;
    }

    if(email.substring(email.length - 13, email.length) !== domain) {
        alert(messageEmail.emailValid);

        return false;
    }
}