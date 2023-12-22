"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_controller_1 = require("../controller/pedido.controller");
const validate_token_controller_1 = __importDefault(require("../controller/validate.token.controller"));
const routerPedido = (0, express_1.Router)();
routerPedido.get('/:idCliente', /*validateToken,*/ pedido_controller_1.getPedidosCliente);
routerPedido.post('/', validate_token_controller_1.default, pedido_controller_1.postPedidoCliente);
exports.default = routerPedido;
