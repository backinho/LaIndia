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

];