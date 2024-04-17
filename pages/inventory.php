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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
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

                    <button id="deleteFiltrosDevices" type="button">
                        Eliminar filtros
                    </button>

                    <button id="enableWindowFilter" type="button">
                        <img src="../images/filter.png" alt="">
                    </button>

                </form>

                <div class="container-table__devices">
                    <div class="container-title">
                        <div>
                            <h3>Equipos informáticos</h3>
                            <p>Toque la fila en donde se encuentra el equipo para ver mas detalles.</p>
                        </div>

                        <div>
                            <button>Agregar equipo</button>
                        </div>
                    </div>

                    <div class="root_devices">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Información del equipo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="renderDataEquipments">
                                <!-- Primera fila -->
                                
                            </tbody>
                        </table>
                    </div>
                </div>
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

    <script type="module" src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script type="module" src="../js/utilities/profileUser.js"></script>
    <script type="module" src="../js/inventory/equipments/main.js"></script>
    <script type="module" src="../js/inventory/equipments/renderDevices.js"></script>
</body>

</html>