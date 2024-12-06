<?php
// Incluir la conexión a la base de datos
include '../config/connection_db.php';

// Incluir las dependencias de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Verificar si la conexión a la base de datos se ha establecido correctamente
if (!isset($conn)) {
    $response = [
        'status' => 'error',
        'message' => 'Error al conectar a la base de datos.'
    ];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Obtener el contenido del cuerpo de la solicitud
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

// Verificar si el correo electrónico está presente en el JSON recibido
if (!isset($data['email'])) {
    $response = [
        'status' => 'error',
        'message' => 'El campo de correo electrónico es obligatorio.'
    ];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Obtener el correo electrónico del JSON recibido
$email = $data['email'];

// Verificar si el correo electrónico existe en la base de datos
$sql = "SELECT * FROM usuarios WHERE correo_electronico = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    // Generar un código de verificación de 5 caracteres al azar
    $verification_code = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 5);

    // Configurar PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.ionos.mx'; // Cambia esto por tu servidor SMTP
        $mail->SMTPAuth   = true;
        $mail->Username   = 'sistemas@grupoopc.com'; // Cambia esto por tu usuario SMTP
        $mail->Password   = 'Sistemasopc#1'; // Cambia esto por tu contraseña SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Configurar el correo
        $mail->setFrom('sistemas@grupoopc.com', 'Sistemas');
        $mail->addAddress($email);
        $mail->addAddress('eliam.santiago37@gmail.com'); // Enviar una copia del correo

        $mail->isHTML(true);
        $mail->Subject = 'Código de verificación para cambiar la contraseña';
        $mail->Body    = "Hola,<br><br>Tu código de verificación para cambiar la contraseña es: <b>$verification_code</b><br><br>Si no solicitaste este código, por favor ignora este correo.<br><br>Saludos,<br>Equipo de Soporte";
        $mail->AltBody = "Hola,\n\nTu código de verificación para cambiar la contraseña es: $verification_code\n\nSi no solicitaste este código, por favor ignora este correo.\n\nSaludos,\nEquipo de Soporte";

        $mail->send();
        $response = [
            'status' => 'success',
            'message' => 'El código de verificación ha sido enviado exitosamente.',
            'verification_code' => $verification_code
        ];
    } catch (Exception $e) {
        $response = [
            'status' => 'error',
            'message' => 'No se pudo enviar el correo electrónico. Por favor, intenta nuevamente más tarde.'
        ];
    }
} else {
    $response = [
        'status' => 'error',
        'message' => 'El correo electrónico proporcionado no existe en nuestra base de datos.'
    ];
}

// Enviar la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>