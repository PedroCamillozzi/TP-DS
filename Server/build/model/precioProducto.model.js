"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrecioProducto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const producto_model_1 = require("./producto.model");
exports.PrecioProducto = connection_1.default.define('precioProducto', {
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: producto_model_1.Producto,
            key: 'idProducto'
        }
    },
    fechaDesde: {
        type: sequelize_1.DataTypes.DATE,
        primaryKey: true,
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(17, 4),
    }
});
