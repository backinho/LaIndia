<div class="table-card">
    <div class="card-header">
        <h2 class="card-title">Gestión de Clientes</h2>
        <button class="btn btn-primary" id="exportarClientesBtn">
            <i class="fas fa-file-export"></i>
             Exportar PDF
        </button>
    </div>
    <div class="table-header">
        <input type="search" id="search-clientes" class="search-input" placeholder="Buscar clientes..." />
        <button class="btn btn-primary" id="add-cliente-btn">Añadir Cliente</button>
    </div>
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="clientes-table"></tbody>
        </table>
    </div>
</div>