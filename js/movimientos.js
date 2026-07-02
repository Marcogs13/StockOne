const productosMovimiento = [
    { codigo: "P001", nombre: "Arroz Costeño 5kg" },
    { codigo: "P002", nombre: "Aceite Primor 1L" },
    { codigo: "P003", nombre: "Leche Gloria 400g" },
    { codigo: "P004", nombre: "Coca Cola 3L" },
    { codigo: "P005", nombre: "Azúcar Rubia 1kg" }
];

const productoMovimiento = document.getElementById("productoMovimiento");
const tipoMovimiento = document.getElementById("tipoMovimiento");
const cantidadMovimiento = document.getElementById("cantidadMovimiento");
const motivoMovimiento = document.getElementById("motivoMovimiento");
const btnRegistrarMovimiento = document.getElementById("btnRegistrarMovimiento");
const tablaMovimientos = document.getElementById("tablaMovimientos");

productosMovimiento.forEach(producto => {
    const option = document.createElement("option");
    option.value = producto.codigo;
    option.textContent = producto.nombre;
    productoMovimiento.appendChild(option);
});

btnRegistrarMovimiento.addEventListener("click", () => {
    const producto = productosMovimiento.find(p => p.codigo === productoMovimiento.value);
    const tipo = tipoMovimiento.value;
    const cantidad = Number(cantidadMovimiento.value);
    const motivo = motivoMovimiento.value;

    if (!producto) {
        alert("Seleccione un producto.");
        return;
    }

    if (!tipo) {
        alert("Seleccione el tipo de movimiento.");
        return;
    }

    if (cantidad <= 0) {
        alert("Ingrese una cantidad válida.");
        return;
    }

    if (!motivo) {
        alert("Seleccione un motivo.");
        return;
    }

    let clase = "badge-success";

    if (tipo === "Salida") {
        clase = "badge-danger";
    } else if (tipo === "Ajuste") {
        clase = "badge-warning";
    }

    const fecha = new Date().toLocaleString("es-PE");

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${fecha}</td>
        <td>${producto.nombre}</td>
        <td><span class="badge ${clase}">${tipo}</span></td>
        <td>${cantidad}</td>
        <td>${motivo}</td>
        <td><span class="badge badge-success">Registrado</span></td>
    `;

    tablaMovimientos.appendChild(fila);

    productoMovimiento.value = "";
    tipoMovimiento.value = "";
    cantidadMovimiento.value = "";
    motivoMovimiento.value = "";

    alert("Movimiento registrado correctamente.");
});