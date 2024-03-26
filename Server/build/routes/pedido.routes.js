"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_controller_1 = require("../controller/pedido.controller");
const validate_token_controller_1 = __importDefault(require("../controller/validate.token.controller"));
/*import validateTipoUsuario from "../controller/validateTipoUsuario.controller";*/
const routerPedido = (0, express_1.Router)();
routerPedido.get('/:idCliente', validate_token_controller_1.default, pedido_controller_1.getPedidosCliente);
routerPedido.post('/', validate_token_controller_1.default, pedido_controller_1.postPedidoCliente);
routerPedido.get('/all', validate_token_controller_1.default /*, validateTipoUsuario*/, pedido_controller_1.getPedidos);
exports.default = routerPedido;
