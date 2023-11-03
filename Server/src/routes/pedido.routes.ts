import { Router } from "express";
import { getPedidosCliente, postPedidoCliente } from "../controller/pedido.controller";
import validateToken from "../controller/validate.token.controller";

const routerPedido = Router();

routerPedido.get('/:idCliente', validateToken, getPedidosCliente);
routerPedido.post('/', validateToken, postPedidoCliente)

export default routerPedido;