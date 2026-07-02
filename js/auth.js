const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");

function generarCorreoInterno(nombreUsuario) {
    return nombreUsuario.toLowerCase().trim() + "@stockone.com";
}

btnLogin.addEventListener("click", async () => {
    const user = usuario.value.trim().toLowerCase();
    const pass = password.value.trim();

    if (!user || !pass) {
        alert("Ingrese usuario y contraseña.");
        return;
    }

    const email = generarCorreoInterno(user);

    const { error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: pass
    });

    if (error) {
        alert("Usuario o contraseña incorrectos.");
        return;
    }

    window.location.href = "dashboard.html";
});