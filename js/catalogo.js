document.addEventListener("DOMContentLoaded", async () => {
    await cargarModal();
    await cargarCatalogo();

    const btnAbrirFormulario = document.getElementById("btnAbrirFormulario");

    btnAbrirFormulario.addEventListener("click", () => {
        document.getElementById("modalProducto").classList.add("show");
    });
});

async function cargarModal() {
    const modalContainer = document.getElementById("modalContainer");
    const respuesta = await fetch("components/modal.html");

    modalContainer.innerHTML = await respuesta.text();

    document.getElementById("btnCerrarModal").addEventListener("click", cerrarModal);
    document.getElementById("btnCancelarModal").addEventListener("click", cerrarModal);

    document.getElementById("btnGuardarProducto").addEventListener("click", async () => {
        console.log("Click en guardar producto");
        await guardarProducto();
    });
}

function cerrarModal() {
    document.getElementById("modalProducto").classList.remove("show");
    limpiarFormulario();
}

async function cargarCatalogo() {
    const { data, error } = await supabaseClient
        .from("catalogo")
        .select("*")
        .order("codigo");

    if (error) {
        console.error(error);
        alert("Error al cargar catálogo.");
        return;
    }

    const tablaCatalogo = document.getElementById("tablaCatalogo");
    tablaCatalogo.innerHTML = "";

    data.forEach(producto => {
        tablaCatalogo.innerHTML += `
            <tr>
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>${producto.marca}</td>
                <td>${producto.categoria}</td>
                <td>${producto.unidad}</td>
                <td><span class="badge badge-success">${producto.estado}</span></td>
            </tr>
        `;
    });

    document.getElementById("totalCatalogo").textContent = data.length;
    document.getElementById("totalCategorias").textContent = new Set(data.map(p => p.categoria)).size;
    document.getElementById("totalMarcas").textContent = new Set(data.map(p => p.marca)).size;
}

async function guardarProducto() {
    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const marca = document.getElementById("marca").value.trim();
    const categoria = document.getElementById("categoria").value;
    const unidad = document.getElementById("unidad").value;

    if (!codigo || !nombre || !marca || !categoria || !unidad) {
        alert("Complete todos los campos.");
        return;
    }

    const nuevoProducto = {
        codigo,
        nombre,
        marca,
        categoria,
        unidad,
        estado: "Activo"
    };

    const { error } = await supabaseClient
        .from("catalogo")
        .insert([nuevoProducto]);

    if (error) {
        console.error(error);
        alert("Error al guardar: " + error.message);
        return;
    }

    alert("Producto guardado correctamente.");
    cerrarModal();
    await cargarCatalogo();
}

function limpiarFormulario() {
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("unidad").value = "";
}