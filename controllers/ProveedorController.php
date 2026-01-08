<?php

require_once BASE_PATH . '/models/ProveedorModel.php';

class ProveedorController
{
    private $model;

    public function __construct()
    {
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

    public function guardar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $nombre = $_POST['proveedor-nombre'];
            $contacto = $_POST['proveedor-contacto'];
            $email = $_POST['proveedor-email'];
            $telefono = $_POST['proveedor-telefono'];
            $direccion = $_POST['proveedor-direccion'];
            $nota = $_POST['proveedor-notas'];

            $response = $this->model->guardarProveedor($nombre, $contacto, $email, $telefono, $direccion, $nota);

            if ($response === false) {
                throw new Exception('No se pudo guardar el proveedor');
            }

            echo json_encode(['status' => 'success', 'message' => 'Proveedor guardado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar el proveedor error 500.']);
        }
    }

    public function actualizar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }
            $id = $_POST['proveedor-id'];
            $nombre = $_POST['proveedor-nombre'];
            $contacto = $_POST['proveedor-contacto'];
            $email = $_POST['proveedor-email'];
            $telefono = $_POST['proveedor-telefono'];
            $direccion = $_POST['proveedor-direccion'];
            $nota = $_POST['proveedor-notas'];

            $response = $this->model->actualizarProveedor($id, $nombre, $contacto, $email, $telefono, $direccion, $nota);

            if ($response === false) {
                throw new Exception('No se pudo actualizar el proveedor');
            }

            echo json_encode(['status' => 'success', 'message' => 'Proveedor actualizado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el proveedor error 500.']);
        }
    }

    public function eliminar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }
            $id = $_POST['confirmacion-id'];

            $response = $this->model->eliminarProveedor($id);

            if ($response === false) {
                throw new Exception('No se pudo eliminar el proveedor');
            }

            echo json_encode(['status' => 'success', 'message' => 'Proveedor eliminado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al eliminar el proveedor error 500.']);
        }
    }
}
