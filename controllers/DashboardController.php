<?php

require_once BASE_PATH . '/models/DashboardModel.php';

class DashboardController
{
    private $model;

    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['usuario'])) {
            header('Location: /LaIndia');
            exit;
        }
        $this->model = new DashboardModel();
    }

    public function index()
    {
        $title = 'Dashboard - La India';

        // Renderizar la vista
        require_once BASE_PATH . '/views/dashboard.php';
    }
}
