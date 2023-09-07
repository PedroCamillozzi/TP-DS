import { Router } from "express";
import { getProducto, getProductos, postProducto, putProducto } from "../controller/producto.controller";


const routerProductos = Router();

routerProductos.get('/all', getProductos);
routerProductos.post('/', postProducto);
routerProductos.put('/put', putProducto);
routerProductos.get('/:idProducto', getProducto)
//routerProductos.delete('');

export default routerProductos;