"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallePedido_controller_1 = require("../controller/detallePedido.controller");
const routerDetallePedido = express_1.Router();
routerDetallePedido.get('/:idPedido', detallePedido_controller_1.getDetallePedidosCliente);
exports.default = routerDetallePedido;
