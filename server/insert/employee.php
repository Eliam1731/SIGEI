<?php
    if($_SERVER["REQUEST_METHOD"] === "POST") {
        $name = htmlspecialchars($_POST['name']);
        $first_surname = htmlspecialchars($_POST['first_surname']);
        $second_surname = htmlspecialchars($_POST['second_surname']);
        $number_social = htmlspecialchars($_POST['number_social']);
        $company = htmlspecialchars($_POST['company_belongs']);
        $work = htmlspecialchars($_POST['work_belongs']);
        $forehead = htmlspecialchars($_POST['forehead_belongs']);
        $observation = htmlspecialchars($_POST['observation_employee']);

        // Validar que el número social no se repita xd
        $stmt = $conn->prepare("SELECT * FROM employees WHERE number_social = ?");
        $stmt->bindParam(1, $number_social);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "El número social proporcionado ya existe en la base de datos"]);
            exit;
        }

        $data = "\nName: $name\nFirst Surname: $first_surname\nSecond Surname: $second_surname\nSocial Number: $number_social\nCompany: $company\nWork: $work\nForehead: $forehead\nObservation: $observation\n";

        file_put_contents('employee_data.txt', $data, FILE_APPEND);

        $respuesta = 'Se aceptaron los datos';
    } else {
        $respuesta = 'No se recibieron datos';
    }

    header('Content-Type: application/json');
    print json_encode($respuesta);

?>