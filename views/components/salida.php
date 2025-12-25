<div class="form-card">
    <h2 class="card-title">Registrar Salida de Productos</h2>
    <div class="productos-salida-container">
        <div class="productos-salida-list" id="productos-salida-list">
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
        </div>
        <div class="form-group" style="margin-top: 16px;">
            <label>Cliente/Destino</label>
            <select id="salida-cliente-select" class="form-input" required>
                <option value="">Seleccionar cliente</option>
            </select>
        </div>
        <button type="button" class="btn btn-secondary" id="add-producto-salida" style="margin-top: 16px;">+ Agregar Otro Producto</button>
        <button type="button" class="btn btn-primary" id="registrar-salida" style="margin-top: 16px;">Registrar Salida</button>
    </div>
</div>