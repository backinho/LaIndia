class InventarioApp {
  constructor() {
    this.productos = [];
    this.movimientos = [];
    this.usuarios = [];
    this.usuarioActual = null;
    this.editingUserId = null;

    this.cargarDatos();
    this.inicializarUsuarioActual();
    this.inicializar();
  }

  cargarDatos() {
    const productosGuardados = localStorage.getItem('productos');
    const movimientosGuardados = localStorage.getItem('movimientos');
    const usuariosGuardados = localStorage.getItem('usuarios');

    this.productos = productosGuardados ? JSON.parse(productosGuardados) : [];
    this.movimientos = movimientosGuardados ? JSON.parse(movimientosGuardados) : [];
    this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : this.crearUsuariosIniciales();
  }

  crearUsuariosIniciales() {
    const usuarios = [
      {
        id: '1',
        nombre: 'Administrador',
        email: 'admin@ejemplo.com',
        telefono: '555-0001',
        password: 'admin123',
        rol: 'admin',
        activo: true,
        fechaRegistro: new Date().toISOString()
      },
      {
        id: '2',
        nombre: 'Usuario Demo',
        email: 'usuario@ejemplo.com',
        telefono: '555-0002',
        password: 'usuario123',
        rol: 'usuario',
        activo: true,
        fechaRegistro: new Date().toISOString()
      }
    ];
    this.guardarUsuarios(usuarios);
    return usuarios;
  }

  inicializarUsuarioActual() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    } else {
      this.usuarioActual = this.usuarios[0];
      localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
    }
    this.actualizarInfoUsuario();
  }

  guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  guardarMovimientos() {
    localStorage.setItem('movimientos', JSON.stringify(this.movimientos));
  }

  guardarUsuarios(usuarios) {
    if (usuarios) {
      this.usuarios = usuarios;
    }
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  inicializar() {
    this.inicializarTema();
    this.inicializarNavegacion();
    this.inicializarSidebar();
    this.inicializarMenuUsuario();
    this.inicializarResumen();
    this.inicializarEntrada();
    this.inicializarSalida();
    this.inicializarHistorial();
    this.inicializarUsuarios();
    this.inicializarPerfil();
    this.mostrarNotificacion('Bienvenido al Sistema de Inventario', 'success');
  }

  inicializarTema() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
  }

  inicializarNavegacion() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    const sectionTitle = document.getElementById('section-title');

    const titles = {
      'resumen': 'Resumen',
      'entrada': 'Entrada de Productos',
      'salida': 'Salida de Productos',
      'historial': 'Historial de Movimientos',
      'usuarios': 'Manejo de Usuarios',
      'perfil': 'Mi Perfil'
    };

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        if (!sectionId) return;

        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        sections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.add('active');
        }

        if (sectionTitle) {
          sectionTitle.textContent = titles[sectionId];
        }

        if (sectionId === 'resumen') {
          this.renderizarResumen();
        }

        if (sectionId === 'salida') {
          this.actualizarSelectProductos();
        }

        if (sectionId === 'perfil') {
          this.cargarDatosPerfil();
        }

        if (window.innerWidth <= 1024) {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) {
            sidebar.classList.remove('active');
          }
        }
      });
    });

    const dropdownItems = document.querySelectorAll('.dropdown-item[data-section]');
    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        if (!sectionId) return;

        navItems.forEach(nav => nav.classList.remove('active'));
        const targetNav = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
        if (targetNav) {
          targetNav.classList.add('active');
        }

        sections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.add('active');
        }

        if (sectionTitle) {
          sectionTitle.textContent = titles[sectionId];
        }

        if (sectionId === 'perfil') {
          this.cargarDatosPerfil();
        }
      });
    });
  }

  inicializarSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        if (sidebar) {
          sidebar.classList.toggle('active');
        }
      });
    }

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        if (sidebar) {
          sidebar.classList.remove('active');
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        const target = e.target;
        if (sidebar && !sidebar.contains(target) && mobileToggle && !mobileToggle.contains(target)) {
          sidebar.classList.remove('active');
        }
      }
    });
  }

  inicializarMenuUsuario() {
    const userButton = document.getElementById('user-button');
    const userMenu = document.querySelector('.user-menu');
    const logout = document.getElementById('logout');

    if (userButton) {
      userButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (userMenu) {
          userMenu.classList.toggle('active');
        }
      });
    }

    document.addEventListener('click', () => {
      if (userMenu) {
        userMenu.classList.remove('active');
      }
    });

    if (logout) {
      logout.addEventListener('click', (e) => {
        e.preventDefault();
        this.mostrarNotificacion('Sesión cerrada exitosamente', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
    }
  }

  actualizarInfoUsuario() {
    if (!this.usuarioActual) return;

    const userAvatar = document.getElementById('user-avatar');
    const userNameDisplay = document.getElementById('user-name-display');

    if (userAvatar) {
      userAvatar.textContent = this.usuarioActual.nombre.charAt(0).toUpperCase();
    }

    if (userNameDisplay) {
      userNameDisplay.textContent = this.usuarioActual.nombre;
    }
  }

  inicializarResumen() {
    this.renderizarResumen();
  }

  renderizarResumen() {
    const totalProductos = this.productos.length;
    const totalEntradas = this.movimientos.filter(m => m.tipo === 'entrada').length;
    const totalSalidas = this.movimientos.filter(m => m.tipo === 'salida').length;
    const valorInventario = this.productos.reduce((sum, p) => sum + (p.stock * p.precio), 0);

    const totalProductosEl = document.getElementById('total-productos');
    const totalEntradasEl = document.getElementById('total-entradas');
    const totalSalidasEl = document.getElementById('total-salidas');
    const valorInventarioEl = document.getElementById('valor-inventario');

    if (totalProductosEl) totalProductosEl.textContent = totalProductos;
    if (totalEntradasEl) totalEntradasEl.textContent = totalEntradas;
    if (totalSalidasEl) totalSalidasEl.textContent = totalSalidas;
    if (valorInventarioEl) valorInventarioEl.textContent = `$${valorInventario.toFixed(2)}`;

    this.renderizarStockBajo();
    this.renderizarUltimosMovimientos();
    this.renderizarCategorias();
  }

  renderizarStockBajo() {
    const tbody = document.getElementById('stock-bajo-table');
    if (!tbody) return;

    const productosStockBajo = this.productos
      .filter(p => p.stock < 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5);

    if (productosStockBajo.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay productos con stock bajo</td></tr>';
      return;
    }

    tbody.innerHTML = productosStockBajo.map(producto => {
      const estadoClass = producto.stock === 0 ? 'error' : producto.stock < 5 ? 'warning' : 'info';
      const estadoTexto = producto.stock === 0 ? 'Sin stock' : producto.stock < 5 ? 'Crítico' : 'Bajo';

      return `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.codigo}</td>
          <td>${producto.stock}</td>
          <td><span class="status-badge" style="background: rgba(var(--${estadoClass}-rgb, 231, 76, 60), 0.2); color: var(--${estadoClass});">${estadoTexto}</span></td>
        </tr>
      `;
    }).join('');
  }

  renderizarUltimosMovimientos() {
    const tbody = document.getElementById('ultimos-movimientos-table');
    if (!tbody) return;

    const ultimosMovimientos = [...this.movimientos]
      .reverse()
      .slice(0, 5);

    if (ultimosMovimientos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay movimientos registrados</td></tr>';
      return;
    }

    tbody.innerHTML = ultimosMovimientos.map(movimiento => {
      const fecha = new Date(movimiento.fecha);
      const fechaFormateada = fecha.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      return `
        <tr>
          <td><span class="status-badge ${movimiento.tipo}">${movimiento.tipo === 'entrada' ? 'Entrada' : 'Salida'}</span></td>
          <td>${movimiento.productoNombre}</td>
          <td>${movimiento.cantidad}</td>
          <td>${fechaFormateada}</td>
        </tr>
      `;
    }).join('');
  }

  renderizarCategorias() {
    const container = document.getElementById('categorias-container');
    if (!container) return;

    const categorias = {};
    this.productos.forEach(p => {
      if (!categorias[p.categoria]) {
        categorias[p.categoria] = { count: 0, valor: 0 };
      }
      categorias[p.categoria].count++;
      categorias[p.categoria].valor += p.stock * p.precio;
    });

    const categoriasArray = Object.entries(categorias).map(([nombre, data]) => ({
      nombre,
      count: data.count,
      valor: data.valor
    }));

    if (categoriasArray.length === 0) {
      container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">No hay categorías registradas</p>';
      return;
    }

    const maxCount = Math.max(...categoriasArray.map(c => c.count));

    container.innerHTML = categoriasArray.map(cat => {
      const percentage = (cat.count / maxCount) * 100;

      return `
        <div class="categoria-item">
          <div class="categoria-header">
            <span class="categoria-nombre">${cat.nombre}</span>
            <span class="categoria-valor">${cat.count} productos - $${cat.valor.toFixed(2)}</span>
          </div>
          <div class="categoria-bar">
            <div class="categoria-fill" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  inicializarEntrada() {
    const form = document.getElementById('entrada-form');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.registrarEntrada();
      });
    }

    this.renderizarInventario();
    this.inicializarBusquedaInventario();
  }

  registrarEntrada() {
    const codigo = document.getElementById('entrada-codigo').value;
    const nombre = document.getElementById('entrada-nombre').value;
    const cantidad = parseInt(document.getElementById('entrada-cantidad').value);
    const precio = parseFloat(document.getElementById('entrada-precio').value);
    const categoria = document.getElementById('entrada-categoria').value;
    const proveedor = document.getElementById('entrada-proveedor').value;
    const notas = document.getElementById('entrada-notas').value;

    const productoExistente = this.productos.find(p => p.codigo === codigo);

    if (productoExistente) {
      productoExistente.stock += cantidad;
      productoExistente.precio = precio;
    } else {
      const nuevoProducto = {
        id: Date.now().toString(),
        codigo,
        nombre,
        categoria,
        stock: cantidad,
        precio,
        proveedor
      };
      this.productos.push(nuevoProducto);
    }

    const movimiento = {
      id: Date.now().toString(),
      tipo: 'entrada',
      productoId: productoExistente ? productoExistente.id : this.productos[this.productos.length - 1].id,
      productoNombre: nombre,
      cantidad,
      fecha: new Date().toISOString(),
      usuario: this.usuarioActual ? this.usuarioActual.nombre : 'Usuario',
      detalles: `Entrada de ${cantidad} unidades`,
      precio,
      proveedor,
      notas
    };

    this.movimientos.push(movimiento);
    this.guardarProductos();
    this.guardarMovimientos();
    this.renderizarInventario();
    this.mostrarNotificacion('Entrada registrada exitosamente', 'success');

    const entradaForm = document.getElementById('entrada-form');
    if (entradaForm) {
      entradaForm.reset();
    }
  }

  renderizarInventario(filtro = '') {
    const tbody = document.getElementById('inventario-table');
    if (!tbody) return;

    const productosFiltrados = filtro
      ? this.productos.filter(p =>
          p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          p.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
          p.categoria.toLowerCase().includes(filtro.toLowerCase())
        )
      : this.productos;

    tbody.innerHTML = productosFiltrados.map(producto => `
      <tr>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.stock}</td>
        <td>$${producto.precio.toFixed(2)}</td>
      </tr>
    `).join('');
  }

  inicializarBusquedaInventario() {
    const searchInput = document.getElementById('search-inventario');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderizarInventario(e.target.value);
      });
    }
  }

  inicializarSalida() {
    const form = document.getElementById('salida-form');
    const selectProducto = document.getElementById('salida-producto');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.registrarSalida();
      });
    }

    if (selectProducto) {
      selectProducto.addEventListener('change', (e) => {
        const productoId = e.target.value;
        const producto = this.productos.find(p => p.id === productoId);
        const stockInput = document.getElementById('salida-stock');

        if (producto && stockInput) {
          stockInput.value = producto.stock.toString();
        } else if (stockInput) {
          stockInput.value = '';
        }
      });
    }

    this.actualizarSelectProductos();
  }

  actualizarSelectProductos() {
    const select = document.getElementById('salida-producto');
    if (!select) return;

    const productosDisponibles = this.productos.filter(p => p.stock > 0);

    select.innerHTML = '<option value="">Seleccionar producto</option>' +
      productosDisponibles.map(p =>
        `<option value="${p.id}">${p.nombre} (${p.codigo}) - Stock: ${p.stock}</option>`
      ).join('');
  }

  registrarSalida() {
    const productoId = document.getElementById('salida-producto').value;
    const cantidad = parseInt(document.getElementById('salida-cantidad').value);
    const motivo = document.getElementById('salida-motivo').value;
    const destino = document.getElementById('salida-destino').value;
    const notas = document.getElementById('salida-notas').value;

    const producto = this.productos.find(p => p.id === productoId);

    if (!producto) {
      this.mostrarNotificacion('Producto no encontrado', 'error');
      return;
    }

    if (cantidad > producto.stock) {
      this.mostrarNotificacion('Stock insuficiente', 'error');
      return;
    }

    producto.stock -= cantidad;

    const movimiento = {
      id: Date.now().toString(),
      tipo: 'salida',
      productoId: producto.id,
      productoNombre: producto.nombre,
      cantidad,
      fecha: new Date().toISOString(),
      usuario: this.usuarioActual ? this.usuarioActual.nombre : 'Usuario',
      detalles: `Salida de ${cantidad} unidades - ${motivo}`,
      motivo,
      destino,
      notas
    };

    this.movimientos.push(movimiento);
    this.guardarProductos();
    this.guardarMovimientos();
    this.actualizarSelectProductos();
    this.renderizarInventario();
    this.mostrarNotificacion('Salida registrada exitosamente', 'success');

    const salidaForm = document.getElementById('salida-form');
    if (salidaForm) {
      salidaForm.reset();
    }
  }

  inicializarHistorial() {
    this.renderizarHistorial();
    this.inicializarFiltrosHistorial();
    this.inicializarBusquedaHistorial();
  }

  renderizarHistorial(filtroTipo = 'todos', filtroBusqueda = '') {
    const tbody = document.getElementById('historial-table');
    if (!tbody) return;

    let movimientosFiltrados = [...this.movimientos].reverse();

    if (filtroTipo !== 'todos') {
      movimientosFiltrados = movimientosFiltrados.filter(m => m.tipo === filtroTipo);
    }

    if (filtroBusqueda) {
      movimientosFiltrados = movimientosFiltrados.filter(m =>
        m.productoNombre.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
        m.usuario.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
        m.detalles.toLowerCase().includes(filtroBusqueda.toLowerCase())
      );
    }

    tbody.innerHTML = movimientosFiltrados.map(movimiento => {
      const fecha = new Date(movimiento.fecha);
      const fechaFormateada = fecha.toLocaleString('es-ES');

      return `
        <tr>
          <td>${fechaFormateada}</td>
          <td><span class="status-badge ${movimiento.tipo}">${movimiento.tipo === 'entrada' ? 'Entrada' : 'Salida'}</span></td>
          <td>${movimiento.productoNombre}</td>
          <td>${movimiento.cantidad}</td>
          <td>${movimiento.usuario}</td>
          <td>${movimiento.detalles}</td>
        </tr>
      `;
    }).join('');
  }

  inicializarFiltrosHistorial() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target;
        const filter = target.getAttribute('data-filter');

        filterButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        const searchInput = document.getElementById('search-historial');
        this.renderizarHistorial(filter || 'todos', searchInput ? searchInput.value : '');
      });
    });
  }

  inicializarBusquedaHistorial() {
    const searchInput = document.getElementById('search-historial');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'todos';
        this.renderizarHistorial(filter || 'todos', e.target.value);
      });
    }
  }

  inicializarUsuarios() {
    this.renderizarUsuarios();
    this.inicializarBusquedaUsuarios();
    this.inicializarModalUsuario();
  }

  renderizarUsuarios(filtro = '') {
    const tbody = document.getElementById('usuarios-table');
    if (!tbody) return;

    const usuariosFiltrados = filtro
      ? this.usuarios.filter(u =>
          u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          u.email.toLowerCase().includes(filtro.toLowerCase())
        )
      : this.usuarios;

    tbody.innerHTML = usuariosFiltrados.map(usuario => `
      <tr>
        <td>#${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td><span class="role-badge ${usuario.rol}">${usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}</span></td>
        <td><span class="status-badge ${usuario.activo ? 'activo' : 'inactivo'}">${usuario.activo ? 'Activo' : 'Inactivo'}</span></td>
        <td>
          <button class="action-btn" onclick="app.editarUsuario('${usuario.id}')">Editar</button>
          <button class="action-btn delete" onclick="app.eliminarUsuario('${usuario.id}')">Eliminar</button>
        </td>
      </tr>
    `).join('');
  }

  inicializarBusquedaUsuarios() {
    const searchInput = document.getElementById('search-usuarios');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderizarUsuarios(e.target.value);
      });
    }
  }

  inicializarModalUsuario() {
    const addUserBtn = document.getElementById('add-user-btn');
    const modal = document.getElementById('user-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const userForm = document.getElementById('user-form');

    if (addUserBtn) {
      addUserBtn.addEventListener('click', () => {
        this.editingUserId = null;
        this.limpiarFormularioUsuario();
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) modalTitle.textContent = 'Añadir Usuario';
        if (modal) modal.classList.add('show');
      });
    }

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        if (modal) modal.classList.remove('show');
      });
    }

    if (modalCancel) {
      modalCancel.addEventListener('click', () => {
        if (modal) modal.classList.remove('show');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
        }
      });
    }

    if (userForm) {
      userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.guardarUsuario();
      });
    }
  }

  editarUsuario(id) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) return;

    this.editingUserId = id;

    document.getElementById('user-nombre').value = usuario.nombre;
    document.getElementById('user-email').value = usuario.email;
    document.getElementById('user-rol').value = usuario.rol;
    document.getElementById('user-password').value = usuario.password;

    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) modalTitle.textContent = 'Editar Usuario';

    const modal = document.getElementById('user-modal');
    if (modal) modal.classList.add('show');
  }

  eliminarUsuario(id) {
    if (!confirm('¿Está seguro de eliminar este usuario?')) return;

    this.usuarios = this.usuarios.filter(u => u.id !== id);
    this.guardarUsuarios();
    this.renderizarUsuarios();
    this.mostrarNotificacion('Usuario eliminado exitosamente', 'success');
  }

  guardarUsuario() {
    const nombre = document.getElementById('user-nombre').value;
    const email = document.getElementById('user-email').value;
    const rol = document.getElementById('user-rol').value;
    const password = document.getElementById('user-password').value;

    if (this.editingUserId) {
      const usuario = this.usuarios.find(u => u.id === this.editingUserId);
      if (usuario) {
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.rol = rol;
        usuario.password = password;
        this.mostrarNotificacion('Usuario actualizado exitosamente', 'success');
      }
    } else {
      const nuevoUsuario = {
        id: Date.now().toString(),
        nombre,
        email,
        telefono: '',
        password,
        rol,
        activo: true,
        fechaRegistro: new Date().toISOString()
      };
      this.usuarios.push(nuevoUsuario);
      this.mostrarNotificacion('Usuario creado exitosamente', 'success');
    }

    this.guardarUsuarios();
    this.renderizarUsuarios();

    const modal = document.getElementById('user-modal');
    if (modal) modal.classList.remove('show');
    this.limpiarFormularioUsuario();
  }

  limpiarFormularioUsuario() {
    const userForm = document.getElementById('user-form');
    if (userForm) {
      userForm.reset();
    }
  }

  inicializarPerfil() {
    const profileForm = document.getElementById('profile-form');

    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.guardarPerfil();
      });
    }

    this.cargarDatosPerfil();
  }

  cargarDatosPerfil() {
    if (!this.usuarioActual) return;

    const profileAvatar = document.getElementById('profile-avatar');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileMovimientos = document.getElementById('profile-movimientos');
    const profileFecha = document.getElementById('profile-fecha');

    if (profileAvatar) {
      profileAvatar.textContent = this.usuarioActual.nombre.charAt(0).toUpperCase();
    }

    if (profileName) {
      profileName.textContent = this.usuarioActual.nombre;
    }

    if (profileEmail) {
      profileEmail.textContent = this.usuarioActual.email;
    }

    if (profileMovimientos) {
      const movimientosUsuario = this.movimientos.filter(m => m.usuario === this.usuarioActual.nombre);
      profileMovimientos.textContent = movimientosUsuario.length.toString();
    }

    if (profileFecha) {
      const fecha = new Date(this.usuarioActual.fechaRegistro);
      profileFecha.textContent = fecha.toLocaleDateString('es-ES');
    }

    document.getElementById('profile-nombre').value = this.usuarioActual.nombre;
    document.getElementById('profile-email-input').value = this.usuarioActual.email;
    document.getElementById('profile-telefono').value = this.usuarioActual.telefono || '';
  }

  guardarPerfil() {
    if (!this.usuarioActual) return;

    const nombre = document.getElementById('profile-nombre').value;
    const email = document.getElementById('profile-email-input').value;
    const telefono = document.getElementById('profile-telefono').value;
    const password = document.getElementById('profile-password').value;

    this.usuarioActual.nombre = nombre;
    this.usuarioActual.email = email;
    this.usuarioActual.telefono = telefono;

    if (password) {
      this.usuarioActual.password = password;
    }

    const usuarioIndex = this.usuarios.findIndex(u => u.id === this.usuarioActual.id);
    if (usuarioIndex !== -1) {
      this.usuarios[usuarioIndex] = this.usuarioActual;
      this.guardarUsuarios();
    }

    localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
    this.actualizarInfoUsuario();
    this.cargarDatosPerfil();
    this.mostrarNotificacion('Perfil actualizado exitosamente', 'success');

    const passwordInput = document.getElementById('profile-password');
    if (passwordInput) {
      passwordInput.value = '';
    }
  }

  mostrarNotificacion(mensaje, tipo) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.textContent = mensaje;
    notification.className = `notification show ${tipo}`;

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}

const app = new InventarioApp();
window.app = app;
