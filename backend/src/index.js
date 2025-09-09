import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";

const servidor = express();

servidor.use(cors());

servidor.use(express.json());

// Rutas públicas (login)
servidor.use(authRoutes);

// Middleware de autorización para rutas privadas
servidor.use(autorizar);

// Rutas privadas (tareas)
servidor.use("/tareas", tareasRoutes);

// Middleware de manejo de errores
servidor.use(errorHandler);

// Ruta 404
servidor.use((peticion, respuesta) => {
    respuesta.status(404);
    respuesta.json({ error: "recurso no encontrado :(" });
});

servidor.listen(process.env.PORT);