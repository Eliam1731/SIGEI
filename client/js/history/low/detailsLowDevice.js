import { dateInFormatText } from "../../utilities/textDate.js";

export const detailsLowDevice = ( data ) => {
    const { nombre, primerApellido, segundoApellido } = data.usuarioBaja;
    const rootActions = document.createElement('div');
    const root = document.createElement('div');

    rootActions.classList.add('root-actions-details-device','root-actions-details-device--active');
    document.body.appendChild(rootActions);
    rootActions.appendChild(root);

    rootActions.addEventListener('click', (e) => {
      if (e.target === rootActions) rootActions.remove();
    });

    const html = `
      <h2>Información detallada del equipo dado de baja</h2>
      <div class='container-info__device'>
        <dl>
          <div class='row-info__device'>
            <dt>Usuario quien dio de baja el equipo</dt>
            <dd>${nombre} ${primerApellido} ${segundoApellido}</dd>
          </div>

          <div class='row-info__device'>
            <dt>Fecha de baja</dt>
            <dd>${
              data.fechaBaja && data.fechaBaja !== '0000-00-00'
                ? dateInFormatText(data.fechaBaja)
                : 'Sin fecha de baja'
            }</dd>
          </div>

          <div class='row-info__device'>
            <dt>Motivo de baja</dt>
            <dd>${data.motivoBaja}</dd>
          </div>

          <div class='row-info__device'>
            <dt>Subcategoría del equipo</dt>
            <dd>${data.subcategoria}</dd>
          </div>
          <!-- el resto no cambia… -->
        </dl>
      </div>
    `;

    root.innerHTML = html;
};
