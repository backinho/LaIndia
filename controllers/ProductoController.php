<?php

require_once BASE_PATH . '/models/ProductoModel.php';

class ProductoController
{
    private $model;

    public function __construct()
    {
        /*session_start();
        if (!isset($_SESSION['usuario'])) {
            header('Location: /LaIndia');
            exit;
        }*/
        $this->model = new ProductoModel();
    }

    public function listar()
    {
        try {
            $productos = $this->model->listarProductos();
            echo json_encode(['status' => 'success', 'data' => $productos]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al listar los productos.']);
        }
    }
}
