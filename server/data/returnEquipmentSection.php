<?php
    include '../config/connection_db.php';
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    try {
        $query =  $conn->prepare("SELECT
                                    Equipo_id AS id, 
                                    Status_id AS status
                                FROM 
                                    equipos_informaticos 
                                WHERE 
                                    miId = ?;");
        $query->bindParam(1, $id);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC); 

        if ($result === false) {
            // La consulta no devolvió ningún resultado
            $result = [
                'status' => 'error',
                'message' => 'El equipo no existe'
            ];

            header('Content-Type: application/json');
            print json_encode($result);
            return;
        }

        $equipo_id = $result['id'];
        $status_id = $result['status'];

        if($status_id !== 2) {
            //mandar mensaje informando que el equipo no está en estado de resguardo
            $result = [
                'status' => 'error',
                'message' => 'El equipo no está en estado de resguardo'
            ];

            header('Content-Type: application/json');
            print json_encode($result);
            return;
        }

        //Empieza la logica para obtener los datos del equipo
        $sql_guard = $conn->prepare("SELECT 
            resguardos_de_equipos.User_id AS user_id,
            resguardos_de_equipos.Comentario AS comentario, 
            resguardos_de_equipos.Fecha_autorizacion AS fechaAutorizacion,
            resguardos_de_equipos.Resguardo_id AS resguardo_id,
            equipos_informaticos.Equipo_id AS equipo_id,
            subcategoria.Nom_subcategoria AS subcategoria,
            marca_del_equipo.Nom_marca AS marca,
            equipos_informaticos.Modelo AS modelo,
            equipos_informaticos.Num_serie AS serie,
            equipos_informaticos.miId AS codigo,
            status.Nom_Status AS estado,
            empleados_resguardantes.Empleado_id AS empleado_id,
            CONCAT(empleados_resguardantes.Nombre, ' ', empleados_resguardantes.Primer_apellido, ' ', empleados_resguardantes.Segundo_apellido) AS nombreResguardante_completo,
            empleados_resguardantes.Empresa_id AS empresa_id,
            empleados_resguardantes.Obra_id AS obra_id,
            empleados_resguardantes.id_frente AS frente_id,
            empleados_resguardantes.Correo_electronico AS correoResguardante
        FROM 
            resguardos_de_equipos
        JOIN equipos_informaticos ON resguardos_de_equipos.Equipo_id = equipos_informaticos.Equipo_id
        JOIN subcategoria ON equipos_informaticos.Id_subcategoria = subcategoria.Subcategoria_id
        JOIN marca_del_equipo ON equipos_informaticos.Id_marca = marca_del_equipo.Id_Marca
        JOIN status ON equipos_informaticos.Status_id = status.Status_id
        JOIN empleados_resguardantes ON resguardos_de_equipos.Empleado_id = empleados_resguardantes.Empleado_id
        WHERE 
            resguardos_de_equipos.Equipo_id = ?;");

        $sql_guard->bindParam(1, $equipo_id);
        $sql_guard->execute();
        $guard = $sql_guard->fetch(PDO::FETCH_ASSOC);

        $result_guard = [
            'estado' => $guard['estado'],
            'user_id' => $guard['user_id'],
            'comentario' => $guard['comentario'],
            'fechaAutorizacion' => $guard['fechaAutorizacion'],
            'resguardo_id' => $guard['resguardo_id'],
            'equipo' => [
                'equipo_id' => $guard['equipo_id'],
                'subcategoria' => $guard['subcategoria'],
                'marca' => $guard['marca'],
                'modelo' => $guard['modelo'],
                'serie' => $guard['serie'],
                'codigo' => $guard['codigo'],
            ],
            'empleado' => [
                'empleado_id' => $guard['empleado_id'],
                'nombreResguardante_completo' => $guard['nombreResguardante_completo'],
                'empresa_id' => $guard['empresa_id'],
                'obra_id' => $guard['obra_id'],
                'frente_id' => $guard['frente_id'],
                'correoResguardante' => $guard['correoResguardante'],
            ],
        ];

        header('Content-Type: application/json');
        print json_encode($result_guard);
    } catch (PDOException $e) {
        error_log("Error en la consulta: " . $e->getMessage());
    }
?>