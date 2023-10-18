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
const express_1 = __importDefault(require("express"));
const cliente_routes_1 = __importDefault(require("../routes/cliente.routes"));
const cliente_model_1 = require("./cliente.model");
const productos_routes_1 = __importDefault(require("../routes/productos.routes"));
const producto_model_1 = require("./producto.model");
const cors_1 = __importDefault(require("cors"));
const precioProducto_model_1 = require("./precioProducto.model");
const DetallePedido_model_1 = require("./DetallePedido.model");
const pedido_model_1 = require("./pedido.model");
const precioProducto_routes_1 = __importDefault(require("../routes/precioProducto.routes"));
const carrito_routes_1 = __importDefault(require("../routes/carrito.routes"));
const carrito_producto_1 = require("./carrito.producto");
const pedido_routes_1 = __importDefault(require("../routes/pedido.routes"));
const detallePedido_routes_1 = __importDefault(require("../routes/detallePedido.routes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('PcParts corriendo en el puerto: ' + this.port);
        });
    }
    routes() {
        this.app.use('/client', cliente_routes_1.default);
        this.app.use('/productos', productos_routes_1.default);
        this.app.use('/precioProductos', precioProducto_routes_1.default);
        this.app.use('/carrito', carrito_routes_1.default);
        this.app.use('/pedido', pedido_routes_1.default);
        this.app.use('/detallePedido', detallePedido_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cliente_model_1.Cliente.sync();
                yield producto_model_1.Producto.sync();
                yield precioProducto_model_1.PrecioProducto.sync();
                yield pedido_model_1.Pedido.sync();
                yield DetallePedido_model_1.DetallePedido.sync();
                yield carrito_producto_1.Carrito.sync();
            }
            catch (error) {
                console.error('No fue posible conectarse a la base de datos', error);
            }
        });
    }
}
exports.Server = Server;
