<?php
// Mostrar errores durante el desarrollo
session_start();
error_reporting(0);
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php-error.log');

// Definir constantes de rutas
define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', BASE_PATH . '/app');
define('APP_NAME', 'LaIndia');

// Cargar el archivo de rutas
require_once BASE_PATH . '/config/routes.php';
require_once BASE_PATH . '/config/config.php';

// Obtener la ruta actual
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = substr($uri, strlen('/LaIndia/'));
$uri = '/' . trim($uri, '/');

// Verificar si la ruta existe
if (isset($routes[$uri])) {
    $firstRoute = explode('/', trim($uri, '/'))[0];
    $secondRoute = explode('/', trim($uri, '/'))[1] ?? null;
    define('CURRENT_ROUTE', '/' . $firstRoute);
    define('CURRENT_SECTION', '/' . $secondRoute);
    define('CURRENT_PAGE', $uri);
    list($controller, $method) = explode('@', $routes[$uri]);
    $controllerFile = BASE_PATH . '/controllers/' . $controller . '.php';
    
    if (file_exists($controllerFile)) {
        require_once $controllerFile;
        $controllerInstance = new $controller();
        $controllerInstance->$method();
    } else {
        echo "Controlador no encontrado";
    }
} else {
    echo "Ruta no encontrada";
}