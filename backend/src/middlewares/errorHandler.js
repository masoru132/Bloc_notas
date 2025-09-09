// Middleware de manejo de errores
// Al tener 4 argumentos, Express lo reserva para errores
export default (error, peticion, respuesta, siguiente) => {
  respuesta.status(400);
  respuesta.json({ error: "error en la petición" });
};