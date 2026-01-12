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
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

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

    public function actualizarDatos()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $id = $_SESSION['usuario']['id'];
            $nombre = $_POST['profile-nombre'];
            $email = $_POST['profile-email-input'];
            $telefono = $_POST['profile-telefono'];

            $response = $this->model->actualizarDatos($id, $nombre, $email, $telefono);

            if ($response === false) {
                throw new Exception('No se pudo actualizar el usuario');
            }

            echo json_encode(['status' => 'success', 'message' => 'Usuario actualizado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el usuario.']);
        }
    }

    public function actualizarCredenciales()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
                return;
            }

            $id = $_SESSION['usuario']['id'];
            $nuevaPassword = $_POST['profile-nueva-contrasena'] ?? '';
            $passwordActual = $_POST['profile-contrasena-actual'] ?? '';

            if (empty($passwordActual) || empty($nuevaPassword)) {
                echo json_encode(['status' => 'error', 'message' => 'Las contraseñas no pueden estar vacías']);
                return;
            }

            $response = $this->model->actualizarCredenciales($id, $passwordActual, $nuevaPassword);

            if ($response === false) {
                echo json_encode(['status' => 'error', 'message' => 'Contraseña actual incorrecta']);
                return;
            }

            echo json_encode(['status' => 'success', 'message' => 'Credenciales actualizadas exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error interno del servidor']);
        }
    }

    public function actualizarPatron()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
                return;
            }

            $id = $_SESSION['usuario']['id'];
            $patron = $_POST['pattern'] ?? '';
            $password = $_POST['pattern-password'] ?? '';

            if (empty($patron) || empty($password)) {
                echo json_encode(['status' => 'error', 'message' => 'El patrón y la contraseña no pueden estar vacías']);
                return;
            }

            $response = $this->model->actualizarPatron($id, $patron, $password);

            if ($response === false) {
                echo json_encode(['status' => 'error', 'message' => 'Contraseña ingresada incorrecta']);
                return;
            }

            echo json_encode(['status' => 'success', 'message' => 'Patrón actualizado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error interno del servidor']);
        }
    }
}
