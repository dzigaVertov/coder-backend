const formRegistro = document.getElementById('formularioRegistro');

if (formRegistro instanceof HTMLFormElement) {
    formRegistro.addEventListener('submit', nuevoUsuario);
}

function nuevoUsuario(event) {
    event.preventDefault();

    const campos = {};
    const formData = new FormData(formRegistro);
    formData.forEach((value, key) => (campos[key] = value));
    fetch('/api/registro', {
        method: 'POST',
        body: JSON.stringify(campos),
        headers: {
            "Content-type": "application/json"
        }
    });
}
