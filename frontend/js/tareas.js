class Tarea {

    constructor(id, texto, estado, contenedor) {
        this.id = id;
        this.texto = texto;
        this.DOM = null;
        this.editando = false;
        this.crearTarea(estado, contenedor);
    }

    crearTarea(estado, contenedor) {
        this.DOM = document.createElement("div");
        this.DOM.classList.add("tarea");

        let textoTarea = document.createElement("h2");
        textoTarea.classList.add("visible");
        textoTarea.innerText = this.texto;

        let editorTarea = document.createElement("input");
        editorTarea.setAttribute("type", "text");
        editorTarea.value = this.texto;

        let botonEditar = document.createElement("button");
        botonEditar.classList.add("boton");
        botonEditar.innerText = "editar";
        botonEditar.addEventListener("click", () => this.actualizarTexto());

        let botonBorrar = document.createElement("button");
        botonBorrar.classList.add("boton");
        botonBorrar.innerText = "borrar";
        botonBorrar.addEventListener("click", () => this.borrarTarea());

        let botonEstado = document.createElement("button");
        botonEstado.className = `estado ${estado ? "terminada" : ""}`;
        botonEstado.appendChild(document.createElement("span"));

        botonEstado.addEventListener("click", () => {
            this.actualizarEstado()
                .then(() => botonEstado.classList.toggle("terminada"))
                .catch(() => console.log("error al actualizar estado")); // cambiar con un mensaje
        });

        this.DOM.appendChild(textoTarea);
        this.DOM.appendChild(editorTarea);
        this.DOM.appendChild(botonEditar);
        this.DOM.appendChild(botonBorrar);
        this.DOM.appendChild(botonEstado);

        contenedor.appendChild(this.DOM);
    }

    borrarTarea() {
        fetch("https://api-todo-x4ax.onrender.com/tareas/borrar/" + this.id, {
            method: "DELETE"
        })
            .then(respuesta => {
                if (respuesta.status == 204) {
                    return this.DOM.remove();
                }
                console.log("error al borrar");
            });
    }

    actualizarEstado() {
        return new Promise((ok, ko) => {
            fetch("https://api-todo-x4ax.onrender.com/tareas/actualizar/estado/" + this.id, {
                method: "PUT"
            })
                .then(respuesta => {
                    if (respuesta.status == 204) {
                        return ok();
                    }
                    ko();
                });

        });
    }

    async actualizarTexto() {
        if (this.editando) {

            let posibleTarea = this.DOM.children[1].value.trim();
            if (posibleTarea != "" && posibleTarea != this.texto) {
                let { status } = await fetch("https://api-todo-x4ax.onrender.com/tareas/actualizar/texto/" + this.id, {
                    method: "PUT",
                    body: JSON.stringify({ tarea: posibleTarea }),
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                if (status == 204) {
                    this.texto = posibleTarea;
                } else {
                    console.log("error editando el texto");
                }
            }

            //al editorTarea se le quita la clase visible
            this.DOM.children[1].classList.remove("visible");
            //al textoTarea se le pone en su innerText this.texto
            this.DOM.children[0].innerText = this.texto;
            //al textoTarea se le pone la clase visible
            this.DOM.children[0].classList.add("visible");
            //al botonEditar se le cambia el texto a "editar"
            this.DOM.children[2].innerText = "editar";
        } else {
            //Al textoTarea se le quita la clase visible
            this.DOM.children[0].classList.remove("visible");
            //al editorTarea en su value se le pone el this.texto
            this.DOM.children[1].value = this.texto;
            //al editorTarea se le pone la clase visible
            this.DOM.children[1].classList.add("visible");
            // al botonEditar se le cambia el texto a "guardar"
            this.DOM.children[2].innerText = "guardar";
        }
        this.editando = !this.editando;
    }

}