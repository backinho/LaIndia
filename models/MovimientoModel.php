<?php

require_once BASE_PATH . '/config/database.php';

class MovimientoModel
{
    private $db;

    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    public function listarMovimientos()
    {
        $stmt = $this->db->prepare("SELECT m.*, u.nombre as nombre_usuario, c.nombre as nombre_cliente, p.nombre as nombre_proveedor FROM `movimientos` m LEFT JOIN `usuarios` u ON u.id = m.usuario_id LEFT JOIN `clientes` c ON c.id = m.cliente_id LEFT JOIN `proveedores` p ON p.id = m.proveedor_id WHERE 1");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }

    public function listarMovimientosCompletos()
    {
        // Primera consulta: obtener todos los movimientos
        $stmtMovimientos = $this->db->prepare("
        SELECT 
            m.*,
            u.nombre as nombre_usuario,
            c.nombre as nombre_cliente,
            p.nombre as nombre_proveedor 
        FROM `movimientos` m
        LEFT JOIN `usuarios` u ON u.id = m.usuario_id
        LEFT JOIN `clientes` c ON c.id = m.cliente_id
        LEFT JOIN `proveedores` p ON p.id = m.proveedor_id
        ORDER BY m.fecha DESC
    ");
        $stmtMovimientos->execute();
        $movimientos = $stmtMovimientos->fetchAll(PDO::FETCH_ASSOC);

        // Si no hay movimientos, retornar array vacío
        if (empty($movimientos)) {
            return [];
        }

        // Obtener todos los IDs de movimientos para la segunda consulta
        $movimientosIds = array_column($movimientos, 'id');

        // Crear marcadores de posición para la consulta IN
        $placeholders = implode(',', array_fill(0, count($movimientosIds), '?'));

        // Segunda consulta: obtener todos los detalles de los movimientos
        $stmtDetalles = $this->db->prepare("
        SELECT 
            dm.*,
            prod.nombre as nombre_producto,
            cat.nombre as categoria_producto,
            prod.precio as precio_actual
        FROM `detalle_movimientos` dm
        LEFT JOIN `productos` prod ON prod.id = dm.producto_id
        LEFT JOIN `categorias` cat ON cat.id = prod.categoria_id
        WHERE dm.movimiento_id IN ($placeholders)
        ORDER BY dm.created_at ASC
    ");
        $stmtDetalles->execute($movimientosIds);
        $detalles = $stmtDetalles->fetchAll(PDO::FETCH_ASSOC);

        // Organizar los detalles por movimiento_id
        $detallesPorMovimiento = [];
        foreach ($detalles as $detalle) {
            $movimientoId = $detalle['movimiento_id'];
            if (!isset($detallesPorMovimiento[$movimientoId])) {
                $detallesPorMovimiento[$movimientoId] = [];
            }
            $detallesPorMovimiento[$movimientoId][] = $detalle;
        }

        // Combinar movimientos con sus detalles
        foreach ($movimientos as &$movimiento) {
            $movimientoId = $movimiento['id'];
            $movimiento['detalles'] = isset($detallesPorMovimiento[$movimientoId])
                ? $detallesPorMovimiento[$movimientoId]
                : [];

            // Calcular totales del movimiento
            $movimiento['total_productos'] = count($movimiento['detalles']);
            $movimiento['total_cantidad'] = 0;
            $movimiento['valor_total'] = 0;

            foreach ($movimiento['detalles'] as $detalle) {
                $movimiento['total_cantidad'] += $detalle['cantidad'];
                $movimiento['valor_total'] += $detalle['cantidad'] * $detalle['precio_unitario'];
            }
        }

        return $movimientos;
    }

    public function registrarMovimiento($productos, $tipo, $usuario_id, $cantidad_total)
    {
        // Generar UUID manual
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        $uuid = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

        // Obtener proveedor_id del primer producto
        $proveedor_id = isset($productos[0]['proveedor_id']) && !empty($productos[0]['proveedor_id']) ? $productos[0]['proveedor_id'] : null;

        // Validar que el proveedor_id exista en la base de datos
        if ($proveedor_id) {
            $stmt = $this->db->prepare("SELECT id FROM proveedores WHERE id = :proveedor_id AND activo = 1");
            $stmt->bindParam(':proveedor_id', $proveedor_id);
            $stmt->execute();
            if (!$stmt->fetch()) {
                $proveedor_id = null; // Si no existe, establecer como null
            }
        }

        $detalles = "Entrada de productos registrada";
        $notas = isset($productos[0]['notas']) ? $productos[0]['notas'] : '';

        $stmt = $this->db->prepare("
            INSERT INTO movimientos (id, tipo, usuario_id, proveedor_id, cantidad_total, detalles, fecha) 
            VALUES (:id, :tipo, :usuario_id, :proveedor_id, :cantidad_total, :detalles, NOW())
        ");

        $stmt->bindParam(':id', $uuid);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->bindParam(':proveedor_id', $proveedor_id);
        $stmt->bindParam(':cantidad_total', $cantidad_total);
        $stmt->bindParam(':detalles', $detalles);

        if ($stmt->execute()) {
            return $uuid;
        } else {
            error_log("Error al registrar movimiento: " . implode(", ", $stmt->errorInfo()));
            return false;
        }
    }

    public function registrarEntradaProducto($producto)
    {
        // Primero, verificar si el código ya existe
        $stmt = $this->db->prepare("SELECT id FROM productos WHERE codigo = :codigo");
        $stmt->bindParam(':codigo', $producto['codigo']);
        $stmt->execute();

        if ($stmt->fetch()) {
            error_log("El código de producto ya existe: " . $producto['codigo']);
            return false;
        }

        // Generar UUID para el nuevo producto
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        $producto_id = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

        $stmt = $this->db->prepare("
            INSERT INTO productos (id, codigo, nombre, categoria_id, stock, precio, descripcion, activo) 
            VALUES (:id, :codigo, :nombre, :categoria_id, :stock, :precio, :descripcion, 1)
        ");

        $stmt->bindParam(':id', $producto_id);
        $stmt->bindParam(':codigo', $producto['codigo']);
        $stmt->bindParam(':nombre', $producto['nombre']);
        $stmt->bindParam(':categoria_id', $producto['categoria_id']);
        $stmt->bindParam(':stock', $producto['cantidad']);
        $stmt->bindParam(':precio', $producto['precio']);

        // Descripción opcional
        $descripcion = isset($producto['descripcion']) ? $producto['descripcion'] : (isset($producto['notas']) ? $producto['notas'] : '');
        $stmt->bindParam(':descripcion', $descripcion);

        if ($stmt->execute()) {
            return $producto_id; // Retornar el ID del nuevo producto
        } else {
            error_log("Error al registrar producto: " . implode(", ", $stmt->errorInfo()));
            return false;
        }
    }

    public function registrarEntradaProductoExistente($producto)
    {
        // Primero obtener el precio actual para el historial
        $stmt = $this->db->prepare("SELECT precio FROM productos WHERE id = :id");
        $stmt->bindParam(':id', $producto['id']);
        $stmt->execute();
        $producto_actual = $stmt->fetch(PDO::FETCH_ASSOC);

        $precio_anterior = $producto_actual ? $producto_actual['precio'] : 0;

        // Actualizar stock y precio
        $stmt = $this->db->prepare("
            UPDATE productos 
            SET precio = :precio,
                updated_at = NOW()
            WHERE id = :id
        ");

        $stmt->bindParam(':cantidad', $producto['cantidad']);
        $stmt->bindParam(':precio', $producto['precio']);
        $stmt->bindParam(':id', $producto['id']);

        if ($stmt->execute()) {
            // Registrar en historial de precios si el precio cambió
            if ($precio_anterior != $producto['precio']) {
                $this->registrarCambioPrecio($producto['id'], $precio_anterior, $producto['precio']);
            }
            return true;
        } else {
            error_log("Error al actualizar producto: " . implode(", ", $stmt->errorInfo()));
            return false;
        }
    }

    public function registrarDetalleMovimiento($movimiento_id, $producto)
    {
        // Generar UUID para el detalle
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        $detalle_id = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

        $stmt = $this->db->prepare("
            INSERT INTO detalle_movimientos (id, movimiento_id, producto_id, producto_codigo, cantidad, precio_unitario, motivo, notas) 
            VALUES (:id, :movimiento_id, :producto_id, :producto_codigo, :cantidad, :precio_unitario, :motivo, :notas)
        ");

        // Obtener el ID del producto según si es nuevo o existente
        $producto_id = isset($producto['id']) ? $producto['id'] : (isset($producto['producto_id']) ? $producto['producto_id'] : null);

        // Si es producto nuevo, obtener el ID recién creado
        if (!$producto_id && isset($producto['nuevo_id'])) {
            $producto_id = $producto['nuevo_id'];
        }

        $codigo = $producto['codigo'];
        $cantidad = $producto['cantidad'];
        $precio = $producto['precio'];
        $motivo = 'entrada';
        $notas = isset($producto['notas']) ? $producto['notas'] : '';

        $stmt->bindParam(':id', $detalle_id);
        $stmt->bindParam(':movimiento_id', $movimiento_id);
        $stmt->bindParam(':producto_id', $producto_id);
        $stmt->bindParam(':producto_codigo', $codigo);
        $stmt->bindParam(':cantidad', $cantidad);
        $stmt->bindParam(':precio_unitario', $precio);
        $stmt->bindParam(':motivo', $motivo);
        $stmt->bindParam(':notas', $notas);

        if ($stmt->execute()) {
            return true;
        } else {
            error_log("Error al registrar detalle movimiento: " . implode(", ", $stmt->errorInfo()));
            return false;
        }
    }

    private function registrarCambioPrecio($producto_id, $precio_anterior, $precio_nuevo)
    {
        // Generar UUID para el historial
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        $historial_id = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

        $stmt = $this->db->prepare("
            INSERT INTO historial_precios (id, producto_id, precio_anterior, precio_nuevo, fecha_cambio, motivo) 
            VALUES (:id, :producto_id, :precio_anterior, :precio_nuevo, NOW(), 'Actualización por entrada de productos')
        ");

        $stmt->bindParam(':id', $historial_id);
        $stmt->bindParam(':producto_id', $producto_id);
        $stmt->bindParam(':precio_anterior', $precio_anterior);
        $stmt->bindParam(':precio_nuevo', $precio_nuevo);

        $stmt->execute();
    }

    public function verificarStockProducto($producto_id)
    {
        $stmt = $this->db->prepare("SELECT stock FROM productos WHERE id = :id");
        $stmt->bindParam(':id', $producto_id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ? $result['stock'] : false;
    }

    public function registrarMovimientoSalida($productos, $tipo, $usuario_id, $cliente_id, $cantidad_total)
    {
        // Generar UUID manual
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        $uuid = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

        // Validar que el cliente_id exista en la base de datos
        if ($cliente_id) {
            $stmt = $this->db->prepare("SELECT id FROM clientes WHERE id = :cliente_id AND activo = 1");
            $stmt->bindParam(':cliente_id', $cliente_id);
            $stmt->execute();
            if (!$stmt->fetch()) {
                $cliente_id = null;
            }
        }

        $detalles = "Salida de productos registrada";

        $stmt = $this->db->prepare("
        INSERT INTO movimientos (id, tipo, usuario_id, cliente_id, cantidad_total, detalles, fecha) 
        VALUES (:id, :tipo, :usuario_id, :cliente_id, :cantidad_total, :detalles, NOW())
    ");

        $stmt->bindParam(':id', $uuid);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->bindParam(':cliente_id', $cliente_id);
        $stmt->bindParam(':cantidad_total', $cantidad_total);
        $stmt->bindParam(':detalles', $detalles);

        if ($stmt->execute()) {
            return $uuid;
        } else {
            error_log("Error al registrar movimiento de salida: " . implode(", ", $stmt->errorInfo()));
            return false;
        }
    }

    public function registrarDetalleMovimientoSalida($movimiento_id, $producto)
    {
        // Generar UUID para el detalle
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        $detalle_id = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

        $stmt = $this->db->prepare("
        INSERT INTO detalle_movimientos (id, movimiento_id, producto_id, producto_codigo, cantidad, precio_unitario, motivo, notas) 
        VALUES (:id, :movimiento_id, :producto_id, :producto_codigo, :cantidad, :precio_unitario, :motivo, :notas)
    ");

        $producto_id = $producto['id'];
        $codigo = $producto['codigo'];
        $cantidad = $producto['cantidad'];
        $precio = $producto['precio'];
        $motivo = $producto['motivo'];
        $notas = isset($producto['notas']) ? $producto['notas'] : '';

        $stmt->bindParam(':id', $detalle_id);
        $stmt->bindParam(':movimiento_id', $movimiento_id);
        $stmt->bindParam(':producto_id', $producto_id);
        $stmt->bindParam(':producto_codigo', $codigo);
        $stmt->bindParam(':cantidad', $cantidad);
        $stmt->bindParam(':precio_unitario', $precio);
        $stmt->bindParam(':motivo', $motivo);
        $stmt->bindParam(':notas', $notas);

        return $stmt->execute();
    }
}
