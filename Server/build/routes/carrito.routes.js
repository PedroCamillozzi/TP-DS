"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Carrito_controller_1 = require("../controller/Carrito.controller");
const validate_token_controller_1 = __importDefault(require("../controller/validate.token.controller"));
const routerCarrito = (0, express_1.Router)();
routerCarrito.get('/:idCliente', validate_token_controller_1.default, Carrito_controller_1.getProductosCliente);
routerCarrito.patch('/addItem', validate_token_controller_1.default, Carrito_controller_1.patchProductoCliente);
routerCarrito.patch('/addCantidad', validate_token_controller_1.default, Carrito_controller_1.patchAgregarCantidadProductosCliente);
routerCarrito.delete('/:idCliente/:idProducto', validate_token_controller_1.default, Carrito_controller_1.deleteProductoCliente);
routerCarrito.delete('/:idCliente', validate_token_controller_1.default, Carrito_controller_1.deleteAllProductoCliente);
exports.default = routerCarrito;
