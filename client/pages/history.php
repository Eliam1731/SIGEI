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
    <link rel="stylesheet" href="../css/pages/history.css">
    <title>Historial</title>
</head>

<body>
    <header>
        <img class="opc-logo" src="../images/opc-logo.png" alt="Logo de OPC Ingeniería y Costrucción">
        <nav>
            <ul>
                <li><a href="home.php">Inicio</a></li>
                <li><a href="records.php">Registros</a></li>
                <li><a href="safeguards.php">Resguardos</a></li>
                <li><a href="inventory.php">Equipos y Empleados</a></li>
                <li><a href="reports.php">Reporte</a></li>
                <li><a class="selected" href="history.php">Historial</a></li>
            </ul>
        </nav>

        <div class="account-container icons-nav">
            <img src="../images/images-nav/account.svg" alt="Icono de cuenta de usuario">
        </div>
    </header>

    <main>
        <section id="root-tables">
            <article id="table-safeguards">
                <div class="containerRoot__tableSafeguards">
                    <div class="overflow__tableSafeguards">
                        <table>
                            <thead>
                                <tr>
                                    <th>Iniciado</th>
                                    <th>Empleado resguardante</th>
                                    <th>Finalizado</th>
                                    <th>Autorizador</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody id="table-safeguards__finished">

                            </tbody>
                        </table>
                    </div>

                    <div class="control-buttons__safeguards">
                        <button id="prevSafeguards">-</button>
                        <p id="indexTextTable">1</p>
                        <button id="nextSafeguards">+</button>
                    </div>
                </div>
            </article>

            <article id="table-devices__low">
            <div class="containerRoot__tableSafeguards">
                    <div class="overflow__tableSafeguards">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Información del equipo</th>
                                    <th>Autorizador</th>
                                    <th>Fecha de baja</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody id="table-lowDevices">

                            </tbody>
                        </table>
                    </div>

                    <div class="control-buttons__safeguards">
                        <button id="prevLowDevices">-</button>
                        <p id="indexTextTableLowDevices">1</p>
                        <button id="nextLowDevices">+</button>
                    </div>
                </div>
            </article>
        </section>

        <nav id="navegation_history">
            <ul>
                <li id="listItemSafeguards">Resguardos finalizados</li>
                <li id="listItemDevicesLow">Equipos dados de baja</li>
            </ul>
        </nav>
    </main>

    <script type="module" src="../js/utilities/profileUser.js"></script>
    <script type="module" src="../js/history/main.js"></script>
</body>

</html>