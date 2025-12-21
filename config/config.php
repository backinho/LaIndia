<?php
// Configuración de URLs

// Ruta base del proyeco
define('BASE_URL', '/LaIndia');

// Ruta base del proyecto en el sistema de archivos
define('PUBLIC_PATH', BASE_URL . '/public');

// Ruta base de estilos
define('CSS_PATH', PUBLIC_PATH . '/css');

// Ruta base de scripts
define('JS_PATH', PUBLIC_PATH . '/js');

//ip de la pc servidor base de datos
define("DB_HOST", "localhost");

// nombre de la base de datos
define("DB_NAME", "laindiadb");

//nombre de usuario de base de datos
define("DB_USERNAME", "root");

//conraseña del usuario de base de datos
define("DB_PASSWORD", "");

//codificacion de caracteres
define("DB_ENCODE", "utf8");

// Detectar y establecer la zona horaria del sistema
date_default_timezone_set(date_default_timezone_get());

// Si quieres ver cuál es la zona horaria detectada:
define('TIMEZONE', date_default_timezone_get());