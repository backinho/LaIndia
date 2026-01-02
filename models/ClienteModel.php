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
        $stmt = $this->db->prepare("SELECT * FROM clientes");
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response;
    }
}
