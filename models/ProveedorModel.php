<?php

require_once BASE_PATH . '/config/database.php';

class ProveedorModel
{
    private $db;

    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    public function listarProveedores()
    {
        $stmt = $this->db->prepare("SELECT * FROM proveedores WHERE activo = 1");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }

    public function guardarProveedor($nombre, $contacto, $email, $telefono, $direccion, $notas)
    {
        $stmt = $this->db->prepare("INSERT INTO proveedores (nombre, contacto, email, telefono, direccion, notas) VALUES (:nombre, :contacto, :email, :telefono, :direccion, :notas)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':contacto', $contacto);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':notas', $notas);
        return $stmt->execute();
    }

    public function actualizarProveedor($id, $nombre, $contacto, $email, $telefono, $direccion, $notas)
    {
        $stmt = $this->db->prepare("UPDATE proveedores SET nombre = :nombre, contacto = :contacto, email = :email, telefono = :telefono, direccion = :direccion, notas = :notas WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':contacto', $contacto);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':notas', $notas);
        return $stmt->execute();
    }

    public function eliminarProveedor($id)
    {
        $stmt = $this->db->prepare("DELETE FROM proveedores WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
