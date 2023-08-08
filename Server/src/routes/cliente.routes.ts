import { Router } from "express";
import { loginCliente, newCliente } from "../controller/cliente.controller";

const routerCliente = Router();

routerCliente.post('/signIn', newCliente);
routerCliente.post('/logIn', loginCliente)

export default routerCliente;