let indexTable = 0;
let indexMaxTable = 20;

export const renderTableOfSafeguardsFinished = ( safeguards, root ) => {
    const lengthSafeguards = safeguards.length;
    root.innerHTML = '';

    for(let i = 0; i < lengthSafeguards; i++) {
        const { Equipos: devices, Nombre: name, Primer_apellido: firstSurname, Segundo_apellido: secondSurname, Nom_corto_empresa: shortNameCompany, Num_obra: numWork, Frente: forehead } = safeguards[i];

        if( indexTable === indexMaxTable) break;
        if( devices.length === 0 ) continue;

        const row = `
            <tr>
                <td>${devices[0]['Fecha de terminacion']}</td>
                <td>
                    <p>${name} ${firstSurname} ${secondSurname}</p>
                    <span>${shortNameCompany}</span>
                    <span>${numWork}</span>
                    <span>${forehead}</span>
                </td>
                <td>${devices[0]['Fecha de terminacion']}</td>
                <td>${devices[0].Autorizacion_de_resguardo}</td>
                <td>
                    <button>Editar</button>
                </td>
            </tr>
        `;

        root.innerHTML += row;

        console.log(safeguards[i]);
        indexTable++;
        indexMaxTable++;
    }
}