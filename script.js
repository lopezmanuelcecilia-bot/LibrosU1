const formulario = document.getElementById("formularioComentario");
const contenedor = document.getElementById("contenedorComentarios");

let comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];

function guardarEnStorage() {
    localStorage.setItem("comentarios", JSON.stringify(comentariosGuardados));
}

function renderizarComentarios() {
    contenedor.innerHTML = "";
    comentariosGuardados.forEach((comentario, indice) => {
        const divComentario = document.createElement("div");
        
        const pTexto = document.createElement("p");
        pTexto.textContent = comentario.texto;
        
        const pFecha = document.createElement("small");
        pFecha.textContent = "Publicado el: " + comentario.fecha;
        
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        
        botonEliminar.addEventListener("click", function() {
            comentariosGuardados.splice(indice, 1);
            guardarEnStorage();
            renderizarComentarios();
        });
        
        divComentario.appendChild(pTexto);
        divComentario.appendChild(pFecha);
        divComentario.appendChild(botonEliminar);
        contenedor.appendChild(divComentario);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const texto = document.getElementById("textoComentario").value;
    const fecha = new Date().toLocaleString();
    
    comentariosGuardados.push({ texto, fecha });
    guardarEnStorage();
    renderizarComentarios();
    formulario.reset();
});

renderizarComentarios();
