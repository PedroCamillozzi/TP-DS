"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrito = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const cliente_model_1 = require("./cliente.model");
exports.Carrito = connection_1.default.define('carrito', {
    nroCarrito: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: cliente_model_1.Cliente,
            key: "idCliente"
        }
    }
});
