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
exports.getPrecioFechaDeVenta = exports.getPrecioActualProducto = void 0;
const precioProducto_model_1 = require("../model/precioProducto.model");
const sequelize_1 = require("sequelize");
const getPrecioActualProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto } = req.params;
    const fechaMax = yield precioProducto_model_1.PrecioProducto.max('fechaDesde', { where: { idProducto: idProducto } });
    const precioActProduct = yield precioProducto_model_1.PrecioProducto.findOne({
        where: { idProducto: idProducto, fechaDesde: fechaMax }
    });
    if (precioActProduct) {
        res.json(precioActProduct);
    }
    else {
        res.status(404).json({ error: 'No se encontraron precios para el producto' });
    }
    return;
    /*if(!precioActProduct){
        return res.status(400).json({
            msg: "No existe el producto"
        })
    }
    if(!precioActProduct[0].precios){
        return res.status(400).json({
            msg: "No existe precio para el producto"
        })
    }*/
    /*
     // Crear un array para almacenar los atributos de los productos
    const preciosProducto = precioActProduct.map(producto => ({
        idProducto: producto.idProducto,
        fechaDesde: producto.fechaDesde,
        precio: producto.precio

            // Agrega más atributos aquí si es necesario
        }));
    
        // Enviar una sola respuesta JSON con todos los atributos de los productos
        res.json({
            preciosProducto
        });*/
});
exports.getPrecioActualProducto = getPrecioActualProducto;
const getPrecioFechaDeVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto, fechaVenta } = req.params;
    const fechaMax = yield precioProducto_model_1.PrecioProducto.max('fechaDesde', { where: { [sequelize_1.Op.and]: [{ idProducto: { [sequelize_1.Op.eq]: idProducto } }, { fechaDesde: { [sequelize_1.Op.lte]: fechaVenta } }] } });
    const precioActProduct = yield precioProducto_model_1.PrecioProducto.findOne({
        where: { idProducto: idProducto, fechaDesde: fechaMax }
    });
    if (precioActProduct) {
        res.json(precioActProduct);
    }
    else {
        res.status(404).json({ error: 'No se encontraron precios para el producto' });
    }
});
exports.getPrecioFechaDeVenta = getPrecioFechaDeVenta;
