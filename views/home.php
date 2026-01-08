<!doctype html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/LaIndia/public/assets/css/home.css" />
  <title>Sistema de Login</title>
</head>

<body>
  <!-- Botón de cambio de tema -->
  <button id="theme-toggle" class="theme-toggle" aria-label="Cambiar tema">
    <span class="sun-icon">☀️</span>
    <span class="moon-icon">🌙</span>
  </button>

  <div class="container">
    <!-- Formulario de Login -->
    <div id="login-form" class="form-container active">
      <h1>Iniciar Sesión</h1>
      <form id="login">
        <div class="input-group">
          <label for="login-email">Correo Electrónico</label>
          <input type="email" name="login-email" id="login-email" required autocomplete="email" />
        </div>
        <div class="input-group">
          <label for="login-password">Contraseña</label>
          <input type="password" name="login-password" id="login-password" required autocomplete="current-password" />
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        <div class="links">
          <a href="#" id="show-recovery">¿Olvidaste tu contraseña?</a>
        </div>
      </form>
    </div>

    <!-- Formulario de Recuperación de Contraseña -->
    <div id="recovery-form" class="form-container">
      <h1>Recuperar Contraseña</h1>

      <!-- Paso 1: Verificar email -->
      <form id="recovery-step1" class="recovery-step active">
        <div class="input-group">
          <label for="recovery-email">Correo Electrónico</label>
          <input type="email" id="recovery-email" required autocomplete="email" />
        </div>
        <button type="submit" class="btn btn-primary">Continuar</button>
        <div class="links">
          <a href="#" id="back-to-login-2">Volver al inicio de sesión</a>
        </div>
      </form>

      <!-- Paso 2: Responder pregunta de seguridad -->
      <form id="recovery-step2" class="recovery-step">
        <p id="recovery-question-display" class="question-display"></p>
        <div class="input-group">
          <label for="recovery-answer">Tu Respuesta</label>
          <input type="text" id="recovery-answer" required autocomplete="off" />
        </div>
        <button type="submit" class="btn btn-primary">Verificar</button>
        <div class="links">
          <a href="#" id="back-to-recovery-1">Atrás</a>
        </div>
      </form>

      <!-- Paso 3: Nueva contraseña -->
      <form id="recovery-step3" class="recovery-step">
        <div class="input-group">
          <label for="new-password">Nueva Contraseña</label>
          <input type="password" id="new-password" required autocomplete="new-password" />
        </div>
        <div class="input-group">
          <label for="confirm-new-password">Confirmar Nueva Contraseña</label>
          <input type="password" id="confirm-new-password" required autocomplete="new-password" />
        </div>
        <button type="submit" class="btn btn-primary">Restablecer Contraseña</button>
      </form>
    </div>

    <!-- Dashboard (después del login) -->
    <div id="dashboard" class="form-container">
      <h1>¡Bienvenido!</h1>
      <p id="user-email-display" class="user-info"></p>
      <button id="logout-btn" class="btn btn-secondary">Cerrar Sesión</button>
    </div>

    <!-- Mensajes de notificación -->
    <div id="notification" class="notification"></div>
  </div>

  <script type="module" src="/LaIndia/public/assets/js/home.js"></script>
</body>

</html>