export const detailsSafeguardHistory = ( safeguard ) => {
    const root = document.createElement('div');
    const container = document.createElement('div');

    root.classList.add('root-details-safeguard');
    container.classList.add('container-details-safeguard');
    
    root.appendChild(container);
    document.body.appendChild(root);
}