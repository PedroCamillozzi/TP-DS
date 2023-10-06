"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_controller_1 = require("../controller/pedido.controller");
const routerPedido = (0, express_1.Router)();
routerPedido.get('/:idCliente', pedido_controller_1.getPedidosCliente);
exports.default = routerPedido;
