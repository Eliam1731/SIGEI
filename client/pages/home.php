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

        <div class="account-container icons-nav">
            <img src="../images/images-nav/account.svg" alt="Icono de cuenta de usuario">
        </div>
    </header>

    <main>
        <!-- Bienvenida -->
        <section class="section-welcomeUser">
            <h1>¡Hola <span id="span-nameUser"></span>! ¿Qué deseas hacer hoy?</h1>
            <p>Una vez seleccionada la opción, aparecerán en la sección correspondiente.</p>
        </section>

        <!-- Contenedor principal -->
      <!--  <div class="home-grid">

             Izquierda: tarjetas de acceso rápido 
            <div class="quick-actions">
             <a href="records.php"            class="action-card">
             <img src="../images/icons/clipboard.svg" alt="Registros">
                <span>Registros</span>
            </a>
            <a href="safeguards.php"         class="action-card">
                <img src="../images/icons/shield-check.svg" alt="Resguardos">
                <span>Resguardos</span>
            </a>
            <a href="inventory.php"          class="action-card">
                <img src="../images/icons/users.svg" alt="Equipos y Empleados">
                <span>Equipos y Empleados</span>
            </a>
            <a href="reports.php"            class="action-card">
                <img src="../images/icons/chart-bar.svg" alt="Reporte">
                <span>Reporte</span>
            </a>
            <a href="notifications.php"      class="action-card">
                <img src="../images/icons/bell.svg" alt="Notificaciones">
                <span>Notificaciones</span>
            </a>
        </div>

         Derecha: paneles 
        <div class="panels">
            <div class="panel stats">
            <h2>Estadísticas</h2>
             Aquí irá tu gráfica (canvas, SVG, etc.) 
            <canvas id="statsChart"></canvas>
        </div>
        <div class="panel notifications">
            <h2>Notificaciones</h2>
            <ul>
                <li>✔️ Revisión de equipo pendiente</li>
                <li>🔔 Nuevo resguardo generado</li>
                <li>⚠️ 2 reportes sin aprobar</li>
            </ul>
        </div>
        </div>

        </div>-->
    </main>

    <script type="module" src="../js/home/index.js"></script>
    <script type="module" src="../js/utilities/profileUser.js"></script>
</body>
</html>