const usuarioRegistro = document.getElementById("usuarioRegistro");
const passwordRegistro = document.getElementById("passwordRegistro");
const btnRegistrarCuenta = document.getElementById("btnRegistrarCuenta");

function generarCorreoInterno(usuario) {
    return usuario.toLowerCase().trim() + "@stockone.com";
}

btnRegistrarCuenta.addEventListener("click", async () => {
    const usuario = usuarioRegistro.value.trim().toLowerCase();
    const password = passwordRegistro.value.trim();

    if (!usuario || !password) {
        alert("Ingrese usuario y contraseña.");
        return;
    }

    if (usuario.includes(" ")) {
        alert("El usuario no debe tener espacios.");
        return;
    }

    const email = generarCorreoInterno(usuario);

    const { error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        alert("Error al crear cuenta: " + error.message);
        return;
    }

    alert("Cuenta creada correctamente. Ahora inicia sesión.");
    window.location.href = "index.html";
});