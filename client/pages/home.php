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
    <link rel="stylesheet" href="../css/pages/home.css">
    <title>Home</title>
</head>
<body>
    <header>
        <img class="opc-logo" src="../images/opc-logo.png" alt="Logo de OPC Ingeniería y Costrucción">
        <nav>
            <ul>
                <li><a class="selected" href="#">Inicio</a></li>
                <li><a href="records.php">Registros</a></li>
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
        <section class="section-welcomeUser">
            <h1><span id="span-nameUser"></span> ¿Que desea hacer hoy?</h1>
            <p>Una vez seleccionado la opción, aparecerán en la sección correspondiente.</p>
        </section>
    </main>

    <script type="module" src="../js/home/index.js"></script>
    <script type="module" src="../js/utilities/profileUser.js"></script>
</body>
</html>