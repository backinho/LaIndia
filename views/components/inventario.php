<div class="table-card">
    <h2 class="card-title">Inventario de Productos</h2>
    <div class="table-header">
        <input type="search" id="search-inventario-full" class="search-input" placeholder="Buscar productos..." />
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter-cat="todos">Todos</button>
            <button class="filter-btn" data-filter-cat="Electrónica">Electrónica</button>
            <button class="filter-btn" data-filter-cat="Ropa">Ropa</button>
            <button class="filter-btn" data-filter-cat="Alimentos">Alimentos</button>
            <button class="filter-btn" data-filter-cat="Herramientas">Herramientas</button>
            <button class="filter-btn" data-filter-cat="Otros">Otros</button>
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
                    <th>Proveedor</th>
                    <th>Valor Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="inventario-full-table"></tbody>
        </table>
    </div>
</div>