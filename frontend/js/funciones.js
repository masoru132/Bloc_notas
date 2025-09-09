const contTareas = document.querySelector(".tareas");
const formulario = document.querySelector("form");
const inputTexto = document.querySelector("input[type=text]");

//CARGA INNICIAL DE LOS DATOS
fetch("https://api-todo-x4ax.onrender.com/tareas")
    .then(respuesta => respuesta.json())
    .then(tareas => {
        tareas.forEach(({ id, texto, estado }) => new Tarea(id, texto, estado, contTareas));
    });


formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    let tarea = inputTexto.value.trim();

    if (tarea != "") {
        fetch("https://api-todo-x4ax.onrender.com/tareas/nueva", {
            method: "POST",
            body: JSON.stringify({ tarea }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(respuesta => respuesta.json())
            .then(({ id, error }) => {
                if (!error) {
                    new Tarea(id, tarea, false, contTareas);
                    return inputTexto = "";
                }
                console.log("Mostrar error al usuaior")
            });

    }
});