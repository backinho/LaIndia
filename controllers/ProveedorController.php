<?php

require_once BASE_PATH . '/models/ProveedorModel.php';

class ProveedorController
{
    private $model;

    public function __construct()
    {
        /*session_start();
        if (!isset($_SESSION['usuario'])) {
            header('Location: /LaIndia');
            exit;
        }*/
        $this->model = new ProveedorModel();
    }

    public function listar()
    {
        try {
            $proveedores = $this->model->listarProveedores();
            echo json_encode(['status' => 'success', 'data' => $proveedores]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al listar los proveedores.']);
        }
    }
}
