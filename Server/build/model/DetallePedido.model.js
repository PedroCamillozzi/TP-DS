"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetallePedido = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const producto_model_1 = require("./producto.model");
const pedido_model_1 = require("./pedido.model");
exports.DetallePedido = connection_1.default.define('DetallePedido', {
    idPedido: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: pedido_model_1.Pedido,
            key: 'idPedido'
        }
    },
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: producto_model_1.Producto,
            key: 'idProducto'
        }
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
}, {
    modelName: 'DetallePedido'
});
