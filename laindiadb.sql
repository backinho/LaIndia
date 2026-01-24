-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-01-2026 a las 00:25:25
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

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `codigo`, `descripcion`, `activo`, `fecha_registro`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_at`, `deleted_by`) VALUES
('80a924bb-edbe-11f0-91b0-f44d30ee4ee3', 'Cosmeticos', 'CTC', 'Productos de belleza', 1, '2026-01-10 00:51:30', '2026-01-10 00:51:30', '2026-01-16 00:23:07', NULL, NULL, NULL, NULL),
('88ba2a3d-e76c-11f0-9f90-f44d30ee4ee3', 'Deportivos', 'DPT', 'Productos para realizar actividades deportivas', 1, '2026-01-01 23:49:38', '2026-01-01 23:49:38', '2026-01-01 23:49:38', NULL, NULL, NULL, NULL),
('cat-001', 'Electrónica', 'ELT', 'Dispositivos electrónicos y accesorios', 1, '2025-12-28 17:20:14', '2025-12-28 17:20:14', '2026-01-01 21:52:50', NULL, NULL, NULL, NULL),
('cat-002', 'Oficina', 'OFC', 'Artículos de oficina y papelería', 1, '2025-12-28 17:20:14', '2025-12-28 17:20:14', '2026-01-01 21:52:30', NULL, NULL, NULL, NULL),
('cat-003', 'Limpieza', 'LPZ', 'Productos de limpieza y aseo', 1, '2025-12-28 17:20:14', '2025-12-28 17:20:14', '2026-01-01 21:52:39', NULL, NULL, NULL, NULL),
('cat-004', 'Alimentos', 'AMT', 'Productos alimenticios y bebidas', 1, '2025-12-28 17:20:14', '2025-12-28 17:20:14', '2026-01-01 21:52:55', NULL, NULL, NULL, NULL);

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
-- Volcado de datos para la tabla `detalle_movimientos`
--

INSERT INTO `detalle_movimientos` (`id`, `movimiento_id`, `producto_id`, `producto_codigo`, `cantidad`, `precio_unitario`, `motivo`, `notas`, `created_at`) VALUES
('10cb7bec-3493-4a9a-bda7-5523a0db9173', '6a5e7485-debe-434d-9d76-5f09b1d7fe28', '850b1dad-d426-4567-96af-ec473b73c2ae', 'LPZ-001', 1, 120.00, 'Uso interno', '', '2026-01-10 17:46:02'),
('25634cb7-dac5-4c69-a9e5-dbfaeaf17b21', 'fb4682b9-bbc9-4df3-95f2-371100d6c8f1', '16fdf3db-babf-429f-9c18-9c48b7a512d8', 'OFC-001', 20, 320.00, 'entrada', '', '2026-01-10 03:41:56'),
('4389de79-64e0-4635-96a8-34fe85f47473', 'b39ec916-79d4-4700-99f4-41f8f77af291', 'prod-002', 'MON-001', 2, 6400.00, 'entrada', '', '2026-01-10 17:44:59'),
('4d642c16-bf5e-48ea-8b0a-35f8bd763be2', '0f9f76fd-1b3f-4a6e-a2ce-2daca3a20146', 'prod-002', 'MON-001', 3, 3500.00, 'Venta', '', '2026-01-06 18:46:34'),
('53d87cf9-b336-4edc-9d3e-b8ee16ddef5c', 'b39ec916-79d4-4700-99f4-41f8f77af291', '850b1dad-d426-4567-96af-ec473b73c2ae', 'LPZ-001', 10, 120.00, 'entrada', '', '2026-01-10 17:45:00'),
('5b75e2fb-2407-4096-b369-026d371c5d10', '598f66b8-9caf-420b-8277-ee8b195aab4c', '7fe5d7ec-b099-42e0-ac65-030320ff9d75', 'ELE-005', 15, 14200.00, 'entrada', '', '2026-01-16 00:24:28'),
('5dbce073-c3f4-4c33-8bba-fe81fcd109b1', 'e54cfd98-62e5-44a6-9692-6e1812e9859d', 'prod-003', 'LAP-002', 5, 3200.00, 'entrada', '', '2026-01-06 18:22:33'),
('6086a4fa-71ab-4d23-be4e-9e6f1f2b3f80', '751be889-594f-48e3-9292-b92242df8629', 'prod-003', 'LAP-002', 5, 3200.00, 'Venta', '', '2026-01-10 03:42:37'),
('6418875e-a597-4ea2-aa7f-069e93f27b26', '751be889-594f-48e3-9292-b92242df8629', 'prod-005', 'LIM-001', 5, 100.00, 'Uso interno', '', '2026-01-10 03:42:37'),
('82fcb5ad-bd77-4269-9ba8-735003effc0b', 'e54cfd98-62e5-44a6-9692-6e1812e9859d', '2bbafcde-19e7-4dfe-951a-b4e2c364761f', 'ELE', 10, 8900.00, 'entrada', '', '2026-01-06 18:22:33'),
('a4a0279a-ab8f-42fd-837e-35ef9be1801d', '58278157-7cca-45b8-8910-f81dcee11cdf', '2bbafcde-19e7-4dfe-951a-b4e2c364761f', 'ELE', 2, 8900.00, 'entrada', '', '2026-01-06 18:43:07'),
('a66a02a8-9720-4281-9864-eace5b921e4e', '6a5e7485-debe-434d-9d76-5f09b1d7fe28', 'prod-002', 'MON-001', 3, 6400.00, 'Venta', '', '2026-01-10 17:46:02'),
('b3365e88-0534-4402-abe6-b243154e3dbd', 'fb4682b9-bbc9-4df3-95f2-371100d6c8f1', 'prod-001', 'LAP-001', 5, 12800.00, 'entrada', '', '2026-01-10 03:41:56'),
('b69bf89f-fa77-454b-a59e-f08eb7d651a9', '598f66b8-9caf-420b-8277-ee8b195aab4c', '2bbafcde-19e7-4dfe-951a-b4e2c364761f', 'ELE', 5, 8900.00, 'entrada', '', '2026-01-16 00:24:28'),
('d0b013aa-ef3f-4e7e-910e-5c55ceef5576', 'ae81f457-0fe8-4d9f-986d-0927a40df049', 'prod-002', 'MON-001', 3, 3500.00, 'entrada', '', '2026-01-06 18:42:42'),
('fa58726a-4dfd-4267-aa6a-cfd6b3e4f30a', '9b291128-6fd4-4d7c-b1d1-743c6b9bccbe', 'prod-002', 'MON-001', 3, 3400.00, 'Venta', '', '2026-01-06 18:40:50');

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

--
-- Volcado de datos para la tabla `historial_precios`
--

INSERT INTO `historial_precios` (`id`, `producto_id`, `precio_anterior`, `precio_nuevo`, `fecha_cambio`, `usuario_id`, `motivo`) VALUES
('0a8dd724-0d94-45e2-991a-f9ffd54b7f58', 'prod-002', 3400.00, 3500.00, '2026-01-06 18:42:41', NULL, 'Actualización por entrada de productos'),
('0d96919f-a2be-48eb-8c9e-056fcda19b42', 'prod-001', 12850.00, 12800.00, '2026-01-10 03:41:56', NULL, 'Actualización por entrada de productos'),
('15b93642-ee4c-11f0-bf31-f44d30ee4ee3', 'prod-002', 3500.00, 6400.00, '2026-01-10 17:44:59', NULL, NULL),
('4f857391-edd6-11f0-9303-f44d30ee4ee3', 'prod-001', 12850.00, 12800.00, '2026-01-10 03:41:56', NULL, NULL),
('55be4da4-af0d-4850-8a00-1c808034316c', 'prod-002', 3500.00, 6400.00, '2026-01-10 17:44:59', NULL, 'Actualización por entrada de productos'),
('766e6ff2-374c-4b27-93f9-57dfc4b9215d', 'prod-003', 2400.00, 3200.00, '2026-01-06 18:22:33', NULL, 'Actualización por entrada de productos'),
('7ba27c5e-eb2f-11f0-a48c-f44d30ee4ee3', 'prod-002', 3400.00, 3500.00, '2026-01-06 18:42:41', NULL, NULL),
('ab9e2fad-eb2c-11f0-a48c-f44d30ee4ee3', 'prod-003', 2400.00, 3200.00, '2026-01-06 18:22:33', NULL, NULL),
('cb9e146e-baad-43bf-a460-cfec23fdbda7', 'prod-005', 85.00, 100.00, '2026-01-10 01:01:26', NULL, 'Actualización por entrada de productos'),
('e3fe2bf6-edbf-11f0-91b0-f44d30ee4ee3', 'prod-005', 85.00, 100.00, '2026-01-10 01:01:26', NULL, NULL);

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

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`id`, `tipo`, `usuario_id`, `cliente_id`, `proveedor_id`, `cantidad_total`, `fecha`, `detalles`, `created_at`) VALUES
('0f9f76fd-1b3f-4a6e-a2ce-2daca3a20146', 'salida', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', 'cli-001', NULL, 3, '2026-01-06 18:46:34', 'Salida de productos registrada', '2026-01-06 18:46:34'),
('58278157-7cca-45b8-8910-f81dcee11cdf', 'entrada', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', NULL, 'prov-001', 2, '2026-01-06 18:43:07', 'Entrada de productos registrada', '2026-01-06 18:43:07'),
('598f66b8-9caf-420b-8277-ee8b195aab4c', 'entrada', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', NULL, 'prov-001', 20, '2026-01-16 00:24:28', 'Entrada de productos registrada', '2026-01-16 00:24:28'),
('6a5e7485-debe-434d-9d76-5f09b1d7fe28', 'salida', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', 'cli-001', NULL, 4, '2026-01-10 17:46:01', 'Salida de productos registrada', '2026-01-10 17:46:01'),
('751be889-594f-48e3-9292-b92242df8629', 'salida', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', 'cli-001', NULL, 10, '2026-01-10 03:42:37', 'Salida de productos registrada', '2026-01-10 03:42:37'),
('9b291128-6fd4-4d7c-b1d1-743c6b9bccbe', 'salida', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', 'cli-001', NULL, 3, '2026-01-06 18:40:49', 'Salida de productos registrada', '2026-01-06 18:40:49'),
('ae81f457-0fe8-4d9f-986d-0927a40df049', 'entrada', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', NULL, 'prov-001', 3, '2026-01-06 18:42:41', 'Entrada de productos registrada', '2026-01-06 18:42:41'),
('b39ec916-79d4-4700-99f4-41f8f77af291', 'entrada', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', NULL, 'prov-001', 12, '2026-01-10 17:44:59', 'Entrada de productos registrada', '2026-01-10 17:44:59'),
('e54cfd98-62e5-44a6-9692-6e1812e9859d', 'entrada', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', NULL, 'prov-001', 15, '2026-01-06 18:22:33', 'Entrada de productos registrada', '2026-01-06 18:22:33'),
('fb4682b9-bbc9-4df3-95f2-371100d6c8f1', 'entrada', '1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', NULL, 'prov-001', 25, '2026-01-10 03:41:56', 'Entrada de productos registrada', '2026-01-10 03:41:56');

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
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `codigo`, `nombre`, `categoria_id`, `stock`, `precio`, `descripcion`, `activo`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_at`, `deleted_by`) VALUES
('16fdf3db-babf-429f-9c18-9c48b7a512d8', 'OFC-001', 'Grapadora', 'cat-002', 20, 320.00, '', 1, '2026-01-10 03:41:56', '2026-01-10 03:41:56', NULL, NULL, NULL, NULL),
('2bbafcde-19e7-4dfe-951a-b4e2c364761f', 'ELE', 'Teléfono Samsung A35', 'cat-001', 35, 8900.00, '', 1, '2026-01-06 18:22:33', '2026-01-16 00:24:28', NULL, NULL, NULL, NULL),
('7fe5d7ec-b099-42e0-ac65-030320ff9d75', 'ELE-005', 'Televisor TLC 40\'', 'cat-001', 15, 14200.00, '', 1, '2026-01-16 00:24:28', '2026-01-16 00:24:28', NULL, NULL, NULL, NULL),
('850b1dad-d426-4567-96af-ec473b73c2ae', 'LPZ-001', 'Detergente industrial', 'cat-003', 9, 120.00, '', 1, '2026-01-10 17:45:00', '2026-01-10 17:46:02', NULL, NULL, NULL, NULL),
('prod-001', 'LAP-001', 'Laptop HP 15\"', 'cat-001', 40, 12800.00, 'Laptop HP con 8GB RAM, 512GB SSD', 1, '2025-12-28 17:20:14', '2026-01-10 03:41:56', NULL, NULL, NULL, NULL),
('prod-002', 'MON-001', 'Monitor 24\"', 'cat-001', 8, 6400.00, 'Monitor LED Full HD 24 pulgadas', 1, '2025-12-28 17:20:14', '2026-01-10 17:46:02', NULL, NULL, NULL, NULL),
('prod-003', 'LAP-002', 'Mouse inalámbrico', 'cat-001', 45, 3200.00, 'Mouse óptico inalámbrico', 1, '2025-12-28 17:20:14', '2026-01-10 03:42:37', NULL, NULL, NULL, NULL),
('prod-004', 'OFI-001', 'Resma papel', 'cat-002', 50, 120.00, 'Resma de papel bond A4 500 hojas', 1, '2025-12-28 17:20:14', '2025-12-28 17:20:14', NULL, NULL, NULL, NULL),
('prod-005', 'LIM-001', 'Jabón líquido', 'cat-003', 35, 100.00, 'Jabón líquido para manos 500ml', 1, '2025-12-28 17:20:14', '2026-01-10 03:42:37', NULL, NULL, NULL, NULL);

--
-- Disparadores `productos`
--
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
  `locked_until` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `password`, `rol`, `activo`, `fecha_registro`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_at`, `deleted_by`, `token_recovery`, `last_token_recovery`, `last_password_change`, `failed_attempts`, `locked_until`) VALUES
('1bb403bd-eb11-11f0-a48c-f44d30ee4ee3', 'Administrador', 'administrador@example.com', '04121234567', '$2y$10$94Rd/NZ4ROtf4T3Q0Fc9xeYaG9iOm.JfZOCmcL8lUsyMev89yWsqq', 'admin', 1, '2026-01-06 15:05:16', '2026-01-06 15:05:16', '2026-01-10 18:28:07', NULL, NULL, NULL, NULL, '$2y$10$fu9f6M65mdh3VYliDyLHZeK.QRZMMUq2TTx/1uK4aysH.CrU1ySf2', '2026-01-09 06:56:36', '2026-01-10 18:28:07', 0, NULL),
('ff9dd9c5-eb13-11f0-a48c-f44d30ee4ee3', 'usuario', 'usuario@example.com', '04127654321', '$2y$10$wP1xRkecX0U6ldVD.LXad.BgZNLcR9a7MCry2F1VGbHyL/1wqHJi2', 'usuario', 1, '2026-01-06 15:25:57', '2026-01-06 15:25:57', '2026-01-08 00:43:20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);

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
