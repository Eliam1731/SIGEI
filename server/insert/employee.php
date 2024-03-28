<?php
    include '../config/connection_db.php';

    if($_SERVER["REQUEST_METHOD"] === "POST") {
        $name = htmlspecialchars($_POST['name']);
        $first_surname = htmlspecialchars($_POST['first_surname']);
        $second_surname = htmlspecialchars($_POST['second_surname']);
        $number_social = htmlspecialchars($_POST['number_social']);
        $company = htmlspecialchars($_POST['company_belongs']);
        $work = htmlspecialchars($_POST['work_belongs']);
        $forehead = htmlspecialchars($_POST['forehead_belongs']);
        $observation = htmlspecialchars($_POST['observation_employee']);
        $email = htmlspecialchars($_POST['email']); // Asegúrate de que este es el nombre correcto del campo de correo electrónico en tu formulario

        // Validar que el número social no se repita
        $stmt = $conn->prepare("SELECT * FROM employees WHERE number_social = ?");
        $stmt->execute([$number_social]);

        if ($stmt->fetch()) {
            echo json_encode(["error" => "El número social proporcionado ya existe en la base de datos"]);
            exit;
        }

        // Validar que el correo electrónico no se repita
        $stmt = $conn->prepare("SELECT * FROM employees WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            echo json_encode(["error" => "El correo electrónico proporcionado ya existe en la base de datos"]);
            exit;
        }

        $data = "\nName: $name\nFirst Surname: $first_surname\nSecond Surname: $second_surname\nSocial Number: $number_social\nCompany: $company\nWork: $work\nForehead: $forehead\nObservation: $observation\nEmail: $email\n";

        file_put_contents('employee_data.txt', $data, FILE_APPEND);

        echo json_encode(["success" => "Se aceptaron los datos"]);
    } else {
        echo json_encode(["error" => "No se recibieron datos"]);
    }
?>