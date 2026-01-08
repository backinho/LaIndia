<?php

require_once BASE_PATH . '/config/database.php';

class HomeModel
{
    private $db;

    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    public function listarUsuarios($email)
    {
        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE email = :email AND activo = 1");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $response = $stmt->fetch(PDO::FETCH_ASSOC);
        return $response;
    }
}
