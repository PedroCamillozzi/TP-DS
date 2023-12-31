"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const producto_model_1 = require("./producto.model");
const pedido_model_1 = require("./pedido.model");
exports.Venta = connection_1.default.define('venta', {
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
    fechaVenta: {
        type: sequelize_1.DataTypes.DATE,
        primaryKey: true
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
});
