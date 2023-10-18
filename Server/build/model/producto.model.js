"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const precioProducto_model_1 = require("./precioProducto.model");
exports.Producto = connection_1.default.define('producto', {
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreProducto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    detallesGenerales: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    }
    /*imagen:{
        type: DataTypes.BLOB,
        allowNull: false
    },*/
});
exports.Producto.hasMany(precioProducto_model_1.PrecioProducto, {
    foreignKey: 'idProducto',
    as: 'precios'
});
