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
    <link rel="stylesheet" href="../css/components/forms-account.css">
    <link rel="stylesheet" href="../css/components/forms-company.css">
    <link rel="stylesheet" href="../css/components/label.css">
    <link rel="stylesheet" href="../css/components/inputs.css">
    <link rel="stylesheet" href="../css/components/select.css">
    <link rel="stylesheet" href="../css/components/forms-employee.css">
    <link rel="stylesheet" href="../css/pages/records.css">
    <link rel="stylesheet" href="../css/components/forms-equipment.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <title>Registros</title>
</head>
<body>
    <header>
        <img class="opc-logo" src="../images/opc-logo.png" alt="Logo de OPC Ingeniería y Costrucción">
        <nav>
            <ul>
                <li><a href="home.php">Inicio</a></li>
                <li><a class="selected" href="records.php">Registros</a></li>
                <li><a href="safeguards.php">Resguardos</a></li>
                <li><a href="inventory.php">Equipos y Empleados</a></li>
                <li><a href="reports.php">Reporte</a></li>
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
        <section class="navigation-container">
            <img src="../images/images-records/image-register.png" alt="">

            <nav>
                <ul id="parentItemsLi">
                    <li id="firstItemNav">
                        <div class="circle-background"><div class="circle-center"></div></div>
                        <span>Nuevo equipo informático</span>
                    </li>

                    <div class="line-vertical"></div>

                    <li id="secondItemNav">
                        <div class="circle-background"><div class="circle-center"></div></div>
                        <span>Nuevo empleado resguardante</span>
                    </li>

                    <div class="line-vertical"></div>

                    <li id="thirdItemNav">
                        <div class="circle-background"><div class="circle-center"></div></div>
                        <span>Crear nueva empresa y obra</span>
                    </li>

                    <div class="line-vertical"></div>

                    <li id="fourthItemNav">
                        <div class="circle-background"><div class="circle-center"></div></div>
                        <span>Crear cuenta de usuario</span>
                    </li>
                </ul>
            </nav>
        </section>

        <section id="root-forms">

        </section>

        <img src="../images/img_QR.jpg" id="imageCodeQR">
    </main>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></script>
    <script type="module" src="../js/utilities/profileUser.js"></script>
    <script type="module" src="../js/records/index.js"></script>
</body>
</html>