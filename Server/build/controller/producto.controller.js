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
const producto_model_1 = require("../model/producto.model");
const precioProducto_model_1 = require("../model/precioProducto.model");
exports.getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaProductos = yield producto_model_1.Producto.findAll();
    res.json(listaProductos);
});
exports.getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto } = req.params;
    const producto = yield producto_model_1.Producto.findOne({ where: { idProducto: idProducto } });
    if (!producto) {
        res.status(400).json({
            msg: "No se ha encontrado el producto"
        });
        return;
    }
    res.json(producto);
});
exports.postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreProducto, descripcion, detallesGenerales, /*, imagen,*/ precio } = req.body;
    try {
        const producto = yield producto_model_1.Producto.create({
            nombreProducto: nombreProducto,
            descripcion: descripcion,
            detallesGenerales: detallesGenerales,
        });
        yield precioProducto_model_1.PrecioProducto.create({
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
exports.putProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto, nombreProducto, descripcion, detallesGenerales, fechaDesde, precio } = req.body;
    const producto = yield producto_model_1.Producto.findOne({ where: { idProducto: idProducto } });
    if (!producto) {
        res.status(400).json({
            msg: "No existe el producto"
        });
        return;
    }
    const fechaMax = yield precioProducto_model_1.PrecioProducto.max('fechaDesde', { where: { idProducto: idProducto } });
    //Funciona hasta Acá
    console.log(fechaMax);
    // const precioAct = await Producto.findAll({where:{idProducto: idProducto},include:[{model:PrecioProducto, required:true, where:{fechaDesde:precioMax}}]}).then(posts => {/*...*/})
    // Select p.idProducto, nombreProducto, descripcion, detallesGenerales From productos p Inner Join PrecioProducto pp ON pp.idProducto = p.idProducto Where pp.fechaDesde = precioMax(es la fecha)
    /*const productos = await sequelize.query( //No me gusta usarla así por el SQLInyedction
        'Select p.idProducto, p.nombreProducto, p.descripcion, p.detallesGenerales, pp.fechaDesde From productos p Inner Join PrecioProductos pp ON pp.idProducto = p.idProducto Where Date(pp.fechaDesde) = Date(?)',
        {
            replacements:[fechaMax], //No se porque me toma 3hs distintas a lo que está cargado en la BBDD y tengo que usar la funcion Date() Para que ande
            type: QueryTypes.SELECT,
            
        }
    )
    console.log(productos);
    res.json({
        msg: productos.fechaDesde
    })*/
    try {
        producto.update({
            nombreProducto: nombreProducto,
            descripcion: descripcion,
            detallesGenerales: detallesGenerales
        }, {
            where: {
                idProducto: idProducto
            }
        });
        if (fechaDesde !== undefined && fechaMax !== fechaDesde) {
            precioProducto_model_1.PrecioProducto.create({
                idProducto: producto.idProducto,
                fechaDesde: fechaDesde
            });
            res.status(200).json({
                msg: "Precio y Producto Actualizado"
            });
            return;
        }
        res.status(200).json({
            msg: "Producto Actualizado"
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error", error
        });
    }
});
