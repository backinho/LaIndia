<div class="table-card">
    <div class="card-header">
        <h2 class="card-title">Gestión de Categorías</h2>
        <button class="btn btn-primary" id="exportarCategoriaBtn">
            <i class="fas fa-file-export"></i>
             Exportar PDF
        </button>
    </div>
    <div class="table-header">
        <input type="search" id="search-categorias" class="search-input" placeholder="Buscar categorías..." />
        <button class="btn btn-primary" id="add-categoria-btn">Añadir Categoría</button>
    </div>
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Total Productos</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="categorias-table"></tbody>
        </table>
    </div>
</div>