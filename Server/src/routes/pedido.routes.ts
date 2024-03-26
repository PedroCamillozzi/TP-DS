import { Router } from "express";
import { getPedidos, getPedidosCliente, postPedidoCliente } from "../controller/pedido.controller";
import validateToken from "../controller/validate.token.controller";
/*import validateTipoUsuario from "../controller/validateTipoUsuario.controller";*/

const routerPedido = Router();

routerPedido.get('/:idCliente', validateToken, getPedidosCliente);
routerPedido.post('/', validateToken, postPedidoCliente)
routerPedido.get('/all', validateToken/*, validateTipoUsuario*/, getPedidos)

export default routerPedido;