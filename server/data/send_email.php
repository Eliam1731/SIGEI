<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Configuración del servidor
    $mail->SMTPDebug = 2;                                 
    $mail->isSMTP();                                      
    $mail->Host       = 'smtp.ionos.mx';  
    $mail->SMTPAuth   = true;                              
    $mail->Username   = 'sistemas@grupoopc.com ';                
    $mail->Password   = 'Sistemasopc#1';                          
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    
    $mail->Port       = 587;                              

    //Recipients
    $mail->setFrom('sistemas@grupoopc.com', 'Mailer');
    $mail->addAddress($_POST['correo']);

    // Contenido
    $mail->isHTML(true);                                  
    $mail->Subject = $_POST['titulo'];
    $mail->Body    = $_POST['mensaje'];
    $mail->AltBody = $_POST['mensaje'];

    $mail->send();
    echo 'true';
} catch (Exception $e) {
    echo 'false';
}
?>