const elementsEquipmentsDOM = {
    filterBtn: document.getElementById('enableWindowFilter'),
}

elementsEquipmentsDOM.filterBtn.addEventListener('click', () => {
    if(document.querySelector('.filter-container')) {
        document.querySelector('.filter-container').remove();

        return;
    }

    const container = document.createElement('div');
    container.classList.add('filter-container');
    
    container.innerHTML = `
        <div class="filter">         
            <label for='1'><input type='checkbox' id='1'><span>Disponible</span></label>
        </div>

        <div class="filter">
            <label for='2'><input type='checkbox' id='2'><span>En resguardo</span></label>    
        </div>

        <div class="filter">    
            <label for='3'><input type='checkbox' id='3'><span>En mantenimiento</span></label>
        </div>
    `;

    document.body.appendChild(container);
});