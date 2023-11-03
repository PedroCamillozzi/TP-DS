"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = require("../controller/cliente.controller");
const validate_token_controller_1 = __importDefault(require("../controller/validate.token.controller"));
const routerCliente = (0, express_1.Router)();
routerCliente.get('/:idCliente', validate_token_controller_1.default, cliente_controller_1.getDatosCliente);
routerCliente.post('/signIn', cliente_controller_1.newCliente);
routerCliente.post('/login', cliente_controller_1.loginCliente);
routerCliente.patch('/', validate_token_controller_1.default, cliente_controller_1.cambiarDatosCliente);
routerCliente.patch('/cambiaContrasenia', validate_token_controller_1.default, cliente_controller_1.cambiarContraseña);
exports.default = routerCliente;
