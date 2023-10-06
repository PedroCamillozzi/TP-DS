import { Router } from "express";
import { cambiarContraseña, cambiarDatosCliente, getDatosCliente, loginCliente, newCliente } from "../controller/cliente.controller";

const routerCliente = Router();

routerCliente.get('/:idCliente', getDatosCliente)
routerCliente.post('/signIn', newCliente);
routerCliente.post('/login', loginCliente);
routerCliente.patch('/', cambiarDatosCliente)
routerCliente.patch('/cambiaContrasenia', cambiarContraseña)

export default routerCliente;