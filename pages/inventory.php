<?php include '../server/auth/session_auth.php'; ?>
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="../css/resources/resetStyle.css">
    <link rel="stylesheet" href="../css/components/navegation.css">
    <link rel="stylesheet" href="../css/components/button.css">
    <link rel="stylesheet" href="../css/pages/inventory_equipments.css">
    <title>Inventario</title>
</head>
<body>
    <header>
        <img class="opc-logo" src="../images/opc-logo.png" alt="Logo de OPC Ingeniería y Costrucción">
        <nav>
            <ul>
                <li><a href="home.php">Inicio</a></li>
                <li><a href="records.php">Registros</a></li>
                <li><a href="safeguards.php">Resguardos</a></li>
                <li><a class="selected" href="inventory.php">Equipos y Empleados</a></li>
                <li><a href="reports.php">Reportes</a></li>
                <li><a href="history.php">Historial</a></li>
            </ul>
        </nav>

        <div class="notification-container icons-nav">
            <img src="../images/images-nav/notifications.svg" alt="Icono de notificación">
        </div>

        <div class="account-container icons-nav">
            <img src="../images/images-nav/account.svg" alt="Icono de cuenta de usuario">
        </div>
    </header>

    <main>
        <div id="root">
            <section id="equipments_section">
                <form id="search_equipment">
                    <div class="container-search">
                        <div class="container-input__equipment">
                            <div>
                                <span>OPCIC-COM-</span>
                            </div>

                            <input type="text" name="codeEquipment" id="inputSearchEquipment" placeholder="00021">
                        </div>
                        <div class="container-buttonSearch__equipment">
                            <button id="buttonSearchEquipment" type="button">
                                <img src="../images/safeguards/search.svg" alt="">
                            </button>
                        </div>
                    </div>

                    <button id="enableWindowFilter" type="button">
                        <img src="../images/filter.png" alt="">
                    </button>

                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Equipo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="renderDataEquipments">
                        <tr id="none-equipment">
                            <td>
                                <div class="message_table">
                                    <h3>Ups! No hay equipos registrados</h3>

                                    <img src="../images/capibara-table.png" alt="">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <div>
                                    <button id="prevIndexButton">
                                        <img src="../images/arrowPrev.svg" alt="">
                                    </button>

                                    <p id="textIndexCurrent">1</p>

                                    <button id="nextIndexButton">
                                        <img src="../images/arrowNext.svg" alt="">
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </section>

            <section id="employee_section">

            </section>
        </div>

        <nav id="navigation_sections-inventory">
            <ul id="navigation-ul">
                <li class="li-selected">Equipos</li>
                <li>Empleados resguardantes</li>
            </ul>
        </nav>
    </main>

    <script type="module" src="../js/utilities/profileUser.js"></script>
    <script type="module" src="../js/inventory/equipments/main.js"></script>
</body>
</html>