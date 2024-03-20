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
        <h1>Safeguards</h1>
    </main>

    <script type="module" src="../js/utilities/profileUser.js"></script>
</body>
</html>