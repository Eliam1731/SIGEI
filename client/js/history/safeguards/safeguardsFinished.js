import { detailsSafeguardHistory } from "./detailsSafeguarda.js";

let indexTable = 0;
let indexMaxTable = 20;

const buttonNext = document.getElementById('nextSafeguards');
const buttonPrevious = document.getElementById('prevSafeguards');
const root = document.getElementById('table-safeguards__finished'); 
let data = []; 

const dateInFormatText = ( dateString ) => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    if (!dateString) return '';
    let [ year, month, day ] = dateString.split('-'); 
    const d = new Date(year, month - 1, day);
    return `${d.getDate()} de ${months[d.getMonth()]} del ${d.getFullYear()}`;
}

buttonNext.addEventListener('click', () => {
    if (indexTable + 20 < data.length) {
        indexTable += 20;
        indexMaxTable += 20;
        renderTableOfSafeguardsFinished(data, root);
    }
});

buttonPrevious.addEventListener('click', () => {
    if (indexTable > 0) {
        indexTable -= 20;
        indexMaxTable -= 20;
        renderTableOfSafeguardsFinished(data, root);
    }
});

export const renderTableOfSafeguardsFinished = ( safeguardsObj, root ) => {
    // Convierte el objeto en array de [key, valor], luego ordena
    const entries = Object.entries(safeguardsObj)
        .sort(([, a], [, b]) =>
            new Date(b.Equipos[0].Fecha_terminacion) - new Date(a.Equipos[0].Fecha_terminacion)
        );

    // Paginación
    const page = entries.slice(indexTable, indexMaxTable);
    // Reinicia la tabla y el array interno
    root.innerHTML = '';
    data = [];

    page.forEach(([ key, item ]) => {
        const { Nombre, Primer_apellido, Segundo_apellido } = item.DatosEmpleado;
        const eq = item.Equipos[0];
        const { Nom_corto, Num_obra, Nom_frente, Fecha_inicio, Fecha_terminacion,
                NombreUsuarioResguardo, ApellidoUsuarioResguardo, SegundoApellidoUsuarioResguardo } = eq;

        // Construye la fila
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ dateInFormatText( Fecha_inicio ) }</td>
            <td>
                <p>${ Nombre } ${ Primer_apellido } ${ Segundo_apellido }</p>
                <span>${ Nom_corto } |</span>
                <span>${ Num_obra }</span>
                <span>${ Nom_frente }</span>
            </td>
            <td>${ dateInFormatText( Fecha_terminacion ) }</td>
            <td>${ NombreUsuarioResguardo } ${ ApellidoUsuarioResguardo } ${ SegundoApellidoUsuarioResguardo }</td>
            <td><button class='viewDetailsSafeguardBtn'>Editar</button></td>
        `;
        root.appendChild(tr);

        data.push(item);
    });

    // Atacha eventos a botones de detalle
    Array.from(document.getElementsByClassName('viewDetailsSafeguardBtn'))
         .forEach((btn, i) => btn.addEventListener('click', () => detailsSafeguardHistory(data[i])));
};
