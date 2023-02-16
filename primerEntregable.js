class ProductManager {
    constructor() {
        this.products = [];
        let i = 0;
        this.generadorIds = () => i++;
        };
    }
    


class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

}


const manager = new ProductManager();
console.log(manager.generadorIds());
console.log(manager.generadorIds());
console.log(manager.generadorIds());
console.log(manager.generadorIds());
