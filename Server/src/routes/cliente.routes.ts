import { Router } from "express";
import { cambiarContraseña, cambiarDatosCliente, getDatosCliente, loginCliente, newCliente } from "../controller/cliente.controller";
import validateToken from "../controller/validate.token.controller";

const routerCliente = Router();

routerCliente.get('/:idCliente', validateToken, getDatosCliente)
routerCliente.post('/signIn', newCliente);
routerCliente.post('/login', loginCliente);
routerCliente.patch('/', validateToken, cambiarDatosCliente)
routerCliente.patch('/cambiaContrasenia', validateToken, cambiarContraseña)

export default routerCliente;