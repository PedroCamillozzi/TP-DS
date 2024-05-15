import { Router } from "express";
import { deleteProducto, getProducto, getProductos, postProducto, putProducto } from "../controller/producto.controller";


const routerProductos = Router();

routerProductos.get('/all', getProductos);
routerProductos.post('/', postProducto);
routerProductos.put('/put', putProducto);
routerProductos.get('/:idProducto', getProducto)
routerProductos.delete('/:idProducto', deleteProducto);

export default routerProductos;