<?php

require_once BASE_PATH . '/models/CategoriaModel.php';

class CategoriaController
{
    private $model;

    public function __construct()
    {
        /*session_start();
        if (!isset($_SESSION['usuario'])) {
            header('Location: /LaIndia');
            exit;
        }*/
        $this->model = new CategoriaModel();
    }

    public function listar()
    {
        try {
            $categorias = $this->model->listarCategorias();
            echo json_encode(['status' => 'success', 'data' => $categorias]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al listar las categorías.']);
        }
    }

    public function guardar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $nombre = $_POST['categoria-nombre'];
            $codigo = $_POST['categoria-codigo'];
            $descripcion = $_POST['categoria-descripcion'];

            $response = $this->model->guardarCategoria($nombre, $codigo, $descripcion);

            if ($response === false) {
                throw new Exception('No se pudo guardar la categoría');
            }

            echo json_encode(['status' => 'success', 'message' => 'Categoría guardada exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar la categoría error 500.']);
        }
    }

    public function actualizar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }
            $id = $_POST['categoria-id'];
            $nombre = $_POST['categoria-nombre'];
            $codigo = $_POST['categoria-codigo'];
            $descripcion = $_POST['categoria-descripcion'];

            $response = $this->model->actualizarCategoria($id, $nombre, $codigo, $descripcion);

            if ($response === false) {
                throw new Exception('Error al actualizar la categoría');
            }

            echo json_encode(['status' => 'success', 'message' => 'Categoría actualizada exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar la categoría.']);
        }
    }

    public function eliminar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }
            $id = $_POST['confirmacion-id'];

            $response = $this->model->eliminarCategoria($id);

            if ($response === false) {
                throw new Exception('Error al eliminar la categoría');
            }

            echo json_encode(['status' => 'success', 'message' => 'Categoría eliminada exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al eliminar la categoría.']);
        }
    }
}
