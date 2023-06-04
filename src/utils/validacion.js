export function noVacio(value) {
    if (!value) throw new Error('el dato no puede ser vacio')
    return value
}

export function soloAlfabetico(value) {
    if (!/^[a-zA-Z]+$/.test(value)) throw new Error('el dato solo puede tener letras')
    return value
}

export function entero(value) {
    if (!Number.isInteger(value)) throw new Error('el dato debe ser entero')
    return value
}

export function positivo(value) {
    if (Number(value) < 0) throw new Error('el dato debe ser positivo')
    return value
}

export function esMail(value) {
    if (!String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) throw new Error('Dirección de email no válida');

    return value;
}

export function esRole(value) {
    if (!((value === 'user') || (value === 'admin'))) throw new Error('Rol no valido');
    return value;
}
