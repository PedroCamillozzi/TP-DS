"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPedidoCliente = exports.getPedidosCliente = void 0;
const pedido_model_1 = require("../model/pedido.model");
const cliente_model_1 = require("../model/cliente.model");
const getPedidosCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    try {
        const pedidos = yield pedido_model_1.Pedido.findAll({ where: { idCliente: idCliente } });
        if (!pedidos) {
            res.status(404).json({
                msg: "No se han encontrado los pedidos"
            });
            return;
        }
        res.status(200).json(pedidos);
    }
    catch (err) {
        res.status(500).json({
            msg: "Error del servidor"
        });
    }
});
exports.getPedidosCliente = getPedidosCliente;
const postPedidoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.body;
    const cliente = yield cliente_model_1.Cliente.findOne({ where: { idCliente: idCliente } });
    if (cliente) {
        try {
            const fechaEntrega = new Date();
            fechaEntrega.setDate(fechaEntrega.getDate() + 27);
            const pedido = yield pedido_model_1.Pedido.create({
                fechaPedido: Date.now(),
                fechaEntrega: fechaEntrega,
                estado: "En preparacion",
                idCliente: cliente.idCliente
            });
            res.status(200).json(pedido);
        }
        catch (err) {
            res.status(500).json({
                msg: "Error en el servidor"
            });
        }
    }
});
exports.postPedidoCliente = postPedidoCliente;
