<div class="profile-container">
    <div class="left-column">
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
                <div class="stat-item">
                    <span class="stat-label">Ultima actualización</span>
                    <span class="stat-value" id="update-fecha">-</span>
                </div>
            </div>
        </div>

        <div class="settings-card">
            <h3 class="card-title" style="margin-bottom: 0px;"><i class="fas fa-shield-alt"></i>Patrón de seguridad</h3>
            <p id="profile-pattern" style="margin-bottom: 24px;">usuario@example.com</p>
            <div class="method-content active" id="pattern-method">
                <div class="password-note">
                    <p><strong>Instrucciones:</strong> Dibuja un patrón de al menos 4 puntos conectados.</p>
                </div>

                <div class="pattern-container">
                    <div class="pattern-grid" id="patternGrid">
                        <!-- Los puntos se generan con JavaScript -->
                    </div>

                    <div class="controls" style="display: flex; width: 100%; gap: 10px;">
                        <button class="btn btn-primary" id="clear-pattern-btn" style="flex: 1; min-width: 0; white-space: nowrap; text-align: center;">
                            <i class="fas fa-undo"></i> Limpiar
                        </button>
                        <button class="btn btn-primary" id="verify-pattern-btn" style="flex: 1; min-width: 0; white-space: nowrap; text-align: center;">
                            <i class="fas fa-check"></i> Verificar Patrón
                        </button>
                    </div>

                    <div class="error-message" id="patternError">
                        El patrón no coincide. Intenta nuevamente.
                    </div>
                </div>
            </div>
            <div class="password-note">
                <strong>Nota:</strong> El patrón de seguridad ayuda a proteger tu cuenta y recuperarla en caso de pérdida. Asegúrate de recordarlo.
            </div>
        </div>
    </div>

    <!-- Columna derecha -->
    <div class="right-column">
        <div class="settings-card">
            <h3 class="card-title"><i class="fas fa-user-edit"></i> Editar Perfil</h3>
            <form id="profile-form" class="settings-form">
                <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" id="profile-nombre" class="form-input" placeholder="Ingresa tu nombre completo" required />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="profile-email-input" class="form-input" placeholder="ejemplo@correo.com" required />
                </div>
                <div class="form-group">
                    <label>Teléfono</label>
                    <input type="tel" id="profile-telefono" class="form-input" placeholder="+34 123 456 789" />
                </div>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> Guardar Cambios
                </button>
            </form>
        </div>

        <div class="settings-card">
            <h3 class="card-title" style="margin-bottom: 0px;"><i class="fas fa-key"></i> Ajustes de credenciales</h3>
            <p id="profile-password" style="margin-bottom: 24px;">usuario@example.com</p>
            <form id="credentials-form" class="settings-form">
                <div class="form-group">
                    <label>Nueva contraseña</label>
                    <input type="password" id="profile-nueva-contrasena" class="form-input" placeholder="Ingresa tu nueva contraseña" required />
                </div>
                <div class="form-group">
                    <label>Confirmar nueva contraseña</label>
                    <input type="password" id="profile-confirmar-contrasena" class="form-input" placeholder="Repite la nueva contraseña" required />
                </div>
                <div class="form-group">
                    <label>Contraseña actual</label>
                    <input type="password" id="profile-contrasena-actual" class="form-input" placeholder="Ingresa tu contraseña actual" />
                </div>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-key"></i> Actualizar Contraseña
                </button>
            </form>
            <div class="password-note">
                <strong>Requisitos:</strong> La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.
            </div>
        </div>
    </div>
</div>