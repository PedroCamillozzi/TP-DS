"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Carrito_controller_1 = require("../controller/Carrito.controller");
const routerCarrito = express_1.Router();
routerCarrito.get('/:idCliente', Carrito_controller_1.getProductosCliente);
routerCarrito.patch('/addItem', Carrito_controller_1.patchProductoCliente);
routerCarrito.delete('/:idCliente/:idProducto', Carrito_controller_1.deleteProductoCliente);
exports.default = routerCarrito;
