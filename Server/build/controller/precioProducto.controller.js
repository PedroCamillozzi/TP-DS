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
exports.getPrecioActualProducto = void 0;
const precioProducto_model_1 = require("../model/precioProducto.model");
const getPrecioActualProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto } = req.params;
    const fechaMax = yield precioProducto_model_1.PrecioProducto.max('fechaDesde', { where: { idProducto: idProducto } });
    /* const precioActProduct = await Producto.findAll({
         include: [{
             model: PrecioProducto,
             as: 'precios',
             where: {
                 fechaDesde: fechaMax
             },
             required:true
         }]
     })*/
    const precioActProduct = yield precioProducto_model_1.PrecioProducto.findAll({
        where: { idProducto: idProducto } && { fechaDesde: fechaMax }
    });
    precioActProduct.forEach(p => {
        const idProducto = p.idProducto;
        const fechaDesde = p.fechaDesde;
        const precio = p.precio;
        res.json({
            idProducto,
            fechaDesde,
            precio
        });
    });
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
    });
});
exports.getPrecioActualProducto = getPrecioActualProducto;