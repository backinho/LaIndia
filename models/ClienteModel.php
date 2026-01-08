<?php

require_once BASE_PATH . '/config/database.php';

class ClienteModel
{
    private $db;

    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    public function listarClientes()
    {
        $stmt = $this->db->prepare("SELECT * FROM clientes WHERE activo = 1");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }

    public function guardarCliente($nombre, $email, $telefono, $direccion, $notas)
    {
        $stmt = $this->db->prepare("INSERT INTO clientes (nombre, email, telefono, direccion, notas) VALUES (:nombre, :email, :telefono, :direccion, :notas)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':notas', $notas);
        return $stmt->execute();
    }

    public function actualizarCliente($id, $nombre, $email, $telefono, $direccion, $notas)
    {
        $stmt = $this->db->prepare("UPDATE clientes SET nombre = :nombre, email = :email, telefono = :telefono, direccion = :direccion, notas = :notas WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':notas', $notas);
        return $stmt->execute();
    }

    public function eliminarCliente($id)
    {
        $stmt = $this->db->prepare("UPDATE clientes SET activo = 0, deleted_at = NOW() WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
