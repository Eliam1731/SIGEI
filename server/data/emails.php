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
    $mail->Subject = 'Documento de resguardo de equipos informáticos.';
    $mail->Body    = 'Por favor coloque su firma electronica en el documento y reenviarlo al departamento de sistemas';
    $mail->AltBody = '<b>Departamento de sistemas.</b>';

    $mail->send();
    echo json_encode(['message' => 'Message has been sent']);
} catch (Exception $e) {
  echo json_encode(['error' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
?>