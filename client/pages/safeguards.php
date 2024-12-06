<?php include '../../server/auth/session_auth.php'; ?>
<!DOCTYPE html>
<html lang="es-MX">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="../css/resetStyle.css">
    <link rel="stylesheet" href="../css/components/navegation.css">
    <link rel="stylesheet" href="../css/components/button.css">
    <link rel="stylesheet" href="../css/pages/safeguards.css">
    <title>Resguardos</title>
</head>

<body>
    <header>
        <img class="opc-logo" src="../images/opc-logo.png" alt="Logo de OPC Ingeniería y Costrucción">
        <nav>
            <ul>
                <li>
                    <a href="home.php">Inicio</a>
                </li>
                <li><a href="records.php">Registros</a></li>
                <li><a class="selected" href="safeguards.php">Resguardos</a></li>
                <li><a href="inventory.php">Equipos y Empleados</a></li>
                <li><a href="reports.php">Reporte</a></li>
                <li><a href="history.php">Historial</a></li>
            </ul>
        </nav>

        <div class="account-container icons-nav">
            <img src="../images/images-nav/account.svg" alt="Icono de cuenta de usuario">
        </div>
    </header>

    <main>
        <section>

            <article class="first_article">
                <div class="first_div">
                    <label for="">Escriba el código del equipo</label>

                    <div class="container__codeEquipment">
                        <div>
                            <span id='spanCodeOpc'>OPCIC-COM-</span>
                        </div>
                        <input type="text" placeholder="Ejemplo: 00012" id="codeEquipment">
                        <div>
                            <button id="searchEquipment">
                                <img src="../images/safeguards/search.svg" alt="">
                            </button>
                        </div>
                    </div>

                    <div class="container-searchNumberPhone">
                        <input type="checkbox"  id="searchNumberAuth">
                        <label for="searchNumberAuth">Realizar búsqueda utilizando el número de teléfono</label>
                    </div>

                    <h2>Elegir empleado resguardante</h2>

                    <p>Antes de seleccionar una obra, por favor elija primero una empresa</p>

                    <select id="companyBelongsEmployee">
                        <option value="">Elija la empresa a la que pertenece el empleado</option>
                    </select>

                    <select id="workBelongsEmployee" disabled>
                        <option value="">Elija la obra a la que pertenece el empleado</option>
                    </select>

                    <select id="forehead_belongs" disabled>
                        <option value="">Elija el frente a la que pertenece el empleado</option>
                    </select>

                    <select id="protectiveEmployee" disabled>
                        <option value="">No se ha seleccionado ningún empleado</option>
                    </select>
                </div>

                <div class="second_div">
                    <div class="root-container-table">
                        <div class="container-title__safeguards">
                            <h2>Equipos informáticos</h2>

                            <p>
                                Equipos que se le entreguen al empleado en resguardo físico.
                            </p>
                        </div>

                        <div class="container-table-devices__authSafeguards">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Equipos</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyTableAuthSafeguards">

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="container-safeguards__button">
                        <button id="observation_button">Añadir observaciones</button>
                        <button id="cancel__button">Cancelar resguardo</button>
                        <button id="auth__button">Autorizar resguardo</button>
                    </div>

                    <textarea class="textarea__hidden" id="observation__auth-textarea" placeholder="Coloque sus observaciones..."></textarea>
                </div>
            </article>

            <article class="second_article">
                <div class="first_div">
                    <label for="codeEquipmentReturn">Escriba el código del equipo</label>

                    <div class="container__codeEquipment">
                        <div>
                            <span id='spanCodeOpcReturn'>OPCIC-COM-</span>
                        </div>
                        <input type="text" placeholder="Ejemplo: 00012" id="codeEquipmentReturn">
                        <div>
                            <button id="searchEquipmentReturn">
                                <img src="../images/safeguards/search.svg" alt="">
                            </button>
                        </div>
                    </div>

                    <div class="container-searchNumberPhone">
                        <input type="checkbox"  id="searchNumberReturn">
                        <label for="searchNumberReturn">Realizar búsqueda utilizando el número de teléfono</label>
                    </div>

                    <h2>Empleado que está devolviendo el equipo</h2>

                    <div class="container-nameuser__return">
                        <p id="employeeName-return">Aún no se ha seleccionado el equipo</p>
                    </div>

                    <h2>Fecha en la que autorizo el resguardo</h2>

                    <div class="container-nameuser__return">
                        <p id="dateSafeguard-return">Aún no se ha seleccionado el equipo</p>
                    </div>
                </div>

                <div class="second_div">
                    <div class="root-container-table">
                        <div class="container-title__safeguards">
                            <h2>Equipos informáticos</h2>

                            <p>
                                El empleado devolverá los equipos físicos en persona.
                            </p>
                        </div>

                        <div class="container-table-devices__authSafeguards">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Equipo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyTableReturnSafeguards">

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="container-safeguards__button">
                        <button id="cancel__button-return">Cancelar resguardo</button>
                        <button id="observation_button-return">Añadir observaciones</button>
                        <button id="auth__button-return">Autorizar devolución</button>
                    </div>

                    <textarea class="textarea__hidden" id="observation__auth-textarea-return" placeholder="Coloque sus observaciones..."></textarea>
                </div>
            </article>
        </section>
        <nav>
            <ul>
                <li id="first_article" class="li-selected">Autorizar resguardos</li>
                <li id="second_article">Devolución resguardos</li>
            </ul>
        </nav>
    </main>

    <script src="https://unpkg.com/pdf-lib@1.16.0/dist/pdf-lib.js"></script>
    <script type="module" src="../js/utilities/profileUser.js"></script>
    <script type="module" src="../js/safeguards/auth/main.js"></script>
    <script type="module" src="../js/safeguards/return/main.js"></script>
</body>

</html>