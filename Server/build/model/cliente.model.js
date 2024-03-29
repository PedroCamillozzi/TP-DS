"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tipoUsuario_model_1 = require("./tipoUsuario.model");
exports.Cliente = connection_1.default.define('cliente', {
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    idTipoUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tipoUsuario_model_1.TipoUsuario,
            key: 'idTipoUsuario'
        }
    },
}, {
    modelName: 'Cliente'
});
exports.Cliente.hasOne(tipoUsuario_model_1.TipoUsuario, {
    foreignKey: 'idTipoUsuario',
    as: 'tipoUsuario'
});
