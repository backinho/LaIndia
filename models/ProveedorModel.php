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
        $stmt = $this->db->prepare("SELECT * FROM proveedores");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }
}
