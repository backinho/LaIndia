<?php

require_once BASE_PATH . '/config/database.php';

class DashboardModel {
    private $db;

    public function __construct() {
        global $pdo;
        $this->db = $pdo;
    }   
}