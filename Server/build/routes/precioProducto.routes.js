"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const precioProducto_controller_1 = require("../controller/precioProducto.controller");
const routerPrecioProductos = (0, express_1.Router)();
routerPrecioProductos.get('/:idProducto', precioProducto_controller_1.getPrecioActualProducto);
routerPrecioProductos.get('/:idProducto/:fechaVenta', precioProducto_controller_1.getPrecioFechaDeVenta);
//routerPrecioProductos.put('') 
exports.default = routerPrecioProductos;
