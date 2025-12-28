<!doctype html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sistema de Inventario</title>
  <link rel="stylesheet" href="/LaIndia/public/assets/css/dashboard.css" />
  <meta property="og:image" content="https://bolt.new/static/og_default.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://bolt.new/static/og_default.png">
</head>

<body>
  <div class="dashboard-container">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h2 class="logo">Inventario</h2>
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">
          <span class="hamburger"></span>
        </button>
      </div>

      <nav class="sidebar-nav">
        <a href="#" class="nav-item active" data-section="resumen">
          <span class="nav-icon">📊</span>
          <span class="nav-text">Resumen</span>
        </a>
        <a href="#" class="nav-item" data-section="inventario">
          <span class="nav-icon">📦</span>
          <span class="nav-text">Inventario de Productos</span>
        </a>
        <a href="#" class="nav-item" data-section="categorias">
          <span class="nav-icon">🏷️</span>
          <span class="nav-text">Gestión de Categorías</span>
        </a>
        <a href="#" class="nav-item" data-section="entrada">
          <span class="nav-icon">📥</span>
          <span class="nav-text">Entrada de Productos</span>
        </a>
        <a href="#" class="nav-item" data-section="salida">
          <span class="nav-icon">📤</span>
          <span class="nav-text">Salida de Productos</span>
        </a>
        <a href="#" class="nav-item" data-section="historial">
          <span class="nav-icon">📋</span>
          <span class="nav-text">Historial de Movimientos</span>
        </a>
        <a href="#" class="nav-item" data-section="proveedores">
          <span class="nav-icon">🏭</span>
          <span class="nav-text">Gestión de Proveedores</span>
        </a>
        <a href="#" class="nav-item" data-section="clientes">
          <span class="nav-icon">👨‍💼</span>
          <span class="nav-text">Manejo de Clientes</span>
        </a>
        <a href="#" class="nav-item" data-section="usuarios">
          <span class="nav-icon">👥</span>
          <span class="nav-text">Manejo de Usuarios</span>
        </a>
        <a href="#" class="nav-item" data-section="perfil">
          <span class="nav-icon">👤</span>
          <span class="nav-text">Mi Perfil</span>
        </a>
      </nav>
    </aside>

    <main class="main-content">
      <header class="top-header">
        <div class="header-left">
          <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
            <span class="hamburger"></span>
          </button>
          <h1 id="section-title">Resumen</h1>
        </div>

        <div class="header-right">
          <button id="theme-toggle" class="theme-toggle" aria-label="Cambiar tema">
            <span class="sun-icon">☀️</span>
            <span class="moon-icon">🌙</span>
          </button>

          <div class="user-menu">
            <button class="user-button" id="user-button">
              <span class="user-avatar" id="user-avatar">U</span>
              <span class="user-name" id="user-name-display">Usuario</span>
            </button>
            <div class="user-dropdown" id="user-dropdown">
              <a href="#" class="dropdown-item" data-section="perfil">Mi Perfil</a>
              <a href="#" class="dropdown-item" id="logout">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </header>

      <div class="content-area">
        <section id="resumen" class="dashboard-section active">
          <?php include 'components/resumen.php'; ?>
        </section>

        <section id="inventario" class="dashboard-section">
          <?php include 'components/inventario.php'; ?>
        </section>

        <section id="categorias" class="dashboard-section">
          <?php include 'components/categorias.php'; ?>
        </section>

        <section id="entrada" class="dashboard-section">
          <?php include 'components/entrada.php'; ?>
        </section>

        <section id="salida" class="dashboard-section">
          <?php include 'components/salida.php'; ?>
        </section>

        <section id="historial" class="dashboard-section">
          <?php include 'components/historial.php'; ?>
        </section>

        <section id="proveedores" class="dashboard-section">
          <?php include 'components/proveedores.php'; ?>
        </section>

        <section id="clientes" class="dashboard-section">
          <?php include 'components/clientes.php'; ?>
        </section>

        <section id="usuarios" class="dashboard-section">
          <?php include 'components/usuarios.php'; ?>
        </section>

        <section id="perfil" class="dashboard-section">
          <?php include 'components/perfil.php'; ?>
        </section>
      </div>
    </main>
  </div>

  <div class="modal" id="user-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modal-title">Añadir Usuario</h3>
        <button class="modal-close" id="modal-close">&times;</button>
      </div>
      <form id="user-form">
        <div class="form-group">
          <label>Nombre Completo</label>
          <input type="text" id="user-nombre" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="user-email" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Rol</label>
          <select id="user-rol" class="form-input" required>
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" id="user-password" class="form-input" required />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" id="modal-cancel">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>

  <div class="modal" id="cliente-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="cliente-modal-title">Añadir Cliente</h3>
        <button class="modal-close" id="cliente-modal-close">&times;</button>
      </div>
      <form id="cliente-form">
        <div class="form-group">
          <label>Nombre Completo</label>
          <input type="text" id="cliente-nombre" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="cliente-email" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input type="tel" id="cliente-telefono" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Dirección</label>
          <textarea id="cliente-direccion" class="form-input" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label>Notas (opcional)</label>
          <textarea id="cliente-notas" class="form-input" rows="2"></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" id="cliente-modal-cancel">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>

  <div class="modal" id="producto-detalle-modal">
    <div class="modal-content modal-large">
      <div class="modal-header">
        <h3 id="producto-detalle-titulo">Detalles del Producto</h3>
        <button class="modal-close" id="producto-detalle-close">&times;</button>
      </div>
      <div class="producto-detalle-content" id="producto-detalle-content"></div>
    </div>
  </div>

  <div class="modal" id="categoria-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="categoria-modal-title">Añadir Categoría</h3>
        <button class="modal-close" id="categoria-modal-close">&times;</button>
      </div>
      <form id="categoria-form">
        <div class="form-group">
          <label>Nombre de la Categoría</label>
          <input type="text" id="categoria-nombre" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea id="categoria-descripcion" class="form-input" rows="3" required></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" id="categoria-modal-cancel">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>

  <div class="modal" id="proveedor-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="proveedor-modal-title">Añadir Proveedor</h3>
        <button class="modal-close" id="proveedor-modal-close">&times;</button>
      </div>
      <form id="proveedor-form">
        <div class="form-group">
          <label>Nombre del Proveedor</label>
          <input type="text" id="proveedor-nombre" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Persona de Contacto</label>
          <input type="text" id="proveedor-contacto" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="proveedor-email" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input type="tel" id="proveedor-telefono" class="form-input" required />
        </div>
        <div class="form-group">
          <label>Dirección</label>
          <textarea id="proveedor-direccion" class="form-input" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label>Notas (opcional)</label>
          <textarea id="proveedor-notas" class="form-input" rows="2"></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" id="proveedor-modal-cancel">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>

  <div class="notification" id="notification"></div>

  <script type="module" src="/LaIndia/public/assets/js/dashboard.js"></script>
</body>

</html>