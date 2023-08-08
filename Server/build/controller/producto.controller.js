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
exports.putProducto = exports.postProducto = exports.getProductos = void 0;
const producto_model_1 = require("../model/producto.model");
const precio_producto_model_1 = require("../model/precio.producto.model");
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaProductos = yield producto_model_1.Producto.findAll();
    res.json(listaProductos);
});
exports.getProductos = getProductos;
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreProducto, descripcion, detallesGenerales, /*, imagen,*/ precio } = req.body;
    try {
        const producto = yield producto_model_1.Producto.create({
            nombreProducto: nombreProducto,
            descripcion: descripcion,
            detallesGenerales: detallesGenerales,
            //imagen:imagen 
        });
        yield precio_producto_model_1.PrecioProducto.create({
            idProducto: producto.idProducto,
            fechaDesde: new Date(),
            precio: precio
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrió un error", error
        });
    }
    res.json({
        msg: "Producto " + nombreProducto + " creado exitosamente",
        body: req.body
    });
});
exports.postProducto = postProducto;
const putProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto, nombreProducto, descripcion, detallesGenerales, precio } = req.body;
    const producto = yield producto_model_1.Producto.findOne({ where: { idProducto: idProducto } });
    if (!producto) {
        res.status(400).json({
            msg: "No existe el producto"
        });
        return;
    }
    const precioMax = yield precio_producto_model_1.PrecioProducto.max('fechaDesde', { where: { idProducto: idProducto } });
    //Funciona hasta Acá
    // const precioAct = await Producto.findAll({where:{idProducto: idProducto},include:[{model:PrecioProducto, required:true, where:{fechaDesde:precioMax}}]}).then(posts => {/*...*/})
    // Select p.idProducto, nombreProducto, descripcion, detallesGenerales From productos p Inner Join PrecioProducto pp ON pp.idProducto = p.idProducto Where pp.fechaDesde = precioMax(es la fecha)
    return;
    try {
        producto.set({
            nombreProducto: nombreProducto,
            descripcion: descripcion,
            detallesGenerales: detallesGenerales
        });
        if (precioMax !== precioAct.fechaDesde) {
            precio_producto_model_1.PrecioProducto.create({
                idProducto: producto.idProducto,
                fechaDesde: precioAct.fechaDesde
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
