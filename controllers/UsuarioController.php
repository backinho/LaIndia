<?php

require_once BASE_PATH . '/models/UsuarioModel.php';

class UsuarioController
{
    private $model;

    public function __construct()
    {
        /*session_start();
        if (!isset($_SESSION['usuario'])) {
            header('Location: /LaIndia');
            exit;
        }*/
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
}
