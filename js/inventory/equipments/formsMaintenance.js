import {
  getCurrentDateUser,
  getCurrentTimeUser,
} from "../../utilities/currentDateUser.js";

export const initMaintenanceDevice = (data) => {
  const formPreventiveMaintenance = document.getElementById(
    "form-preventive-maintenance"
  );
  const othersTool = document.getElementById("tool-4");
  const toolsCheckbox = document.querySelectorAll("[data-tools-checkbox]");

  formPreventiveMaintenance.addEventListener("submit", async (event) => {
    event.preventDefault();
    const currentDate = getCurrentDateUser();
    const currentTime = getCurrentTimeUser();
    const device = data[0].idEquipo;
    const user = sessionStorage.getItem("email");
    const protective = data[0].numSeguroSocialEmpleado;
    const tools = [...toolsCheckbox]
      .map((tool) => {
        if (tool.checked) return tool.value;
      })
      .filter((tool) => tool !== undefined);
    const othersToolValue = othersTool.value;
    const maintenanceInit = {
      fechaInicio: currentDate,
      horaInicio: currentTime,
      resguardante: protective,
      equipo: device,
      materialRequerido: { herramientas: tools, otros: othersToolValue },
      usuario: user,
    };

    console.log(maintenanceInit, "maintenanceInit");
  });
};

export const finishMaintenanceDevice = (data) => {
  const root = document.getElementById("root-finish-maintenance");
  const subcategory = data[0].subcategoria;

  formDeviceTypeServerAndLaptop(subcategory, root);
};

const formDeviceTypeServerAndLaptop = (subcategory, root) => {
  const html = `
        <form id='form-finish-maintenance'>
            <div class='container-title-maintenance__finish'><h3>Actividades realizadas en el siguiente equipo: ${subcategory}</h3></div>

           <div class='firstColumn-maintenanceFinish'>
                <div class='container-title-SoftwareAndHardware'><h4>SOFTWARE</h4></div>

                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-1' name='check-1' value='activity-1'>
                    <label for='activity-1'>ANTIVIRUS</label>
                </div>

                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-2' name='check-2' value='activity-2'>
                    <label for='activity-2'>ACTUALIZACIONES S.O.</label>
                </div>

                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-3' name='check-3' value='activity-3'>
                    <label for='activity-3'>ELIMINACION DE ARCHIVOS NO PROPIOS DE LA  EMPRESA</label>
                </div>

                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-4' name='check-4' value='activity-4'>
                    <label for='activity-4'>ELIMINACION DE PROGRAMAS MALICIOSOS (MALWARE/SPYWARE/ETC)</label>
                </div>

                ${
                    (subcategory === "Laptop" || subcategory === "Computadora de escritorio")
                    ? `<div class='container-checkboc-maintenance'>
                        <input type='checkbox' id='activity-5' name='check-5' value='activity-5'>
                        <label for='activity-5'>CONECTIVIDAD DE RED</label>
                    </div>
                    `
                    : ``
                }

                <div class='container-checkboc-maintenance'>
                    <label for='activity-6'>OTROS</label>
                    <input type='text' id='activity-6' name='check-6'>
                </div>
           </div>

            <div class='secondColumn-maintenanceFinish'>
                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-7' name='check-7' value='activity-7'>
                    <label for='activity-7'>TECLADO</label>
                </div>

                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-8' name='check-8' value='activity-8'>
                    <label for='activity-8'>MOUSE</label>
                </div>

                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-9' name='check-9' value='activity-9'>
                    <label for='activity-9'>MONITOR</label>
                </div>

                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-10' name='check-10' value='activity-10'>
                    <label for='activity-10'>MEMORIA / PROCESADOR</label>
                </div>

                <div class='container-checkboc-maintenance'>
                    <input type='checkbox' id='activity-11' name='check-11' value='activity-11'>
                    <label for='activity-11'>GABINETE</label>
                </div>

                ${
                    (subcategory === "Laptop" || subcategory === "Computadora de escritorio") ? 
                    `<div class='container-checkboc-maintenance'>
                        <input type='checkbox' id='activity-12' name='check-12' value='activity-12'>
                        <label for='activity-12'>TARJETA DE RED</label>
                    </div>
                    ` : ``
                }

                <div class='container-checkboc-maintenance'>
                    <label for='activity-13'>OTROS</label>
                    <input type='text' id='activity-13' name='check-13'>
                </div>
            </div>

            <button id='finish-preventive-maintenance' type='submit'>Finalizar mantenimiento preventivo</button>
        </form>
    `;

    root.innerHTML = html;

    const formFinishMaintenance = document.getElementById("form-finish-maintenance");

    formFinishMaintenance.addEventListener('submit', (event) => {
        event.preventDefault();

        console.log('Finalizar mantenimiento preventivo');
    });
};
