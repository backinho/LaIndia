-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2026 a las 19:24:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laindiadb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `nombre` varchar(100) NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` char(36) DEFAULT NULL,
  `updated_by` char(36) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` text NOT NULL,
  `notas` text DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` char(36) DEFAULT NULL,
  `updated_by` char(36) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `telefono`, `direccion`, `notas`, `activo`, `fecha_registro`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_at`, `deleted_by`) VALUES
('4a73b431-2eaa-11f1-9e5f-f44d30ee4ee3', 'prueba', 'prueba@gmail.com', '1231424123', 'fasfas', '', 1, '2026-04-02 15:40:35', '2026-04-02 15:40:35', '2026-04-02 15:40:35', NULL, NULL, NULL, NULL),
('5fb3779a-e9d2-11f0-8264-f44d30ee4ee3', 'example', 'example@example.com', '123123', 'Virgen del Valle', 'Actualizado mi helmano', 0, '2026-01-05 01:03:40', '2026-01-05 01:03:40', '2026-01-05 13:31:22', NULL, NULL, '2026-01-05 13:31:22', NULL),
('cli-001', 'Cliente General', 'cliente@general.com', '555-5678', 'Avenida Central #456, Ciudad', NULL, 1, '2025-12-28 17:20:14', '2025-12-28 17:20:14', '2025-12-28 17:20:14', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `clave` varchar(100) NOT NULL,
  `valor` text DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`clave`, `valor`, `tipo`, `descripcion`, `updated_at`) VALUES
('iva', '16', 'porcentaje', 'Porcentaje de IVA', '2025-12-28 17:20:14'),
('moneda', 'VES', 'texto', 'Moneda local', '2025-12-28 17:38:06'),
('stock_minimo', '5', 'numero', 'Stock mínimo para alertas', '2025-12-28 17:38:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_movimientos`
--

CREATE TABLE `detalle_movimientos` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `movimiento_id` char(36) NOT NULL,
  `producto_id` char(36) NOT NULL,
  `producto_codigo` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `motivo` varchar(100) DEFAULT NULL,
  `notas` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Disparadores `detalle_movimientos`
--
DELIMITER $$
CREATE TRIGGER `update_stock_on_movement` AFTER INSERT ON `detalle_movimientos` FOR EACH ROW BEGIN
    DECLARE movimiento_tipo VARCHAR(20);
    
    -- Obtener el tipo de movimiento
    SELECT tipo INTO movimiento_tipo 
    FROM movimientos 
    WHERE id = NEW.movimiento_id;
    
    -- Actualizar stock según el tipo
    IF movimiento_tipo = 'entrada' THEN
        UPDATE productos 
        SET stock = stock + NEW.cantidad,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.producto_id;
    ELSEIF movimiento_tipo = 'salida' THEN
        UPDATE productos 
        SET stock = stock - NEW.cantidad,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.producto_id;
    END IF;
    
    -- Actualizar cantidad_total en el movimiento
    UPDATE movimientos 
    SET cantidad_total = (
        SELECT SUM(cantidad) 
        FROM detalle_movimientos 
        WHERE movimiento_id = NEW.movimiento_id
    )
    WHERE id = NEW.movimiento_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_precios`
--

CREATE TABLE `historial_precios` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `producto_id` char(36) NOT NULL,
  `precio_anterior` decimal(10,2) DEFAULT NULL,
  `precio_nuevo` decimal(10,2) DEFAULT NULL,
  `fecha_cambio` timestamp NOT NULL DEFAULT current_timestamp(),
  `usuario_id` char(36) DEFAULT NULL,
  `motivo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `tipo` enum('entrada','salida') NOT NULL,
  `usuario_id` char(36) NOT NULL,
  `cliente_id` char(36) DEFAULT NULL,
  `proveedor_id` char(36) DEFAULT NULL,
  `cantidad_total` int(11) NOT NULL DEFAULT 0,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `detalles` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `codigo` varchar(100) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `categoria_id` char(36) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `precio` decimal(10,2) NOT NULL DEFAULT 0.00,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` char(36) DEFAULT NULL,
  `updated_by` char(36) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Disparadores `productos`
--
DELIMITER $$
CREATE TRIGGER `before_producto_insert_generate_code` BEFORE INSERT ON `productos` FOR EACH ROW BEGIN
    DECLARE prefix VARCHAR(100);
    DECLARE next_id INT;
    DECLARE new_code VARCHAR(100);

    -- 1. Obtener el código (prefijo) de la categoría seleccionada
    SELECT codigo INTO prefix 
    FROM categorias 
    WHERE id = NEW.categoria_id;

    -- 2. Contar cuántos productos existen ya con ese prefijo para determinar el siguiente número
    -- Usamos LIKE para buscar patrones similares (ej: PRU-1, PRU-2)
    SELECT COUNT(*) + 1 INTO next_id 
    FROM productos 
    WHERE categoria_id = NEW.categoria_id;

    -- 3. Construir el nuevo código (Ejemplo: PRU-001)
    -- LPAD añade ceros a la izquierda para mantener un formato limpio
    SET new_code = CONCAT(prefix, '-', LPAD(next_id, 3, '0'));

    -- 4. Asignar el código generado al nuevo producto
    SET NEW.codigo = new_code;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_price_change` AFTER UPDATE ON `productos` FOR EACH ROW BEGIN
    IF OLD.precio != NEW.precio THEN
        INSERT INTO historial_precios 
        (id, producto_id, precio_anterior, precio_nuevo, usuario_id)
        VALUES (UUID(), NEW.id, OLD.precio, NEW.precio, NEW.updated_by);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `nombre` varchar(255) NOT NULL,
  `contacto` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` text NOT NULL,
  `notas` text DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` char(36) DEFAULT NULL,
  `updated_by` char(36) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `contacto`, `email`, `telefono`, `direccion`, `notas`, `activo`, `fecha_registro`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_at`, `deleted_by`) VALUES
('prov-001', 'Proveedor Generales', 'Juan Pérez', 'proveedor@general.com', '555-1234', 'Calle Principal #123, Ciudad', '', 1, '2025-12-28 17:20:14', '2025-12-28 17:20:14', '2026-01-10 03:48:57', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','usuario') NOT NULL DEFAULT 'usuario',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` char(36) DEFAULT NULL,
  `updated_by` char(36) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` char(36) DEFAULT NULL,
  `token_recovery` varchar(255) DEFAULT NULL,
  `last_token_recovery` timestamp NULL DEFAULT NULL,
  `last_password_change` timestamp NULL DEFAULT NULL,
  `failed_attempts` int(11) DEFAULT 0,
  `locked_until` timestamp NULL DEFAULT NULL,
  `security_question` varchar(255) DEFAULT NULL,
  `security_answer` varchar(255) DEFAULT NULL,
  `security_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `password`, `rol`, `activo`, `fecha_registro`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_at`, `deleted_by`, `token_recovery`, `last_token_recovery`, `last_password_change`, `failed_attempts`, `locked_until`, `security_question`, `security_answer`, `security_updated_at`) VALUES
('fc1e79b9-20c9-11f1-85ed-f44d30ee4ee3', 'Administrador', 'administrador@gmail.com', '04121234563', '$2y$10$ofbGVfhqlDp2pQKtqUYjSed0/dPP/JdquZp4veZlOD6B7OjZxM8vC', 'admin', 1, '2026-03-15 23:52:11', '2026-03-15 23:52:11', '2026-03-16 00:38:59', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'mascota', '$2y$10$wgaE689UpK6zTjzQicy.beV0rdGx6NcUJmqw4oa/wCn/V8/RpTe1a', '2026-03-15 23:59:35'),
('ff9dd9c5-eb13-11f0-a48c-f44d30ee4ee3', 'usuario', 'usuario@example.com', '04127654321', '$2y$10$wP1xRkecX0U6ldVD.LXad.BgZNLcR9a7MCry2F1VGbHyL/1wqHJi2', 'usuario', 1, '2026-01-06 15:25:57', '2026-01-06 15:25:57', '2026-03-15 23:42:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'ciudad', '$2y$10$D8WhlbfOgv04COlbcF3KpeMql/nDGWlmEsaiCUt2AveJfYcK1E.7y', '2026-03-15 23:42:19');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `idx_categorias_nombre` (`nombre`),
  ADD KEY `idx_categorias_activo` (`activo`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_clientes_email` (`email`),
  ADD KEY `idx_clientes_telefono` (`telefono`),
  ADD KEY `idx_clientes_activo` (`activo`);

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`clave`);

--
-- Indices de la tabla `detalle_movimientos`
--
ALTER TABLE `detalle_movimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_detalle_movimientos_movimiento_id` (`movimiento_id`),
  ADD KEY `idx_detalle_movimientos_producto_id` (`producto_id`),
  ADD KEY `idx_detalle_movimientos_producto_codigo` (`producto_codigo`);

--
-- Indices de la tabla `historial_precios`
--
ALTER TABLE `historial_precios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_historial_precios_producto_id` (`producto_id`),
  ADD KEY `idx_historial_precios_fecha` (`fecha_cambio`),
  ADD KEY `fk_historial_precios_usuario` (`usuario_id`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_movimientos_tipo` (`tipo`),
  ADD KEY `idx_movimientos_usuario_id` (`usuario_id`),
  ADD KEY `idx_movimientos_cliente_id` (`cliente_id`),
  ADD KEY `idx_movimientos_proveedor_id` (`proveedor_id`),
  ADD KEY `idx_movimientos_fecha` (`fecha`),
  ADD KEY `idx_movimientos_tipo_fecha` (`tipo`,`fecha`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `idx_productos_codigo` (`codigo`),
  ADD KEY `idx_productos_nombre` (`nombre`),
  ADD KEY `idx_productos_categoria_id` (`categoria_id`),
  ADD KEY `idx_productos_stock` (`stock`),
  ADD KEY `idx_productos_activo` (`activo`),
  ADD KEY `idx_productos_precio` (`precio`),
  ADD KEY `idx_productos_busqueda` (`nombre`,`codigo`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `idx_proveedores_nombre` (`nombre`),
  ADD KEY `idx_proveedores_email` (`email`),
  ADD KEY `idx_proveedores_activo` (`activo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_usuarios_email` (`email`),
  ADD KEY `idx_usuarios_activo` (`activo`),
  ADD KEY `idx_usuarios_rol` (`rol`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_movimientos`
--
ALTER TABLE `detalle_movimientos`
  ADD CONSTRAINT `fk_detalle_movimientos_movimiento` FOREIGN KEY (`movimiento_id`) REFERENCES `movimientos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_detalle_movimientos_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_precios`
--
ALTER TABLE `historial_precios`
  ADD CONSTRAINT `fk_historial_precios_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_historial_precios_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `fk_movimientos_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `fk_movimientos_proveedor` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`),
  ADD CONSTRAINT `fk_movimientos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
