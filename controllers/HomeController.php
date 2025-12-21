<?php

require_once BASE_PATH . '/models/HomeModel.php';

class HomeController
{
    private $model;

    public function __construct()
    {
        $this->model = new HomeModel();
        //session_start();
        // Permitir acceso a logout aunque la sesión esté activa
        /*$uri = $_SERVER['REQUEST_URI'] ?? '';
        $isLogout = (strpos($uri, '/logout') !== false);
        if (isset($_SESSION['usuario']) && !$isLogout) {
            header('Location: /LaIndia/dashboard');
            exit;
        }

        $timeout = 600; // 10 minutos en segundos

        if (isset($_SESSION['LAST_ACTIVITY'])) {
            $inactivo = time() - $_SESSION['LAST_ACTIVITY'];
            if ($inactivo > $timeout) {
                $this->cerrarSesion();
                header('Location: /LaIndia/home');
                exit;
            }
        }
        $_SESSION['LAST_ACTIVITY'] = time();*/
    }

    // Página principal (login)
    public function index()
    {
        // Si ya está logueado, redirigir al dashboard
        if (isset($_SESSION['usuario'])) {
            header('Location: /dashboard');
            exit;
        }

        require_once BASE_PATH . '/views/home.php';
    }

    public function resetPassword()
    {
        // Si ya está logueado, redirigir al dashboard
        if (isset($_SESSION['usuario'])) {
            header('Location: /dashboard');
            exit;
        }

        require_once BASE_PATH . '/views/recuperar_password.php';
    }


    // Cerrar sesión
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
