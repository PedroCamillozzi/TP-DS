import { Router } from "express";
import { loginCliente, newCliente } from "../controller/cliente.controller";

const routerCliente = Router();

routerCliente.post('/signIn', newCliente);
routerCliente.post('/login', loginCliente);

export default routerCliente;