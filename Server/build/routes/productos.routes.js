"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controller/producto.controller");
const routerProductos = (0, express_1.Router)();
routerProductos.get('/all', producto_controller_1.getProductos);
routerProductos.post('/', producto_controller_1.postProducto);
routerProductos.put('/put', producto_controller_1.putProducto);
exports.default = routerProductos;
