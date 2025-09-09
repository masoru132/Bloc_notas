import dotenv from "dotenv";
dotenv.config();

import postgres from "postgres";

// Función para conectarnos a la BBDD
function conectar() {
    return postgres({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.BD_PASSWORD
    });
}

export function buscarUsuario(usuario) {
    return new Promise((ok, ko) => {
        const conexion = conectar();
        conexion`SELECT * FROM usuarios WHERE usuario = ${usuario}`
            .then(([usuario]) => {
                conexion.end();
                ok(usuario)
            })
            .catch(() => ko({ error: "error en bbdd" }));
    });
}

// Funciones CRUD

// Create
export function crearTarea(texto, usuario) {
    return new Promise((ok, ko) => {
        const conexion = conectar();
        conexion`INSERT INTO tareas (texto,usuario) VALUES (${texto},${usuario}) RETURNING id`
            .then(([{ id }]) => {
                conexion.end();
                ok(id)
            })
            .catch(() => ko({ error: "error en bbdd" }));
    });
}

// Read 
export function leerTarea(usuario) {
    return new Promise((ok, ko) => {
        const conexion = conectar();
        conexion`SELECT * FROM tareas WHERE usuario = ${usuario} ORDER BY id`
            .then(tareas => {
                conexion.end();
                ok(tareas)
            })
            .catch(() => ko({ error: "error en bbdd" }));
    })
}

// Update (estado)
export function editarEstado(id) {
    return new Promise((ok, ko) => {
        const conexion = conectar();
        conexion`UPDATE tareas SET estado = NOT estado WHERE id = ${id}`
            .then(({count}) => {
                conexion.end();
                ok(count)
            })
            .catch(() => ko({ error: "error en bbdd" }));
    })
}

// Update (texto)
export function editarTexto(id, texto) {
    return new Promise((ok, ko) => {
        const conexion = conectar();
        conexion`UPDATE tareas SET texto = ${texto} WHERE id = ${id}`
            .then(({count}) => {
                conexion.end();
                ok(count)
            })
            .catch(() => ko({ error: "error en bbdd" }));
    })
}

// Delete
export function borrarTarea(id) {
    return new Promise((ok, ko) => {
        const conexion = conectar();
        conexion`DELETE FROM tareas WHERE id = ${id}`
            .then(({count}) => {
                conexion.end();
                ok(count)
            })
            .catch(() => ko({ error: "error en bbdd" }));
    })
}
