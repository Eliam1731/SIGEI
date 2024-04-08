<?
    include '../config/connection_db.php';
    //Obtengo el ID que envia el cliente en formato json 
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    header('Content-Type: application/json');
    print json_encode($id);
?>