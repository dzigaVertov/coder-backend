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
                // No existe el archivo, crearlo
                this.guardarArchivo();
                this.archivoCargado = true;
            } else {
                throw new Error(err);
            }
        }
    }

    async guardarArchivo() {
        if (!this.archivoCargado) {
            await this.cargarArchivo();
        }
        let data = JSON.stringify(this.products);
        fs.writeFile(this.path, data);
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!this.archivoCargado) {
            await this.cargarArchivo();
        }

        let codeRepetido = this.products.some(x => x.code === code);
        if (codeRepetido) throw new Error('Code de producto repetido');
        let producto = new Product(title, description, price, thumbnail, code, stock, this.generadorIds());
        this.products.push(producto);
        this.guardarArchivo();
    }

    async getProducts() {
        if (!this.archivoCargado) {
            await this.cargarArchivo();
        }
        return this.products;
    }

    async getProductById(id) {
        if (!this.archivoCargado) {
            await this.cargarArchivo();
        }
        let prodIdx = this.products.findIndex(x => x.id === id);

        if (prodIdx === -1) throw new Error('Product Not Found');

        return this.products[prodIdx];
    }

    async updateProduct(id, campo, nuevoValor) {
        if (!this.archivoCargado) {
            await this.cargarArchivo();
        }
        const producto = await this.getProductById(id);
        producto[campo] = nuevoValor;
        this.guardarArchivo();
    }

    async deleteProduct(id) {
        if (!this.archivoCargado) {
            await this.cargarArchivo();
        }
        this.products = this.products.filter(x => x.id !== id);
        this.guardarArchivo();
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
export default ProductManager;
// C??digo de prueba
// const manager = new ProductManager('./archivoProductos.txt');
// // // console.log(await manager.getProducts());
// for (let i = 0;i<30; i++){
//     let codigoRandom = Math.round(1000*Math.random());
//     console.log(codigoRandom);
//     await manager.addProduct("producto prueba-"+codigoRandom, "Este es un producto prueba", "300", "Sin imagen", "codigoprueba-"+codigoRandom, 25);
// }
// console.log(await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "codigoPrueba", 25));
// console.log(await manager.getProducts());
// // // console.log(await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "co", 25));
// // // console.log(await manager.getProductById(789));
// // console.log(await manager.getProductById(1));
// console.log(await manager.updateProduct(1, 'title', 'nuevoValor'));
// console.log(await manager.deleteProduct(1));
// console.log(await manager.getProducts());
