import { getDataServer } from "../utilities/getDataServer.js";

const selectCompany = document.getElementById('filtersCompany');

document.addEventListener('DOMContentLoaded', async() => {
    try {
        const response = await getDataServer('../server/data/resguardvisualization.php');

        for(let company in response) {
            if(response.hasOwnProperty(company)) {
                const option = document.createElement('option');
                option.value = company;
                option.textContent = response[company].Nom_corto.toUpperCase();

                selectCompany.appendChild(option);
            }
        }

        console.log(response)
    } catch(error) {
        console.error('Error:', error);
    }
});