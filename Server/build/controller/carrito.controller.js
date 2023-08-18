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
exports.postProductoCliente = exports.getProductosCliente = void 0;
const cliente_model_1 = require("../model/cliente.model");
const producto_model_1 = require("../model/producto.model");
const lista_carrito_producto_1 = require("../model/lista.carrito.producto");
const getProductosCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente, nroCarrito, idProducto, cantidad } = req.params;
    const listaCarritoCliente = yield lista_carrito_producto_1.ListaCarritoProducto.findAll({ where: { idProducto: idProducto } && { idCliente: idCliente } && { nroCarrito: nroCarrito } });
    if (!listaCarritoCliente) {
        res.status(400).json({
            msg: "No se pudo obtener la lista del carrito"
        });
    }
    res.json({
        listaCarritoCliente
    });
});
exports.getProductosCliente = getProductosCliente;
const postProductoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente, idProducto, cantidad } = req.params;
    const cliente = yield cliente_model_1.Cliente.findOne({ where: { idCliente: idCliente } });
    if (!cliente) {
        res.status(400).json({
            msg: "No se encontro ningun cliente"
        });
        return;
    }
    const producto = yield producto_model_1.Producto.findOne({ where: { idProducto: idProducto } });
    if (!producto) {
        res.status(400).json({
            msg: "No existe el producto"
        });
        return;
    }
    if (producto.stock <= 0 || cantidad > producto.stock) {
        res.status(400).json({
            msg: "No hay stock disponible por el momento"
        });
        return;
    }
    try {
        yield lista_carrito_producto_1.ListaCarritoProducto.create({
            idProducto: producto.idProducto,
            nroCarrito: 1,
            idCliente: cliente.idCliente,
            cantidad: cantidad
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error al sumar el producto al carrito",
            error
        });
    }
    res.status(200).json({
        msg: "Producto agregado al carrito satisfactoriamente"
    });
});
exports.postProductoCliente = postProductoCliente;
