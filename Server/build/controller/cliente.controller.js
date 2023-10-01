"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_model_1 = require("../model/cliente.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.newCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, dni, email, contraseña, telefono } = req.body;
    try {
        const existingCliente = yield cliente_model_1.Cliente.findOne({ where: { dni: dni } || { email: email } });
        if (existingCliente) {
            if (existingCliente.dni === dni) {
                return res.status(400).json({
                    msg: "Ya existe un usuario con ese dni"
                });
            }
            if (existingCliente.email === email) {
                return res.status(409).json({
                    msg: "El email ya está registrado en la base de datos." // NO ME TOMA EL EMAIL PERO SI EL DNI
                });
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(contraseña, 10);
        yield cliente_model_1.Cliente.create({
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            email: email,
            contraseña: hashedPassword,
            telefono: telefono
        });
        res.status(201).json({
            msg: "Cliente " + nombre + " creado exitosamente"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ocurrió un error en el servidor."
        });
    }
});
exports.loginCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contraseña } = req.body;
    const cliente = yield cliente_model_1.Cliente.findOne({ where: { email: email } });
    if (!cliente) {
        return res.status(400).json({
            msg: "El email " + email + " no se encuentra registrado"
        });
    }
    const validaContraseña = yield bcrypt_1.default.compare(contraseña, cliente.contraseña);
    if (!validaContraseña) {
        return res.status(400).json({
            msg: "Password Incorrecta"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        email: email,
    }, process.env.SECRETKEY || '332211', {
    //expiresIn: '100000'
    });
    const idCliente = cliente.idCliente;
    res.json({ token, idCliente });
});
