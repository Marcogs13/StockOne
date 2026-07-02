const nombreTienda = document.getElementById("nombreTienda");
const rucTienda = document.getElementById("rucTienda");
const telefonoTienda = document.getElementById("telefonoTienda");
const direccionTienda = document.getElementById("direccionTienda");
const stockMinimoGeneral = document.getElementById("stockMinimoGeneral");
const alertasStock = document.getElementById("alertasStock");

const btnGuardarConfig = document.getElementById("btnGuardarConfig");
const tablaConfiguracion = document.getElementById("tablaConfiguracion");

btnGuardarConfig.addEventListener("click", () => {
    if (!nombreTienda.value || !rucTienda.value || !telefonoTienda.value) {
        alert("Complete nombre de tienda, RUC y teléfono.");
        return;
    }

    tablaConfiguracion.innerHTML = `
        <tr>
            <td>Nombre de tienda</td>
            <td>${nombreTienda.value}</td>
        </tr>
        <tr>
            <td>RUC</td>
            <td>${rucTienda.value}</td>
        </tr>
        <tr>
            <td>Teléfono</td>
            <td>${telefonoTienda.value}</td>
        </tr>
        <tr>
            <td>Dirección</td>
            <td>${direccionTienda.value}</td>
        </tr>
        <tr>
            <td>Stock mínimo general</td>
            <td>${stockMinimoGeneral.value}</td>
        </tr>
        <tr>
            <td>Alertas de stock</td>
            <td><span class="badge badge-success">${alertasStock.value}</span></td>
        </tr>
    `;

    alert("Configuración guardada correctamente.");
});