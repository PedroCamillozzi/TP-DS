import { Router } from "express";
import { getDetallePedidosCliente } from "../controller/detallePedido.controller";

const routerDetallePedido = Router();

routerDetallePedido.get('/:idPedido', getDetallePedidosCliente);

export default routerDetallePedido;