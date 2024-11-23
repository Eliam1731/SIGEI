import { detailsSafeguardHistory } from "./detailsSafeguarda.js";

let indexTable = 0;
let indexMaxTable = 20;

const buttonNext = document.getElementById('nextSafeguards');
const buttonPrevious = document.getElementById('prevSafeguards');
const root = document.getElementById('table-safeguards__finished'); 
let data = []; 

const dateInFormatText = ( dateString ) => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let [ year, day, month ] = dateString.split('-'); 
    let date = new Date(year, month - 1, day);

    day = date.getDate();
    month = months[date.getMonth()];
    year = date.getFullYear();

    return `${day} de ${month} del ${year}`;
}

buttonNext.addEventListener('click', () => {
    if (indexTable < data.length) {
        indexTable += 20;
        indexMaxTable += 20;
        
        if(indexTable > data.length) return;
        if( data.length < 20 ) return;

        renderTableOfSafeguardsFinished(data, root);
    }
});

buttonPrevious.addEventListener('click', () => {
    if( data.length < 20 ) return;

    if (indexTable > 0) {
        indexTable -= 20;
        indexMaxTable -= 20;
        renderTableOfSafeguardsFinished(data, root);
    }
});

export const renderTableOfSafeguardsFinished = ( safeguards, root ) => {
    root.innerHTML = '';

    Object.keys( safeguards ).forEach( key => {
        const { Nombre, Primer_apellido, Segundo_apellido } = safeguards[key].DatosEmpleado;
        const { Nom_corto, Num_obra, Nom_frente, Fecha_inicio, Fecha_terminacion, NombreUsuarioResguardo, ApellidoUsuarioResguardo, SegundoApellidoUsuarioResguardo } = safeguards[key].Equipos[0];

        const row = `
            <tr>
                <td>${ dateInFormatText( Fecha_inicio ) }</td>
                <td>
                    <p>${ Nombre } ${ Primer_apellido } ${ Segundo_apellido }</p>
                    <span>${ Nom_corto } |</span>
                    <span>${ Num_obra }</span>
                    <span>${ Nom_frente }</span>
                </td>
                <td>${ dateInFormatText( Fecha_terminacion ) }</td>
                <td>${ NombreUsuarioResguardo } ${ ApellidoUsuarioResguardo } ${ SegundoApellidoUsuarioResguardo }</td>
                <td>
                    <button class='viewDetailsSafeguardBtn'>Editar</button>
                </td>
            </tr>
         `;

         root.innerHTML += row;
         data.push( safeguards[key] );
         const buttonsDetails= document.getElementsByClassName('viewDetailsSafeguardBtn');

         for(let i = 0; i < buttonsDetails.length; i++) {
            buttonsDetails[i].addEventListener('click', () => detailsSafeguardHistory( data[i] ) );
        }
    });
}