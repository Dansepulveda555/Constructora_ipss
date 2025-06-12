// Lista inicial de usuarios
let usuarios = [
    {
        nombre: "Daniel",
        apellido: "Barrera",
        fecha_nacimiento: "1980-05-10",
        correo: "Daniel.Barrera@email.com",
        cargo: "Maestro de Obras",
        fecha_ingreso: "2022-03-15"
    },
    {
        nombre: "Ivan",
        apellido: "Bilbao",
        fecha_nacimiento: "1990-07-20",
        correo: "Ivan.Bilbao@email.com",
        cargo: "Ingeniera Civil",
        fecha_ingreso: "2021-08-10"
    }
];

// Renderizar usuarios
function renderUsuarios() {
    const lista = document.getElementById('usuarios-lista');
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
                    <p class="mb-1"><strong>Fecha de nacimiento:</strong> ${u.fecha_nacimiento}</p>
                    <p class="mb-0"><strong>Fecha de ingreso:</strong> ${u.fecha_ingreso}</p>
                    <button class="btn btn-danger btn-sm mt-2" onclick="eliminarUsuario(${idx})">Eliminar</button>
                </div>
            </div>
        `;
        lista.appendChild(col);
    });
}

// Eliminar usuario
window.eliminarUsuario = function(idx) {
    if (confirm("¿Está seguro que desea eliminar este usuario?")) {
        usuarios.splice(idx, 1);
        renderUsuarios();
    }
};

// Validaciones y manejo de formulario
let usuarioPendiente = null;
document.addEventListener('DOMContentLoaded', function() {
    renderUsuarios();

    const form = document.getElementById('usuarioForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const correo = document.getElementById('correo').value.trim();
        const cargo = document.getElementById('cargo').value;
        const fecha_ingreso = document.getElementById('fecha_ingreso').value;

        // Validar campos vacíos
        if (!nombre || !apellido || !fecha_nacimiento || !correo || !cargo || !fecha_ingreso) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Validar correo único
        if (usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase())) {
            alert("El correo ya está registrado en la lista de usuarios.");
            return;
        }

        // Validar edad mínima 18 años
        const fechaNac = new Date(fecha_nacimiento);
        const fechaIng = new Date(fecha_ingreso);
        const fechaMinIngreso = new Date(fechaNac);
        fechaMinIngreso.setFullYear(fechaMinIngreso.getFullYear() + 18);

        if (fechaIng < fechaMinIngreso) {
            alert("La fecha de ingreso debe ser al menos 18 años después de la fecha de nacimiento.");
            return;
        }

        // Guardar usuario pendiente y mostrar modal
        usuarioPendiente = { nombre, apellido, fecha_nacimiento, correo, cargo, fecha_ingreso };
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
        confirmModal.show();
    });

    // Confirmar agregar usuario
    document.getElementById('confirmAddBtn').addEventListener('click', function() {
        if (usuarioPendiente) {
            usuarios.push(usuarioPendiente);
            renderUsuarios();
            form.reset();
            usuarioPendiente = null;
            bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
        }
    });
});