import { Router } from "express";
import { getPedidosCliente } from "../controller/pedido.controller";

const routerPedido = Router();

routerPedido.get('/:idCliente', getPedidosCliente);

export default routerPedido;