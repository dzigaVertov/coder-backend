import { stockOptions, categoryOptions } from '../models/busquedaOptions.js';

export function validarBusqueda({ category, stock }) {
    if (!stockOptions.contains(stock)) throw new Error('Invalid Stock');
    if (!categoryOptions.contains(category)) throw new Error('Invalid Category');

    return {category, stock};
}


export function validarPaginacion(paginacion){
    const {limit, page, sort} = paginacion;
    if (paginacion){
        
    }
}
