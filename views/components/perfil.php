<div class="profile-container">
    <div class="profile-card">
        <div class="profile-header">
            <div class="profile-avatar" id="profile-avatar">U</div>
            <h2 id="profile-name">Usuario</h2>
            <p id="profile-email">usuario@example.com</p>
        </div>
        <div class="profile-stats">
            <div class="stat-item">
                <span class="stat-label">Movimientos registrados</span>
                <span class="stat-value" id="profile-movimientos">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Fecha de registro</span>
                <span class="stat-value" id="profile-fecha">-</span>
            </div>
        </div>
    </div>

    <div class="settings-card">
        <h3 class="card-title">Editar Perfil</h3>
        <form id="profile-form" class="settings-form">
            <div class="form-group">
                <label>Nombre Completo</label>
                <input type="text" id="profile-nombre" class="form-input" required />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="profile-email-input" class="form-input" required />
            </div>
            <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" id="profile-telefono" class="form-input" />
            </div>
            <div class="form-group">
                <label>Nueva Contraseña (dejar en blanco para mantener actual)</label>
                <input type="password" id="profile-password" class="form-input" />
            </div>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        </form>
    </div>
</div>