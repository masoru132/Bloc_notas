import { buscarUsuario } from "../utils/datos.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (peticion, respuesta, siguiente) => {
  let { usuario, password } = peticion.body;
  if (usuario == undefined ||
      usuario.toString().trim() == "" ||
      password == undefined ||
      password.toString().trim() == "") {
      return siguiente(true);
  }
  try {
      let datos = await buscarUsuario(usuario);
      if (!datos) {
          return respuesta.sendStatus(401);
      }
      let valido = await bcrypt.compare(password, datos.password);
      if (!valido) {
          return respuesta.sendStatus(403);
      }
      let token = jwt.sign({ id: datos.id }, process.env.SECRET);
      respuesta.json({ token });
  } catch (error) {
      respuesta.status(500);
      respuesta.json({ error: "error en el servidor" });
  }
};
