
# Table of Contents

1.  [Notas a esta entrega](#org2048781)
2.  [Notas Generales](#org829cf9e)
3.  [Organización del proyecto](#org166a30d)



<a id="org2048781"></a>

# Notas a esta entrega

-   Instancia de modelo de productos exportado desde schemaProducto.js (antes se instanciaba en el manager de productos).
-   Agregadas opciones de paginación a manager de productos
-   Agregadas opciones de paginación al método get del router de productos por query params:
    -   /api/products?limit=5&page=2&sort=asc devuelve la segunda página de a cinco productos de la categoría ordenados por precio en forma ascendente por precio.
-   Agregado formato de objeto que devuelve el método GET:

    {
    	status:success/error
        payload: Resultado de los productos solicitados
        totalPages: Total de páginas
        prevPage: Página anterior
        nextPage: Página siguientekjnkjn
        page: Página actual
        hasPrevPage: Indicador para saber si la página previa existe
        hasNextPage: Indicador para saber si la página siguiente existe.
        prevLink: Link directo a la página previa (null si hasPrevPage=false)
        nextLink: Link directo a la página siguiente (null si hasNextPage=false)
    }

-   Agregado parámetro de stock al get:
    -   ?stock=available devuelve productos con stock
    -   ?stock=unavailable devuelve productos sin stock

-   Agregada la ruta de actualización de cantidad de producto en carrito: PUT api/carts/:cid/products/:pid


<a id="org829cf9e"></a>

# Notas Generales


<a id="org166a30d"></a>

# Organización del proyecto

