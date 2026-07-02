const productosInventario = [
    { codigo: "P001", nombre: "Arroz Costeño 5kg", stock: 25, precio: 18.50 },
    { codigo: "P002", nombre: "Aceite Primor 1L", stock: 12, precio: 9.80 },
    { codigo: "P003", nombre: "Leche Gloria 400g", stock: 18, precio: 4.20 },
    { codigo: "P004", nombre: "Coca Cola 3L", stock: 10, precio: 12.50 }
];

const productoVenta = document.getElementById("productoVenta");
const stockDisponible = document.getElementById("stockDisponible");
const precioUnitario = document.getElementById("precioUnitario");
const cantidadVenta = document.getElementById("cantidadVenta");
const totalVenta = document.getElementById("totalVenta");
const btnRegistrarVenta = document.getElementById("btnRegistrarVenta");
const tablaVentas = document.getElementById("tablaVentas");

productosInventario.forEach(producto => {
    const option = document.createElement("option");
    option.value = producto.codigo;
    option.textContent = producto.nombre;
    productoVenta.appendChild(option);
});

productoVenta.addEventListener("change", actualizarDatosProducto);
cantidadVenta.addEventListener("input", calcularTotal);

function actualizarDatosProducto() {
    const producto = obtenerProductoSeleccionado();

    if (!producto) {
        stockDisponible.value = "";
        precioUnitario.value = "";
        totalVenta.value = "";
        return;
    }

    stockDisponible.value = producto.stock;
    precioUnitario.value = `S/ ${producto.precio.toFixed(2)}`;
    calcularTotal();
}

function calcularTotal() {
    const producto = obtenerProductoSeleccionado();
    const cantidad = Number(cantidadVenta.value);

    if (!producto || cantidad <= 0) {
        totalVenta.value = "";
        return;
    }

    const total = producto.precio * cantidad;
    totalVenta.value = `S/ ${total.toFixed(2)}`;
}

function obtenerProductoSeleccionado() {
    return productosInventario.find(producto => producto.codigo === productoVenta.value);
}

btnRegistrarVenta.addEventListener("click", () => {
    const producto = obtenerProductoSeleccionado();
    const cantidad = Number(cantidadVenta.value);

    if (!producto) {
        alert("Seleccione un producto.");
        return;
    }

    if (cantidad <= 0) {
        alert("Ingrese una cantidad válida.");
        return;
    }

    if (cantidad > producto.stock) {
        alert("No hay stock suficiente.");
        return;
    }

    producto.stock -= cantidad;

    const total = producto.precio * cantidad;

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${cantidad}</td>
        <td>S/ ${producto.precio.toFixed(2)}</td>
        <td>S/ ${total.toFixed(2)}</td>
        <td><span class="badge badge-success">Registrada</span></td>
    `;

    tablaVentas.appendChild(fila);

    stockDisponible.value = producto.stock;
    cantidadVenta.value = "";
    totalVenta.value = "";

    alert("Venta registrada correctamente.");
});