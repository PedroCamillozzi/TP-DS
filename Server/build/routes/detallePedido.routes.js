"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallePedido_controller_1 = require("../controller/detallePedido.controller");
const validate_token_controller_1 = __importDefault(require("../controller/validate.token.controller"));
const routerDetallePedido = (0, express_1.Router)();
routerDetallePedido.get('/:idPedido', validate_token_controller_1.default, detallePedido_controller_1.getDetallePedidosCliente);
routerDetallePedido.post('/', validate_token_controller_1.default, detallePedido_controller_1.postDetallePedido);
exports.default = routerDetallePedido;
