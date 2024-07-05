import { Router } from "express";
import { deleteAllProductoCliente, deleteProductoCliente, getProductosCliente, patchAgregarCantidadProductosCliente, patchProductoCliente } from "../controller/Carrito.controller";
import validateToken from "../middleware/validate.token.controller";


const routerCarrito = Router();

routerCarrito.get('/:idCliente', validateToken, getProductosCliente);
routerCarrito.patch('/addItem', validateToken, patchProductoCliente);
routerCarrito.patch('/addCantidad', validateToken, patchAgregarCantidadProductosCliente)
routerCarrito.delete('/:idCliente/:idProducto', validateToken, deleteProductoCliente );
routerCarrito.delete('/:idCliente', validateToken, deleteAllProductoCliente );

export default routerCarrito;