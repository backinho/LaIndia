<?php

require_once BASE_PATH . '/config/database.php';

class CategoriaModel
{
    private $db;

    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    public function listarCategorias()
    {
        $stmt = $this->db->prepare("SELECT *, (SELECT COUNT(*) FROM productos WHERE productos.categoria_id = categorias.id) AS cantidad_productos FROM categorias WHERE activo = 1");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }

    public function guardarCategoria($nombre, $codigo, $descripcion)
    {
        $stmt = $this->db->prepare("INSERT INTO categorias (nombre, codigo, descripcion) VALUES (:nombre, :codigo, :descripcion)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':codigo', $codigo);
        $stmt->bindParam(':descripcion', $descripcion);
        return $stmt->execute();
    }

    public function actualizarCategoria($id, $nombre, $codigo, $descripcion)
    {
        $stmt = $this->db->prepare("UPDATE categorias SET nombre = :nombre, codigo = :codigo, descripcion = :descripcion WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':codigo', $codigo);
        $stmt->bindParam(':descripcion', $descripcion);
        return $stmt->execute();
    }

    public function eliminarCategoria($id)
    {
        $stmt = $this->db->prepare("UPDATE categorias SET activo = 0, deleted_at = NOW() WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
