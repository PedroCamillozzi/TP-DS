"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listaCarrito_controller_1 = require("../controller/listaCarrito.controller");
const routerCarrito = (0, express_1.Router)();
routerCarrito.get('/:idCliente/:nroCarrito', listaCarrito_controller_1.getProductosCliente);
routerCarrito.post('/:idCliente/:idProducto/:cantidad', listaCarrito_controller_1.postProductoCliente);
routerCarrito.delete('/:idCliente/:idProducto/:nroCarrito', listaCarrito_controller_1.deleteProductoCliente);
exports.default = routerCarrito;
