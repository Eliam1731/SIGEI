<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../data/vendor/autoload.php';
include '../config/connection_db.php';

header('Content-Type: application/json');

try {
    // Obtén los datos del front
    $data = json_decode(file_get_contents('php://input'), true);
    $equipo_id = $data['equipo_id'];
    $correo = $data['correo'];
    $comentario = $data['comentario'];

    // Verifica si el equipo ya está en baja
    $stmt = $conn->prepare("SELECT Status_id FROM equipos_informaticos WHERE Equipo_id = :equipo_id");
    $stmt->execute(['equipo_id' => $equipo_id]);
    $row = $stmt->fetch();
    if ($row['Status_id'] == 4) {
        echo json_encode(['error' => 'El equipo ya se encuentra en baja']);
        exit();
    }

    // Cambia el estado del equipo a 4
    $stmt = $conn->prepare("UPDATE equipos_informaticos SET Status_id = 4 WHERE Equipo_id = :equipo_id");
    $stmt->execute(['equipo_id' => $equipo_id]);

    // Registra la baja en la tabla baja_de_equipos
    $stmt = $conn->prepare("INSERT INTO baja_de_equipos (Equipo_id, User_id, Fecha_baja, Motivo_baja) VALUES (:equipo_id, (SELECT User_id FROM usuarios WHERE correo_electronico = :correo), UNIX_TIMESTAMP(), :comentario)");
    $stmt->execute(['equipo_id' => $equipo_id, 'correo' => $correo, 'comentario' => $comentario]);

    $mail = new PHPMailer(true);

    // Configuración del servidor
    $mail->SMTPDebug = 0;                                 
    $mail->isSMTP();                                      
    $mail->Host       = 'smtp.ionos.mx';  
    $mail->SMTPAuth   = true;                              
    $mail->Username   = 'sistemas@grupoopc.com ';                
    $mail->Password   = 'Sistemasopc#1';                          
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    
    $mail->Port       = 587;                               

    // Recipientes
    $mail->setFrom('sistemas@grupoopc.com', 'sistemas');
    $mail->addAddress('egutierrez@grupoopc.com');
    $mail->addAddress('becariosistemas1@grupoopc.com'); 

    // Contenido
    $mail->isHTML(true);                                  
    $mail->Subject = 'Baja de equipo informático';
    $mail->Body    = "El equipo con ID $equipo_id ha sido dado de baja. Motivo: $comentario";
    $mail->AltBody = "El equipo con ID $equipo_id ha sido dado de baja. Motivo: $comentario";

    $mail->send();
    echo json_encode(['message' => 'El equipo ha sido dado de baja y el correo ha sido enviado']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => "No se pudo procesar la solicitud. Error: {$e->getMessage()}"]);
}
?>