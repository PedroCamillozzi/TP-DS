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
exports.cambiarContraseña = exports.cambiarDatosCliente = exports.getDatosCliente = exports.loginCliente = exports.newCliente = void 0;
const cliente_model_1 = require("../model/cliente.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tipoUsuario_model_1 = require("../model/tipoUsuario.model");
const newCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            telefono: telefono,
            tipoUsuario: 2,
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
exports.newCliente = newCliente;
const loginCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const tipoUsuario = yield tipoUsuario_model_1.TipoUsuario.findOne({ where: { idTipoUsuario: cliente.idTipoUsuario } });
    const tipoUsuarioNombre = tipoUsuario.descripcion;
    res.json({ token, idCliente, tipoUsuarioNombre });
});
exports.loginCliente = loginCliente;
const getDatosCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    try {
        const cliente = yield cliente_model_1.Cliente.findOne({ where: { idCliente: idCliente } });
        if (!cliente) {
            return res.status(400).json({ msg: "Cliente no encontrado" });
        }
        const clienteFiltrado = {
            idCliente: cliente.idCliente,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
        };
        return res.status(200).json(clienteFiltrado);
    }
    catch (err) {
        return res.status(500).json({ msg: "Error de servidor" });
    }
});
exports.getDatosCliente = getDatosCliente;
const cambiarDatosCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente, nombre, apellido, telefono } = req.body;
    try {
        const clienteOriginal = yield cliente_model_1.Cliente.findOne({ where: { idCliente: idCliente } });
        if (!clienteOriginal) {
            return res.status(400).json({ msg: "Cliente no encontrado" });
        }
        cliente_model_1.Cliente.update({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono
        }, {
            where: { idCliente: clienteOriginal.idCliente }
        });
        res.status(200).json({
            msg: "Modificado con éxito"
        });
    }
    catch (err) {
        res.status(400).json({
            msg: "Error del Servidor"
        });
    }
});
exports.cambiarDatosCliente = cambiarDatosCliente;
const cambiarContraseña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente, contraseñaVieja, contraseñaNueva, repeticionContraseñaNueva } = req.body;
    try {
        const cliente = yield cliente_model_1.Cliente.findOne({ where: { idCliente: idCliente } });
        if (!cliente) {
            return res.status(400).json({
                msg: "Cliente inexistente"
            });
        }
        const validaContraseña = yield bcrypt_1.default.compare(contraseñaVieja, cliente.contraseña);
        if (!validaContraseña) {
            return res.status(400).json({
                msg: "La contraseña actual no coincide"
            });
        }
        if (contraseñaNueva != repeticionContraseñaNueva) {
            return res.status(400).json({
                msg: "Las nuevas contraseñas no coinciden"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(contraseñaNueva, 10);
        cliente_model_1.Cliente.update({
            contraseña: hashedPassword
        }, {
            where: { idCliente: cliente.idCliente }
        });
        res.status(200).json({
            msg: "Cambio de contraseña exitoso"
        });
    }
    catch (err) {
        res.status(400).json({
            msg: "Error del Servidor"
        });
    }
});
exports.cambiarContraseña = cambiarContraseña;
