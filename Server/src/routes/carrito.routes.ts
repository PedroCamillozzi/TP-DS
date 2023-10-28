import { Router } from "express";
import { deleteProductoCliente, getProductosCliente, patchAgregarCantidadProductosCliente, patchProductoCliente } from "../controller/Carrito.controller";
import validateToken from "../controller/validate.token.controller";


const routerCarrito = Router();

routerCarrito.get('/:idCliente', validateToken, getProductosCliente);
routerCarrito.patch('/addItem', patchProductoCliente);
routerCarrito.patch('/addCantidad', patchAgregarCantidadProductosCliente)
routerCarrito.delete('/:idCliente/:idProducto', deleteProductoCliente );

export default routerCarrito;