const colorsCard = ['#EAB308', '#22C55E', '#9333EA', '#DB2777', '#0F172A', '#0EA5E9', '#833F0E', '#03A9F4', '#00BCD4', '#009688', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF9800', '#795548', '#9E9E9E', '#607D8B'];

const closeWindowDetails = ( root ) => {
    root.remove();
}

const createCardTotalDevice = ( data, root ) => {
    const devicesCountCategory = {};

    Object.keys(data).forEach( work => {
        Object.keys(data[work].frentes).forEach( front => {
            Object.keys(data[work].frentes[front].empleados).forEach( employee => {
                data[work].frentes[front].empleados[employee].equipos.forEach( device => {
                    const { Nom_subcategoria: subcategory } = device;

                    ( devicesCountCategory[subcategory] ) ? devicesCountCategory[subcategory]++ : devicesCountCategory[subcategory] = 1;
                });
            });
        });
    });

    Object.keys(devicesCountCategory).forEach( (category, idx) => {
        const card = `
            <div class='card-category-count'>
                <div style='background: ${ ( colorsCard[idx] ) ? colorsCard[idx] : colorsCard[0] }'>
                    <h5>${ category.split(' ').map( word => word[0].toUpperCase()).join('') }</h5>
                </div>

                <div>
                    <h5>${category}</h5>
                    <p>${devicesCountCategory[category]} ${ ( devicesCountCategory[category] > 1 ) ? 'dispositivos' : 'dispositivo' }</p>
                </div>
            </div>
        `;

        root.innerHTML += card;
    });
}

export const windowDetailsDevice = ( data ) => {
    const rootDetails = document.createElement('div');
    const windowDetails = document.createElement('div');
    const htmlRoots = `
        <section id='rootDetailsSafeguars'></section>
        <section id='summary-safeguard'>
            <h4>Dispositivos en resguardo por la empresa</h4>

            <div id='rootCard-category'></div>
        </section>
    `;

    rootDetails.classList.add('root-window-details__safeguards');
    rootDetails.append(windowDetails);
    document.body.appendChild(rootDetails);
    rootDetails.addEventListener('click', event => {if( event.target === rootDetails ) closeWindowDetails( rootDetails ) });
    windowDetails.innerHTML = htmlRoots;
    const rootCardCategory = document.getElementById('rootCard-category');

    createCardTotalDevice( data.obras, rootCardCategory );
}