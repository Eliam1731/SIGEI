import { detailsSafeguardHistory } from "./detailsSafeguarda.js";

let indexTable = 0;
let indexMaxTable = 20;

const buttonNext = document.getElementById('nextSafeguards');
const buttonPrevious = document.getElementById('prevSafeguards');
const root = document.getElementById('table-safeguards__finished'); 
let data = []; 

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
                <td>${ Fecha_inicio }</td>
                <td>
                    <p>${ Nombre } ${ Primer_apellido } ${ Segundo_apellido }</p>
                    <span>${ Nom_corto } |</span>
                    <span>${ Num_obra }</span>
                    <span>${ Nom_frente }</span>
                </td>
                <td>${ Fecha_terminacion }</td>
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