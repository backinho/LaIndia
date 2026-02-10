<div class="table-card">
    <div class="card-header">
        <h2 class="card-title">Inventario de Productos</h2>
        <button class="btn btn-primary" id="exportarInventarioBtn">
            <i class="fas fa-file-export"></i>
             Exportar PDF
        </button>
    </div>
    <div class="table-header">
        <input type="search" id="search-inventario-full" class="search-input" placeholder="Buscar productos..." />
        <div class="filter-container">
            <button class="main-filter-btn" id="mainFilterBtn">
                <span>Seleccionar categoría</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="filter-options" id="filterOptions">
                <button class="filter-btn active" data-filter-cat="todos">Todos</button>
            </div>
        </div>
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
                    <th>Valor Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="inventario-full-table"></tbody>
        </table>
    </div>
</div>