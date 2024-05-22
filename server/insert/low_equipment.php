<?php
include '../config/connection_db.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $equipo_id = $data['equipo_id'];
    $correo = $data['correo'];
    $comentario = $data['comentario'];

    $stmt = $conn->prepare("SELECT User_id FROM usuarios WHERE correo = :correo");
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();
    $user_id = $stmt->fetchColumn();

    $conn->beginTransaction();

    $sql = "INSERT INTO baja_de_equipos (Equipo_id, User_id, Fecha_baja, Motivo_baja) VALUES (?, ?, UNIX_TIMESTAMP(), ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$equipo_id, $user_id, $comentario]);

    $sql = "UPDATE equipos_informaticos SET Status_id = 4 WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$equipo_id]);

    $conn->commit();

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
    $mail->addAddress('becariosistemas1@grupoopc.com');
    $mail->isHTML(true);
    $mail->Subject = 'Equipo dado de baja';
    $mail->Body    = 'El equipo con id ' . $equipo_id . ' ha sido dado de baja. Motivo: ' . $comentario;
    $mail->AltBody = 'El equipo con id ' . $equipo_id . ' ha sido dado de baja. Motivo: ' . $comentario;

    $mail->send();
    echo 'El equipo ha sido dado de baja y los correos electrónicos han sido enviados.';
} catch (Exception $e) {
    $conn->rollback();
    echo "Error: " . $e->getMessage();
    if ($mail->isError()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
}
?>