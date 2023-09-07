import { Router } from "express";
import { deleteProductoCliente, getProductosCliente, patchProductoCliente } from "../controller/Carrito.controller";


const routerCarrito = Router();

routerCarrito.get('/:idCliente', getProductosCliente);
routerCarrito.patch('/addItem', patchProductoCliente);
routerCarrito.delete('/:idCliente/:idProducto', deleteProductoCliente );

export default routerCarrito;