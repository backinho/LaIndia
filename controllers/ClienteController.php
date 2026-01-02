<?php

require_once BASE_PATH . '/models/ClienteModel.php';

class ClienteController
{
    private $model;

    public function __construct()
    {
        /*session_start();
        if (!isset($_SESSION['usuario'])) {
            header('Location: /LaIndia');
            exit;
        }*/
        $this->model = new ClienteModel();
    }

    public function listar()
    {
        try {
            $clientes = $this->model->listarClientes();
            echo json_encode(['status' => 'success', 'data' => $clientes]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al listar los clientes.']);
        }
    }
}
