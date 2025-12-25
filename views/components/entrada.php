<div class="form-card">
  <h2 class="card-title">Registrar Entrada de Productos</h2>
  <div class="productos-entrada-container">
    <div class="productos-entrada-list" id="productos-entrada-list">
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
    </div>
    <button type="button" class="btn btn-secondary" id="add-producto-entrada" style="margin-top: 16px;">+ Agregar Otro Producto</button>
    <button type="button" class="btn btn-primary" id="registrar-entrada" style="margin-top: 16px;">Registrar Entrada</button>
  </div>
</div>