- [Notas a esta entrega](#org11aaba1)
- [Notas Generales](#org4d79f08)
- [Organización del proyecto](#orga51f0c9)



<a id="org11aaba1"></a>

# Notas a esta entrega

-   Instancia de modelo de productos exportado desde schemaProducto.js (antes se instanciaba en el manager de productos).
-   Agregadas opciones de paginación a manager de productos
-   Agregadas opciones de paginación al método get del router de productos por query params:
    -   /api/products?limit=5&page=2&sort=asc devuelve la segunda página de a cinco productos de la categoría ordenados por precio en forma ascendente por precio.
-   Agregado formato de objeto que devuelve el método GET:

\`\`\` { status:success/error payload: Resultado de los productos solicitados totalPages: Total de páginas prevPage: Página anterior nextPage: Página siguientekjnkjn page: Página actual hasPrevPage: Indicador para saber si la página previa existe hasNextPage: Indicador para saber si la página siguiente existe. prevLink: Link directo a la página previa (null si hasPrevPage=false) nextLink: Link directo a la página siguiente (null si hasNextPage=false) } \`\`\`


<a id="org4d79f08"></a>

# Notas Generales


<a id="orga51f0c9"></a>

# Organización del proyecto
