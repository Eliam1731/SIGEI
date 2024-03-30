<!-- <?php //include '../server/auth/session_auth.php'; ?> -->
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="../css/resources/resetStyle.css">
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
                <li><a href="home.php">Inicio</a></li>
                <li><a href="records.php">Registros</a></li>
                <li><a class="selected" href="safeguards.php">Resguardos</a></li>
                <li><a href="inventory.php">Equipos y Empleados</a></li>
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
        <section>
            <article class="first_article">
                <div class="first_div">
                    <label for="">Escriba el código del equipo</label>
                    
                    <div class="container__codeEquipment">
                        <div>
                            <span>OPCIC-COM-</span>
                        </div>
                        <input type="text" placeholder="Ejemplo: 00012" id="codeEquipment">
                        <div>
                            <button id="searchEquipment">
                                <img src="../images/safeguards/search.svg" alt="">
                            </button>
                        </div>
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
                    <table id="tableAuthSafeguards">
                        <thead>
                            <tr>
                                <th>
                                    Código
                                </th>

                                <th>
                                    Equipo
                                </th>

                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody id="bodyTableAuthSafeguards">
                            <tr>
                                <td>
                                    OPCIC-COM-00890
                                </td>
                                <td>
                                    Laptop Huawei BoDE-DH9 NS: V5MPM23412000893
                                </td>
                                <td>
                                    <button>Acciones</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    OPCIC-COM-00890
                                </td>
                                <td>
                                    Laptop Huawei BoDE-DH9 NS: V5MPM23412000893
                                </td>
                                <td>
                                    <button>Acciones</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    OPCIC-COM-00890
                                </td>
                                <td>
                                    Laptop Huawei BoDE-DH9 NS: V5MPM23412000893
                                </td>
                                <td>
                                    <button>Acciones</button>
                                </td>
                            </tr>

                            
                            <tr>
                                <td>
                                    OPCIC-COM-00890
                                </td>
                                <td>
                                    Laptop Huawei BoDE-DH9 NS: V5MPM23412000893
                                </td>
                                <td>
                                    <button>Acciones</button>
                                </td>
                            </tr>   
                        </tbody>
                    </table>

                    <div class="container-button__auth">
                        <button>Cancelar resguardo</button>
                        <button>Autorizar resguardo</button>
                    </div>
                </div>
            </article>
        </section>
        <nav>
            <ul>
                <li>Autorizar resguardos</li>
                <li>Devolución resguardos</li>
            </ul>
        </nav>
    </main>

    <script type="module" src="../js/utilities/profileUser.js"></script>
</body>
</html>