<?php

require_once BASE_PATH . '/config/database.php';

class UsuarioModel
{
    private $db;

    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    public function listarUsuarios()
    {
        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE activo = 1");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }

    public function listarUsuarioActivo($id)
    {
        $stmt = $this->db->prepare("SELECT nombre, email, telefono, created_at, updated_at, last_password_change, last_token_recovery FROM usuarios WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $response = $stmt->fetch(PDO::FETCH_ASSOC);
        return $response;
    }

    public function guardarUsuario($nombre, $email, $telefono, $passwordHash, $rol)
    {
        $stmt = $this->db->prepare("INSERT INTO usuarios (nombre, email, telefono, password, rol) VALUES (:nombre, :email, :telefono, :password, :rol)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':password', $passwordHash);
        $stmt->bindParam(':rol', $rol);
        return $stmt->execute();
    }

    public function actualizarUsuario($id, $nombre, $email, $telefono, $rol)
    {
        $stmt = $this->db->prepare("UPDATE usuarios SET nombre = :nombre, email = :email, telefono = :telefono, rol = :rol WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':rol', $rol);
        return $stmt->execute();
    }

    public function eliminarUsuario($id)
    {
        $stmt = $this->db->prepare("UPDATE usuarios SET activo = 0, deleted_at = NOW() WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
