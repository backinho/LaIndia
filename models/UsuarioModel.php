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

    public function actualizarDatos($id, $nombre, $email, $telefono)
    {
        $stmt = $this->db->prepare("UPDATE usuarios SET nombre = :nombre, email = :email, telefono = :telefono WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        return $stmt->execute();
    }

    public function actualizarCredenciales($id, $passwordActual, $nuevaPassword)
    {
        $stmt = $this->db->prepare("SELECT password FROM usuarios WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $response = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!password_verify($passwordActual, $response['password'])) {
            return false;
        }

        $nuevaPasswordHash = password_hash($nuevaPassword, PASSWORD_DEFAULT);

        $stmt = $this->db->prepare("UPDATE usuarios SET password = :password, last_password_change = NOW() WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':password', $nuevaPasswordHash);
        return $stmt->execute();
    }

    public function actualizarPatron($id, $patron, $password)
    {
        $stmt = $this->db->prepare("SELECT password FROM usuarios WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $response = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!password_verify($password, $response['password'])) {
            return false;
        }

        $patronHash = password_hash($patron, PASSWORD_DEFAULT);

        $stmt = $this->db->prepare("UPDATE usuarios SET token_recovery = :pattern, last_token_recovery = NOW() WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':pattern', $patronHash);
        return $stmt->execute();
    }
}
