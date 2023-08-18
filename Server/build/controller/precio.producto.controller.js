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
exports.putProducto = void 0;
const producto_model_1 = require("../model/producto.model");
const precio_producto_model_1 = require("../model/precio.producto.model");
const putProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto, fechaDesde, precio } = req.body;
    const producto = yield producto_model_1.Producto.findOne({ where: { idProducto: idProducto } });
    if (!producto) {
        res.status(400).json({
            msg: "No existe el producto"
        });
        return;
    }
    const fechaMax = yield precio_producto_model_1.PrecioProducto.max('fechaDesde', { where: { idProducto: idProducto } });
    //Funciona hasta Acá
    console.log(fechaMax);
    // const precioAct = await Producto.findAll({where:{idProducto: idProducto},include:[{model:PrecioProducto, required:true, where:{fechaDesde:precioMax}}]}).then(posts => {/*...*/})
    // Select p.idProducto, nombreProducto, descripcion, detallesGenerales From productos p Inner Join PrecioProducto pp ON pp.idProducto = p.idProducto Where pp.fechaDesde = precioMax(es la fecha)
    const productos = yield sequelize.query(//No me gusta usarla así por el SQLInyedction
    'Select p.idProducto, p.nombreProducto, p.descripcion, p.detallesGenerales, pp.fechaDesde From productos p Inner Join PrecioProductos pp ON pp.idProducto = p.idProducto Where Date(pp.fechaDesde) = Date(?)', {
        replacements: [fechaMax],
        type: QueryTypes.SELECT,
    });
    console.log(productos);
    res.json({
        msg: productos.fechaDesde
    });
    return;
    try {
        producto.set({
            nombreProducto: nombreProducto,
            descripcion: descripcion,
            detallesGenerales: detallesGenerales
        });
        if (fechaMax !== productos.fechaDesde) {
            precio_producto_model_1.PrecioProducto.create({
                idProducto: producto.idProducto,
                fechaDesde: productos.fechaDesde
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error", error
        });
    }
});
exports.putProducto = putProducto;
