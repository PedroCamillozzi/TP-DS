import { Router } from "express";
import { getProductos, postProducto, putProducto } from "../controller/producto.controller";


const routerProductos = Router();

routerProductos.get('/all', getProductos);
routerProductos.post('/', postProducto);
routerProductos.put('/put', putProducto);
//routerProductos.delete('');

export default routerProductos;