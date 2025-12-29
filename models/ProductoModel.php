<?php

require_once BASE_PATH . '/config/database.php';

class ProductoModel
{
    private $db;

    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    public function listarProductos()
    {
        $stmt = $this->db->prepare("SELECT * FROM productos");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }
}
