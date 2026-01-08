<?php

require_once BASE_PATH . '/models/ClienteModel.php';

class ClienteController
{
    private $model;

    public function __construct()
    {
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

    public function guardar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $nombre = $_POST['cliente-nombre'];
            $email = $_POST['cliente-email'];
            $telefono = $_POST['cliente-telefono'];
            $direccion = $_POST['cliente-direccion'];
            $notas = $_POST['cliente-notas'];

            $response = $this->model->guardarCliente($nombre, $email, $telefono, $direccion, $notas);

            if ($response === false) {
                throw new Exception('No se pudo guardar el cliente');
            }

            echo json_encode(['status' => 'success', 'message' => 'Cliente guardado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar el cliente error 500.']);
        }
    }

    public function actualizar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $id = $_POST['cliente-id'];
            $nombre = $_POST['cliente-nombre'];
            $email = $_POST['cliente-email'];
            $telefono = $_POST['cliente-telefono'];
            $direccion = $_POST['cliente-direccion'];
            $notas = $_POST['cliente-notas'];

            $response = $this->model->actualizarCliente($id, $nombre, $email, $telefono, $direccion, $notas);

            if ($response === false) {
                throw new Exception('No se pudo actualizar el cliente');
            }

            echo json_encode(['status' => 'success', 'message' => 'Cliente actualizado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el cliente error 500.']);
        }
    }

    public function eliminar()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Método no permitido');
            }

            $id = $_POST['confirmacion-id'];

            $response = $this->model->eliminarCliente($id);

            if ($response === false) {
                throw new Exception('No se pudo eliminar el cliente');
            }

            echo json_encode(['status' => 'success', 'message' => 'Cliente eliminado exitosamente.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al eliminar el cliente error 500.']);
        }
    }
}
