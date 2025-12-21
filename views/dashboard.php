<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema de Inventario</title>
    <link rel="stylesheet" href="/LaIndia/public/assets/css/dashboard.css" />
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
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon" style="background: rgba(74, 144, 226, 0.2); color: #4a90e2;">📦</div>
                <div class="stat-details">
                  <h3 class="stat-number" id="total-productos">0</h3>
                  <p class="stat-label">Total Productos</p>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon" style="background: rgba(39, 174, 96, 0.2); color: #27ae60;">📈</div>
                <div class="stat-details">
                  <h3 class="stat-number" id="total-entradas">0</h3>
                  <p class="stat-label">Total Entradas</p>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon" style="background: rgba(231, 76, 60, 0.2); color: #e74c3c;">📉</div>
                <div class="stat-details">
                  <h3 class="stat-number" id="total-salidas">0</h3>
                  <p class="stat-label">Total Salidas</p>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon" style="background: rgba(243, 156, 18, 0.2); color: #f39c12;">💰</div>
                <div class="stat-details">
                  <h3 class="stat-number" id="valor-inventario">$0</h3>
                  <p class="stat-label">Valor Inventario</p>
                </div>
              </div>
            </div>

            <div class="charts-grid">
              <div class="table-card">
                <h3 class="card-title">Productos con Stock Bajo</h3>
                <div class="table-container">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Código</th>
                        <th>Stock</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody id="stock-bajo-table"></tbody>
                  </table>
                </div>
              </div>

              <div class="table-card">
                <h3 class="card-title">Últimos Movimientos</h3>
                <div class="table-container">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody id="ultimos-movimientos-table"></tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="chart-card" style="margin-top: 24px;">
              <h3 class="card-title">Actividad Semanal</h3>
              <div class="chart-stats">
                <div class="chart-stat">
                  <div class="chart-stat-label">
                    <span class="chart-dot entrada"></span>
                    Entradas
                  </div>
                  <div class="chart-stat-value" id="entradas-semana">0</div>
                </div>
                <div class="chart-stat">
                  <div class="chart-stat-label">
                    <span class="chart-dot salida"></span>
                    Salidas
                  </div>
                  <div class="chart-stat-value" id="salidas-semana">0</div>
                </div>
              </div>
            </div>
          </section>

          <section id="entrada" class="dashboard-section">
            <div class="form-card">
              <h2 class="card-title">Registrar Entrada de Producto</h2>
              <form id="entrada-form" class="product-form">
                <div class="form-row">
                  <div class="form-group">
                    <label>Nombre del Producto</label>
                    <input type="text" id="entrada-nombre" class="form-input" required />
                  </div>
                  <div class="form-group">
                    <label>Código/SKU</label>
                    <input type="text" id="entrada-codigo" class="form-input" required />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Cantidad</label>
                    <input type="number" id="entrada-cantidad" class="form-input" min="1" required />
                  </div>
                  <div class="form-group">
                    <label>Precio Unitario</label>
                    <input type="number" id="entrada-precio" class="form-input" step="0.01" min="0" required />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Categoría</label>
                    <select id="entrada-categoria" class="form-input" required>
                      <option value="">Seleccionar categoría</option>
                      <option value="Electrónica">Electrónica</option>
                      <option value="Ropa">Ropa</option>
                      <option value="Alimentos">Alimentos</option>
                      <option value="Herramientas">Herramientas</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Proveedor</label>
                    <input type="text" id="entrada-proveedor" class="form-input" required />
                  </div>
                </div>
                <div class="form-group">
                  <label>Notas (opcional)</label>
                  <textarea id="entrada-notas" class="form-input" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Registrar Entrada</button>
              </form>
            </div>

            <div class="table-card" style="margin-top: 24px;">
              <h3 class="card-title">Productos en Inventario</h3>
              <div class="table-header">
                <input type="search" id="search-inventario" class="search-input" placeholder="Buscar productos..." />
              </div>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Stock</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody id="inventario-table"></tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="salida" class="dashboard-section">
            <div class="form-card">
              <h2 class="card-title">Registrar Salida de Producto</h2>
              <form id="salida-form" class="product-form">
                <div class="form-row">
                  <div class="form-group">
                    <label>Producto</label>
                    <select id="salida-producto" class="form-input" required>
                      <option value="">Seleccionar producto</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Stock Disponible</label>
                    <input type="text" id="salida-stock" class="form-input" readonly />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Cantidad a Retirar</label>
                    <input type="number" id="salida-cantidad" class="form-input" min="1" required />
                  </div>
                  <div class="form-group">
                    <label>Motivo</label>
                    <select id="salida-motivo" class="form-input" required>
                      <option value="">Seleccionar motivo</option>
                      <option value="Venta">Venta</option>
                      <option value="Devolución">Devolución</option>
                      <option value="Merma">Merma</option>
                      <option value="Uso interno">Uso interno</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label>Cliente/Destino</label>
                  <input type="text" id="salida-destino" class="form-input" required />
                </div>
                <div class="form-group">
                  <label>Notas (opcional)</label>
                  <textarea id="salida-notas" class="form-input" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Registrar Salida</button>
              </form>
            </div>
          </section>

          <section id="historial" class="dashboard-section">
            <div class="table-card">
              <h2 class="card-title">Historial de Movimientos</h2>
              <div class="table-header">
                <input type="search" id="search-historial" class="search-input" placeholder="Buscar movimientos..." />
                <div class="filter-buttons">
                  <button class="filter-btn active" data-filter="todos">Todos</button>
                  <button class="filter-btn" data-filter="entrada">Entradas</button>
                  <button class="filter-btn" data-filter="salida">Salidas</button>
                </div>
              </div>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Tipo</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Usuario</th>
                      <th>Detalles</th>
                    </tr>
                  </thead>
                  <tbody id="historial-table"></tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="usuarios" class="dashboard-section">
            <div class="table-card">
              <h2 class="card-title">Gestión de Usuarios</h2>
              <div class="table-header">
                <input type="search" id="search-usuarios" class="search-input" placeholder="Buscar usuarios..." />
                <button class="btn btn-primary" id="add-user-btn">Añadir Usuario</button>
              </div>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody id="usuarios-table"></tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="perfil" class="dashboard-section">
            <div class="profile-container">
              <div class="profile-card">
                <div class="profile-header">
                  <div class="profile-avatar" id="profile-avatar">U</div>
                  <h2 id="profile-name">Usuario</h2>
                  <p id="profile-email">usuario@example.com</p>
                </div>
                <div class="profile-stats">
                  <div class="stat-item">
                    <span class="stat-label">Movimientos registrados</span>
                    <span class="stat-value" id="profile-movimientos">0</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Fecha de registro</span>
                    <span class="stat-value" id="profile-fecha">-</span>
                  </div>
                </div>
              </div>

              <div class="settings-card">
                <h3 class="card-title">Editar Perfil</h3>
                <form id="profile-form" class="settings-form">
                  <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" id="profile-nombre" class="form-input" required />
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="profile-email-input" class="form-input" required />
                  </div>
                  <div class="form-group">
                    <label>Teléfono</label>
                    <input type="tel" id="profile-telefono" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Nueva Contraseña (dejar en blanco para mantener actual)</label>
                    <input type="password" id="profile-password" class="form-input" />
                  </div>
                  <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </form>
              </div>
            </div>
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

    <div class="notification" id="notification"></div>

    <script src="/LaIndia/public/assets/js/dashboard.js"></script>
  </body>
</html>
