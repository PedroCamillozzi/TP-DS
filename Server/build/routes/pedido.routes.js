"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_controller_1 = require("../controller/pedido.controller");
<<<<<<< HEAD
const validate_token_controller_1 = __importDefault(require("../controller/validate.token.controller"));
const routerPedido = (0, express_1.Router)();
routerPedido.get('/:idCliente', validate_token_controller_1.default, pedido_controller_1.getPedidosCliente);
routerPedido.post('/', validate_token_controller_1.default, pedido_controller_1.postPedidoCliente);
=======
const routerPedido = express_1.Router();
routerPedido.get('/:idCliente', pedido_controller_1.getPedidosCliente);
>>>>>>> a07ca4f7a07201d29d70c95e7f1ff4df0b2e41fa
exports.default = routerPedido;
