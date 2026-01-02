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
        $stmt = $this->db->prepare("SELECT * FROM usuarios");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }
}
