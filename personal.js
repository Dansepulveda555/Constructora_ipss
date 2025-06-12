// Cargar usuarios desde localStorage o usar los iniciales si no hay datos guardados
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    {
        nombre: "Daniel",
        apellido: "Barrera",
        cargo: "Maestro de Obras",
        correo: "Daniel.Barrera@email.com",
        fecha_ingreso: "2022-03-15"
    },
    {
        nombre: "Ivan",
        apellido: "Bilbao",
        cargo: "Ingeniera Civil",
        correo: "Ivan.Bilbao@email.com",
        fecha_ingreso: "2021-08-10"
    }
];

// Renderizar usuarios en la cuadrícula
function renderUsuarios() {
    const lista = document.querySelector('.row.g-4');
    if (!lista) return;
    lista.innerHTML = '';
    usuarios.forEach((u, idx) => {
        const col = document.createElement('div');
        col.className = "col-md-6 col-lg-4";
        col.innerHTML = `
            <div class="card usuario-card shadow-sm h-100">
                <div class="card-body">
                    <h3 class="card-title">${u.nombre} ${u.apellido}</h3>
                    <p class="mb-1"><strong>Cargo:</strong> ${u.cargo}</p>
                    <p class="mb-1"><strong>Correo:</strong> ${u.correo}</p>
                    <p class="mb-0"><strong>Fecha de ingreso:</strong> ${u.fecha_ingreso}</p>
                    <button class="btn btn-warning btn-sm mt-2 me-2" onclick="editarUsuario(${idx})">Editar</button>
                    <button class="btn btn-danger btn-sm mt-2" onclick="eliminarUsuario(${idx})">Eliminar</button>
                </div>
            </div>
        `;
        lista.appendChild(col);
    });
}

// Eliminar usuario y actualizar localStorage
window.eliminarUsuario = function(idx) {
    if (confirm("¿Está seguro que desea eliminar este usuario?")) {
        usuarios.splice(idx, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderUsuarios();
    }
};

// Agrega el modal de edición al HTML si no existe
function ensureEditModal() {
    if (!document.getElementById('editUserModal')) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'editUserModal';
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form id="editUserForm">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">Editar Usuario</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="editNombre" class="form-label">Nombre:</label>
                                <input type="text" class="form-control" id="editNombre" required pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+" title="Solo letras y espacios">
                            </div>
                            <div class="mb-3">
                                <label for="editApellido" class="form-label">Apellido:</label>
                                <input type="text" class="form-control" id="editApellido" required pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+" title="Solo letras y espacios">
                            </div>
                            <div class="mb-3">
                                <label for="editCargo" class="form-label">Cargo:</label>
                                <select class="form-select" id="editCargo" required>
                                    <option value="">Seleccione un cargo</option>
                                    <option value="Maestro de Obras">Maestro de Obras</option>
                                    <option value="Ingeniera Civil">Ingeniera Civil</option>
                                    <option value="Ayudante">Ayudante</option>
                                    <option value="Administrador">Administrador</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="editCorreo" class="form-label">Correo:</label>
                                <input type="email" class="form-control" id="editCorreo" required>
                            </div>
                            <div class="mb-3">
                                <label for="editFechaIngreso" class="form-label">Fecha de Ingreso:</label>
                                <input type="date" class="form-control" id="editFechaIngreso" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// Editar usuario con modal y formulario
window.editarUsuario = function(idx) {
    ensureEditModal();
    const usuario = usuarios[idx];

    // Rellenar el formulario con los datos actuales
    document.getElementById('editNombre').value = usuario.nombre;
    document.getElementById('editApellido').value = usuario.apellido;
    document.getElementById('editCargo').value = usuario.cargo;
    document.getElementById('editCorreo').value = usuario.correo;
    document.getElementById('editFechaIngreso').value = usuario.fecha_ingreso;

    // Guardar cambios al enviar el formulario
    const form = document.getElementById('editUserForm');
    form.onsubmit = function(e) {
        e.preventDefault();

        // Validar correo único (excepto el actual)
        const nuevoCorreo = document.getElementById('editCorreo').value.trim();
        if (
            usuarios.some((u, i) => u.correo.toLowerCase() === nuevoCorreo.toLowerCase() && i !== idx)
        ) {
            alert("El correo ya está registrado en la lista de usuarios.");
            return;
        }

        usuarios[idx] = {
            nombre: document.getElementById('editNombre').value.trim(),
            apellido: document.getElementById('editApellido').value.trim(),
            cargo: document.getElementById('editCargo').value,
            correo: nuevoCorreo,
            fecha_ingreso: document.getElementById('editFechaIngreso').value
        };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
        renderUsuarios();
    };

    // Mostrar el modal
    const editModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    editModal.show();
};

document.addEventListener('DOMContentLoaded', renderUsuarios);