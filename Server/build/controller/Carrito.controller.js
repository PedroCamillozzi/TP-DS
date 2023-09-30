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
const cliente_model_1 = require("../model/cliente.model");
const producto_model_1 = require("../model/producto.model");
const carrito_producto_1 = require("../model/carrito.producto");
exports.getProductosCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const listaCarritoCliente = yield carrito_producto_1.Carrito.findAll({ where: { idCliente: idCliente } });
    if (!listaCarritoCliente) {
        res.status(400).json({
            msg: "No se pudo obtener la lista del carrito"
        });
    }
    res.json(listaCarritoCliente);
});
exports.patchProductoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente, idProducto, cantidad } = req.body;
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
    const carrito = yield carrito_producto_1.Carrito.findOne({ where: { idCliente: idCliente } && { idProducto: idProducto } });
    if (producto.stock <= 0 || (carrito.cantidad + cantidad) > producto.stock) {
        res.status(400).json({
            msg: "No hay stock disponible por el momento"
        });
        return;
    }
    /*Puede el backEnd llamar a una funcion dentro de él? Por ejemplo quiero que no existe el producto dentro del carrito
que lo cree, en ese caso, puedo llamar a una funcion postCarritoCliente que haga lo de abajo por ejemplo?
*/
    if (!carrito) {
        try {
            yield carrito_producto_1.Carrito.create({
                idProducto: producto.idProducto,
                idCliente: cliente.idCliente,
                cantidad: cantidad,
            });
            res.status(201).json({
                msg: "Producto agregado al carrito satisfactoriamente"
            });
        }
        catch (error) {
            res.status(400).json({
                msg: "Ocurrió un error al sumar el producto al carrito",
                error,
            });
        }
    }
    else {
        try {
            yield carrito_producto_1.Carrito.update({
                cantidad: carrito.cantidad + cantidad
            }, {
                where: { idCliente: idCliente, idProducto: idProducto },
            });
            res.status(200).json({ msg: "Carrito actualizado con éxito" });
        }
        catch (err) {
            res.status(400).json({
                msg: "No se pudo actualizar el carrito",
                err,
            });
        }
    }
});
exports.deleteProductoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente, idProducto } = req.params;
    const productoAremover = yield carrito_producto_1.Carrito.findOne({ where: { idCliente: idCliente } && { idProducto: idProducto } });
    if (!productoAremover) {
        res.status(400).json({
            msg: "No se pudo obtener la lista del carrito"
        });
    }
    try {
        yield carrito_producto_1.Carrito.destroy({
            where: { idCliente: productoAremover.idCliente } && { idProducto: productoAremover.idProducto }
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se encontro el producto a remover", error
        });
    }
    res.status(200).json({
        msg: "Producto removido correctamente"
    });
});
