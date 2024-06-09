const colorsCard = ['#EAB308', '#22C55E', '#9333EA', '#DB2777', '#0F172A', '#0EA5E9', '#833F0E', '#03A9F4', '#00BCD4', '#009688', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF9800', '#795548', '#9E9E9E', '#607D8B'];

const closeWindowDetails = ( root ) => {
    root.remove();
}

const createCardWorks = ( data, root ) => {
    Object.keys(data).forEach( work => {
        const card = `
            <div class='card-work-summary'>
                <div>
                    <h5>Nombre de la obra</h5>

                    <p>${work} <span>| núm. ${ data[work].Num_obra }</span></p>
                </div>
                <div>
                    <div>
                        <h5>Cantidad de frentes</h5>

                        <span>${ Object.keys(data[work].frentes).length }</span>
                    </div>
                    <div>
                        <h5>Cantidad de empleados</h5>

                        <span>${
                            Object.values(data[work].frentes).reduce((count, currentFront) => {
                                return count + Object.keys(currentFront.empleados).length;
                            }, 0)
                        }</span>
                    </div>
                    <div>
                        <h5>Cantidad de equipos</h5>

                        <span>
                            ${
                                Object.values(data[work].frentes).reduce((count, currentFront) => {
                                    return count + Object.values(currentFront.empleados).reduce((countEmployees, currentEmployee) => {
                                        return countEmployees + Object.keys(currentEmployee.equipos).length;
                                    }, 0);
                                }, 0)
                            }
                        </span>
                    </div>
                </div>
            </div>
        `;

        root.innerHTML += card;
    });

    console.log(data);
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
        <section id='rootDetailsSafeguars'>
            <h4>Información general de la empresa</h4>

            <p>Por favor, haga clic en la obra sobre la que desea obtener más información.</p>

            <div id='rootCard-works'></div>
        </section>
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
    const rootCardWorks = document.getElementById('rootCard-works');

    createCardTotalDevice( data.obras, rootCardCategory );
    createCardWorks( data.obras, rootCardWorks );
}