class InventarioApp {
  constructor() {
    this.productos = [];
    this.movimientos = [];
    this.usuarios = [];
    this.clientes = [];
    this.categorias = [];
    this.proveedores = [];
    this.usuarioActual = null;

    this.cargarDatosCompletos().then(() => {
      this.inicializar();
    });
  }

  // ==================== VALIDACIONES ====================

  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validarTelefono(telefono) {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(telefono.replace(/[\s\-\(\)]/g, ''));
  }

  validarPassword(password) {
    // Validar longitud mínima de 8 caracteres
    if (password.length < 8) {
      return {
        valid: false,
        mensaje: "La contraseña debe tener al menos 8 caracteres"
      };
    }

    // Validar que tenga al menos una mayúscula
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        mensaje: "La contraseña debe contener al menos una letra mayúscula"
      };
    }

    // Validar que tenga al menos una minúscula
    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        mensaje: "La contraseña debe contener al menos una letra minúscula"
      };
    }

    // Validar que tenga al menos un número
    if (!/[0-9]/.test(password)) {
      return {
        valid: false,
        mensaje: "La contraseña debe contener al menos un número"
      };
    }

    // Validar que tenga al menos un carácter especial
    // Caracteres especiales comunes: !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)) {
      return {
        valid: false,
        mensaje: "La contraseña debe contener al menos un carácter especial"
      };
    }

    return { valid: true };
  }

  validarCampoVacio(valor, nombreCampo) {
    if (!valor || valor.trim() === '') {
      return { valid: false, mensaje: `El campo ${nombreCampo} es requerido` };
    }
    return { valid: true };
  }

  validarNumeroPositivo(numero, nombreCampo) {
    const num = parseFloat(numero);
    if (isNaN(num) || num <= 0) {
      return { valid: false, mensaje: `${nombreCampo} debe ser un número mayor a 0` };
    }
    return { valid: true };
  }

  // ==================== CARGA DE DATOS ====================

  async cargarDatosCompletos() {
    await Promise.all([
      this.inicializarProductosList(),
      this.inicializarCategoriasList(),
      this.inicializarMovimientosList(),
      this.inicializarProveedoresList(),
      this.inicializarClientesList(),
      this.inicializarUsuariosList(),
      this.inicializarUsuarioActivo(),
    ]);
  }

  async inicializarProductosList() {
    const response = await fetch("productos/listar", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error al cargar productos del servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      this.productos = data.data;
    }
  }

  async inicializarCategoriasList() {
    const response = await fetch("categorias/listar", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error al cargar categorías del servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      this.categorias = data.data;
    }
  }

  async inicializarMovimientosList() {
    const response = await fetch("movimientos/listar", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error al cargar movimientos del servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      this.movimientos = data.data;
    }
  }

  async inicializarProveedoresList() {
    const response = await fetch("proveedores/listar", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error al cargar proveedores del servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      this.proveedores = data.data;
    }
  }

  async inicializarClientesList() {
    const response = await fetch("clientes/listar", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error al cargar clientes del servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      this.clientes = data.data;
    }
  }

  async inicializarUsuariosList() {
    const response = await fetch("usuarios/listar", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error al cargar usuarios del servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      this.usuarios = data.data;
    }
  }

  async inicializarUsuarioActivo() {
    const response = await fetch("usuarios/listarActivo", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error al cargar usuario activo del servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      this.usuarioActual = data.data;
    }
  }

  mostrarNotificacion(mensaje, tipo) {
    const notification = document.getElementById("notification");
    notification.textContent = mensaje;
    notification.className = `notification show ${tipo}`;

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  // ==================== INICIALIZACIÓN ====================

  inicializar() {
    this.inicializarTema();
    this.inicializarNavegacion();
    this.inicializarSidebar();
    this.inicializarMenuUsuario();
    this.inicializarResumen();
    this.inicializarInventario();
    this.inicializarEntrada();
    this.inicializarSalida();
    this.inicializarHistorial();
    this.inicializarCategorias();
    this.inicializarProveedores();
    this.inicializarClientes();
    this.inicializarUsuarios();
    this.inicializarPerfil();
    this.inicializarEventDelegation();
    this.mostrarNotificacion("Bienvenido al Sistema de Inventario", "success");
  }

  inicializarEventDelegation() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-cat')) {
        const filterCat = e.target.getAttribute('data-filter-cat');
        const filterButtons = document.querySelectorAll('.filter-cat');
        const mainFilterBtn = document.getElementById('mainFilterBtn');

        filterButtons.forEach((btn) => btn.classList.remove('active'));
        e.target.classList.add('active');

        if (filterCat === 'todos') {
          mainFilterBtn.innerHTML = '<span>Seleccionar categoría</span><i class="fas fa-chevron-down"></i>';
          mainFilterBtn.classList.remove('active');
        } else {
          mainFilterBtn.innerHTML = `<span>${filterCat}</span><i class="fas fa-chevron-down"></i>`;
          mainFilterBtn.classList.add('active');
        }

        const searchInput = document.getElementById('search-inventario-full');
        this.renderizarInventarioCompleto(searchInput ? searchInput.value : '', filterCat);
      }
    });
  }

  inicializarTema() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });
    }
  }

  inicializarNavegacion() {
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".dashboard-section");
    const sectionTitle = document.getElementById("section-title");

    const titles = {
      resumen: "Resumen",
      inventario: "Inventario de Productos",
      entrada: "Entrada de Productos",
      salida: "Salida de Productos",
      historial: "Historial de Movimientos",
      categorias: "Gestión de Categorías",
      proveedores: "Gestión de Proveedores",
      clientes: "Manejo de Clientes",
      usuarios: "Manejo de Usuarios",
      perfil: "Mi Perfil",
    };

    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute("data-section");
        if (!sectionId) return;

        navItems.forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");

        sections.forEach((section) => section.classList.remove("active"));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.add("active");
        }

        if (sectionTitle) {
          sectionTitle.textContent = titles[sectionId];
        }

        if (sectionId === "resumen") {
          this.renderizarResumen();
        }

        if (sectionId === "inventario") {
          this.renderizarInventarioCompleto();
        }

        if (sectionId === "salida") {
          this.actualizarSelectProductos();
          this.actualizarSelectClientes();
        }

        if (sectionId === "perfil") {
          this.cargarDatosPerfil();
        }

        if (window.innerWidth <= 1024) {
          const sidebar = document.getElementById("sidebar");
          if (sidebar) {
            sidebar.classList.remove("active");
          }
        }
      });
    });

    const dropdownItems = document.querySelectorAll(".dropdown-item[data-section]");
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute("data-section");
        if (!sectionId) return;

        navItems.forEach((nav) => nav.classList.remove("active"));
        const targetNav = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
        if (targetNav) {
          targetNav.classList.add("active");
        }

        sections.forEach((section) => section.classList.remove("active"));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.add("active");
        }

        if (sectionTitle) {
          sectionTitle.textContent = titles[sectionId];
        }

        if (sectionId === "perfil") {
          this.cargarDatosPerfil();
        }
      });
    });
  }

  inicializarSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mobileToggle = document.getElementById("mobile-toggle");
    const sidebarToggle = document.getElementById("sidebar-toggle");

    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        if (sidebar) {
          sidebar.classList.toggle("active");
        }
      });
    }

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        if (sidebar) {
          sidebar.classList.remove("active");
        }
      });
    }

    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        const target = e.target;
        if (sidebar && !sidebar.contains(target) && mobileToggle && !mobileToggle.contains(target)) {
          sidebar.classList.remove("active");
        }
      }
    });
  }

  async logout() {
    const response = await fetch("logout", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Error al cerrar sesión en el servidor");
      return;
    }

    if (response.ok) {
      this.mostrarNotificacion("Sesión cerrada exitosamente", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

  inicializarMenuUsuario() {
    const userButton = document.getElementById("user-button");
    const userMenu = document.querySelector(".user-menu");
    const logout = document.getElementById("logout");
    const avatar = document.getElementById("user-avatar");
    const user = document.getElementById("user-name-display");

    if (avatar) {
      avatar.textContent = this.usuarioActual.nombre.charAt(0).toUpperCase();
    }

    if (user) {
      user.textContent = this.usuarioActual.nombre;
    }

    if (userButton) {
      userButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (userMenu) {
          userMenu.classList.toggle("active");
        }
      });
    }

    document.addEventListener("click", () => {
      if (userMenu) {
        userMenu.classList.remove("active");
      }
    });

    if (logout) {
      logout.addEventListener("click", (e) => {
        e.preventDefault();
        this.logout();
      });
    }
  }

  actualizarInfoUsuario() {
    if (!this.usuarioActual) return;

    const userAvatar = document.getElementById("user-avatar");
    const userNameDisplay = document.getElementById("user-name-display");

    if (userAvatar) {
      userAvatar.textContent = this.usuarioActual.nombre.charAt(0).toUpperCase();
    }

    if (userNameDisplay) {
      userNameDisplay.textContent = this.usuarioActual.nombre;
    }
  }

  // ==================== RESUMEN ====================

  inicializarResumen() {
    this.renderizarResumen();
  }

  renderizarResumen() {
    const totalProductos = this.productos.length;
    const totalEntradas = this.movimientos.filter((m) => m.tipo === "entrada").length;
    const totalSalidas = this.movimientos.filter((m) => m.tipo === "salida").length;
    const valorInventario = this.productos.reduce((sum, p) => sum + p.stock * p.precio, 0);

    const totalProductosEl = document.getElementById("total-productos");
    const totalEntradasEl = document.getElementById("total-entradas");
    const totalSalidasEl = document.getElementById("total-salidas");
    const valorInventarioEl = document.getElementById("valor-inventario");

    if (totalProductosEl) totalProductosEl.textContent = totalProductos;
    if (totalEntradasEl) totalEntradasEl.textContent = totalEntradas;
    if (totalSalidasEl) totalSalidasEl.textContent = totalSalidas;
    if (valorInventarioEl) valorInventarioEl.textContent = `$${valorInventario.toFixed(2)}`;

    this.renderizarStockBajo();
    this.renderizarUltimosMovimientos();
    this.renderizarActividadSemanal();
  }

  renderizarStockBajo() {
    const tbody = document.getElementById("stock-bajo-table");
    if (!tbody) return;

    const productosStockBajo = this.productos
      .filter((p) => p.stock < 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5);

    if (productosStockBajo.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay productos con stock bajo</td></tr>';
      return;
    }

    tbody.innerHTML = productosStockBajo
      .map((producto) => {
        const estadoClass = producto.stock === 0 ? "error" : producto.stock < 5 ? "warning" : "info";
        const estadoTexto = producto.stock === 0 ? "Sin stock" : producto.stock < 5 ? "Crítico" : "Bajo";

        return `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.codigo}</td>
          <td>${producto.stock}</td>
          <td><span class="status-badge" style="background: rgba(var(--${estadoClass}-rgb, 231, 76, 60), 0.2); color: var(--${estadoClass});">${estadoTexto}</span></td>
        </tr>
      `;
      })
      .join("");
  }

  renderizarUltimosMovimientos() {
    const tbody = document.getElementById("ultimos-movimientos-table");
    if (!tbody) return;

    const ultimosMovimientos = [...this.movimientos].reverse().slice(0, 5);

    if (ultimosMovimientos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay movimientos registrados</td></tr>';
      return;
    }

    tbody.innerHTML = ultimosMovimientos
      .map((movimiento) => {
        const fecha = new Date(movimiento.fecha);
        const fechaFormateada = fecha.toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        const cliente_proveedor = movimiento.nombre_cliente
          ? `${movimiento.nombre_cliente} productos`
          : movimiento.nombre_proveedor;

        return `
        <tr>
          <td><span class="status-badge ${movimiento.tipo}">${movimiento.tipo === "entrada" ? "Entrada" : "Salida"}</span></td>
          <td>${cliente_proveedor}</td>
          <td>${movimiento.cantidad_total}</td>
          <td>${fechaFormateada}</td>
        </tr>
      `;
      })
      .join("");
  }

  renderizarActividadSemanal() {
    const entradasSemana = document.getElementById("entradas-semana");
    const salidasSemana = document.getElementById("salidas-semana");

    if (entradasSemana) {
      const entradas = this.movimientos.filter((m) => m.tipo === "entrada").length;
      entradasSemana.textContent = entradas;
    }

    if (salidasSemana) {
      const salidas = this.movimientos.filter((m) => m.tipo === "salida").length;
      salidasSemana.textContent = salidas;
    }
  }

  // ==================== INVENTARIO ====================

  inicializarInventario() {
    this.renderizarInventarioCompleto();
    this.renderizarFiltrosInventario();
    this.inicializarBusquedaInventario();
  }

  renderizarInventarioCompleto(filtro = "", categoria = "todos") {
    const tbody = document.getElementById("inventario-full-table");
    if (!tbody) return;

    let productosFiltrados = this.productos;

    if (categoria !== "todos") {
      productosFiltrados = productosFiltrados.filter((p) => p.categoria_nombre === categoria);
    }

    if (filtro) {
      productosFiltrados = productosFiltrados.filter(
        (p) =>
          p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          p.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
          p.categoria_nombre.toLowerCase().includes(filtro.toLowerCase())
      );
    }

    if (productosFiltrados.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay productos en el inventario</td></tr>';
      return;
    }

    tbody.innerHTML = productosFiltrados
      .map((producto) => {
        const valorTotal = (producto.stock * producto.precio).toFixed(2);
        return `
        <tr>
          <td>${producto.codigo}</td>
          <td>${producto.nombre}</td>
          <td>${producto.categoria_nombre}</td>
          <td>${producto.stock}</td>
          <td>$${parseFloat(producto.precio).toFixed(2)}</td>
          <td>$${valorTotal}</td>
          <td>
            <button class="action-btn" onclick="app.verDetalleProducto('${producto.id}')">Ver Detalle</button>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  renderizarFiltrosInventario() {
    const mainFilterBtn = document.getElementById("mainFilterBtn");
    const filterOptions = document.getElementById("filterOptions");

    if (!mainFilterBtn || !filterOptions) return;

    mainFilterBtn.onclick = function (e) {
      e.stopPropagation();
      filterOptions.classList.toggle("show");
      mainFilterBtn.classList.toggle("active");
    };

    let categorias = this.categorias;

    if (categorias.length === 0) {
      filterOptions.innerHTML = "<div>No hay categorías disponibles</div>";
      return;
    }

    filterOptions.innerHTML = '<button class="filter-btn filter-cat active" data-filter-cat="todos">Todos</button>';

    filterOptions.innerHTML += categorias
      .map((categoria) => {
        return `<button class="filter-btn filter-cat" data-filter-cat="${categoria.nombre}">${categoria.nombre}</button>`;
      })
      .join("");

    document.addEventListener("click", function (e) {
      if (!filterOptions.contains(e.target) && e.target !== mainFilterBtn) {
        filterOptions.classList.remove("show");
        mainFilterBtn.classList.remove("active");
      }
    });

    filterOptions.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  inicializarBusquedaInventario() {
    const searchInput = document.getElementById("search-inventario-full");
    if (searchInput) {
      searchInput.onchange = (e) => {
        const activeFilter = document.querySelector("[data-filter-cat].filter-btn.active");
        const categoria = activeFilter ? activeFilter.getAttribute("data-filter-cat") : "todos";
        this.renderizarInventarioCompleto(e.target.value, categoria);
      };
      searchInput.oninput = (e) => {
        const activeFilter = document.querySelector("[data-filter-cat].filter-btn.active");
        const categoria = activeFilter ? activeFilter.getAttribute("data-filter-cat") : "todos";
        this.renderizarInventarioCompleto(e.target.value, categoria);
      };
    }
  }

  verDetalleProducto(productoId) {
    const producto = this.productos.find((p) => p.id === productoId);
    if (!producto) return;

    const modal = document.getElementById("producto-detalle-modal");
    const content = document.getElementById("producto-detalle-content");
    const titulo = document.getElementById("producto-detalle-titulo");

    if (titulo) {
      titulo.textContent = `Detalles de ${producto.nombre}`;
    }

    const movimientosProducto = this.movimientos.filter((m) => {
      if (m.detalles) {
        return m.detalles.some((p) => p.producto_id === productoId);
      }
      return m.productoId === productoId;
    });

    const valorTotal = (producto.stock * producto.precio).toFixed(2);

    if (content) {
      content.innerHTML = `
        <div class="producto-detalle-grid">
          <div class="detalle-item">
            <span class="detalle-label">Código</span>
            <span class="detalle-value">${producto.codigo}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Nombre</span>
            <span class="detalle-value">${producto.nombre}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Categoría</span>
            <span class="detalle-value">${producto.categoria_nombre}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Stock Actual</span>
            <span class="detalle-value">${producto.stock}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Precio Unitario</span>
            <span class="detalle-value">$${parseFloat(producto.precio).toFixed(2)}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Valor Total</span>
            <span class="detalle-value">$${valorTotal}</span>
          </div>
        </div>

        <div class="movimientos-producto">
          <h4>Historial de Movimientos (${movimientosProducto.length})</h4>
          ${movimientosProducto.length === 0
          ? '<p style="color: var(--text-secondary);">No hay movimientos registrados para este producto</p>'
          : movimientosProducto
            .reverse()
            .slice(0, 10)
            .map((mov) => {
              const fecha = new Date(mov.fecha);
              const fechaFormateada = fecha.toLocaleString("es-ES");
              let cantidad = "";
              if (mov.detalles && Array.isArray(mov.detalles)) {
                mov.detalles.forEach((detalle) => {
                  if (detalle.producto_id === productoId) {
                    cantidad = detalle.cantidad;
                  }
                });
              }
              if (mov.productos) {
                const prodEnMov = mov.productos.find((p) => p.id === productoId);
                if (prodEnMov) cantidad = prodEnMov.cantidad;
              }
              return `
                <div class="movimiento-item">
                  <div class="movimiento-info">
                    <span class="status-badge ${mov.tipo}">${mov.tipo === "entrada" ? "Entrada" : "Salida"}</span>
                    <span>${cantidad} unidades</span>
                    <span class="movimiento-fecha">${fechaFormateada}</span>
                  </div>
                  <span>${mov.nombre_usuario}</span>
                </div>
              `;
            })
            .join("")
        }
        </div>
      `;
    }

    if (modal) {
      modal.classList.add("show");
    }

    const closeBtn = document.getElementById("producto-detalle-close");
    if (closeBtn) {
      closeBtn.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }
  }

  // ==================== ENTRADA DE PRODUCTOS ====================

  renderDefaultEntradaItem() {
    const listEntrada = document.getElementById("productos-entrada-list");
    if (!listEntrada) return;

    const countItems = listEntrada.querySelectorAll(".producto-entrada-item").length;
    const existingMsg = document.getElementById("no-productos");

    if (countItems === 0 && !existingMsg) {
      const defaultItem = document.createElement("div");
      defaultItem.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--text-secondary);" id="no-productos">No hay productos agregados</p>';
      listEntrada.appendChild(defaultItem);
    }
  }

  inicializarEntrada() {
    const entryBtnOptions = document.getElementById("entrada-options-btn");
    const entryFilterOptions = document.getElementById("entrada-filter-options");
    const addBtn = document.getElementById("producto-existente-btn");
    const addNewBtn = document.getElementById("producto-nuevo-btn");
    const registrarBtn = document.getElementById("registrar-entrada");

    this.renderDefaultEntradaItem();

    if (entryBtnOptions) {
      entryBtnOptions.onclick = function (e) {
        e.stopPropagation();
        entryFilterOptions.classList.toggle("show");
        entryBtnOptions.classList.toggle("active");
      };
    }

    document.addEventListener("click", function (e) {
      if (entryFilterOptions && entryBtnOptions && !entryFilterOptions.contains(e.target) && e.target !== entryBtnOptions) {
        entryFilterOptions.classList.remove("show");
        entryBtnOptions.classList.remove("active");
      }
    });

    if (entryFilterOptions) {
      entryFilterOptions.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    if (addBtn) {
      addBtn.onclick = () => {
        const option = addBtn.getAttribute("data-option-entrada");
        this.agregarProductoEntrada(option);
      };
    }

    if (addNewBtn) {
      addNewBtn.onclick = () => {
        const option = addNewBtn.getAttribute("data-option-entrada");
        this.agregarProductoEntrada(option);
      };
    }

    if (registrarBtn) {
      registrarBtn.onclick = () => {
        this.registrarEntrada();
      };
    }
  }

  agregarProductoEntrada(option) {
    const list = document.getElementById("productos-entrada-list");
    if (!list) return;

    const noProductosMsg = document.getElementById("no-productos");
    if (noProductosMsg) {
      list.innerHTML = "";
    }

    const newItem = document.createElement("div");
    newItem.className = "producto-entrada-item ";
    newItem.style.animation = "fadeIn 0.3s ease-in-out";

    const currentItems = list.querySelectorAll(".producto-entrada-item").length;

    if (option === "nuevo") {
      let categoriasOptions = "";
      if (this.categorias && Array.isArray(this.categorias)) {
        this.categorias.forEach((categoria) => {
          categoriasOptions += `<option value="${categoria.id}">${categoria.nombre}</option>`;
        });
      }

      let proveedoresOptions = "";
      if (this.proveedores && Array.isArray(this.proveedores)) {
        this.proveedores.forEach((proveedor) => {
          proveedoresOptions += `<option value="${proveedor.id}">${proveedor.nombre}</option>`;
        });
      }

      newItem.innerHTML = `
        <div class="item-header">
          <h4>Producto ${currentItems + 1}</h4>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Nombre del Producto *</label>
            <input type="text" class="form-input producto-nombre" required />
          </div>
          <div class="form-group">
            <label>Código *</label>
            <input type="text" class="form-input producto-codigo" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Cantidad *</label>
            <input type="number" class="form-input producto-cantidad" min="1" required />
          </div>
          <div class="form-group">
            <label>Precio Unitario *</label>
            <input type="number" class="form-input producto-precio" step="0.01" min="0" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Categoría *</label>
            <select class="form-input producto-categoria" required>
              <option value="">Seleccionar categoría</option>
              ${categoriasOptions}
            </select>
          </div>
          <div class="form-group">
            <label>Proveedor *</label>
            <select class="form-input producto-proveedor" required>
              <option value="">Seleccionar proveedor</option>
              ${proveedoresOptions}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Notas (opcional)</label>
          <textarea class="form-input producto-notas" rows="2"></textarea>
        </div>
        <button type="button" class="btn btn-secondary btn-remove-producto">Eliminar Producto</button>
      `;

      list.appendChild(newItem);
    } else if (option === "existente") {
      let productosOptions = "";
      if (this.productos && Array.isArray(this.productos)) {
        this.productos.forEach((producto) => {
          productosOptions += `<option value="${producto.id}">${producto.nombre} - Stock: ${producto.stock}</option>`;
        });
      }

      let proveedoresOptions = "";
      if (this.proveedores && Array.isArray(this.proveedores)) {
        this.proveedores.forEach((proveedor) => {
          proveedoresOptions += `<option value="${proveedor.id}">${proveedor.nombre}</option>`;
        });
      }

      newItem.innerHTML = `
        <div class="item-header">
          <h4>Producto ${currentItems + 1}</h4>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Producto *</label>
            <select class="form-input entrada-producto" required>
              <option value="">Seleccionar producto</option>
              ${productosOptions}
            </select>
          </div>
          <div class="form-group">
            <label>Codigo</label>
            <input type="text" class="form-input entrada-code" readonly />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Cantidad *</label>
            <input type="number" class="form-input entrada-cantidad" min="1" required />
          </div>
          <div class="form-group">
            <label>Precio Unitario *</label>
            <input type="number" class="form-input entrada-precio" min="1" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Categoría</label>
            <input type="text" class="form-input entrada-categoria" readonly />
          </div>
          <div class="form-group">
            <label>Proveedor *</label>
            <select class="form-input entrada-proveedor" min="1" required>
              <option value="">Seleccionar proveedor</option>
              ${proveedoresOptions}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Notas (opcional)</label>
          <textarea class="form-input entrada-notas" rows="2"></textarea>
        </div>
        <button type="button" class="btn btn-secondary btn-remove-producto">Eliminar Producto</button>
      `;

      const selectProduct = newItem.querySelector(".entrada-producto");

      selectProduct.onchange = (e) => {
        const productoId = e.target.value;
        const producto = this.productos.find((p) => p.id === productoId);
        const categoriaInput = newItem.querySelector(".entrada-categoria");
        const codeInput = newItem.querySelector(".entrada-code");

        if (producto && categoriaInput && codeInput) {
          categoriaInput.value = producto.categoria_nombre;
          codeInput.value = producto.codigo;
        } else if (categoriaInput && codeInput) {
          categoriaInput.value = "";
          codeInput.value = "";
        }
      };

      list.appendChild(newItem);
    }

    const removeBtn = newItem.querySelector(".btn-remove-producto");
    if (removeBtn) {
      removeBtn.onclick = () => {
        newItem.remove();
        this.actualizarNumeracionProductos("entrada");

        const updatedList = document.getElementById("productos-entrada-list");
        const remainingItems = updatedList.querySelectorAll(".producto-entrada-item").length;

        if (remainingItems === 0) {
          this.renderDefaultEntradaItem();
        }

        this.mostrarBotonesEliminarEntrada();
      };
    }

    this.actualizarNumeracionProductos("entrada");
    this.mostrarBotonesEliminarEntrada();
  }

  mostrarBotonesEliminarEntrada() {
    const list = document.getElementById("productos-entrada-list");
    if (!list) return;

    const items = list.querySelectorAll(".producto-entrada-item");
    const noProductosMsg = document.getElementById("no-productos");

    if (noProductosMsg) {
      return;
    }

    items.forEach((item, index) => {
      const removeBtn = item.querySelector(".btn-remove-producto");
      if (removeBtn) {
        removeBtn.style.display = items.length >= 1 ? "inline-block" : "none";
      }
    });
  }

  actualizarNumeracionProductos(tipo) {
    const listId = tipo === "entrada" ? "productos-entrada-list" : "productos-salida-list";
    const list = document.getElementById(listId);
    if (!list) return;

    const items = list.querySelectorAll(tipo === "entrada" ? ".producto-entrada-item" : ".producto-salida-item");

    items.forEach((item, index) => {
      const header = item.querySelector(".item-header h4");
      if (header) {
        header.textContent = `Producto ${index + 1}`;
      }
    });
  }

  async registrarEntrada() {
    const list = document.getElementById("productos-entrada-list");
    if (!list) return;

    const items = list.querySelectorAll(".producto-entrada-item");
    const productos = [];

    if (items.length === 0) {
      this.mostrarNotificacion("Agrega al menos un producto para registrar la entrada", "error");
      return;
    }

    let validacionFallida = false;

    items.forEach((item) => {
      if (validacionFallida) return;

      const esNuevo = item.querySelector(".producto-nombre") !== null;

      let datosProducto = {};

      if (esNuevo) {
        const nombre = item.querySelector(".producto-nombre").value.trim();
        const codigo = item.querySelector(".producto-codigo").value.trim();
        const cantidad = item.querySelector(".producto-cantidad").value;
        const precio = item.querySelector(".producto-precio").value;
        const categoria_id = item.querySelector(".producto-categoria").value;
        const proveedor_id = item.querySelector(".producto-proveedor").value;
        const notas = item.querySelector(".producto-notas").value.trim();

        const validaciones = [
          this.validarCampoVacio(nombre, 'nombre'),
          this.validarCampoVacio(codigo, 'código'),
          this.validarCampoVacio(cantidad, 'cantidad'),
          this.validarCampoVacio(precio, 'precio'),
          this.validarCampoVacio(categoria_id, 'categoría'),
          this.validarNumeroPositivo(cantidad, 'Cantidad'),
          this.validarNumeroPositivo(precio, 'Precio')
        ];

        for (let validacion of validaciones) {
          if (!validacion.valid) {
            this.mostrarNotificacion(validacion.mensaje, "error");
            validacionFallida = true;
            return;
          }
        }

        datosProducto = {
          tipo: "nuevo",
          nombre: nombre,
          codigo: codigo,
          cantidad: parseInt(cantidad),
          precio: parseFloat(precio),
          categoria_id: categoria_id,
          proveedor_id: proveedor_id,
          notas: notas,
          descripcion: notas,
        };
      } else {
        const id = item.querySelector(".entrada-producto").value;
        const codigo = item.querySelector(".entrada-code").value;
        const cantidad = item.querySelector(".entrada-cantidad").value;
        const precio = item.querySelector(".entrada-precio").value;
        const proveedor_id = item.querySelector(".entrada-proveedor")?.value || "";
        const notas = item.querySelector(".entrada-notas").value.trim();

        const validaciones = [
          this.validarCampoVacio(id, 'producto'),
          this.validarCampoVacio(cantidad, 'cantidad'),
          this.validarCampoVacio(precio, 'precio'),
          this.validarNumeroPositivo(cantidad, 'Cantidad'),
          this.validarNumeroPositivo(precio, 'Precio')
        ];

        for (let validacion of validaciones) {
          if (!validacion.valid) {
            this.mostrarNotificacion(validacion.mensaje, "error");
            validacionFallida = true;
            return;
          }
        }

        datosProducto = {
          tipo: "existente",
          id: id,
          codigo: codigo,
          cantidad: parseInt(cantidad),
          precio: parseFloat(precio),
          proveedor_id: proveedor_id,
          notas: notas,
        };
      }
      productos.push(datosProducto);
    });

    if (validacionFallida) return;

    try {
      const data = new FormData();
      data.append("productos", JSON.stringify(productos));

      const response = await fetch("entradas/registrar", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        this.mostrarNotificacion("Error al registrar la entrada. Inténtalo de nuevo.", "error");
        return;
      }

      const result = await response.json();

      if (result.status === true) {
        this.mostrarNotificacion("Entrada registrada exitosamente", "success");
        list.innerHTML = "";
        this.renderDefaultEntradaItem();

        await this.cargarDatosCompletos().then(() => {
          this.renderizarInventarioCompleto();
          this.renderizarResumen();
          this.renderizarHistorial();
        });
      } else {
        this.mostrarNotificacion(result.message || "Error al registrar la entrada", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      this.mostrarNotificacion("Error de conexión. Verifica tu conexión a internet.", "error");
    }
  }

  // ==================== SALIDA DE PRODUCTOS ====================

  renderDefaultSalidaItem() {
    const listSalida = document.getElementById("productos-salida-list");
    if (!listSalida) return;

    const countItems = listSalida.querySelectorAll(".producto-salida-item").length;

    if (countItems === 0) {
      listSalida.innerHTML = `
            <div id="no-productos-salida" style="text-align: center; padding: 20px; color: var(--text-secondary);">
                <p>No hay productos seleccionados para la salida</p>
            </div>
        `;
    }
  }

  inicializarSalida() {
    const addBtn = document.getElementById("add-producto-salida");
    const registrarBtn = document.getElementById("registrar-salida");

    this.renderDefaultSalidaItem();

    if (addBtn) {
      addBtn.onclick = () => {
        this.agregarProductoSalida();
      };
    }

    if (registrarBtn) {
      registrarBtn.onclick = () => {
        this.registrarSalida();
      };
    }

    this.actualizarSelectProductos();
    this.actualizarSelectClientes();
    this.inicializarCambiosProductoSalida();
  }

  agregarProductoSalida() {
    const list = document.getElementById("productos-salida-list");
    if (!list) return;

    const noProductosMsg = document.getElementById("no-productos-salida");
    if (noProductosMsg) {
      list.innerHTML = "";
    }

    const newItem = document.createElement("div");
    newItem.className = "producto-salida-item";
    newItem.style.animation = "fadeIn 0.3s ease-in-out";

    const currentItems = list.querySelectorAll(".producto-salida-item").length;

    const productosDisponibles = this.productos.filter((p) => p.stock > 0);
    let productosOptions = productosDisponibles
      .map((p) => `<option value="${p.id}">${p.nombre} (${p.codigo}) - Stock: ${p.stock}</option>`)
      .join("");

    newItem.innerHTML = `
        <div class="item-header">
            <h4>Producto ${currentItems + 1}</h4>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Producto *</label>
                <select class="form-input salida-producto" required>
                    <option value="">Seleccionar producto</option>
                    ${productosOptions}
                </select>
            </div>
            <div class="form-group">
                <label>Stock Disponible</label>
                <input type="text" class="form-input salida-stock" readonly />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Cantidad a Retirar *</label>
                <input type="number" class="form-input salida-cantidad" min="1" required />
            </div>
            <div class="form-group">
                <label>Motivo *</label>
                <select class="form-input salida-motivo" required>
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
            <label>Notas (opcional)</label>
            <textarea class="form-input salida-notas" rows="2"></textarea>
        </div>
        <button type="button" class="btn btn-secondary btn-remove-producto">Eliminar Producto</button>
    `;

    list.appendChild(newItem);

    const selectProducto = newItem.querySelector(".salida-producto");
    selectProducto.onchange = (e) => {
      const producto = this.productos.find((p) => p.id === e.target.value);
      const stockInput = newItem.querySelector(".salida-stock");
      if (stockInput) stockInput.value = producto ? producto.stock : "";
    };

    const removeBtn = newItem.querySelector(".btn-remove-producto");
    removeBtn.onclick = () => {
      newItem.remove();
      this.actualizarNumeracionProductos("salida");

      if (list.querySelectorAll(".producto-salida-item").length === 0) {
        this.renderDefaultSalidaItem();
      }
    };

    this.actualizarNumeracionProductos("salida");
    this.mostrarBotonesEliminarSalida();
  }

  mostrarBotonesEliminarSalida() {
    const list = document.getElementById("productos-salida-list");
    if (!list) return;

    const items = list.querySelectorAll(".producto-salida-item");
    items.forEach((item, index) => {
      const removeBtn = item.querySelector(".btn-remove-salida");
      if (removeBtn) {
        removeBtn.style.display = items.length >= 1 ? "inline-block" : "none";
      }
    });
  }

  inicializarCambiosProductoSalida() {
    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("salida-producto")) {
        const item = e.target.closest(".producto-salida-item");
        if (!item) return;

        const productoId = e.target.value;
        const producto = this.productos.find((p) => p.id === productoId);
        const stockInput = item.querySelector(".salida-stock");

        if (producto && stockInput) {
          stockInput.value = producto.stock.toString();
        } else if (stockInput) {
          stockInput.value = "";
        }
      }
    });
  }

  actualizarSelectProductos() {
    const selects = document.querySelectorAll(".salida-producto");
    const productosDisponibles = this.productos.filter((p) => p.stock > 0);

    selects.forEach((select) => {
      const currentValue = select.value;
      select.innerHTML =
        '<option value="">Seleccionar producto</option>' +
        productosDisponibles
          .map((p) => `<option value="${p.id}">${p.nombre} (${p.codigo}) - Stock: ${p.stock}</option>`)
          .join("");

      if (currentValue) {
        select.value = currentValue;
      }
    });
  }

  actualizarSelectClientes() {
    const select = document.getElementById("salida-cliente-select");
    if (!select) return;

    const clientesActivos = this.clientes.filter((c) => c.activo);

    select.innerHTML =
      '<option value="">Seleccionar cliente</option>' +
      clientesActivos.map((c) => `<option value="${c.id}">${c.nombre}</option>`).join("");
  }

  async registrarSalida() {
    const list = document.getElementById("productos-salida-list");
    if (!list) return;

    const items = list.querySelectorAll(".producto-salida-item");
    const productos = [];
    const cliente_id = document.getElementById("salida-cliente-select").value;

    if (items.length === 0) {
      this.mostrarNotificacion("Agrega al menos un producto para registrar la salida", "error");
      return;
    }

    const validacionCliente = this.validarCampoVacio(cliente_id, 'cliente');
    if (!validacionCliente.valid) {
      this.mostrarNotificacion("Selecciona un cliente para la salida", "error");
      return;
    }

    let errorFound = false;
    items.forEach((item) => {
      const productoId = item.querySelector(".salida-producto").value;
      const cantidad = item.querySelector(".salida-cantidad").value;
      const motivo = item.querySelector(".salida-motivo").value;
      const notas = item.querySelector(".salida-notas").value.trim();

      const validaciones = [
        this.validarCampoVacio(productoId, 'producto'),
        this.validarCampoVacio(cantidad, 'cantidad'),
        this.validarCampoVacio(motivo, 'motivo'),
        this.validarNumeroPositivo(cantidad, 'Cantidad')
      ];

      for (let validacion of validaciones) {
        if (!validacion.valid) {
          this.mostrarNotificacion(validacion.mensaje, "error");
          errorFound = true;
          return;
        }
      }

      const producto = this.productos.find((p) => p.id === productoId);
      if (!producto) {
        this.mostrarNotificacion("Producto no encontrado", "error");
        errorFound = true;
        return;
      }

      if (parseInt(cantidad) > producto.stock) {
        this.mostrarNotificacion(`Stock insuficiente para ${producto.nombre}. Stock disponible: ${producto.stock}`, "error");
        errorFound = true;
        return;
      }

      productos.push({
        id: productoId,
        codigo: producto.codigo,
        cantidad: parseInt(cantidad),
        motivo: motivo,
        notas: notas,
        precio: parseFloat(producto.precio),
      });
    });

    if (errorFound || productos.length === 0) {
      return;
    }

    try {
      const data = new FormData();
      data.append("productos", JSON.stringify(productos));
      data.append("cliente_id", cliente_id);

      const response = await fetch("salidas/registrar", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        this.mostrarNotificacion("Error al registrar la salida. Inténtalo de nuevo.", "error");
        return;
      }

      const result = await response.json();

      if (result.status === true) {
        this.mostrarNotificacion("Salida registrada exitosamente", "success");

        list.innerHTML = "";
        this.renderDefaultSalidaItem();

        document.getElementById("salida-cliente-select").value = "";

        await this.cargarDatosCompletos().then(() => {
          this.renderizarInventarioCompleto();
          this.renderizarResumen();
          this.actualizarSelectProductos();
          this.renderizarHistorial();
        });
      } else {
        this.mostrarNotificacion(result.message || "Error al registrar la salida", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      this.mostrarNotificacion("Error de conexión. Verifica tu conexión a internet.", "error");
    }
  }

  // ==================== HISTORIAL ====================

  inicializarHistorial() {
    this.renderizarHistorial();
    this.inicializarFiltrosHistorial();
    this.inicializarBusquedaHistorial();
  }

  renderizarHistorial(filtroTipo = "todos", filtroBusqueda = "") {
    const tbody = document.getElementById("historial-table");
    if (!tbody) return;

    let movimientosFiltrados = [...this.movimientos].reverse();

    if (filtroTipo !== "todos") {
      movimientosFiltrados = movimientosFiltrados.filter((m) => m.tipo === filtroTipo);
    }

    if (filtroBusqueda) {
      movimientosFiltrados = movimientosFiltrados.filter((m) => {
        const searchLower = filtroBusqueda.toLowerCase();
        return (
          m.usuario.toLowerCase().includes(searchLower) ||
          (m.cliente && m.cliente.toLowerCase().includes(searchLower)) ||
          (m.productoNombre && m.productoNombre.toLowerCase().includes(searchLower))
        );
      });
    }

    if (movimientosFiltrados.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay movimientos registrados</td></tr>';
      return;
    }

    tbody.innerHTML = movimientosFiltrados
      .map((movimiento) => {
        const fecha = new Date(movimiento.fecha);
        const fechaFormateada = fecha.toLocaleString("es-ES");

        const productosTexto = movimiento.cantidad_total ? `${movimiento.cantidad_total} producto(s)` : "N/A";

        const clienteProveedor = movimiento.tipo === "entrada" ? movimiento.nombre_proveedor || "N/A" : movimiento.nombre_cliente || "N/A";

        return `
        <tr>
          <td>${fechaFormateada}</td>
          <td><span class="status-badge ${movimiento.tipo}">${movimiento.tipo === "entrada" ? "Entrada" : "Salida"}</span></td>
          <td>${productosTexto}</td>
          <td>${movimiento.nombre_usuario}</td>
          <td>${clienteProveedor}</td>
          <td>${movimiento.valor_total}</td>
          <td>
            <button class="action-btn" onclick="app.verDetalleHistorial('${movimiento.id}')">Ver Detalle</button>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  verDetalleHistorial(movimeintoId) {
    const movimiento = this.movimientos.find((p) => p.id === movimeintoId);
    if (!movimiento) return;

    const movimientosProducto = movimiento.detalles;

    const modal = document.getElementById("historial-detalle-modal");
    const content = document.getElementById("historial-detalle-content");
    const titulo = document.getElementById("historial-detalle-titulo");

    const proveedor_cliente = movimiento.nombre_cliente ? movimiento.nombre_cliente : movimiento.nombre_proveedor;

    const productos = movimiento.total_productos === 1 ? movimiento.total_productos + " Producto" : movimiento.total_productos + " Productos";

    const unidades = movimiento.total_cantidad === 1 ? movimiento.total_cantidad + " Unidad" : movimiento.total_cantidad + " Unidades";

    if (content) {
      content.innerHTML = `
        <div class="producto-detalle-grid">
          <div class="detalle-item">
            <span class="detalle-label">Cliente/Proveedor</span>
            <span class="detalle-value">${proveedor_cliente}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Usuario</span>
            <span class="detalle-value">${movimiento.nombre_usuario}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Total de productos</span>
            <span class="detalle-value">${productos}</span>
          </div>
           <div class="detalle-item">
            <span class="detalle-label">Total de unidades</span>
            <span class="detalle-value">${unidades}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Tipo de movimiento</span>
            <span class="detalle-value">${movimiento.tipo}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Precio total</span>
            <span class="detalle-value">$${parseFloat(movimiento.valor_total).toFixed(2)}</span>
          </div>
        </div>

        <div class="movimientos-producto">
          <h4>Historial de Movimientos (${movimientosProducto.length})</h4>
          ${movimientosProducto.length === 0
          ? '<p style="color: var(--text-secondary);">No hay movimientos registrados para este producto</p>'
          : movimientosProducto
            .reverse()
            .slice(0, 10)
            .map((mov) => {
              const fecha = new Date(mov.created_at);
              const fechaFormateada = fecha.toLocaleString("es-ES");
              const precio_total = mov.precio_unitario * mov.cantidad;
              return `
                <div class="movimiento-item">
                  <div class="movimiento-info">
                    <span>${mov.nombre_producto}</span>
                    <span>${mov.cantidad} unidades</span>
                    <span class="movimiento-fecha">Precio unitario: ${mov.precio_unitario}</span>
                    <span class="movimiento-fecha">Precio total: ${precio_total.toFixed(2)}</span>
                  </div>
                </div>
              `;
            })
            .join("")
        }
        </div>
      `;
    }

    if (modal) {
      modal.classList.add("show");
    }

    const closeBtn = document.getElementById("historial-detalle-close");
    if (closeBtn) {
      closeBtn.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }
  }

  inicializarFiltrosHistorial() {
    const filterButtons = document.querySelectorAll("[data-filter].filter-btn");

    filterButtons.forEach((button) => {
      button.onclick = (e) => {
        const target = e.target;
        const filter = target.getAttribute("data-filter");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        target.classList.add("active");

        const searchInput = document.getElementById("search-historial");
        this.renderizarHistorial(filter || "todos", searchInput ? searchInput.value : "");
      };
    });
  }

  inicializarBusquedaHistorial() {
    const searchInput = document.getElementById("search-historial");
    if (searchInput) {
      searchInput.oninput = (e) => {
        const activeFilter = document.querySelector("[data-filter].filter-btn.active");
        const filter = activeFilter ? activeFilter.getAttribute("data-filter") : "todos";
        this.renderizarHistorial(filter || "todos", e.target.value);
      };
    }
  }

  // ==================== CATEGORÍAS ====================

  inicializarCategorias() {
    this.renderizarCategorias();
    this.inicializarBusquedaCategorias();
    this.inicializarModalCategoria();
    this.inicializarConfirmacionCategoria();
  }

  renderizarCategorias(filtro = "") {
    const tbody = document.getElementById("categorias-table");
    if (!tbody) return;

    const categoriasFiltradas = filtro
      ? this.categorias.filter(
        (c) =>
          c.nombre.toLowerCase().includes(filtro.toLowerCase()) || c.descripcion.toLowerCase().includes(filtro.toLowerCase())
      )
      : this.categorias;

    if (categoriasFiltradas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay categorías registradas</td></tr>';
      return;
    }

    tbody.innerHTML = categoriasFiltradas
      .map((categoria) => {
        return `
        <tr>
          <td>${categoria.nombre}</td>
          <td>${categoria.codigo}</td>
          <td>${categoria.descripcion}</td>
          <td>${categoria.cantidad_productos}</td>
          <td><span class="status-badge ${categoria.activo ? "activo" : "inactivo"}">${categoria.activo ? "Activo" : "Inactivo"}</span></td>
          <td>
            <button class="action-btn" onclick="app.editarCategoria('${categoria.id}')">Editar</button>
            <button class="action-btn delete" onclick="app.eliminarCategoria('${categoria.id}')">Eliminar</button>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  inicializarBusquedaCategorias() {
    const searchInput = document.getElementById("search-categorias");
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.renderizarCategorias(e.target.value);
      };
    }
  }

  inicializarModalCategoria() {
    const addCategoriaBtn = document.getElementById("add-categoria-btn");
    const modal = document.getElementById("categoria-modal");
    const modalClose = document.getElementById("categoria-modal-close");
    const modalCancel = document.getElementById("categoria-modal-cancel");
    const categoriaForm = document.getElementById("categoria-form");

    if (addCategoriaBtn) {
      addCategoriaBtn.onclick = () => {
        this.editingCategoriaId = null;
        this.limpiarFormularioCategoria();
        const modalTitle = document.getElementById("categoria-modal-title");
        document.getElementById("categoria-id").value = "";
        if (modalTitle) modalTitle.textContent = "Añadir Categoría";
        if (modal) modal.classList.add("show");
      };
    }

    if (modalClose) {
      modalClose.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modalCancel) {
      modalCancel.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (categoriaForm) {
      categoriaForm.onsubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById("categoria-id").value;
        const nombre = document.getElementById("categoria-nombre").value.trim();
        const codigo = document.getElementById("categoria-codigo").value.trim();
        const descripcion = document.getElementById("categoria-descripcion").value.trim();

        const validaciones = [
          this.validarCampoVacio(nombre, 'nombre'),
          this.validarCampoVacio(codigo, 'código'),
          this.validarCampoVacio(descripcion, 'descripción')
        ];

        for (let validacion of validaciones) {
          if (!validacion.valid) {
            this.mostrarNotificacion(validacion.mensaje, "error");
            return;
          }
        }

        const data = new FormData();
        data.append("categoria-nombre", nombre);
        data.append("categoria-codigo", codigo);
        data.append("categoria-descripcion", descripcion);
        if (id) {
          data.append("categoria-id", id);
        }

        if (!id) {
          const response = await fetch("categorias/guardar", {
            method: "POST",
            body: data,
          });

          if (!response.ok) {
            this.mostrarNotificacion("Error al guardar la categoría", "error");
            return;
          }

          const result = await response.json();

          if (result.status === true) {
            this.mostrarNotificacion("Categoría guardada exitosamente", "success");
            this.cargarDatosCompletos().then(() => {
              this.inicializarCategorias();
              this.actualizarSelectsCategorias();
            });
          }
        } else {
          const response = await fetch("categorias/actualizar", {
            method: "POST",
            body: data,
          });

          if (!response.ok) {
            this.mostrarNotificacion("Error al actualizar la categoría", "error");
            return;
          }

          const result = await response.json();

          if (result.status === "success") {
            this.mostrarNotificacion("Categoría actualizada exitosamente", "success");
            this.cargarDatosCompletos().then(() => {
              this.inicializarCategorias();
              this.actualizarSelectsCategorias();
            });
          }
        }

        const modal = document.getElementById("categoria-modal");
        if (modal) modal.classList.remove("show");
        this.limpiarFormularioCategoria();
      };
    }
  }

  editarCategoria(id) {
    const categoria = this.categorias.find((c) => c.id === id);
    if (!categoria) return;

    document.getElementById("categoria-id").value = categoria.id;
    document.getElementById("categoria-nombre").value = categoria.nombre;
    document.getElementById("categoria-codigo").value = categoria.codigo;
    document.getElementById("categoria-descripcion").value = categoria.descripcion;

    const modalTitle = document.getElementById("categoria-modal-title");
    if (modalTitle) modalTitle.textContent = "Editar Categoría";

    const modal = document.getElementById("categoria-modal");
    if (modal) modal.classList.add("show");
  }

  eliminarCategoria(id) {
    const categoria = this.categorias.find((c) => c.id === id);
    if (!categoria) return;

    document.getElementById("confirmacion-categoria-id").value = categoria.id;

    const modal = document.getElementById("confirmacion-categoria-modal");
    if (modal) modal.classList.add("show");
  }

  inicializarConfirmacionCategoria() {
    const modal = document.getElementById("confirmacion-categoria-modal");
    const confirmarBtn = document.getElementById("confirmacion-categoria-form");
    const closeBtn = document.getElementById("confirmacion-categoria-close");
    const cancelarBtn = document.getElementById("confirmacion-categoria-cancel");

    if (cancelarBtn) {
      cancelarBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (confirmarBtn) {
      confirmarBtn.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        const id = document.getElementById("confirmacion-categoria-id").value;
        data.append("confirmacion-categoria-id", id);

        const response = await fetch("categorias/eliminar", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          this.mostrarNotificacion("Error al eliminar la categoría", "error");
          modal.classList.remove("show");
          return;
        }

        this.mostrarNotificacion("Categoría eliminada exitosamente", "success");
        this.cargarDatosCompletos().then(() => {
          this.inicializarCategorias();
          this.actualizarSelectsCategorias();
        });
      };
    }

    if (modal) modal.classList.remove("show");
  }

  limpiarFormularioCategoria() {
    const categoriaForm = document.getElementById("categoria-form");
    if (categoriaForm) {
      categoriaForm.reset();
    }
  }

  actualizarSelectsCategorias() {
    const selects = document.querySelectorAll(".producto-categoria");
    const categoriasActivas = this.categorias.filter((c) => c.activo);

    selects.forEach((select) => {
      const currentValue = select.value;
      select.innerHTML =
        '<option value="">Seleccionar categoría</option>' +
        categoriasActivas.map((c) => `<option value="${c.nombre}">${c.nombre}</option>`).join("");

      if (currentValue) {
        select.value = currentValue;
      }
    });
  }

  // ==================== PROVEEDORES ====================

  inicializarProveedores() {
    this.renderizarProveedores();
    this.inicializarBusquedaProveedores();
    this.inicializarModalProveedor();
    this.inicializarConfirmacionProveedor();
  }

  renderizarProveedores(filtro = "") {
    const tbody = document.getElementById("proveedores-table");
    if (!tbody) return;

    const proveedoresFiltrados = filtro
      ? this.proveedores.filter(
        (p) =>
          p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          p.contacto.toLowerCase().includes(filtro.toLowerCase()) ||
          p.email.toLowerCase().includes(filtro.toLowerCase()) ||
          p.telefono.toLowerCase().includes(filtro.toLowerCase())
      )
      : this.proveedores;

    if (proveedoresFiltrados.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay proveedores registrados</td></tr>';
      return;
    }

    tbody.innerHTML = proveedoresFiltrados
      .map(
        (proveedor) => `
      <tr>
        <td>${proveedor.nombre}</td>
        <td>${proveedor.contacto}</td>
        <td>${proveedor.email}</td>
        <td>${proveedor.telefono}</td>
        <td>${proveedor.direccion}</td>
        <td><span class="status-badge ${proveedor.activo ? "activo" : "inactivo"}">${proveedor.activo ? "Activo" : "Inactivo"}</span></td>
        <td>
          <button class="action-btn" onclick="app.editarProveedor('${proveedor.id}')">Editar</button>
          <button class="action-btn delete" onclick="app.eliminarProveedor('${proveedor.id}')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  inicializarBusquedaProveedores() {
    const searchInput = document.getElementById("search-proveedores");
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.renderizarProveedores(e.target.value);
      };
    }
  }

  inicializarModalProveedor() {
    const addProveedorBtn = document.getElementById("add-proveedor-btn");
    const modal = document.getElementById("proveedor-modal");
    const modalClose = document.getElementById("proveedor-modal-close");
    const modalCancel = document.getElementById("proveedor-modal-cancel");
    const proveedorForm = document.getElementById("proveedor-form");

    if (addProveedorBtn) {
      addProveedorBtn.onclick = () => {
        this.editingProveedorId = null;
        this.limpiarFormularioProveedor();
        document.getElementById("proveedor-id").value = "";
        const modalTitle = document.getElementById("proveedor-modal-title");
        if (modalTitle) modalTitle.textContent = "Añadir Proveedor";
        if (modal) modal.classList.add("show");
      };
    }

    if (modalClose) {
      modalClose.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modalCancel) {
      modalCancel.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (proveedorForm) {
      proveedorForm.onsubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById("proveedor-id").value.trim();
        const nombre = document.getElementById("proveedor-nombre").value.trim();
        const contacto = document.getElementById("proveedor-contacto").value.trim();
        const email = document.getElementById("proveedor-email").value.trim();
        const telefono = document.getElementById("proveedor-telefono").value.trim();
        const direccion = document.getElementById("proveedor-direccion").value.trim();
        const notas = document.getElementById("proveedor-notas").value.trim();

        const validaciones = [
          this.validarCampoVacio(nombre, 'nombre'),
          this.validarCampoVacio(contacto, 'contacto'),
          this.validarCampoVacio(email, 'email'),
          this.validarCampoVacio(telefono, 'teléfono'),
          this.validarCampoVacio(direccion, 'dirección')
        ];

        for (let validacion of validaciones) {
          if (!validacion.valid) {
            this.mostrarNotificacion(validacion.mensaje, "error");
            return;
          }
        }

        if (!this.validarEmail(email)) {
          this.mostrarNotificacion("Por favor ingrese un email válido", "error");
          return;
        }

        if (!this.validarTelefono(telefono)) {
          this.mostrarNotificacion("Por favor ingrese un teléfono válido (Solo numeros - 10/11 digitos)", "error");
          return;
        }

        if (!id) {
          const data = new FormData();
          data.append("proveedor-nombre", nombre);
          data.append("proveedor-contacto", contacto);
          data.append("proveedor-email", email);
          data.append("proveedor-telefono", telefono);
          data.append("proveedor-direccion", direccion);
          data.append("proveedor-notas", notas);

          const response = await fetch("proveedores/guardar", {
            method: "POST",
            body: data,
          });

          if (!response.ok) {
            this.mostrarNotificacion("Error al guardar el proveedor", "error");
            return;
          }

          const result = await response.json();

          if (result.status === "success") {
            this.mostrarNotificacion("Proveedor guardado exitosamente", "success");
            this.cargarDatosCompletos().then(() => {
              this.inicializarProveedores();
              this.actualizarSelectsProveedores();
            });
          }
        } else {
          const data = new FormData();
          data.append("proveedor-id", id);
          data.append("proveedor-nombre", nombre);
          data.append("proveedor-contacto", contacto);
          data.append("proveedor-email", email);
          data.append("proveedor-telefono", telefono);
          data.append("proveedor-direccion", direccion);
          data.append("proveedor-notas", notas);

          const response = await fetch("proveedores/actualizar", {
            method: "POST",
            body: data,
          });

          if (!response.ok) {
            this.mostrarNotificacion("Error al actualizar el proveedor", "error");
            return;
          }

          const result = await response.json();

          if (result.status === "success") {
            this.mostrarNotificacion("Proveedor actualizado exitosamente", "success");
            this.cargarDatosCompletos().then(() => {
              this.inicializarProveedores();
              this.actualizarSelectsProveedores();
            });
          }
        }

        const modal = document.getElementById("proveedor-modal");
        if (modal) modal.classList.remove("show");
        this.limpiarFormularioProveedor();
      };
    }
  }

  editarProveedor(id) {
    const proveedor = this.proveedores.find((p) => p.id === id);
    if (!proveedor) return;

    document.getElementById("proveedor-id").value = proveedor.id;
    document.getElementById("proveedor-nombre").value = proveedor.nombre;
    document.getElementById("proveedor-contacto").value = proveedor.contacto;
    document.getElementById("proveedor-email").value = proveedor.email;
    document.getElementById("proveedor-telefono").value = proveedor.telefono;
    document.getElementById("proveedor-direccion").value = proveedor.direccion;
    document.getElementById("proveedor-notas").value = proveedor.notas || "";

    const modalTitle = document.getElementById("proveedor-modal-title");
    if (modalTitle) modalTitle.textContent = "Editar Proveedor";

    const modal = document.getElementById("proveedor-modal");
    if (modal) modal.classList.add("show");
  }

  eliminarProveedor(id) {
    const proveedor = this.proveedores.find((p) => p.id === id);
    if (!proveedor) return;

    document.getElementById("confirmacion-proveedor-id").value = proveedor.id;

    const modal = document.getElementById("confirmacion-proveedor-modal");
    if (modal) modal.classList.add("show");
  }

  inicializarConfirmacionProveedor() {
    const modal = document.getElementById("confirmacion-proveedor-modal");
    const confirmarBtn = document.getElementById("confirmacion-proveedor-form");
    const closeBtn = document.getElementById("confirmacion-proveedor-close");
    const cancelarBtn = document.getElementById("confirmacion-proveedor-cancel");

    if (cancelarBtn) {
      cancelarBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (confirmarBtn) {
      confirmarBtn.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        const id = document.getElementById("confirmacion-proveedor-id").value;
        data.append("confirmacion-id", id);

        const response = await fetch("proveedores/eliminar", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          this.mostrarNotificacion("Error al eliminar el proveedor", "error");
          modal.classList.remove("show");
          return;
        }

        this.mostrarNotificacion("Proveedor eliminado exitosamente", "success");
        this.cargarDatosCompletos().then(() => {
          this.inicializarProveedores();
          this.actualizarSelectsProveedores();
        });
      };
    }

    if (modal) modal.classList.remove("show");
  }

  limpiarFormularioProveedor() {
    const proveedorForm = document.getElementById("proveedor-form");
    if (proveedorForm) {
      proveedorForm.reset();
    }
  }

  actualizarSelectsProveedores() {
    const inputs = document.querySelectorAll(".producto-proveedor");
    const proveedoresActivos = this.proveedores.filter((p) => p.activo);

    inputs.forEach((input) => {
      if (input.tagName === "SELECT") {
        const currentValue = input.value;
        input.innerHTML =
          '<option value="">Seleccionar proveedor</option>' +
          proveedoresActivos.map((p) => `<option value="${p.nombre}">${p.nombre}</option>`).join("");

        if (currentValue) {
          input.value = currentValue;
        }
      }
    });
  }

  // ==================== CLIENTES ====================

  inicializarClientes() {
    this.renderizarClientes();
    this.inicializarBusquedaClientes();
    this.inicializarModalCliente();
    this.inicializarConfirmacionCliente();
  }

  renderizarClientes(filtro = "") {
    const tbody = document.getElementById("clientes-table");
    if (!tbody) return;

    const clientesFiltrados = filtro
      ? this.clientes.filter(
        (c) =>
          c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          c.email.toLowerCase().includes(filtro.toLowerCase()) ||
          c.telefono.toLowerCase().includes(filtro.toLowerCase())
      )
      : this.clientes;

    if (clientesFiltrados.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay clientes registrados</td></tr>';
      return;
    }

    tbody.innerHTML = clientesFiltrados
      .map(
        (cliente) => `
      <tr>
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.direccion}</td>
        <td><span class="status-badge ${cliente.activo ? "activo" : "inactivo"}">${cliente.activo ? "Activo" : "Inactivo"}</span></td>
        <td>
          <button class="action-btn" onclick="app.editarCliente('${cliente.id}')">Editar</button>
          <button class="action-btn delete" onclick="app.eliminarCliente('${cliente.id}')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  inicializarBusquedaClientes() {
    const searchInput = document.getElementById("search-clientes");
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.renderizarClientes(e.target.value);
      };
    }
  }

  inicializarModalCliente() {
    const addClienteBtn = document.getElementById("add-cliente-btn");
    const modal = document.getElementById("cliente-modal");
    const modalClose = document.getElementById("cliente-modal-close");
    const modalCancel = document.getElementById("cliente-modal-cancel");
    const clienteForm = document.getElementById("cliente-form");

    if (addClienteBtn) {
      addClienteBtn.onclick = () => {
        this.editingClienteId = null;
        this.limpiarFormularioCliente();
        document.getElementById("cliente-id").value = "";
        const modalTitle = document.getElementById("cliente-modal-title");
        if (modalTitle) modalTitle.textContent = "Añadir Cliente";
        if (modal) modal.classList.add("show");
      };
    }

    if (modalClose) {
      modalClose.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modalCancel) {
      modalCancel.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (clienteForm) {
      clienteForm.onsubmit = (e) => {
        e.preventDefault();
        this.guardarCliente();
      };
    }
  }

  editarCliente(id) {
    const cliente = this.clientes.find((c) => c.id === id);
    if (!cliente) return;

    document.getElementById("cliente-id").value = cliente.id;
    document.getElementById("cliente-nombre").value = cliente.nombre;
    document.getElementById("cliente-email").value = cliente.email;
    document.getElementById("cliente-telefono").value = cliente.telefono;
    document.getElementById("cliente-direccion").value = cliente.direccion;
    document.getElementById("cliente-notas").value = cliente.notas || "";

    const modalTitle = document.getElementById("cliente-modal-title");
    if (modalTitle) modalTitle.textContent = "Editar Cliente";

    const modal = document.getElementById("cliente-modal");
    if (modal) modal.classList.add("show");
  }

  eliminarCliente(id) {
    const cliente = this.clientes.find((c) => c.id === id);
    if (!cliente) return;

    document.getElementById("confirmacion-clientes-id").value = cliente.id;

    const modal = document.getElementById("confirmacion-clientes-modal");
    if (modal) modal.classList.add("show");
  }

  inicializarConfirmacionCliente() {
    const modal = document.getElementById("confirmacion-clientes-modal");
    const confirmarBtn = document.getElementById("confirmacion-clientes-form");
    const closeBtn = document.getElementById("confirmacion-clientes-close");
    const cancelarBtn = document.getElementById("confirmacion-clientes-cancel");

    if (cancelarBtn) {
      cancelarBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (confirmarBtn) {
      confirmarBtn.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        const id = document.getElementById("confirmacion-clientes-id").value;
        data.append("confirmacion-id", id);

        const response = await fetch("clientes/eliminar", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          this.mostrarNotificacion("Error al eliminar el cliente", "error");
          modal.classList.remove("show");
          return;
        }

        this.mostrarNotificacion("Cliente eliminado exitosamente", "success");
        this.cargarDatosCompletos().then(() => {
          this.inicializarClientes();
          this.actualizarSelectClientes();
        });
      };
    }

    if (modal) modal.classList.remove("show");
  }

  async guardarCliente() {
    const id = document.getElementById("cliente-id").value.trim();
    const nombre = document.getElementById("cliente-nombre").value.trim();
    const email = document.getElementById("cliente-email").value.trim();
    const telefono = document.getElementById("cliente-telefono").value.trim();
    const direccion = document.getElementById("cliente-direccion").value.trim();
    const notas = document.getElementById("cliente-notas").value.trim();

    const validaciones = [
      this.validarCampoVacio(nombre, 'nombre'),
      this.validarCampoVacio(email, 'email'),
      this.validarCampoVacio(telefono, 'teléfono'),
      this.validarCampoVacio(direccion, 'dirección')
    ];

    for (let validacion of validaciones) {
      if (!validacion.valid) {
        this.mostrarNotificacion(validacion.mensaje, "error");
        return;
      }
    }

    if (!this.validarEmail(email)) {
      this.mostrarNotificacion("Por favor ingrese un email válido", "error");
      return;
    }

    if (!this.validarTelefono(telefono)) {
      this.mostrarNotificacion("Por favor ingrese un teléfono válido (Solo numeros - 10/11 digitos)", "error");
      return;
    }

    if (!id) {
      const data = new FormData();
      data.append("cliente-nombre", nombre);
      data.append("cliente-email", email);
      data.append("cliente-telefono", telefono);
      data.append("cliente-direccion", direccion);
      data.append("cliente-notas", notas);

      const response = await fetch("clientes/guardar", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        this.mostrarNotificacion("Error al guardar el cliente", "error");
        return;
      }

      const result = await response.json();

      if (result.status === "success") {
        this.mostrarNotificacion("Cliente guardado exitosamente", "success");
        this.cargarDatosCompletos().then(() => {
          this.inicializarClientes();
          this.actualizarSelectClientes();
        });
      }
    } else {
      const data = new FormData();
      data.append("cliente-id", id);
      data.append("cliente-nombre", nombre);
      data.append("cliente-email", email);
      data.append("cliente-telefono", telefono);
      data.append("cliente-direccion", direccion);
      data.append("cliente-notas", notas);

      const response = await fetch("clientes/actualizar", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        this.mostrarNotificacion("Error al actualizar el cliente", "error");
        return;
      }

      const result = await response.json();

      if (result.status === "success") {
        this.mostrarNotificacion("Cliente actualizado exitosamente", "success");
        this.cargarDatosCompletos().then(() => {
          this.inicializarClientes();
          this.actualizarSelectClientes();
        });
      }
    }

    const modal = document.getElementById("cliente-modal");
    if (modal) modal.classList.remove("show");
    this.limpiarFormularioCliente();
  }

  limpiarFormularioCliente() {
    const clienteForm = document.getElementById("cliente-form");
    if (clienteForm) {
      clienteForm.reset();
    }
  }

  // ==================== USUARIOS ====================

  inicializarUsuarios() {
    this.renderizarUsuarios();
    this.inicializarBusquedaUsuarios();
    this.inicializarModalUsuario();
    this.inicializarConfirmacionUsuario();
  }

  renderizarUsuarios(filtro = "") {
    const tbody = document.getElementById("usuarios-table");
    if (!tbody) return;

    const usuariosFiltrados = filtro
      ? this.usuarios.filter(
        (u) => u.nombre.toLowerCase().includes(filtro.toLowerCase()) || u.email.toLowerCase().includes(filtro.toLowerCase())
      )
      : this.usuarios;

    tbody.innerHTML = usuariosFiltrados
      .map(
        (usuario) => `
      <tr>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.telefono}</td>
        <td><span class="role-badge ${usuario.rol}">${usuario.rol === "admin" ? "Administrador" : "Usuario"}</span></td>
        <td><span class="status-badge ${usuario.activo ? "activo" : "inactivo"}">${usuario.activo ? "Activo" : "Inactivo"}</span></td>
        <td>
          <button class="action-btn" onclick="app.editarUsuario('${usuario.id}')">Editar</button>
          <button class="action-btn delete" onclick="app.eliminarUsuario('${usuario.id}')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  inicializarBusquedaUsuarios() {
    const searchInput = document.getElementById("search-usuarios");
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.renderizarUsuarios(e.target.value);
      };
    }
  }

  inicializarModalUsuario() {
    const addUserBtn = document.getElementById("add-user-btn");
    const modal = document.getElementById("user-modal");
    const modalClose = document.getElementById("modal-close");
    const modalCancel = document.getElementById("modal-cancel");
    const userForm = document.getElementById("user-form");

    if (addUserBtn) {
      addUserBtn.onclick = () => {
        this.editingUserId = null;
        this.limpiarFormularioUsuario();
        document.getElementById("user-id").value = "";
        const modalTitle = document.getElementById("modal-title");
        if (modalTitle) modalTitle.textContent = "Añadir Usuario";
        if (modal) modal.classList.add("show");
      };
    }

    if (modalClose) {
      modalClose.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modalCancel) {
      modalCancel.onclick = () => {
        if (modal) modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (userForm) {
      userForm.onsubmit = (e) => {
        e.preventDefault();
        this.guardarUsuario();
      };
    }
  }

  editarUsuario(id) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) return;

    document.getElementById("user-id").value = usuario.id;
    document.getElementById("user-nombre").value = usuario.nombre;
    document.getElementById("user-email").value = usuario.email;
    document.getElementById("user-telefono").value = usuario.telefono;
    document.getElementById("user-rol").value = usuario.rol;
    document.getElementById("user-password").value = usuario.password;

    const modalTitle = document.getElementById("modal-title");
    if (modalTitle) modalTitle.textContent = "Editar Usuario";

    const modal = document.getElementById("user-modal");
    if (modal) modal.classList.add("show");
  }

  eliminarUsuario(id) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) return;

    document.getElementById("confirmacion-usuarios-id").value = usuario.id;

    const modal = document.getElementById("confirmacion-usuarios-modal");
    if (modal) modal.classList.add("show");
  }

  inicializarConfirmacionUsuario() {
    const modal = document.getElementById("confirmacion-usuarios-modal");
    const confirmarBtn = document.getElementById("confirmacion-usuarios-form");
    const closeBtn = document.getElementById("confirmacion-usuarios-close");
    const cancelarBtn = document.getElementById("confirmacion-usuarios-cancel");

    if (cancelarBtn) {
      cancelarBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (confirmarBtn) {
      confirmarBtn.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        const id = document.getElementById("confirmacion-usuarios-id").value;
        data.append("confirmacion-id", id);

        const response = await fetch("usuarios/eliminar", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          this.mostrarNotificacion("Error al eliminar el usuario", "error");
          modal.classList.remove("show");
          return;
        }

        this.mostrarNotificacion("Usuario eliminado exitosamente", "success");
        this.cargarDatosCompletos().then(() => {
          this.inicializarUsuarios();
        });
      };
    }

    if (modal) modal.classList.remove("show");
  }

  async guardarUsuario() {
    const id = document.getElementById("user-id").value;
    const nombre = document.getElementById("user-nombre").value;
    const email = document.getElementById("user-email").value;
    const telefono = document.getElementById("user-telefono").value;
    const rol = document.getElementById("user-rol").value;
    const password = document.getElementById("user-password").value;

    const validaciones = [
      this.validarCampoVacio(nombre, 'nombre'),
      this.validarCampoVacio(email, 'email'),
      this.validarCampoVacio(telefono, 'teléfono'),
      this.validarCampoVacio(rol, 'rol'),
      this.validarCampoVacio(password, 'contraseña')
    ];

    for (let validacion of validaciones) {
      if (!validacion.valid) {
        this.mostrarNotificacion(validacion.mensaje, "error");
        return;
      }
    }

    if (!this.validarEmail(email)) {
      this.mostrarNotificacion("Por favor ingrese un email válido", "error");
      return;
    }

    if (!this.validarTelefono(telefono)) {
      this.mostrarNotificacion("Por favor ingrese un teléfono válido (Solo numeros - 10/11 digitos)", "error");
      return;
    }

    const validacionPassword = this.validarPassword(password);
    if (!validacionPassword.valid) {
      this.mostrarNotificacion(validacionPassword.mensaje, "error");
      return;
    }

    if (!id) {
      const data = new FormData();
      data.append("user-nombre", nombre);
      data.append("user-email", email);
      data.append("user-telefono", telefono);
      data.append("user-rol", rol);
      data.append("user-password", password);

      const response = await fetch("usuarios/guardar", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        this.mostrarNotificacion("Error al guardar el usuario", "error");
        return;
      }

      const result = await response.json();

      if (result.status === "success") {
        this.mostrarNotificacion("Usuario guardado exitosamente", "success");
        this.cargarDatosCompletos().then(() => {
          this.inicializarUsuarios();
        });
      }
    } else {
      const data = new FormData();
      data.append("user-id", id);
      data.append("user-nombre", nombre);
      data.append("user-email", email);
      data.append("user-telefono", telefono);
      data.append("user-rol", rol);
      data.append("user-password", password);

      const response = await fetch("usuarios/actualizar", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        this.mostrarNotificacion("Error al actualizar el usuario", "error");
        return;
      }

      const result = await response.json();

      if (result.status === "success") {
        this.mostrarNotificacion("Usuario actualizado exitosamente", "success");
        this.cargarDatosCompletos().then(() => {
          this.inicializarUsuarios();
        });
      }
    }

    const modal = document.getElementById("user-modal");
    if (modal) modal.classList.remove("show");
    this.limpiarFormularioUsuario();
  }

  limpiarFormularioUsuario() {
    const userForm = document.getElementById("user-form");
    if (userForm) {
      userForm.reset();
    }
  }

  // ==================== PERFIL ====================

  inicializarPerfil() {
    const profileForm = document.getElementById("profile-form");
    const credencialsForm = document.getElementById("credentials-form");
    const patternClearBtn = document.getElementById("clear-pattern-btn");
    const patternVerifyBtn = document.getElementById("verify-pattern-btn");

    if (patternClearBtn) {
      patternClearBtn.onclick = () => this.clearPattern();
    }

    if (patternVerifyBtn) {
      patternVerifyBtn.onclick = (e) => {
        e.preventDefault();
        this.verifyPattern();
      };
    }

    if (profileForm) {
      profileForm.onsubmit = async (e) => {
        e.preventDefault();
        this.guardarPerfil();
      };
    }

    if (credencialsForm) {
      credencialsForm.onsubmit = (e) => {
        e.preventDefault();
        this.inicializarConfirmacionCrendenciales();
      };
    }

    this.cargarDatosPerfil();
    this.initializePatternGrid();
  }

  methods = {
    pattern: {
      name: "Patrón de Desbloqueo",
      icon: "fa-draw-polygon",
      selectedDots: [],
    },
  };

  initializePatternGrid() {
    const grid = document.getElementById("patternGrid");
    if (!grid) return;
    grid.innerHTML = "";

    for (let i = 1; i <= 9; i++) {
      const dot = document.createElement("div");
      dot.className = "pattern-dot";
      dot.dataset.id = i;
      dot.textContent = i;
      dot.onclick = () => this.selectDot(i);
      grid.appendChild(dot);
    }
  }

  selectDot(dotId) {
    const dots = this.methods.pattern.selectedDots;
    if (!dots.includes(dotId)) {
      dots.push(dotId);
      document.querySelector(`.pattern-dot[data-id="${dotId}"]`).classList.add("selected");
    }
  }

  clearPattern() {
    this.methods.pattern.selectedDots = [];
    document.querySelectorAll(".pattern-dot").forEach((dot) => {
      dot.classList.remove("selected");
    });
    document.getElementById("patternError").style.display = "none";
  }

  verifyPattern() {
    const pattern = this.methods.pattern.selectedDots.join("");

    if (pattern.length < 4) {
      this.mostrarNotificacion("El patrón debe tener al menos 4 puntos", "error");
      return;
    }

    const patternModal = document.getElementById("pattern-confirmacion");
    patternModal.classList.add("show");

    const patternModalClose = document.getElementById("pattern-confirmacion-close");
    const patternModalCancel = document.getElementById("pattern-confirmacion-cancel");
    const patternModalVerify = document.getElementById("pattern-confirmacion-verify");

    patternModalClose.onclick = () => {
      patternModal.classList.remove("show");
    };

    patternModalCancel.onclick = () => {
      patternModal.classList.remove("show");
    };

    patternModalVerify.onclick = async () => {
      const patternPassword = document.getElementById("pattern-password").value;

      const validacionPassword = this.validarCampoVacio(patternPassword, 'contraseña');
      if (!validacionPassword.valid) {
        this.mostrarNotificacion(validacionPassword.mensaje, "error");
        return;
      }

      const data = new FormData();
      data.append("pattern-password", patternPassword);
      data.append("pattern", pattern);

      const response = await fetch("perfil/actualizarPatron", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        this.mostrarNotificacion("Error al actualizar el patrón", "error");
        return;
      }

      const result = await response.json();

      if (result.status === "success") {
        this.mostrarNotificacion("Patrón actualizado exitosamente", "success");
        document.getElementById("pattern-password").value = "";
        this.inicializarPerfil();
        this.clearPattern();
        patternModal.classList.remove("show");
      } else {
        this.mostrarNotificacion(result.message, "error");
      }
    };
  }

  cargarDatosPerfil() {
    if (!this.usuarioActual) return;

    const profileAvatar = document.getElementById("profile-avatar");
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profileMovimientos = document.getElementById("profile-movimientos");
    const profileFecha = document.getElementById("profile-fecha");
    const profileUpdate = document.getElementById("update-fecha");
    const patternUpdate = document.getElementById("profile-pattern");
    const passwordUpdate = document.getElementById("profile-password");

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
      const movimientosUsuario = this.movimientos.filter((m) => m.usuario === this.usuarioActual.nombre);
      profileMovimientos.textContent = movimientosUsuario.length.toString();
    }

    if (profileFecha) {
      const fecha = new Date(this.usuarioActual.created_at);
      profileFecha.textContent = fecha.toLocaleDateString("es-ES");
    }

    if (profileUpdate) {
      const fecha = new Date(this.usuarioActual.updated_at);
      profileUpdate.textContent = fecha.toLocaleDateString("es-ES");
    }

    if (patternUpdate) {
      patternUpdate.textContent = this.usuarioActual.last_token_recovery
        ? "Ultima actualización de patrón de seguridad: " + this.usuarioActual.last_token_recovery
        : "No hay patrón de seguridad";
    }

    if (passwordUpdate) {
      passwordUpdate.textContent = this.usuarioActual.last_password_change
        ? "Ultimo cambio de contraseña: " + this.usuarioActual.last_password_change
        : "No se han realizado cambios";
    }

    document.getElementById("profile-nombre").value = this.usuarioActual.nombre;
    document.getElementById("profile-email-input").value = this.usuarioActual.email;
    document.getElementById("profile-telefono").value = this.usuarioActual.telefono || "";
  }

  async guardarPerfil() {
    if (!this.usuarioActual) return;

    const nombre = document.getElementById("profile-nombre").value;
    const email = document.getElementById("profile-email-input").value;
    const telefono = document.getElementById("profile-telefono").value;

    const validaciones = [
      this.validarCampoVacio(nombre, 'nombre'),
      this.validarCampoVacio(email, 'email'),
      this.validarCampoVacio(telefono, 'teléfono')
    ];

    for (let validacion of validaciones) {
      if (!validacion.valid) {
        this.mostrarNotificacion(validacion.mensaje, "error");
        return;
      }
    }

    if (!this.validarEmail(email)) {
      this.mostrarNotificacion("Por favor ingrese un email válido", "error");
      return;
    }

    if (!this.validarTelefono(telefono)) {
      this.mostrarNotificacion("Por favor ingrese un teléfono válido (Solo numeros - 10/11 digitos)", "error");
      return;
    }

    const data = new FormData();
    data.append("profile-nombre", nombre);
    data.append("profile-email-input", email);
    data.append("profile-telefono", telefono);

    const response = await fetch("perfil/actualizarDatos", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      console.error("Error al actualizar los datos del perfil");
      return;
    }

    const result = await response.json();

    if (result.status === "success") {
      this.mostrarNotificacion("Perfil actualizado correctamente", "success");
      this.cargarDatosCompletos().then(() => {
        this.inicializarPerfil();
      });
    }
  }

  inicializarConfirmacionCrendenciales() {
    const modal = document.getElementById("confirmacion-modal");
    if (!modal) return;

    modal.classList.add("show");

    const modalClose = document.getElementById("confirmacion-close");
    const modalCancel = document.getElementById("confirmacion-cancel");
    const modalVerify = document.getElementById("confirmacion-confirm");

    modalClose.onclick = () => {
      modal.classList.remove("show");
    };

    modalCancel.onclick = () => {
      modal.classList.remove("show");
    };

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      };
    }

    if (modalVerify) {
      modalVerify.onclick = async () => {
        const nuevaPassword = document.getElementById("profile-nueva-contrasena");
        const confirmarPassword = document.getElementById("profile-confirmar-contrasena");
        const actualPassword = document.getElementById("profile-contrasena-actual");

        const validaciones = [
          this.validarCampoVacio(nuevaPassword.value, 'nueva contraseña'),
          this.validarCampoVacio(confirmarPassword.value, 'confirmar contraseña'),
          this.validarCampoVacio(actualPassword.value, 'contraseña actual')
        ];

        for (let validacion of validaciones) {
          if (!validacion.valid) {
            this.mostrarNotificacion(validacion.mensaje, "error");
            return;
          }
        }

        const validacionPassword = this.validarPassword(nuevaPassword.value);
        if (!validacionPassword.valid) {
          this.mostrarNotificacion(validacionPassword.mensaje, "error");
          modal.classList.remove("show");
          return;
        }

        if (nuevaPassword.value !== confirmarPassword.value) {
          this.mostrarNotificacion("Las contraseñas no coinciden", "error");
          modal.classList.remove("show");
          return;
        }

        if (actualPassword.value === nuevaPassword.value) {
          this.mostrarNotificacion("La contraseña nueva debe ser diferente a la actual", "error");
          modal.classList.remove("show");
          return;
        }

        const data = new FormData();
        data.append("profile-nueva-contrasena", nuevaPassword.value);
        data.append("profile-contrasena-actual", actualPassword.value);

        const response = await fetch("perfil/actualizarCredenciales", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          console.error("Error al actualizar las credenciales");
          return;
        }

        const result = await response.json();

        if (result.status === "success") {
          this.mostrarNotificacion("Credenciales actualizadas correctamente", "success");
          nuevaPassword.value = "";
          confirmarPassword.value = "";
          actualPassword.value = "";
          this.cargarDatosCompletos().then(() => {
            this.inicializarPerfil();
          });
        } else {
          this.mostrarNotificacion(result.message, "error");
        }

        modal.classList.remove("show");
      };
    }
  }
}

const app = new InventarioApp();
window.app = app;
