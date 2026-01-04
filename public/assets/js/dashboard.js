class InventarioApp {
  constructor() {
    this.productos = [];
    this.movimientos = [];
    this.usuarios = [];
    this.clientes = [];
    this.categorias = [];
    this.proveedores = [];
    this.usuarioActual = null;
    this.editingUserId = null;
    this.editingClienteId = null;
    this.editingCategoriaId = null;
    this.editingProveedorId = null;

    this.cargarDatosCompletos().then(() => {
      this.inicializarUsuarioActual();
      this.inicializar();
    });
  }

  async cargarDatosCompletos() {
    await Promise.all([
      this.inicializarProductosList(),
      this.inicializarCategoriasList(),
      this.inicializarProveedoresList(),
      this.inicializarClientesList(),
      this.inicializarUsuariosList(),
    ]);
  }

  inicializarUsuarioActual() {
    const usuarioGuardado = localStorage.getItem("usuarioActual");
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    } else {
      this.usuarioActual = this.usuarios[0];
      localStorage.setItem("usuarioActual", JSON.stringify(this.usuarioActual));
    }
    this.actualizarInfoUsuario();
  }

  async inicializarProductosList() {
    const response = await fetch("productos/listar", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Error al guardar productos en el servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();

      this.productos = data.data;
    }
  }

  async inicializarCategoriasList() {
    const response = await fetch("categorias/listar", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Error al guardar categorías en el servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();

      this.categorias = data.data;
    }
  }

  async inicializarProveedoresList() {
    const response = await fetch("proveedores/listar", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Error al guardar proveedores en el servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();

      this.proveedores = data.data;
    }
  }

  async inicializarClientesList() {
    const response = await fetch("clientes/listar", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Error al guardar clientes en el servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();

      this.clientes = data.data;
    }
  }

  async inicializarUsuariosList() {
    const response = await fetch("usuarios/listar", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Error al guardar usuarios en el servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();

      this.usuarios = data.data;
    }
  }

  async guardarProductos() {
    const response = await fetch("productos/listar", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Error al guardar productos en el servidor");
      return;
    }

    if (response.ok) {
      const data = await response.json();

      this.productos = data.products;
    }
  }

  guardarMovimientos() {
    //localStorage.setItem("movimientos", JSON.stringify(this.movimientos));
  }

  guardarUsuarios(usuarios) {}

  guardarClientes(clientes) {}

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
    this.mostrarNotificacion("Bienvenido al Sistema de Inventario", "success");
  }

  inicializarTema() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme =
          document.documentElement.getAttribute("data-theme");
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

    const dropdownItems = document.querySelectorAll(
      ".dropdown-item[data-section]"
    );
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute("data-section");
        if (!sectionId) return;

        navItems.forEach((nav) => nav.classList.remove("active"));
        const targetNav = document.querySelector(
          `.nav-item[data-section="${sectionId}"]`
        );
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
        if (
          sidebar &&
          !sidebar.contains(target) &&
          mobileToggle &&
          !mobileToggle.contains(target)
        ) {
          sidebar.classList.remove("active");
        }
      }
    });
  }

  inicializarMenuUsuario() {
    const userButton = document.getElementById("user-button");
    const userMenu = document.querySelector(".user-menu");
    const logout = document.getElementById("logout");

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
        this.mostrarNotificacion("Sesión cerrada exitosamente", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
    }
  }

  actualizarInfoUsuario() {
    if (!this.usuarioActual) return;

    const userAvatar = document.getElementById("user-avatar");
    const userNameDisplay = document.getElementById("user-name-display");

    if (userAvatar) {
      userAvatar.textContent = this.usuarioActual.nombre
        .charAt(0)
        .toUpperCase();
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
    const totalEntradas = this.movimientos.filter(
      (m) => m.tipo === "entrada"
    ).length;
    const totalSalidas = this.movimientos.filter(
      (m) => m.tipo === "salida"
    ).length;
    const valorInventario = this.productos.reduce(
      (sum, p) => sum + p.stock * p.precio,
      0
    );

    const totalProductosEl = document.getElementById("total-productos");
    const totalEntradasEl = document.getElementById("total-entradas");
    const totalSalidasEl = document.getElementById("total-salidas");
    const valorInventarioEl = document.getElementById("valor-inventario");

    if (totalProductosEl) totalProductosEl.textContent = totalProductos;
    if (totalEntradasEl) totalEntradasEl.textContent = totalEntradas;
    if (totalSalidasEl) totalSalidasEl.textContent = totalSalidas;
    if (valorInventarioEl)
      valorInventarioEl.textContent = `$${valorInventario.toFixed(2)}`;

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
      tbody.innerHTML =
        '<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay productos con stock bajo</td></tr>';
      return;
    }

    tbody.innerHTML = productosStockBajo
      .map((producto) => {
        const estadoClass =
          producto.stock === 0
            ? "error"
            : producto.stock < 5
            ? "warning"
            : "info";
        const estadoTexto =
          producto.stock === 0
            ? "Sin stock"
            : producto.stock < 5
            ? "Crítico"
            : "Bajo";

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
      tbody.innerHTML =
        '<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay movimientos registrados</td></tr>';
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

        const productosTexto = movimiento.productos
          ? `${movimiento.productos.length} productos`
          : movimiento.productoNombre;

        return `
        <tr>
          <td><span class="status-badge ${movimiento.tipo}">${
          movimiento.tipo === "entrada" ? "Entrada" : "Salida"
        }</span></td>
          <td>${productosTexto}</td>
          <td>${movimiento.cantidadTotal || movimiento.cantidad}</td>
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
      const entradas = this.movimientos.filter(
        (m) => m.tipo === "entrada"
      ).length;
      entradasSemana.textContent = entradas;
    }

    if (salidasSemana) {
      const salidas = this.movimientos.filter(
        (m) => m.tipo === "salida"
      ).length;
      salidasSemana.textContent = salidas;
    }
  }

  inicializarInventario() {
    this.renderizarInventarioCompleto();
    this.renderizarFiltrosInventario();
    this.inicializarBusquedaInventario();
    this.inicializarFiltrosInventario();
  }

  renderizarInventarioCompleto(filtro = "", categoria = "todos") {
    const tbody = document.getElementById("inventario-full-table");
    if (!tbody) return;

    let productosFiltrados = this.productos;

    if (categoria !== "todos") {
      productosFiltrados = productosFiltrados.filter(
        (p) => p.categoria_nombre === categoria
      );
    }

    if (filtro) {
      productosFiltrados = productosFiltrados.filter(
        (p) =>
          p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          p.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
          p.categoria_nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          p.proveedor_nombre.toLowerCase().includes(filtro.toLowerCase())
      );
    }

    if (productosFiltrados.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="8" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay productos en el inventario</td></tr>';
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
          <td>${producto.proveedor_nombre}</td>
          <td>$${valorTotal}</td>
          <td>
            <button class="action-btn" onclick="app.verDetalleProducto('${
              producto.id
            }')">Ver Detalle</button>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  renderizarFiltrosInventario() {
    const mainFilterBtn = document.getElementById("mainFilterBtn");
    const filterOptions = document.getElementById("filterOptions");

    mainFilterBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      filterOptions.classList.toggle("show");
      mainFilterBtn.classList.toggle("active");
    });

    if (!filterOptions) return;

    let categorias = this.categorias;

    if (categorias.length === 0) {
      filterOptions.innerHTML = "<div>No hay categorías disponibles</div>";
      return;
    }

    filterOptions.innerHTML =
      '<button class="filter-btn filter-cat active" data-filter-cat="todos">Todos</button>';

    filterOptions.innerHTML += categorias
      .map((categoria) => {
        return `
        <button class="filter-btn filter-cat" data-filter-cat="${categoria.nombre}">${categoria.nombre}</button>
      `;
      })
      .join("");

    const filterButtons = document.querySelectorAll(".filter-cat");

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filterCat = this.getAttribute("data-filter-cat");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        if (filterCat === "todos") {
          mainFilterBtn.innerHTML =
            '<span>Seleccionar categoría</span><i class="fas fa-chevron-down"></i>';
          mainFilterBtn.classList.remove("active");
        } else {
          mainFilterBtn.innerHTML = `<span>${filterCat}</span><i class="fas fa-chevron-down"></i>`;
          mainFilterBtn.classList.add("active");
        }
      });
    });

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
      searchInput.addEventListener("input", (e) => {
        const activeFilter = document.querySelector(
          "[data-filter-cat].filter-btn.active"
        );
        const categoria = activeFilter
          ? activeFilter.getAttribute("data-filter-cat")
          : "todos";
        this.renderizarInventarioCompleto(e.target.value, categoria);
      });
    }
  }

  inicializarFiltrosInventario() {
    const filterButtons = document.querySelectorAll(
      "[data-filter-cat].filter-btn"
    );

    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.target;
        const categoria = target.getAttribute("data-filter-cat");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        target.classList.add("active");

        const searchInput = document.getElementById("search-inventario-full");
        this.renderizarInventarioCompleto(
          searchInput ? searchInput.value : "",
          categoria || "todos"
        );
      });
    });
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
      if (m.productos) {
        return m.productos.some((p) => p.id === productoId);
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
            <span class="detalle-value">$${parseFloat(producto.precio).toFixed(
              2
            )}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Valor Total</span>
            <span class="detalle-value">$${valorTotal}</span>
          </div>
          <div class="detalle-item">
            <span class="detalle-label">Proveedor</span>
            <span class="detalle-value">${producto.proveedor_nombre}</span>
          </div>
        </div>

        <div class="movimientos-producto">
          <h4>Historial de Movimientos (${movimientosProducto.length})</h4>
          ${
            movimientosProducto.length === 0
              ? '<p style="color: var(--text-secondary);">No hay movimientos registrados para este producto</p>'
              : movimientosProducto
                  .reverse()
                  .slice(0, 10)
                  .map((mov) => {
                    const fecha = new Date(mov.fecha);
                    const fechaFormateada = fecha.toLocaleString("es-ES");
                    let cantidad = mov.cantidad;
                    if (mov.productos) {
                      const prodEnMov = mov.productos.find(
                        (p) => p.id === productoId
                      );
                      if (prodEnMov) cantidad = prodEnMov.cantidad;
                    }
                    return `
                <div class="movimiento-item">
                  <div class="movimiento-info">
                    <span class="status-badge ${mov.tipo}">${
                      mov.tipo === "entrada" ? "Entrada" : "Salida"
                    }</span>
                    <span>${cantidad} unidades</span>
                    <span class="movimiento-fecha">${fechaFormateada}</span>
                  </div>
                  <span>${mov.usuario}</span>
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

  renderDefaultEntradaItem() {
    const listEntrada = document.getElementById("productos-entrada-list");
    if (!listEntrada) return;

    const countItems = listEntrada.querySelectorAll(
      ".producto-entrada-item"
    ).length;
    const existingMsg = document.getElementById("no-productos");

    if (countItems === 0 && !existingMsg) {
      const defaultItem = document.createElement("div");
      defaultItem.innerHTML =
        '<p style="color: var(--text-secondary); display: flex; justify-content: center;" id="no-productos">No hay productos agregados</p>';
      listEntrada.appendChild(defaultItem);
    }
  }

  inicializarEntrada() {
    const entryBtnOptions = document.getElementById("entrada-options-btn");
    const entryFilterOptions = document.getElementById(
      "entrada-filter-options"
    );
    const addBtn = document.getElementById("producto-existente-btn");
    const addNewBtn = document.getElementById("producto-nuevo-btn");
    const registrarBtn = document.getElementById("registrar-entrada");

    this.renderDefaultEntradaItem();

    entryBtnOptions.addEventListener("click", function (e) {
      e.stopPropagation();
      entryFilterOptions.classList.toggle("show");
      entryBtnOptions.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (
        !entryFilterOptions.contains(e.target) &&
        e.target !== entryBtnOptions
      ) {
        entryFilterOptions.classList.remove("show");
        entryBtnOptions.classList.remove("active");
      }
    });

    entryFilterOptions.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const option = addBtn.getAttribute("data-option-entrada");
        this.agregarProductoEntrada(option);
      });
    }

    if (addNewBtn) {
      addNewBtn.addEventListener("click", () => {
        const option = addNewBtn.getAttribute("data-option-entrada");
        this.agregarProductoEntrada(option);
      });
    }

    if (registrarBtn) {
      registrarBtn.addEventListener("click", () => {
        this.registrarEntrada();
      });
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
            <label>Nombre del Producto</label>
            <input type="text" class="form-input producto-nombre" required />
          </div>
          <div class="form-group">
            <label>Código</label>
            <input type="text" class="form-input producto-codigo" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Cantidad</label>
            <input type="number" class="form-input producto-cantidad" min="1" required />
          </div>
          <div class="form-group">
            <label>Precio Unitario</label>
            <input type="number" class="form-input producto-precio" step="0.01" min="0" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Categoría</label>
            <select class="form-input producto-categoria" required>
              <option value="">Seleccionar categoría</option>
              ${categoriasOptions}
            </select>
          </div>
          <div class="form-group">
            <label>Proveedor</label>
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
            <label>Producto</label>
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
            <label>Cantidad</label>
            <input type="number" class="form-input entrada-cantidad" min="1" required />
          </div>
          <div class="form-group">
            <label>Precio Unitario</label>
            <input type="number" class="form-input entrada-precio" min="1" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Categoría</label>
            <input type="text" class="form-input entrada-categoria" readonly />
          </div>
          <div class="form-group">
            <label>Precio Unitario</label>
            <select class="form-input entrada-precio" min="1" required>
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

      selectProduct.addEventListener("change", (e) => {
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
      });

      list.appendChild(newItem);
    }

    const removeBtn = newItem.querySelector(".btn-remove-producto");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        newItem.remove();
        this.actualizarNumeracionProductos("entrada");

        const updatedList = document.getElementById("productos-entrada-list");
        const remainingItems = updatedList.querySelectorAll(
          ".producto-entrada-item"
        ).length;

        if (remainingItems === 0) {
          this.renderDefaultEntradaItem();
        }

        this.mostrarBotonesEliminarEntrada();
      });
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
    const listId =
      tipo === "entrada" ? "productos-entrada-list" : "productos-salida-list";
    const list = document.getElementById(listId);
    if (!list) return;

    const items = list.querySelectorAll(
      tipo === "entrada" ? ".producto-entrada-item" : ".producto-salida-item"
    );

    items.forEach((item, index) => {
      const header = item.querySelector(".item-header h4");
      if (header) {
        header.textContent = `Producto ${index + 1}`;
      }
    });
  }

  registrarEntrada() {
    const list = document.getElementById("productos-entrada-list");
    if (!list) return;

    const items = list.querySelectorAll(".producto-entrada-item");
    const productos = [];

    for (let item of items) {
      const codigo = item.querySelector(".producto-codigo").value.trim();
      const nombre = item.querySelector(".producto-nombre").value.trim();
      const cantidad = parseInt(item.querySelector(".producto-cantidad").value);
      const precio = parseFloat(item.querySelector(".producto-precio").value);
      const categoria = item.querySelector(".producto-categoria").value;
      const proveedor = item.querySelector(".producto-proveedor").value.trim();
      const notas = item.querySelector(".producto-notas").value.trim();

      if (
        !codigo ||
        !nombre ||
        !cantidad ||
        !precio ||
        !categoria ||
        !proveedor
      ) {
        this.mostrarNotificacion(
          "Por favor complete todos los campos requeridos",
          "error"
        );
        return;
      }

      productos.push({
        codigo,
        nombre,
        cantidad,
        precio,
        categoria,
        proveedor,
        notas,
      });
    }

    let cantidadTotal = 0;

    productos.forEach((prod) => {
      const productoExistente = this.productos.find(
        (p) => p.codigo === prod.codigo
      );

      if (productoExistente) {
        productoExistente.stock += prod.cantidad;
        productoExistente.precio = prod.precio;
        prod.id = productoExistente.id;
      } else {
        const nuevoProducto = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          codigo: prod.codigo,
          nombre: prod.nombre,
          categoria: prod.categoria,
          stock: prod.cantidad,
          precio: prod.precio,
          proveedor: prod.proveedor,
        };
        this.productos.push(nuevoProducto);
        prod.id = nuevoProducto.id;
      }

      cantidadTotal += prod.cantidad;
    });

    const movimiento = {
      id: Date.now().toString(),
      tipo: "entrada",
      productos: productos,
      cantidadTotal: cantidadTotal,
      fecha: new Date().toISOString(),
      usuario: this.usuarioActual ? this.usuarioActual.nombre : "Usuario",
      proveedor: productos[0].proveedor,
      detalles: `Entrada de ${productos.length} producto(s) - Total: ${cantidadTotal} unidades`,
    };

    this.movimientos.push(movimiento);
    this.guardarProductos();
    this.guardarMovimientos();
    this.renderizarInventarioCompleto();
    this.mostrarNotificacion(
      `Entrada registrada exitosamente: ${productos.length} productos`,
      "success"
    );

    list.innerHTML = `
      <div class="producto-entrada-item">
        <div class="item-header">
          <h4>Producto 1</h4>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Nombre del Producto</label>
            <input type="text" class="form-input producto-nombre" required />
          </div>
          <div class="form-group">
            <label>Código/SKU</label>
            <input type="text" class="form-input producto-codigo" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Cantidad</label>
            <input type="number" class="form-input producto-cantidad" min="1" required />
          </div>
          <div class="form-group">
            <label>Precio Unitario</label>
            <input type="number" class="form-input producto-precio" step="0.01" min="0" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Categoría</label>
            <select class="form-input producto-categoria" required>
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
            <input type="text" class="form-input producto-proveedor" required />
          </div>
        </div>
        <div class="form-group">
          <label>Notas (opcional)</label>
          <textarea class="form-input producto-notas" rows="2"></textarea>
        </div>
        <button type="button" class="btn btn-secondary btn-remove-producto" style="display: none;">Eliminar Producto</button>
      </div>
    `;
  }

  inicializarSalida() {
    const addBtn = document.getElementById("add-producto-salida");
    const registrarBtn = document.getElementById("registrar-salida");

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        this.agregarProductoSalida();
      });
    }

    if (registrarBtn) {
      registrarBtn.addEventListener("click", () => {
        this.registrarSalida();
      });
    }

    this.actualizarSelectProductos();
    this.actualizarSelectClientes();
    this.inicializarCambiosProductoSalida();
  }

  agregarProductoSalida() {
    const list = document.getElementById("productos-salida-list");
    if (!list) return;

    const currentItems = list.querySelectorAll(".producto-salida-item").length;
    const newItem = document.createElement("div");
    newItem.className = "producto-salida-item";
    newItem.innerHTML = `
      <div class="item-header">
        <h4>Producto ${currentItems + 1}</h4>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Producto</label>
          <select class="form-input salida-producto" required>
            <option value="">Seleccionar producto</option>
          </select>
        </div>
        <div class="form-group">
          <label>Stock Disponible</label>
          <input type="text" class="form-input salida-stock" readonly />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Cantidad a Retirar</label>
          <input type="number" class="form-input salida-cantidad" min="1" required />
        </div>
        <div class="form-group">
          <label>Motivo</label>
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
      <button type="button" class="btn btn-secondary btn-remove-salida">Eliminar Producto</button>
    `;

    list.appendChild(newItem);

    const selectProducto = newItem.querySelector(".salida-producto");
    const productosDisponibles = this.productos.filter((p) => p.stock > 0);

    if (selectProducto) {
      selectProducto.innerHTML =
        '<option value="">Seleccionar producto</option>' +
        productosDisponibles
          .map(
            (p) =>
              `<option value="${p.id}">${p.nombre} (${p.codigo}) - Stock: ${p.stock}</option>`
          )
          .join("");

      selectProducto.addEventListener("change", (e) => {
        const productoId = e.target.value;
        const producto = this.productos.find((p) => p.id === productoId);
        const stockInput = newItem.querySelector(".salida-stock");

        if (producto && stockInput) {
          stockInput.value = producto.stock.toString();
        } else if (stockInput) {
          stockInput.value = "";
        }
      });
    }

    const removeBtn = newItem.querySelector(".btn-remove-salida");
    if (removeBtn) {
      removeBtn.style.display = "inline-block";
      removeBtn.addEventListener("click", () => {
        newItem.remove();
        this.actualizarNumeracionProductos("salida");
      });
    }

    this.mostrarBotonesEliminarSalida();
  }

  mostrarBotonesEliminarSalida() {
    const list = document.getElementById("productos-salida-list");
    if (!list) return;

    const items = list.querySelectorAll(".producto-salida-item");
    items.forEach((item, index) => {
      const removeBtn = item.querySelector(".btn-remove-salida");
      if (removeBtn) {
        removeBtn.style.display = items.length > 1 ? "inline-block" : "none";
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
          .map(
            (p) =>
              `<option value="${p.id}">${p.nombre} (${p.codigo}) - Stock: ${p.stock}</option>`
          )
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
      clientesActivos
        .map((c) => `<option value="${c.id}">${c.nombre}</option>`)
        .join("");
  }

  registrarSalida() {
    const list = document.getElementById("productos-salida-list");
    const clienteSelect = document.getElementById("salida-cliente-select");

    if (!list || !clienteSelect) return;

    const clienteId = clienteSelect.value;
    if (!clienteId) {
      this.mostrarNotificacion("Por favor seleccione un cliente", "error");
      return;
    }

    const cliente = this.clientes.find((c) => c.id === clienteId);
    if (!cliente) {
      this.mostrarNotificacion("Cliente no encontrado", "error");
      return;
    }

    const items = list.querySelectorAll(".producto-salida-item");
    const productos = [];

    for (let item of items) {
      const productoId = item.querySelector(".salida-producto").value;
      const cantidad = parseInt(item.querySelector(".salida-cantidad").value);
      const motivo = item.querySelector(".salida-motivo").value;
      const notas = item.querySelector(".salida-notas").value.trim();

      if (!productoId || !cantidad || !motivo) {
        this.mostrarNotificacion(
          "Por favor complete todos los campos requeridos",
          "error"
        );
        return;
      }

      const producto = this.productos.find((p) => p.id === productoId);
      if (!producto) {
        this.mostrarNotificacion("Producto no encontrado", "error");
        return;
      }

      if (cantidad > producto.stock) {
        this.mostrarNotificacion(
          `Stock insuficiente para ${producto.nombre}`,
          "error"
        );
        return;
      }

      productos.push({
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        cantidad,
        motivo,
        notas,
      });
    }

    let cantidadTotal = 0;

    productos.forEach((prod) => {
      const producto = this.productos.find((p) => p.id === prod.id);
      if (producto) {
        producto.stock -= prod.cantidad;
        cantidadTotal += prod.cantidad;
      }
    });

    const movimiento = {
      id: Date.now().toString(),
      tipo: "salida",
      productos: productos,
      cantidadTotal: cantidadTotal,
      fecha: new Date().toISOString(),
      usuario: this.usuarioActual ? this.usuarioActual.nombre : "Usuario",
      cliente: cliente.nombre,
      clienteId: cliente.id,
      detalles: `Salida de ${productos.length} producto(s) - Total: ${cantidadTotal} unidades - Cliente: ${cliente.nombre}`,
    };

    this.movimientos.push(movimiento);
    this.guardarProductos();
    this.guardarMovimientos();
    this.actualizarSelectProductos();
    this.renderizarInventarioCompleto();
    this.mostrarNotificacion(
      `Salida registrada exitosamente: ${productos.length} productos`,
      "success"
    );

    list.innerHTML = `
      <div class="producto-salida-item">
        <div class="item-header">
          <h4>Producto 1</h4>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Producto</label>
            <select class="form-input salida-producto" required>
              <option value="">Seleccionar producto</option>
            </select>
          </div>
          <div class="form-group">
            <label>Stock Disponible</label>
            <input type="text" class="form-input salida-stock" readonly />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Cantidad a Retirar</label>
            <input type="number" class="form-input salida-cantidad" min="1" required />
          </div>
          <div class="form-group">
            <label>Motivo</label>
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
        <button type="button" class="btn btn-secondary btn-remove-salida" style="display: none;">Eliminar Producto</button>
      </div>
    `;

    if (clienteSelect) {
      clienteSelect.value = "";
    }

    this.actualizarSelectProductos();
  }

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
      movimientosFiltrados = movimientosFiltrados.filter(
        (m) => m.tipo === filtroTipo
      );
    }

    if (filtroBusqueda) {
      movimientosFiltrados = movimientosFiltrados.filter((m) => {
        const searchLower = filtroBusqueda.toLowerCase();
        return (
          m.usuario.toLowerCase().includes(searchLower) ||
          m.detalles.toLowerCase().includes(searchLower) ||
          (m.cliente && m.cliente.toLowerCase().includes(searchLower)) ||
          (m.proveedor && m.proveedor.toLowerCase().includes(searchLower)) ||
          (m.productoNombre &&
            m.productoNombre.toLowerCase().includes(searchLower))
        );
      });
    }

    if (movimientosFiltrados.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay movimientos registrados</td></tr>';
      return;
    }

    tbody.innerHTML = movimientosFiltrados
      .map((movimiento) => {
        const fecha = new Date(movimiento.fecha);
        const fechaFormateada = fecha.toLocaleString("es-ES");

        const productosTexto = movimiento.productos
          ? `${movimiento.productos.length} producto(s)`
          : movimiento.productoNombre || "N/A";

        const clienteProveedor =
          movimiento.tipo === "entrada"
            ? movimiento.proveedor || "N/A"
            : movimiento.cliente || "N/A";

        return `
        <tr>
          <td>${fechaFormateada}</td>
          <td><span class="status-badge ${movimiento.tipo}">${
          movimiento.tipo === "entrada" ? "Entrada" : "Salida"
        }</span></td>
          <td>${productosTexto}</td>
          <td>${movimiento.usuario}</td>
          <td>${clienteProveedor}</td>
          <td>${movimiento.detalles}</td>
        </tr>
      `;
      })
      .join("");
  }

  inicializarFiltrosHistorial() {
    const filterButtons = document.querySelectorAll("[data-filter].filter-btn");

    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.target;
        const filter = target.getAttribute("data-filter");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        target.classList.add("active");

        const searchInput = document.getElementById("search-historial");
        this.renderizarHistorial(
          filter || "todos",
          searchInput ? searchInput.value : ""
        );
      });
    });
  }

  inicializarBusquedaHistorial() {
    const searchInput = document.getElementById("search-historial");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const activeFilter = document.querySelector(
          "[data-filter].filter-btn.active"
        );
        const filter = activeFilter
          ? activeFilter.getAttribute("data-filter")
          : "todos";
        this.renderizarHistorial(filter || "todos", e.target.value);
      });
    }
  }

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
            c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            c.descripcion.toLowerCase().includes(filtro.toLowerCase())
        )
      : this.categorias;

    if (categoriasFiltradas.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay categorías registradas</td></tr>';
      return;
    }

    console.log(
      "Renderizando categorías:",
      this.categorias,
      categoriasFiltradas
    );

    tbody.innerHTML = categoriasFiltradas
      .map((categoria) => {
        return `
        <tr>
          <td>${categoria.nombre}</td>
          <td>${categoria.codigo}</td>
          <td>${categoria.descripcion}</td>
          <td>${categoria.cantidad_productos}</td>
          <td><span class="status-badge ${
            categoria.activo ? "activo" : "inactivo"
          }">${categoria.activo ? "Activo" : "Inactivo"}</span></td>
          <td>
            <button class="action-btn" onclick="app.editarCategoria('${
              categoria.id
            }')">Editar</button>
            <button class="action-btn delete" onclick="app.eliminarCategoria('${
              categoria.id
            }')">Eliminar</button>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  inicializarBusquedaCategorias() {
    const searchInput = document.getElementById("search-categorias");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.renderizarCategorias(e.target.value);
      });
    }
  }

  inicializarModalCategoria() {
    const addCategoriaBtn = document.getElementById("add-categoria-btn");
    const modal = document.getElementById("categoria-modal");
    const modalClose = document.getElementById("categoria-modal-close");
    const modalCancel = document.getElementById("categoria-modal-cancel");
    const categoriaForm = document.getElementById("categoria-form");

    if (addCategoriaBtn) {
      addCategoriaBtn.addEventListener("click", () => {
        this.editingCategoriaId = null;
        this.limpiarFormularioCategoria();
        const modalTitle = document.getElementById("categoria-modal-title");
        if (modalTitle) modalTitle.textContent = "Añadir Categoría";
        if (modal) modal.classList.add("show");
      });
    }

    if (modalClose) {
      modalClose.addEventListener("click", () => {
        if (modal) modal.classList.remove("show");
      });
    }

    if (modalCancel) {
      modalCancel.addEventListener("click", () => {
        if (modal) modal.classList.remove("show");
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      });
    }

    if (categoriaForm) {
      categoriaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.guardarCategoria();
      });
    }
  }

  editarCategoria(id) {
    const categoria = this.categorias.find((c) => c.id === id);
    if (!categoria) return;

    document.getElementById("categoria-id").value = categoria.id;
    document.getElementById("categoria-nombre").value = categoria.nombre;
    document.getElementById("categoria-codigo").value = categoria.codigo;
    document.getElementById("categoria-descripcion").value =
      categoria.descripcion;

    const modalTitle = document.getElementById("categoria-modal-title");
    if (modalTitle) modalTitle.textContent = "Editar Categoría";

    const modal = document.getElementById("categoria-modal");
    if (modal) modal.classList.add("show");
  }

  eliminarCategoria(id) {
    const categoria = this.categorias.find((c) => c.id === id);
    if (!categoria) return;

    document.getElementById("confirmacion-id").value = categoria.id;

    const modal = document.getElementById("confirmacion-modal");
    if (modal) modal.classList.add("show");
  }

  inicializarConfirmacionCategoria() {
    const modal = document.getElementById("confirmacion-modal");
    const confirmarBtn = document.getElementById("confirmacion-confirm");
    const closeBtn = document.getElementById("confirmacion-close");
    const cancelarBtn = document.getElementById("confirmacion-cancel");

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
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      });
    }

    if (confirmarBtn) {
      confirmarBtn.onclick = async () => {
        const data = new FormData();
        const id = document.getElementById("confirmacion-id").value;
        data.append("confirmacion-id", id);

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

  async guardarCategoria() {
    const id = document.getElementById("categoria-id").value;
    const nombre = document.getElementById("categoria-nombre").value.trim();
    const codigo = document.getElementById("categoria-codigo").value.trim();
    const descripcion = document
      .getElementById("categoria-descripcion")
      .value.trim();

    const data = new FormData();
    data.append("categoria-nombre", nombre);
    data.append("categoria-codigo", codigo);
    data.append("categoria-descripcion", descripcion);
    if (id) {
      data.append("categoria-id", id);
    }

    console.log("Guardando categoría:", data);

    if (!nombre || !codigo || !descripcion) {
      this.mostrarNotificacion(
        "Por favor complete todos los campos requeridos",
        "error"
      );
      return;
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

      if (result.status === "success") {
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
        this.mostrarNotificacion(
          "Categoría actualizada exitosamente",
          "success"
        );
        this.cargarDatosCompletos().then(() => {
          this.inicializarCategorias();
          this.actualizarSelectsCategorias();
        });
      }
    }

    const modal = document.getElementById("categoria-modal");
    if (modal) modal.classList.remove("show");
    this.limpiarFormularioCategoria();
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
        categoriasActivas
          .map((c) => `<option value="${c.nombre}">${c.nombre}</option>`)
          .join("");

      if (currentValue) {
        select.value = currentValue;
      }
    });
  }

  inicializarProveedores() {
    this.renderizarProveedores();
    this.inicializarBusquedaProveedores();
    this.inicializarModalProveedor();
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
      tbody.innerHTML =
        '<tr><td colspan="8" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay proveedores registrados</td></tr>';
      return;
    }

    tbody.innerHTML = proveedoresFiltrados
      .map(
        (proveedor) => `
      <tr>
        <td>#${proveedor.id}</td>
        <td>${proveedor.nombre}</td>
        <td>${proveedor.contacto}</td>
        <td>${proveedor.email}</td>
        <td>${proveedor.telefono}</td>
        <td>${proveedor.direccion}</td>
        <td><span class="status-badge ${
          proveedor.activo ? "activo" : "inactivo"
        }">${proveedor.activo ? "Activo" : "Inactivo"}</span></td>
        <td>
          <button class="action-btn" onclick="app.editarProveedor('${
            proveedor.id
          }')">Editar</button>
          <button class="action-btn delete" onclick="app.eliminarProveedor('${
            proveedor.id
          }')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  inicializarBusquedaProveedores() {
    const searchInput = document.getElementById("search-proveedores");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.renderizarProveedores(e.target.value);
      });
    }
  }

  inicializarModalProveedor() {
    const addProveedorBtn = document.getElementById("add-proveedor-btn");
    const modal = document.getElementById("proveedor-modal");
    const modalClose = document.getElementById("proveedor-modal-close");
    const modalCancel = document.getElementById("proveedor-modal-cancel");
    const proveedorForm = document.getElementById("proveedor-form");

    if (addProveedorBtn) {
      addProveedorBtn.addEventListener("click", () => {
        this.editingProveedorId = null;
        this.limpiarFormularioProveedor();
        const modalTitle = document.getElementById("proveedor-modal-title");
        if (modalTitle) modalTitle.textContent = "Añadir Proveedor";
        if (modal) modal.classList.add("show");
      });
    }

    if (modalClose) {
      modalClose.addEventListener("click", () => {
        if (modal) modal.classList.remove("show");
      });
    }

    if (modalCancel) {
      modalCancel.addEventListener("click", () => {
        if (modal) modal.classList.remove("show");
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      });
    }

    if (proveedorForm) {
      proveedorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.guardarProveedor();
      });
    }
  }

  editarProveedor(id) {
    const proveedor = this.proveedores.find((p) => p.id === id);
    if (!proveedor) return;

    this.editingProveedorId = id;

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

    const productosProveedor = this.productos.filter(
      (p) => p.proveedor === proveedor.nombre
    );
    if (productosProveedor.length > 0) {
      this.mostrarNotificacion(
        `No se puede eliminar el proveedor porque tiene ${productosProveedor.length} productos asociados`,
        "error"
      );
      return;
    }

    if (!confirm("¿Está seguro de eliminar este proveedor?")) return;

    this.proveedores = this.proveedores.filter((p) => p.id !== id);
    this.renderizarProveedores();
    this.actualizarSelectsProveedores();
    this.mostrarNotificacion("Proveedor eliminado exitosamente", "success");
  }

  guardarProveedor() {
    const nombre = document.getElementById("proveedor-nombre").value.trim();
    const contacto = document.getElementById("proveedor-contacto").value.trim();
    const email = document.getElementById("proveedor-email").value.trim();
    const telefono = document.getElementById("proveedor-telefono").value.trim();
    const direccion = document
      .getElementById("proveedor-direccion")
      .value.trim();
    const notas = document.getElementById("proveedor-notas").value.trim();

    if (!nombre || !contacto || !email || !telefono || !direccion) {
      this.mostrarNotificacion(
        "Por favor complete todos los campos requeridos",
        "error"
      );
      return;
    }

    if (this.editingProveedorId) {
      const proveedor = this.proveedores.find(
        (p) => p.id === this.editingProveedorId
      );
      if (proveedor) {
        const nombreAnterior = proveedor.nombre;
        proveedor.nombre = nombre;
        proveedor.contacto = contacto;
        proveedor.email = email;
        proveedor.telefono = telefono;
        proveedor.direccion = direccion;
        proveedor.notas = notas;

        this.productos.forEach((producto) => {
          if (producto.proveedor === nombreAnterior) {
            producto.proveedor = nombre;
          }
        });
        this.guardarProductos();

        this.mostrarNotificacion(
          "Proveedor actualizado exitosamente",
          "success"
        );
      }
    } else {
      const nuevoProveedor = {
        id: Date.now().toString(),
        nombre,
        contacto,
        email,
        telefono,
        direccion,
        notas,
        activo: true,
        fechaRegistro: new Date().toISOString(),
      };
      this.proveedores.push(nuevoProveedor);
      this.mostrarNotificacion("Proveedor creado exitosamente", "success");
    }

    this.renderizarProveedores();
    this.actualizarSelectsProveedores();

    const modal = document.getElementById("proveedor-modal");
    if (modal) modal.classList.remove("show");
    this.limpiarFormularioProveedor();
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
          proveedoresActivos
            .map((p) => `<option value="${p.nombre}">${p.nombre}</option>`)
            .join("");

        if (currentValue) {
          input.value = currentValue;
        }
      }
    });
  }

  inicializarClientes() {
    this.renderizarClientes();
    this.inicializarBusquedaClientes();
    this.inicializarModalCliente();
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
      tbody.innerHTML =
        '<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-secondary);">No hay clientes registrados</td></tr>';
      return;
    }

    tbody.innerHTML = clientesFiltrados
      .map(
        (cliente) => `
      <tr>
        <td>#${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.direccion}</td>
        <td><span class="status-badge ${
          cliente.activo ? "activo" : "inactivo"
        }">${cliente.activo ? "Activo" : "Inactivo"}</span></td>
        <td>
          <button class="action-btn" onclick="app.editarCliente('${
            cliente.id
          }')">Editar</button>
          <button class="action-btn delete" onclick="app.eliminarCliente('${
            cliente.id
          }')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  inicializarBusquedaClientes() {
    const searchInput = document.getElementById("search-clientes");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.renderizarClientes(e.target.value);
      });
    }
  }

  inicializarModalCliente() {
    const addClienteBtn = document.getElementById("add-cliente-btn");
    const modal = document.getElementById("cliente-modal");
    const modalClose = document.getElementById("cliente-modal-close");
    const modalCancel = document.getElementById("cliente-modal-cancel");
    const clienteForm = document.getElementById("cliente-form");

    if (addClienteBtn) {
      addClienteBtn.addEventListener("click", () => {
        this.editingClienteId = null;
        this.limpiarFormularioCliente();
        const modalTitle = document.getElementById("cliente-modal-title");
        if (modalTitle) modalTitle.textContent = "Añadir Cliente";
        if (modal) modal.classList.add("show");
      });
    }

    if (modalClose) {
      modalClose.addEventListener("click", () => {
        if (modal) modal.classList.remove("show");
      });
    }

    if (modalCancel) {
      modalCancel.addEventListener("click", () => {
        if (modal) modal.classList.remove("show");
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      });
    }

    if (clienteForm) {
      clienteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.guardarCliente();
      });
    }
  }

  editarCliente(id) {
    const cliente = this.clientes.find((c) => c.id === id);
    if (!cliente) return;

    this.editingClienteId = id;

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
    if (!confirm("¿Está seguro de eliminar este cliente?")) return;

    this.clientes = this.clientes.filter((c) => c.id !== id);
    this.guardarClientes();
    this.renderizarClientes();
    this.actualizarSelectClientes();
    this.mostrarNotificacion("Cliente eliminado exitosamente", "success");
  }

  guardarCliente() {
    const nombre = document.getElementById("cliente-nombre").value.trim();
    const email = document.getElementById("cliente-email").value.trim();
    const telefono = document.getElementById("cliente-telefono").value.trim();
    const direccion = document.getElementById("cliente-direccion").value.trim();
    const notas = document.getElementById("cliente-notas").value.trim();

    if (!nombre || !email || !telefono || !direccion) {
      this.mostrarNotificacion(
        "Por favor complete todos los campos requeridos",
        "error"
      );
      return;
    }

    if (this.editingClienteId) {
      const cliente = this.clientes.find((c) => c.id === this.editingClienteId);
      if (cliente) {
        cliente.nombre = nombre;
        cliente.email = email;
        cliente.telefono = telefono;
        cliente.direccion = direccion;
        cliente.notas = notas;
        this.mostrarNotificacion("Cliente actualizado exitosamente", "success");
      }
    } else {
      const nuevoCliente = {
        id: Date.now().toString(),
        nombre,
        email,
        telefono,
        direccion,
        notas,
        activo: true,
        fechaRegistro: new Date().toISOString(),
      };
      this.clientes.push(nuevoCliente);
      this.mostrarNotificacion("Cliente creado exitosamente", "success");
    }

    this.guardarClientes();
    this.renderizarClientes();
    this.actualizarSelectClientes();

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

  inicializarUsuarios() {
    this.renderizarUsuarios();
    this.inicializarBusquedaUsuarios();
    this.inicializarModalUsuario();
  }

  renderizarUsuarios(filtro = "") {
    const tbody = document.getElementById("usuarios-table");
    if (!tbody) return;

    const usuariosFiltrados = filtro
      ? this.usuarios.filter(
          (u) =>
            u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            u.email.toLowerCase().includes(filtro.toLowerCase())
        )
      : this.usuarios;

    tbody.innerHTML = usuariosFiltrados
      .map(
        (usuario) => `
      <tr>
        <td>#${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td><span class="role-badge ${usuario.rol}">${
          usuario.rol === "admin" ? "Administrador" : "Usuario"
        }</span></td>
        <td><span class="status-badge ${
          usuario.activo ? "activo" : "inactivo"
        }">${usuario.activo ? "Activo" : "Inactivo"}</span></td>
        <td>
          <button class="action-btn" onclick="app.editarUsuario('${
            usuario.id
          }')">Editar</button>
          <button class="action-btn delete" onclick="app.eliminarUsuario('${
            usuario.id
          }')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  inicializarBusquedaUsuarios() {
    const searchInput = document.getElementById("search-usuarios");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.renderizarUsuarios(e.target.value);
      });
    }
  }

  inicializarModalUsuario() {
    const addUserBtn = document.getElementById("add-user-btn");
    const modal = document.getElementById("user-modal");
    const modalClose = document.getElementById("modal-close");
    const modalCancel = document.getElementById("modal-cancel");
    const userForm = document.getElementById("user-form");

    if (addUserBtn) {
      addUserBtn.addEventListener("click", () => {
        this.editingUserId = null;
        this.limpiarFormularioUsuario();
        const modalTitle = document.getElementById("modal-title");
        if (modalTitle) modalTitle.textContent = "Añadir Usuario";
        if (modal) modal.classList.add("show");
      });
    }

    if (modalClose) {
      modalClose.addEventListener("click", () => {
        if (modal) modal.classList.remove("show");
      });
    }

    if (modalCancel) {
      modalCancel.addEventListener("click", () => {
        if (modal) modal.classList.remove("show");
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      });
    }

    if (userForm) {
      userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.guardarUsuario();
      });
    }
  }

  editarUsuario(id) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) return;

    this.editingUserId = id;

    document.getElementById("user-nombre").value = usuario.nombre;
    document.getElementById("user-email").value = usuario.email;
    document.getElementById("user-rol").value = usuario.rol;
    document.getElementById("user-password").value = usuario.password;

    const modalTitle = document.getElementById("modal-title");
    if (modalTitle) modalTitle.textContent = "Editar Usuario";

    const modal = document.getElementById("user-modal");
    if (modal) modal.classList.add("show");
  }

  eliminarUsuario(id) {
    if (!confirm("¿Está seguro de eliminar este usuario?")) return;

    this.usuarios = this.usuarios.filter((u) => u.id !== id);
    this.guardarUsuarios();
    this.renderizarUsuarios();
    this.mostrarNotificacion("Usuario eliminado exitosamente", "success");
  }

  guardarUsuario() {
    const nombre = document.getElementById("user-nombre").value;
    const email = document.getElementById("user-email").value;
    const rol = document.getElementById("user-rol").value;
    const password = document.getElementById("user-password").value;

    if (this.editingUserId) {
      const usuario = this.usuarios.find((u) => u.id === this.editingUserId);
      if (usuario) {
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.rol = rol;
        usuario.password = password;
        this.mostrarNotificacion("Usuario actualizado exitosamente", "success");
      }
    } else {
      const nuevoUsuario = {
        id: Date.now().toString(),
        nombre,
        email,
        telefono: "",
        password,
        rol,
        activo: true,
        fechaRegistro: new Date().toISOString(),
      };
      this.usuarios.push(nuevoUsuario);
      this.mostrarNotificacion("Usuario creado exitosamente", "success");
    }

    this.guardarUsuarios();
    this.renderizarUsuarios();

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

  inicializarPerfil() {
    const profileForm = document.getElementById("profile-form");
    const patternClearBtn = document.getElementById("clear-pattern-btn");
    const patternVerifyBtn = document.getElementById("verify-pattern-btn");

    if (patternClearBtn) {
      console.log("Inicializando botón de limpiar patrón");
      patternClearBtn.addEventListener("click", () => this.clearPattern());
    }

    if (patternVerifyBtn) {
      console.log("Inicializando botón de verificar patrón");
      patternVerifyBtn.addEventListener("click", () => this.verifyPattern());
    }

    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.guardarPerfil();
      });
    }

    this.cargarDatosPerfil();
    this.initializePatternGrid();
  }

  methods = {
    pattern: {
      name: "Patrón de Desbloqueo",
      icon: "fa-draw-polygon",
      selectedDots: [],
      originalPattern: [1, 2, 5, 8, 7, 4], // Ejemplo
    },
  };

  initializePatternGrid() {
    const grid = document.getElementById("patternGrid");
    grid.innerHTML = "";

    for (let i = 1; i <= 9; i++) {
      const dot = document.createElement("div");
      dot.className = "pattern-dot";
      dot.dataset.id = i;
      dot.textContent = i;
      dot.addEventListener("click", () => this.selectDot(i));
      grid.appendChild(dot);
    }
  }

  selectDot(dotId) {
    const dots = this.methods.pattern.selectedDots;
    if (!dots.includes(dotId)) {
      dots.push(dotId);
      document
        .querySelector(`.pattern-dot[data-id="${dotId}"]`)
        .classList.add("selected");
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
    const original = this.methods.pattern.originalPattern.join("");
    const patternModal = document.getElementById("pattern-confirmacion");

    patternModal.classList.add("show");

    const patternModalClose = document.getElementById(
      "pattern-confirmacion-close"
    );
    const patternModalCancel = document.getElementById(
      "pattern-confirmacion-cancel"
    );
    const patternModalVerify = document.getElementById(
      "pattern-confirmacion-verify"
    );

    patternModalClose.addEventListener("click", () => {
      patternModal.classList.remove("show");
    });

    patternModalCancel.addEventListener("click", () => {
      patternModal.classList.remove("show");
    });

    patternModalVerify.addEventListener("click", () => {
      if (pattern === original && pattern.length >= 4) {
        this.mostrarNotificacion(
          "Patrón correcto. Acceso concedido.",
          "success"
        );
        setTimeout(() => {
          this.clearPattern();
        }, 2000);
        // Aquí proceder con la recuperación
      } else {
        this.mostrarNotificacion(
          "Patrón incorrecto. Inténtalo de nuevo.",
          "error"
        );
        setTimeout(() => {
          patternModal.classList.remove("show");
          this.clearPattern();
        }, 2000);
      }
    });
  }

  cargarDatosPerfil() {
    if (!this.usuarioActual) return;

    const profileAvatar = document.getElementById("profile-avatar");
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profileMovimientos = document.getElementById("profile-movimientos");
    const profileFecha = document.getElementById("profile-fecha");

    if (profileAvatar) {
      profileAvatar.textContent = this.usuarioActual.nombre
        .charAt(0)
        .toUpperCase();
    }

    if (profileName) {
      profileName.textContent = this.usuarioActual.nombre;
    }

    if (profileEmail) {
      profileEmail.textContent = this.usuarioActual.email;
    }

    if (profileMovimientos) {
      const movimientosUsuario = this.movimientos.filter(
        (m) => m.usuario === this.usuarioActual.nombre
      );
      profileMovimientos.textContent = movimientosUsuario.length.toString();
    }

    if (profileFecha) {
      const fecha = new Date(this.usuarioActual.fechaRegistro);
      profileFecha.textContent = fecha.toLocaleDateString("es-ES");
    }

    document.getElementById("profile-nombre").value = this.usuarioActual.nombre;
    document.getElementById("profile-email-input").value =
      this.usuarioActual.email;
    document.getElementById("profile-telefono").value =
      this.usuarioActual.telefono || "";
  }

  guardarPerfil() {
    if (!this.usuarioActual) return;

    const nombre = document.getElementById("profile-nombre").value;
    const email = document.getElementById("profile-email-input").value;
    const telefono = document.getElementById("profile-telefono").value;
    const password = document.getElementById("profile-password").value;

    this.usuarioActual.nombre = nombre;
    this.usuarioActual.email = email;
    this.usuarioActual.telefono = telefono;

    if (password) {
      this.usuarioActual.password = password;
    }

    const usuarioIndex = this.usuarios.findIndex(
      (u) => u.id === this.usuarioActual.id
    );
    if (usuarioIndex !== -1) {
      this.usuarios[usuarioIndex] = this.usuarioActual;
      this.guardarUsuarios();
    }

    localStorage.setItem("usuarioActual", JSON.stringify(this.usuarioActual));
    this.actualizarInfoUsuario();
    this.cargarDatosPerfil();
    this.mostrarNotificacion("Perfil actualizado exitosamente", "success");

    const passwordInput = document.getElementById("profile-password");
    if (passwordInput) {
      passwordInput.value = "";
    }
  }

  mostrarNotificacion(mensaje, tipo) {
    const notification = document.getElementById("notification");
    if (!notification) return;

    notification.textContent = mensaje;
    notification.className = `notification show ${tipo}`;

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }
}

const app = new InventarioApp();
window.app = app;
