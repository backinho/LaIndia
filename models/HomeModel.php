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

    // Verificar credenciales de usuario
    public function verificarCredenciales($email, $password)
    {
        $stmt = $this->db->prepare("
            SELECT p.idpersona, p.nombre, p.tipo_documento, p.nro_documento, 
                   c.password_hash, c.salt, tp.cargo
            FROM personas p
            JOIN contacto co ON p.idpersona = co.idpersona
            JOIN credenciales c ON p.idpersona = c.idpersona
            LEFT JOIN tipo_persona tp ON p.idpersona = tp.idpersona
            WHERE co.correo = :email AND p.condicion = 1
        ");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$usuario) {
            return false;
        }

        // Verificar contraseña
        $hashedPassword = hash('sha256', $password . $usuario['salt']);

        if ($hashedPassword === $usuario['password_hash']) {
            // Quitar datos sensibles antes de devolver
            unset($usuario['password_hash']);
            unset($usuario['salt']);
            return $usuario;
        }

        return false;
    }

    public function obtenerUsuarioPorEmail($email)
    {
        $stmt = $this->db->prepare("
        SELECT p.* 
        FROM personas p
        JOIN contacto co ON p.idpersona = co.idpersona
        WHERE co.correo = :email AND p.condicion = 1
    ");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Generar token de recuperación
    public function generarTokenRecuperacion($email)
    {
        // Verificar si el email existe
        $stmt = $this->db->prepare("
            SELECT p.idpersona 
            FROM personas p
            JOIN contacto co ON p.idpersona = co.idpersona
            WHERE co.correo = :email AND p.condicion = 1
        ");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$usuario) {
            return false;
        }

        // Generar token único
        $token = bin2hex(random_bytes(32));
        $expiracion = date('Y-m-d H:i:s', strtotime('+1 hour'));

        // Actualizar credenciales con el token
        $stmt = $this->db->prepare("
            UPDATE credenciales 
            SET reset_token = :token, 
                token_expira = :expiracion
            WHERE idpersona = :idpersona
        ");
        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':expiracion', $expiracion);
        $stmt->bindParam(':idpersona', $usuario['idpersona']);

        return $stmt->execute() ? $token : false;
    }

    // Verificar token de recuperación
    public function verificarTokenRecuperacion($token)
    {
        $stmt = $this->db->prepare("
            SELECT idpersona 
            FROM credenciales 
            WHERE reset_token = :token 
              AND token_expira > NOW()
        ");
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualizar contraseña
    public function actualizarPassword($idpersona, $nuevaPassword)
    {
        // Generar nuevo salt y hash
        $salt = bin2hex(random_bytes(32));
        $hashedPassword = hash('sha256', $nuevaPassword . $salt);

        $stmt = $this->db->prepare("
            UPDATE credenciales 
            SET password_hash = :password_hash,
                salt = :salt,
                reset_token = NULL,
                token_expira = NULL
            WHERE idpersona = :idpersona
        ");
        $stmt->bindParam(':password_hash', $hashedPassword);
        $stmt->bindParam(':salt', $salt);
        $stmt->bindParam(':idpersona', $idpersona);

        return $stmt->execute();
    }

    // Registrar intento fallido de login
    public function registrarIntentoFallido($email)
    {
        $stmt = $this->db->prepare("
            UPDATE credenciales c
            JOIN contacto co ON c.idpersona = co.idpersona
            SET c.intentos_fallidos = c.intentos_fallidos + 1,
                c.bloqueado_hasta = CASE 
                    WHEN c.intentos_fallidos >= 4 THEN DATE_ADD(NOW(), INTERVAL 30 MINUTE)
                    ELSE c.bloqueado_hasta
                END
            WHERE co.correo = :email
        ");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
    }

    // Verificar si la cuenta está bloqueada
    public function verificarCuentaBloqueada($email)
    {
        $stmt = $this->db->prepare("
            SELECT c.bloqueado_hasta 
            FROM credenciales c
            JOIN contacto co ON c.idpersona = co.idpersona
            WHERE co.correo = :email 
              AND c.bloqueado_hasta > NOW()
        ");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        return $resultado ? $resultado['bloqueado_hasta'] : false;
    }

    // Limpiar intentos fallidos después de login exitoso
    public function limpiarIntentosFallidos($email)
    {
        $stmt = $this->db->prepare("
            UPDATE credenciales c
            JOIN contacto co ON c.idpersona = co.idpersona
            SET c.intentos_fallidos = 0,
                c.bloqueado_hasta = NULL
            WHERE co.correo = :email
        ");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
    }
}
