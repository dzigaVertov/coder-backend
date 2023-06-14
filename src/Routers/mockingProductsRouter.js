import { Router } from "express";
import { crearMockProducto } from "../mocks/productMock";

export const mockingProductsRouter = Router();


mockingProductsRouter.get('/', (req, res)=> {
    const productosMock = crearMockProducto(100);
    res.json(productosMock);
});


