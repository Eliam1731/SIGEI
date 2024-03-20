<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="css/resources/resetStyle.css">
    <link rel="stylesheet" href="css/pages/login.css">
    <link rel="stylesheet" href="css/components/button.css">
    <link rel="stylesheet" href="css/components/input-email.css">
    <link rel="stylesheet" href="css/components/input-password.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <title>Iniciar sesión</title>
</head>
<body>
    <main>
        <div class="container-logo">
            <img src="images/opc-logo.png" alt="Logo de OPC Ingeniería y Construcción">
        </div>

        <section class="section-login">
            <h1>Inicia sesión</h1>
            <h2>Acceder al sistema de información</h2>

            <form>
                <div class="container-email">
                    <input type="email" placeholder="Correo electrónico" id="email">

                    <div class="container-icon">
                        <img src="images/images-login/email.svg" alt="Icono de correo electrónico">
                    </div>
                </div>

                <div class="container-password">
                    <input type="password" placeholder="Contraseña" id="password">

                    <div class="container-icon">
                        <img src="images/images-login/password.svg" alt="Icono de contraseña">
                    </div>
                </div>

                <div class="container-viewPassword">
                    <input type="checkbox" id="viewPassword">
                    <label for="viewPassword">Mostrar contraseña</label>
                </div>

                <button class="button-action" type="button" id="button-login">Iniciar sesión</button>
            </form>

            <span>¿Olvidaste tu contraseña?</span>
        </section>
    </main>

    <script type="module" src="js/login/index.js"></script>
</body>
</html>