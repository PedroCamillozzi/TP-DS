import { Router } from "express";
import { getDetallePedidosCliente, postDetallePedido } from "../controller/detallePedido.controller";
import validateToken from "../controller/validate.token.controller";

const routerDetallePedido = Router();

routerDetallePedido.get('/:idPedido', validateToken, getDetallePedidosCliente);
routerDetallePedido.post('/', validateToken, postDetallePedido);

export default routerDetallePedido;