<?php

require_once BASE_PATH . '/models/HomeModel.php';

class HomeController
{
    private $model;

    public function __construct()
    {
        $this->model = new HomeModel();
        session_start();

        $timeout = 600;

        if (isset($_SESSION['LAST_ACTIVITY'])) {
            $inactivo = time() - $_SESSION['LAST_ACTIVITY'];
            if ($inactivo > $timeout) {
                $this->cerrarSesion();
                header('Location: /LaIndia/home');
                exit;
            }
        }
        $_SESSION['LAST_ACTIVITY'] = time();
    }

    public function index()
    {
        if (isset($_SESSION['usuario'])) {
            header('Location: /dashboard');
            exit;
        }

        require_once BASE_PATH . '/views/home.php';
    }

    public function login()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $email = $_POST['login-email'];
            $password = $_POST['login-password'];

            $usuario = $this->model->listarUsuarios($email);

            if (password_verify($password, $usuario['password'])) {
                $_SESSION['usuario'] = [
                    'id' => $usuario['id'],
                    'nombre' => $usuario['nombre'],
                    'email' => $usuario['email'],
                    'rol' => $usuario['rol']
                ];
                echo json_encode(['status' => 'success', 'message' => 'Inicio de sesión exitoso.']);
                return;
            }

            echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al iniciar sesión.']);
        }
    }

    public function patternRecovery()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $email = $_POST['patternEmail'];
            $pattern = $_POST['pattern'];

            $response = $this->model->listarUsuarios($email);

            if (password_verify($pattern, $response['token_recovery'])) {
                echo json_encode(['status' => true, 'message' => 'Credenciales comprobadas']);
                return;
            }

            echo json_encode(['status' => false, 'message' => 'Error de credenciales']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => false, 'message' => 'Error al confirmar patrón']);
        }
    }

    public function resetPassword()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $email = $_POST['email'];
            $password = $_POST['password'];

            $usuario = $this->model->listarUsuarios($email);

            if (password_verify($password, $usuario['password'])) {
                echo json_encode(['status' => false, 'message' => 'La contraseña debe ser diferente a la actual']);
                return;
            } else {
                $response = $this->model->resetPassword($email, $password);

                if ($response === false) {
                    echo json_encode(['status' => false, 'message' => 'Error al actualizar contraseña']);
                    return;
                }

                echo json_encode(['status' => true, 'message' => 'Contraseña actualizada correctamente']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => false, 'message' => 'Error al recuperar contraseña']);
        }
    }

    public function logout()
    {
        $this->cerrarSesion();
        header('Location: /LaIndia/home');
        exit;
    }

    private function cerrarSesion()
    {
        session_unset();
        session_destroy();
    }
}
