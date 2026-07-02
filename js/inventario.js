const catalogoProductos = [
    { codigo: "P001", nombre: "Arroz Costeño 5kg", marca: "Costeño", categoria: "Abarrotes", unidad: "Bolsa" },
    { codigo: "P002", nombre: "Aceite Primor 1L", marca: "Primor", categoria: "Abarrotes", unidad: "Botella" },
    { codigo: "P003", nombre: "Leche Gloria 400g", marca: "Gloria", categoria: "Lácteos", unidad: "Lata" },
    { codigo: "P004", nombre: "Coca Cola 3L", marca: "Coca Cola", categoria: "Bebidas", unidad: "Botella" },
    { codigo: "P005", nombre: "Azúcar Rubia 1kg", marca: "Cartavio", categoria: "Abarrotes", unidad: "Bolsa" }
];

const productoSelect = document.getElementById("productoSelect");
const codigo = document.getElementById("codigo");
const categoria = document.getElementById("categoria");
const marca = document.getElementById("marca");
const unidad = document.getElementById("unidad");

const stock = document.getElementById("stock");
const precioCompra = document.getElementById("precioCompra");
const precioVenta = document.getElementById("precioVenta");
const stockMinimo = document.getElementById("stockMinimo");

const btnAgregar = document.getElementById("btnAgregar");
const tablaInventario = document.getElementById("tablaInventario");

catalogoProductos.forEach(producto => {
    const option = document.createElement("option");
    option.value = producto.codigo;
    option.textContent = producto.nombre;
    productoSelect.appendChild(option);
});

productoSelect.addEventListener("change", () => {
    const producto = catalogoProductos.find(p => p.codigo === productoSelect.value);

    if (!producto) {
        codigo.value = "";
        categoria.value = "";
        marca.value = "";
        unidad.value = "";
        return;
    }

    codigo.value = producto.codigo;
    categoria.value = producto.categoria;
    marca.value = producto.marca;
    unidad.value = producto.unidad;
});

btnAgregar.addEventListener("click", () => {
    const producto = catalogoProductos.find(p => p.codigo === productoSelect.value);

    if (!producto) {
        alert("Seleccione un producto.");
        return;
    }

    if (!stock.value || !precioVenta.value || !stockMinimo.value) {
        alert("Complete stock, precio venta y stock mínimo.");
        return;
    }

    let estado = "Disponible";
    let clase = "badge-success";

    if (Number(stock.value) === 0) {
        estado = "Agotado";
        clase = "badge-danger";
    } else if (Number(stock.value) <= Number(stockMinimo.value)) {
        estado = "Stock bajo";
        clase = "badge-warning";
    }

    tablaInventario.innerHTML += `
        <tr>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${stock.value}</td>
            <td>S/ ${Number(precioVenta.value).toFixed(2)}</td>
            <td><span class="badge ${clase}">${estado}</span></td>
        </tr>
    `;

    limpiarFormulario();
});

function limpiarFormulario() {
    productoSelect.value = "";
    codigo.value = "";
    categoria.value = "";
    marca.value = "";
    unidad.value = "";
    stock.value = "";
    precioCompra.value = "";
    precioVenta.value = "";
    stockMinimo.value = "";
}