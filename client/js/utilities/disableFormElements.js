export const disableFormElements = ( form ) => {
    const elements = form.elements;

    for( let element of elements ) {
        element.disabled = true;
    }
}