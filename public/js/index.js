const serverSocket = io();

const listaProductos = `
<h1>Generado desde index.js en public/js</h1>
{{#if hayProductos }}
<ul class='lista'>
    {{#each productos}}
    <li class='card'>{{#each this}}
      <p>{{@key}}: {{this}}</p>
      {{/each}}
    </li>
    {{/each}}
</ul>
{{else}}
<p>no hay productos...</p>
{{/if}}
`

const plantilla = Handlebars.compile(listaProductos)

serverSocket.on('actualizacion', productos => {
    const contenedor = document.querySelector('#contenedorLista');
    if (contenedor) {
        contenedor.innerHTML = plantilla({ productos, hayProductos: productos.length });
    }
});

const form = document.getElementById('formulario');
form.addEventListener('submit', nuevoProducto);

function nuevoProducto(event) {
    event.preventDefault();
    const campos = {};

    [...event.target.elements]
        .filter(el=>el.type !=='submit')
        .map(el=> campos[el.name]=el.value);
    
    serverSocket.emit('nuevoProducto', campos);
}
