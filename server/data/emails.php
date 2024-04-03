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

    // Recipientes
    $mail->setFrom('sistemas@grupoopc.com', 'sistemas');
    $mail->addAddress($_POST['emailUser'], 'Bladimir');     
    $mail->addAddress($_POST['emailAssistant'], 'Irving');               
    $mail->addAddress($_POST['emailBoss'], 'Bladimir');           

    // Adjuntos
    $mail->addAttachment($_FILES['file']['tmp_name'], 'output.pdf');    

    
    // Contenido
    $mail->isHTML(true);                                  
    $mail->Subject = 'Ola este es un correo de pruebas';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>