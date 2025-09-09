import { crearTarea, leerTarea, editarEstado, editarTexto, borrarTarea } from "../utils/datos.js";

export const getTareas = async (peticion, respuesta) => {
  try {
      let tareas = await leerTarea(peticion.usuario);
      respuesta.json(tareas);
  } catch (error) {
      respuesta.status(500);
      respuesta.json({ error: "error en el servidor" });
  }
};

export const nuevaTarea = async (peticion, respuesta, siguiente) => {
  let { tarea } = peticion.body;
  if (tarea == undefined || tarea.toString().trim() == "") {
      return siguiente(true);
  }
  try {
      let id = await crearTarea(tarea, peticion.usuario);
      respuesta.json({ id });
  } catch (error) {
      respuesta.status(500);
      respuesta.json({ error: "error en el servidor" });
  }
};

export const borrar = async (peticion, respuesta, siguiente) => {
  let id = Number(peticion.params.id);
  if (!id) return siguiente();
  try {
      let cantidad = await borrarTarea(id);
      if (!cantidad) return siguiente();
      respuesta.sendStatus(204);
  } catch (error) {
      respuesta.status(500);
      respuesta.json({ error: "error en el servidor" });
  }
};

export const actualizarTexto = async (peticion, respuesta, siguiente) => {
  let id = Number(peticion.params.id);
  let { tarea } = peticion.body;
  if (!id || tarea == undefined || tarea.toString().trim() == "") return siguiente(true);
  try {
      let cantidad = await editarTexto(id, tarea);
      if (!cantidad) return siguiente();
      respuesta.sendStatus(204);
  } catch (error) {
      respuesta.status(500);
      respuesta.json({ error: "error en el servidor" });
  }
};

export const actualizarEstado = async (peticion, respuesta, siguiente) => {
  let id = Number(peticion.params.id);
  if (!id) return siguiente();
  try {
      let cantidad = await editarEstado(id);
      if (!cantidad) return siguiente();
      respuesta.sendStatus(204);
  } catch (error) {
      respuesta.status(500);
      respuesta.json({ error: "error en el servidor" });
  }
};
