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
exports.postDetallePedido = exports.getDetallePedidosCliente = void 0;
const DetallePedido_model_1 = require("../model/DetallePedido.model");
const producto_model_1 = require("../model/producto.model");
const pedido_model_1 = require("../model/pedido.model");
const getDetallePedidosCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPedido } = req.params;
    try {
        const pedidos = yield DetallePedido_model_1.DetallePedido.findAll({ where: { idPedido: idPedido } });
        if (!pedidos) {
            res.status(404).json({
                msg: "No se han encontrado los detalles de los pedidos"
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
exports.getDetallePedidosCliente = getDetallePedidosCliente;
const postDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPedido, idProducto, cantidad } = req.body;
    const pedido = yield pedido_model_1.Pedido.findOne({ where: { idPedido: idPedido } });
    if (pedido) {
        const producto = yield producto_model_1.Producto.findOne({ where: { idProducto: idProducto } });
        if (producto) {
            DetallePedido_model_1.DetallePedido.create({
                idPedido: pedido.idPedido,
                idProducto: producto.idProducto,
                cantidad: cantidad
            });
        }
    }
});
exports.postDetallePedido = postDetallePedido;
