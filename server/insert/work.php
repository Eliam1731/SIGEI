<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    //ESTAS SON LAS VARIABLES QUE ENVIA EL FRONT, ESTO SI NO LOS CAMBIES
    $nameWork = $data['nameWork'];
    $shortNameWork = $data['shortNameWork'];
    $numWork = $data['numWork'];
    //ESTOS ULTIMOS DOS CONTIENEN ARRAYS DE LOS IDS DE EMPRESA Y FRENTES    
    $groupCompany = $data['groupCompany'];
    $groupForehead = $data['groupForeheads'];

    //APARTIR DE AQUI PUEDES BORRAR TODO Y EMPEZAR A HACERLO FUNCIONAL, SOLO PUSE ESTO PARA TESTEAR
    $response = [
        'nameWork' => $nameWork,
        'shortNameWork' => $shortNameWork,
        'numWork' => $numWork,
        'groupCompany' => $groupCompany,
        'groupForeheads' => $groupForehead,
        'message' => 'Los datos se recibieron correctamente',
    ];

    $jsonResponse = json_encode($response);
    header('Content-Type: application/json');
    echo $jsonResponse;
?>