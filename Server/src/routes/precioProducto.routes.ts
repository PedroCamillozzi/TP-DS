import { Router } from "express";
import { getPrecioActualProducto } from "../controller/precioProducto.controller";


const routerPrecioProductos = Router();

routerPrecioProductos.get('/:idProducto', getPrecioActualProducto)
//routerPrecioProductos.put('') 


export default routerPrecioProductos;