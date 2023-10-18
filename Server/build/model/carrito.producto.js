"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const producto_model_1 = require("./producto.model");
const cliente_model_1 = require("./cliente.model");
exports.Carrito = connection_1.default.define('Carrito', {
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: producto_model_1.Producto,
            key: 'idProducto'
        }
    },
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: cliente_model_1.Cliente,
            key: 'idCliente'
        }
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
