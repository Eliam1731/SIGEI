<?php
    session_start();

    if (!isset($_SESSION['usuario_autenticado'])) {
        header('Location: ../../index.php');
        exit;
    }
?>