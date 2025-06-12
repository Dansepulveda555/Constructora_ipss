// Cargar usuarios desde localStorage o usar los iniciales si no hay datos guardados
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
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
        cargo: "Ingeniero Civil",
        fecha_ingreso: "2021-08-10"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addUserForm');
    let usuarioPendiente = null;

    form.addEventListener('submit', function (e) {
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

    document.getElementById('confirmAddBtn').addEventListener('click', function () {
        if (usuarioPendiente) {
            usuarios.push(usuarioPendiente);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            document.getElementById('addUserForm').reset();
            usuarioPendiente = null;
            bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
            alert("Usuario agregado correctamente.");
        }
    });
});