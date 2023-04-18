
# Table of Contents

1.  [Notas a esta entrega](#orgb0a916b)
2.  [Notas Generales](#orgd14ce38)
3.  [Organización del proyecto](#orgef84d66)



<a id="orgb0a916b"></a>

# Notas a esta entrega

-   Instancia de modelo de productos exportado desde schemaProducto.js (antes se instanciaba en el manager de productos).
-   Agregadas opciones de paginación a manager de productos
-   Agregadas opciones de paginación al método get del router de productos por query params:
    -   /api/products?limit=5&page=2&sort=asc devuelve la segunda página de a cinco productos de la categoría ordenados por precio en forma ascendente por precio.
-   Agregado formato de objeto que devuelve el método GET:

\`\`\`
{
	status:success/error
    payload: Resultado de los productos solicitados
    totalPages: Total de páginas
    prevPage: Página anterior
    nextPage: Página siguiente
    page: Página actual
    hasPrevPage: Indicador para saber si la página previa existe
    hasNextPage: Indicador para saber si la página siguiente existe.
    prevLink: Link directo a la página previa (null si hasPrevPage=false)
    nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}
\`\`\`


<a id="orgd14ce38"></a>

# Notas Generales


<a id="orgef84d66"></a>

# Organización del proyecto

