<?php

require_once BASE_PATH . '/models/UsuarioModel.php';

class UsuarioController
{
    private $model;

    public function __construct()
    {
        $this->model = new UsuarioModel();
    }

    public function listar()
    {
        try {
            $usuarios = $this->model->listarUsuarios();
            echo json_encode(['status' => 'success', 'data' => $usuarios]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al listar los usuarios.']);
        }
    }

    public function listarActivo()
    {
        try {
            $id = $_SESSION['usuario']['id'];

            $usuario = $this->model->listarUsuarioActivo($id);
            echo json_encode(['status' => 'success', 'data' => $usuario]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'mensaje' => 'Error al listar el usuariooo.']);
        }
    }

    public function guardar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $nombre = $_POST['user-nombre'];
            $email = $_POST['user-email'];
            $teleono = $_POST['user-telefono'];
            $password = $_POST['user-password'];
            $rol = $_POST['user-rol'];
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);

            $response = $this->model->guardarUsuario($nombre, $email, $teleono, $passwordHash, $rol);

            if ($response === false) {
                throw new Exception('No se pudo guardar el usuario');
            }

            echo json_encode(['status' => 'success', 'message' => 'Usuario guardado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar el usuario.']);
        }
    }

    public function actualizar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $id = $_POST['user-id'];
            $nombre = $_POST['user-nombre'];
            $email = $_POST['user-email'];
            $telefono = $_POST['user-telefono'];
            $rol = $_POST['user-rol'];
            $response = $this->model->actualizarUsuario($id, $nombre, $email, $telefono, $rol);

            if ($response === false) {
                throw new Exception('No se pudo actualizar el usuario');
            }

            echo json_encode(['status' => 'success', 'message' => 'Usuario actualizado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el usuario.']);
        }
    }

    public function eliminar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $id = $_POST['confirmacion-id'];

            $response = $this->model->eliminarUsuario($id);

            if ($response === false) {
                throw new Exception('No se pudo eliminar el usuario');
            }

            echo json_encode(['status' => 'success', 'message' => 'Usuario eliminado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al eliminar el usuario.']);
        }
    }
}
