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

        $data = "\nName: $name\nFirst Surname: $first_surname\nSecond Surname: $second_surname\nSocial Number: $number_social\nCompany: $company\nWork: $work\nForehead: $forehead\nObservation: $observation\n";

        file_put_contents('employee_data.txt', $data, FILE_APPEND);


    }

    $respuesta = 'Se aceptaron los datos';

    header('Content-Type: application/json');
    print json_encode($respuesta);

?>