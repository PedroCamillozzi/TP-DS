"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = require("../controller/cliente.controller");
const routerCliente = (0, express_1.Router)();
routerCliente.post('/signIn', cliente_controller_1.newCliente);
routerCliente.post('/logIn', cliente_controller_1.loginCliente);
exports.default = routerCliente;
