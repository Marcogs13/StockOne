const ventasCtx = document.getElementById("ventasChart");

new Chart(ventasCtx, {
    type: "line",
    data: {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        datasets: [{
            label: "Ventas S/",
            data: [320, 450, 380, 600, 850, 720, 910],
            borderWidth: 3,
            tension: 0.4
        }]
    }
});

const categoriasCtx = document.getElementById("categoriasChart");

new Chart(categoriasCtx, {
    type: "doughnut",
    data: {
        labels: ["Abarrotes", "Bebidas", "Lácteos", "Limpieza"],
        datasets: [{
            label: "Productos",
            data: [45, 25, 18, 12]
        }]
    }
});