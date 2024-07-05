import { Router } from "express";
import { getDetallePedidosCliente, postDetallePedido } from "../controller/detallePedido.controller";
import validateToken from "../middleware/validate.token.controller";

const routerDetallePedido = Router();

routerDetallePedido.get('/:idPedido', validateToken, getDetallePedidosCliente);
routerDetallePedido.post('/', validateToken, postDetallePedido);

export default routerDetallePedido;