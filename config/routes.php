<?php

$routes = [
    // Rutas principales
    '/' => 'HomeController@index',
    '/home' => 'HomeController@index',
    '/dashboard' => 'DashboardController@index',
    '/login' => 'HomeController@login',
    '/logout' => 'HomeController@logout',
    '/reset' => 'HomeController@resetPassword',
    '/solicitar-recuperacion' => 'HomeController@solicitarRecuperacion',
    '/recuperar-contrasena' => 'HomeController@mostrarFormularioRecuperacion',
    '/restablecer-password' => 'HomeController@restablecerPassword',
    '/productos/listar' => 'ProductoController@listar',
    '/categorias/listar' => 'CategoriaController@listar',
    '/categorias/guardar' => 'CategoriaController@guardar',
    '/categorias/actualizar' => 'CategoriaController@actualizar',
    '/categorias/eliminar' => 'CategoriaController@eliminar',
    '/proveedores/listar' => 'ProveedorController@listar',
    '/clientes/listar' => 'ClienteController@listar',
    '/usuarios/listar' => 'UsuarioController@listar',
];
