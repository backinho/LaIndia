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
                        <th>Cliente/Proveedor</th>
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