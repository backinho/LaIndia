<?php

require_once BASE_PATH . '/models/CategoriaModel.php';

class CategoriaController
{
    private $model;

    public function __construct()
    {
        $this->model = new CategoriaModel();
    }

    public function listar()
    {
        try {
            $categorias = $this->model->listarCategorias();
            echo json_encode(['status' => true, 'data' => $categorias]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => false, 'message' => 'Error al listar las categorías.']);
        }
    }

    public function guardar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                error_log("ERROR: Método no permitido. Se esperaba POST, se recibió: " . $_SERVER['REQUEST_METHOD']);
                throw new Exception('Método no permitido', 405);
            }

            $requiredFields = ['categoria-nombre', 'categoria-codigo', 'categoria-descripcion'];
            foreach ($requiredFields as $field) {
                if (!isset($_POST[$field])) {
                    throw new Exception("Campo requerido faltante: {$field}", 400);
                }
            }

            $nombre = trim($_POST['categoria-nombre']);
            $codigo = trim($_POST['categoria-codigo']);
            $descripcion = trim($_POST['categoria-descripcion']);

            if (empty($nombre)) {
                throw new Exception('El nombre de la categoría es requerido', 400);
            }

            $response = $this->model->guardarCategoria($nombre, $codigo, $descripcion);

            if ($response === false) {
                throw new Exception('No se pudo guardar la categoría en la base de datos');
            }

            $jsonResponse = json_encode([
                'status' => true,
                'message' => 'Categoría guardada exitosamente.',
            ]);

            if ($jsonResponse === false) {
                throw new Exception('Error al generar respuesta JSON: ' . json_last_error_msg());
            }

            header('Content-Type: application/json');
            echo $jsonResponse;
            exit();
        } catch (Exception $e) {
            error_log("ERROR en guardar: " . $e->getMessage() . " - Código: " . $e->getCode());
            http_response_code($e->getCode() ?: 500);
            echo json_encode(['status' => false, 'message' => 'Error al guardar la categoría', 'code' => $e->getCode()]);
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
            $id = $_POST['confirmacion-categoria-id'];

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
