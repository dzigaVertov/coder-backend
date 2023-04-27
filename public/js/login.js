const formularioLogin = document.querySelector('#formularioLogin');

if (formularioLogin instanceof HTMLFormElement) {
    console.log('afuera');
    formularioLogin.addEventListener('submit', loginSubmit)
}

function loginSubmit(event) {
    event.preventDefault();
    const email = document.querySelector('#input_email');
    const pass = document.querySelector('#input_password');

    if ((email instanceof HTMLInputElement) &&
        (pass instanceof HTMLInputElement)) {
        const datosUsuario = {
            email: email.value,
            password: pass.value
        };

        fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });
    }
}
