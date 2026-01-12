<?php

require_once BASE_PATH . '/models/MovimientoModel.php';

class MovimientoController
{
    private $model;

    public function __construct()
    {
        $this->model = new MovimientoModel();
    }

    public function listar()
    {
        try {
            $movimientos = $this->model->listarMovimientosCompletos();
            echo json_encode(['status' => 'success', 'data' => $movimientos]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => false, 'message' => 'Error al listar los movimientos: ' . $e->getMessage()]);
        }
    }

    public function registrarEntrada()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['status' => false, 'message' => 'Método no permitido']);
                return;
            }

            // Validar que exista la sesión
            if (!isset($_SESSION['usuario']) || !isset($_SESSION['usuario']['id'])) {
                http_response_code(401);
                echo json_encode(['status' => false, 'message' => 'No autorizado']);
                return;
            }

            // Validar y decodificar productos
            if (!isset($_POST['productos'])) {
                http_response_code(400);
                echo json_encode(['status' => false, 'message' => 'Datos incompletos']);
                return;
            }

            $productos = json_decode($_POST['productos'], true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                http_response_code(400);
                echo json_encode(['status' => false, 'message' => 'JSON inválido']);
                return;
            }

            if (empty($productos)) {
                http_response_code(400);
                echo json_encode(['status' => false, 'message' => 'No hay productos para registrar']);
                return;
            }

            $usuario_id = $_SESSION['usuario']['id'];
            $tipo = 'entrada';
            $cantidad_total = count($productos);

            // Registrar movimiento
            $movimiento_id = $this->model->registrarMovimiento($productos, $tipo, $usuario_id, $cantidad_total);

            if (!$movimiento_id) {
                http_response_code(500);
                echo json_encode(['status' => false, 'message' => 'Error al registrar el movimiento']);
                return;
            }

            // Procesar cada producto
            foreach ($productos as $producto) {
                if ($producto['tipo'] === 'nuevo') {
                    // Registrar producto nuevo
                    $nuevo_producto_id = $this->model->registrarEntradaProducto($producto);

                    if ($nuevo_producto_id === false) {
                        // Si falla, hacer rollback del movimiento
                        $this->revertirMovimiento($movimiento_id);
                        http_response_code(500);
                        echo json_encode(['status' => false, 'message' => 'Error al registrar el producto nuevo: ' . $producto['nombre']]);
                        return;
                    }

                    // Agregar el ID del nuevo producto para el detalle
                    $producto['nuevo_id'] = $nuevo_producto_id;
                } else if ($producto['tipo'] === 'existente') {
                    // Actualizar producto existente
                    $response = $this->model->registrarEntradaProductoExistente($producto);

                    if ($response === false) {
                        // Si falla, hacer rollback del movimiento
                        $this->revertirMovimiento($movimiento_id);
                        http_response_code(500);
                        echo json_encode(['status' => false, 'message' => 'Error al actualizar el producto existente']);
                        return;
                    }
                } else {
                    // Tipo no válido
                    $this->revertirMovimiento($movimiento_id);
                    http_response_code(400);
                    echo json_encode(['status' => false, 'message' => 'Tipo de producto no válido']);
                    return;
                }

                // Registrar detalle del movimiento
                $result = $this->model->registrarDetalleMovimiento($movimiento_id, $producto);

                if ($result === false) {
                    // Si falla, hacer rollback del movimiento
                    $this->revertirMovimiento($movimiento_id);
                    http_response_code(500);
                    echo json_encode(['status' => false, 'message' => 'Error al registrar el detalle del movimiento']);
                    return;
                }
            }

            echo json_encode(['status' => true, 'message' => 'Entrada registrada correctamente', 'movimiento_id' => $movimiento_id]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => false, 'message' => 'Error al registrar la entrada: ' . $e->getMessage()]);
        }
    }

    public function registrarSalida()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['status' => false, 'message' => 'Método no permitido']);
                return;
            }

            // Validar que exista la sesión
            if (!isset($_SESSION['usuario']) || !isset($_SESSION['usuario']['id'])) {
                http_response_code(401);
                echo json_encode(['status' => false, 'message' => 'No autorizado']);
                return;
            }

            // Validar y decodificar productos
            if (!isset($_POST['productos']) || !isset($_POST['cliente_id'])) {
                http_response_code(400);
                echo json_encode(['status' => false, 'message' => 'Datos incompletos']);
                return;
            }

            $productos = json_decode($_POST['productos'], true);
            $cliente_id = $_POST['cliente_id'];

            if (json_last_error() !== JSON_ERROR_NONE) {
                http_response_code(400);
                echo json_encode(['status' => false, 'message' => 'JSON inválido']);
                return;
            }

            if (empty($productos)) {
                http_response_code(400);
                echo json_encode(['status' => false, 'message' => 'No hay productos para registrar']);
                return;
            }

            $usuario_id = $_SESSION['usuario']['id'];
            $tipo = 'salida';
            $cantidad_total = count($productos);

            // Validar stock antes de registrar
            foreach ($productos as $producto) {
                $stock_disponible = $this->model->verificarStockProducto($producto['id']);
                if ($stock_disponible === false || $stock_disponible < $producto['cantidad']) {
                    http_response_code(400);
                    echo json_encode(['status' => false, 'message' => 'Stock insuficiente para el producto: ' . $producto['codigo']]);
                    return;
                }
            }

            // Registrar movimiento
            $movimiento_id = $this->model->registrarMovimientoSalida($productos, $tipo, $usuario_id, $cliente_id, $cantidad_total);

            if (!$movimiento_id) {
                http_response_code(500);
                echo json_encode(['status' => false, 'message' => 'Error al registrar el movimiento']);
                return;
            }

            // Procesar cada producto
            foreach ($productos as $producto) {
                // Registrar detalle del movimiento
                $result = $this->model->registrarDetalleMovimientoSalida($movimiento_id, $producto);

                if ($result === false) {
                    // Si falla, hacer rollback del movimiento
                    $this->revertirMovimiento($movimiento_id);
                    http_response_code(500);
                    echo json_encode(['status' => false, 'message' => 'Error al registrar el detalle del movimiento']);
                    return;
                }
            }

            echo json_encode(['status' => true, 'message' => 'Salida registrada correctamente', 'movimiento_id' => $movimiento_id]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => false, 'message' => 'Error al registrar la salida: ' . $e->getMessage()]);
        }
    }

    private function revertirMovimiento($movimiento_id)
    {
        // Eliminar el movimiento si hubo error
        try {
            $pdo = new PDO('mysql:host=localhost;dbname=laindiadb', 'usuario', 'password');
            $stmt = $pdo->prepare("DELETE FROM movimientos WHERE id = :id");
            $stmt->bindParam(':id', $movimiento_id);
            $stmt->execute();
        } catch (Exception $e) {
            error_log("Error al revertir movimiento: " . $e->getMessage());
        }
    }
}
