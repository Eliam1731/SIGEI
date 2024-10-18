<?php

include '../config/connection_db.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $equipo_id = $data['equipo_id'];
    $correo = $data['correo'];


    $sql = "UPDATE equipos_informaticos SET Status_id = 4 WHERE Equipo_id = :equipo_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':equipo_id', $equipo_id);
    $stmt->execute();


    $mail = new PHPMailer(true);
    $mail->SMTPDebug = 2;                                 
    $mail->isSMTP();                                      
    $mail->Host       = 'smtp.ionos.mx';  
    $mail->SMTPAuth   = true;                              
    $mail->Username   = 'sistemas@grupoopc.com';                
    $mail->Password   = 'Sistemasopc#1';                          
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    
    $mail->Port       = 587; 

    $mail->setFrom('sistemas@grupoopc.com', 'Mailer');
    $mail->addAddress($correo);
    $mail->addAddress('egutierrez@grupoopc.com');
    $mail->isHTML(true);
    $mail->Subject = 'Equipo dado de baja';
    $mail->Body    = 'El equipo con id ' . $equipo_id . ' ha sido dado de baja.';
    $mail->AltBody = 'El equipo con id ' . $equipo_id . ' ha sido dado de baja.';

    $mail->send();
    echo 'El equipo ha sido dado de baja y los correos electrónicos han sido enviados.';
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>