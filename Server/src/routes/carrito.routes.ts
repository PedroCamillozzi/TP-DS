import { Router } from "express";
import { deleteProductoCliente, getProductosCliente, postProductoCliente } from "../controller/listaCarrito.controller";


const routerCarrito = Router();

routerCarrito.get('/:idCliente/:nroCarrito', getProductosCliente);
routerCarrito.post('/:idCliente/:idProducto/:cantidad', postProductoCliente);
routerCarrito.delete('/:idCliente/:idProducto/:nroCarrito', deleteProductoCliente );

export default routerCarrito;