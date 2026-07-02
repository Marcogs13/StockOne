document.addEventListener("DOMContentLoaded", async () => {
    await cargarSidebar();
    await cargarTopbar();
    configurarPaginaActual();
});

async function cargarSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    const respuesta = await fetch("components/sidebar.html");
    const html = await respuesta.text();

    sidebar.innerHTML = html;
}

async function cargarTopbar() {
    const topbar = document.getElementById("topbar");

    if (!topbar) return;

    const respuesta = await fetch("components/topbar.html");
    const html = await respuesta.text();

    topbar.innerHTML = html;
}

function configurarPaginaActual() {
    const pagina = document.body.dataset.page;

    const datos = {
        dashboard: {
            titulo: "Dashboard",
            descripcion: "Resumen general del sistema de inventario."
        },
        catalogo: {
            titulo: "Catálogo",
            descripcion: "Lista maestra de productos disponibles."
        },
        inventario: {
            titulo: "Inventario",
            descripcion: "Control de stock, precios y reabastecimiento."
        },
        ventas: {
            titulo: "Ventas",
            descripcion: "Registro de ventas y salida de productos."
        },
        movimientos: {
            titulo: "Movimientos",
            descripcion: "Historial de entradas, salidas y ajustes."
        },
        configuracion: {
            titulo: "Configuración",
            descripcion: "Parámetros generales del sistema."
        }
    };

    if (datos[pagina]) {
        document.getElementById("pageTitle").textContent = datos[pagina].titulo;
        document.getElementById("pageDescription").textContent = datos[pagina].descripcion;
    }

    const enlaceActivo = document.querySelector(`[data-page="${pagina}"]`);

    if (enlaceActivo) {
        enlaceActivo.classList.add("active");
    }
}