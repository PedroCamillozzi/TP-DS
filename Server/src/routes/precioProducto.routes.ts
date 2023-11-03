import { Router } from "express";
import { getPrecioActualProducto, getPrecioFechaDeVenta } from "../controller/precioProducto.controller";


const routerPrecioProductos = Router();

routerPrecioProductos.get('/:idProducto', getPrecioActualProducto)
routerPrecioProductos.get('/:idProducto/:fechaVenta', getPrecioFechaDeVenta)
//routerPrecioProductos.put('') 


export default routerPrecioProductos;