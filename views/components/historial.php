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
                    <th>Productos</th>
                    <th>Usuario</th>
                    <th>Cliente/Proveedor</th>
                    <th>Detalles</th>
                </tr>
            </thead>
            <tbody id="historial-table"></tbody>
        </table>
    </div>
</div>