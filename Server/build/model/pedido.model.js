"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const cliente_model_1 = require("./cliente.model");
exports.Pedido = connection_1.default.define('pedido', {
    idPedido: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaPedido: {
        type: sequelize_1.DataTypes.DATE,
    },
    fechaEntrega: {
        type: sequelize_1.DataTypes.DATE
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    },
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: cliente_model_1.Cliente,
            key: 'idCliente'
        }
    }
});
