<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <script src="https://kit.fontawesome.com/8d63761432.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./client/css/resetStyle.css">
    <link rel="stylesheet" href="./client/css/pages/login.css">
    <link rel="stylesheet" href="./client/css/components/button.css">
    <link rel="stylesheet" href="./client/css/components/input-email.css">
    <link rel="stylesheet" href="./client/css/components/input-password.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <title>Iniciar sesión</title>
</head>
<body>
    <main>
        <div class="container-logo">
            <img src="./client/images/opc-logo.png" alt="Logo de OPC Ingeniería y Construcción">
        </div>

        <section  id="section-login" class="section-login">
            <h1>Inicia sesión</h1>
            <h2>Acceder al sistema de información</h2>

            <form>
                <div class="container-email">
                    <input type="email" placeholder="Correo electrónico" id="email">

                    <div class="container-icon">
                        <img src="./client/images/images-login/email.svg" alt="Icono de correo electrónico">
                    </div>
                </div>

                <div class="container-password">
                    <input type="password" placeholder="Contraseña" id="password">

                    <div class="container-icon">
                        <img src="./client/images/images-login/password.svg" alt="Icono de contraseña">
                    </div>
                </div>

                <div class="container-viewPassword">
                    <input type="checkbox" id="viewPassword">
                    <label for="viewPassword">Mostrar contraseña</label>
                </div>

                <button class="button-action" type="button" id="button-login">Iniciar sesión</button>
            </form>

            <span id="span-newPassword">¿Olvidaste tu contraseña?</span>

            <section id="section-newPassword" class="section-newPassword">
                <div class="root-navbar">
                    <div class="container-navbar">
                        <span>
                            <span class="span-active">
                                1
                            </span>
                        </span>

                        <div class="root-line">

                        </div>

                        <span>
                            <span class="span-active">
                                2
                            </span>
                        </span>

                        <div class="root-line">
                            
                        </div>

                        <span>
                            <span class="span-active">
                                3
                            </span>
                        </span>
                    </div>
                </div>

                <div class="root-cards">
                    <div id="confirm-email">
                        <h3>Restablecer contraseña</h3>

                        <p>
                            No temas. Te enviaremos un correo electrónico con instrucciones para restablecer tu contraseña.
                        </p>

                        <form id="form-changePassword__email">
                            <label for="email">Correo electrónico</label>

                            <div class="root-input-email">
                                <input name="email" id="emailSectionChange" type="text" placeholder="Correo electrónico">

                                <div>
                                    <img src="./client/images/images-login/email.svg" alt="Icono de correo electrónico">
                                </div>
                            </div>

                            <div class="container-newPassword-btn">
                                <button id="followingStep">Siguiente</button>
                                <button type="button" id="returnSection">Regresar a Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>

                    <div id="code-verify">
                        <i class="fa-solid fa-envelope-open-text"></i>

                        <h2>Pon el código</h2>

                        <p>
                            Enviamos un código de autorización para el cambio de la contraseña de la cuenta al correo
                            <span id="userEmailChangePass"></span>
                        </p>

                        <form id="formCodeVerify">
                            <input type="text" name="oneCode" id="oneCode">
                            <input type="text" name="twoCode" id="twoCode">
                            <input type="text" name="threeCode" id="threeCode">
                            <input type="text" name="fourCode" id="fourCode">
                            <input type="text" name="fiveCode" id="fiveCode">
                        </form>

                        <div class="container__codeIncorrect">
                            <p id="codeIncorrect"></p>
                        </div>

                        <div class="forwardCodeVerify">
                            <button id="forwardCodeVerify">
                                Reenviar código de verificación
                            </button>
                        </div>
                    </div>

                    <div id="cardChangePass">
                        <form id="formChangePass">
                            <h2>Restablecer contraseña</h2>

                            <p>
                                Ingresa tu nueva contraseña y confírmala para restablecer tu acceso al sistema de información.
                            </p>

                            <div class="container-password">
                                <input type="password" placeholder="Nueva contraseña" id="newPassword" name="newPass">
                            </div>

                            <div class="container-password">
                                <input type="password" placeholder="Confirmar contraseña" id="confirmPassword" name="confirmPassword">
                            </div>

                            <button id="buttonChangePassword">Restablecer contraseña</button>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    </main>

    <script type="module" src="./client/js/auth/login/index.js"></script>
    <script type="module" src="./client/js/auth/change_password/main.js"></script>
</body>
</html>