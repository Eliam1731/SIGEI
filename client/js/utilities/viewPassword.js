export const viewPassword = ( input ) => {
    return ( input.getAttribute('type') === 'password' ) ? input.setAttribute('type', 'text') 
        : input.setAttribute('type', 'password');
};