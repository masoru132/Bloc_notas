import jwt from "jsonwebtoken";

export function autorizar(peticion, respuesta, siguiente) {
  let token = peticion.headers.authorization?.split(" ")[1]; // Bearer
  if (!token) return respuesta.send("error en la autorización");

  jwt.verify(token, process.env.SECRET, (error, datos) => {
      if (!error) {
          peticion.usuario = datos.id;
          return siguiente();
      }
      respuesta.send("error en la autorización");
  });
}
