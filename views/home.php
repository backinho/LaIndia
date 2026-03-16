<!doctype html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/LaIndia/public/assets/img/fortextil.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/LaIndia/public/assets/css/home.css" />
  <title>FORTEXTIL</title>
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
      <div class="logo-container">
        <img src="/LaIndia/public/assets/img/fortextil.png" alt="FORTEXTIL Logo" class="logo" />
      </div>
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
      <div class="logo-container">
        <img src="/LaIndia/public/assets/img/fortextil.png" alt="FORTEXTIL Logo" class="logo" />
      </div>
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

      <!-- Paso 3: Nueva contraseña -->
      <form id="recovery-step2" class="recovery-step">
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

    <div class="modal" id="selection-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Selecciona una método de recuperación</h3>
          <button class="modal-close" id="selection-close">&times;</button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 20px;">
          <p>¿Cómo prefieres recuperar tu contraseña?</p>
          <button class="btn btn-primary" id="question-recovery-btn">Recuperar por pregunta de seguridad</button>
          <button class="btn btn-primary" id="pattern-recovery-btn">Recuperar por patrón de seguridad</button>
        </div>
      </div>
    </div>

    <div class="modal" id="question-modal">
      <div class="modal-content" style="padding: 20px;">
        <div class="modal-header">
          <h3>Pregunta de Seguridad</h3>
          <button class="modal-close" id="question-close">&times;</button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; margin-top: 20px; gap: 20px;">
          <p id="security-question">Escriba su respuesta de seguridad</p>
          <div class="input-group">
            <label for="security-answer">Respuesta</label>
            <input type="password" id="security-answer" required />
          </div>
          <button class="btn btn-primary" id="verify-question-btn">Verificar Respuesta</button>
        </div>
      </div>
    </div>

    <div class="modal" id="pattern-modal">
      <div class="modal-content" style="padding: 20px;">
        <div class="modal-header">
          <h3 id="pattern-titulo">Patrón de Seguridad</h3>
          <button class="modal-close" id="pattern-close">&times;</button>
        </div>
        <div class="pattern-container">
          <div class="pattern-grid" id="patternGrid">
            <!-- Los puntos se generan con JavaScript -->
          </div>

          <div class="controls" style="display: flex; width: 100%; gap: 10px; padding: 0px 34px;">
            <button class="btn btn-primary" id="clear-pattern-btn" style="flex: 1; min-width: 0; white-space: nowrap; text-align: center;">
              <i class="fas fa-undo"></i> Limpiar
            </button>
            <button class="btn btn-primary" id="verify-pattern-btn" style="flex: 1; min-width: 0; white-space: nowrap; text-align: center;">
              <i class="fas fa-check"></i> Verificar Patrón
            </button>
          </div>
        </div>
        <div class="password-note">
          <strong>Nota:</strong> Ingrese su patron de seguridad para poder recuperar su contraseña.
        </div>
      </div>
    </div>

    <!-- Mensajes de notificación -->
    <div id="notification" class="notification"></div>
  </div>

  <script type="module" src="/LaIndia/public/assets/js/home.js"></script>
</body>

</html>