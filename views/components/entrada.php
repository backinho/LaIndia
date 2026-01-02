<div class="form-card">
  <h2 class="card-title">Registrar Entrada de Productos</h2>
  <div class="productos-entrada-container">
    <div class="productos-entrada-list" id="productos-entrada-list"></div>
    <!-- <button type="button" class="btn btn-secondary" id="add-producto-entrada" style="margin-top: 16px;">+ Agregar Otro Producto</button> -->
    <div class="filter-movimiento-container" style="margin-top: 16px;">
      <button class="btn btn-secondary" id="entrada-options-btn" style="width: 100%">
        <span>+ Agregar Otro Producto</span>
        <i class=" fas fa-chevron-down"></i>
      </button>
      <div class="filter-options" id="entrada-filter-options" style="width: 100%; gap: 10px;">
        <button class="filter-btn" id="producto-existente-btn" data-option-entrada="existente" style="flex: 1; min-width: 0; white-space: nowrap; text-align: center;">Producto existente</button>
        <button class="filter-btn" id="producto-nuevo-btn" data-option-entrada="nuevo" style="flex: 1; min-width: 0; white-space: nowrap; text-align: center;">Producto nuevo</button>
      </div>
    </div>
    <button type="button" class="btn btn-primary" id="registrar-entrada" style="margin-top: 16px;">Registrar Entrada</button>
  </div>
</div>