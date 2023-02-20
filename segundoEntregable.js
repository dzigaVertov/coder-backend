import fs from 'fs/promises';




class ProductManager {
    constructor(path) {
        this.products = [];

        this.path = path;
        this.archivoCargado = false;

        // Generar ids:
        let i = 1;
        this.generadorIds = () => i++;
    };

    async cargarArchivo() {
        try {
            const json = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(json);
            this.archivoCargado = true;
        } catch (err) {
            if (err.code === 'ENOENT') {
                // No existe el archivo
                console.log('crear el archivo');
            }
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let codeRepetido = this.products.some(x => x.code === code);
        if (codeRepetido) throw new Error('Code de producto repetido');

        let producto = new Product(title, description, price, thumbnail, code, stock, this.generadorIds());

        this.products.push(producto);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let prodIdx = this.products.findIndex(x => x.id === id);
        if (prodIdx === -1) throw new Error('Not Found');

        return this.products[prodIdx];
    }


}



class Product {
    constructor(title, description, price, thumbnail, code, stock, id) {

        // Validar argumentos
        let argsArray = Object.values(arguments);
        if ((argsArray.length !== 7) || (argsArray.some(x => !x))) throw new Error('Todos los campos son obligatorios: title, description, price, thumbnail, code, stock ');


        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = id;
    }

}

// Código de prueba
const manager = new ProductManager('./archivoInexistente.txt');
console.log(manager.getProducts());
console.log(manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
// console.log(manager.getProducts());
// // console.log(manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
// // console.log(manager.getProductById(789));
// console.log(manager.getProductById(1));

