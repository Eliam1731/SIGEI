<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "inventario";
    $charset = 'utf8mb4';

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=$charset", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>