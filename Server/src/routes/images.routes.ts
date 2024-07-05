import { Router } from "express";
import upload from "../middleware/imageConfig";
import { getImageProductsMulti, getImagePerfil, postImageProductsMulti, postImageSingle, getPrincipalImageProductsMulti } from "../controller/images.controller";
import validateToken from "../middleware/validate.token.controller";

const routerImages = Router();

routerImages.post('/perfil/:idCliente', validateToken ,upload.single('imagenPerfil'), postImageSingle )
routerImages.post('/products/:idProducto', upload.array('photos', 5), postImageProductsMulti)
routerImages.get('/perfil/:idCliente', getImagePerfil)
routerImages.get('/products/:idProducto', getImageProductsMulti)
routerImages.get('/products/', getPrincipalImageProductsMulti)

export default routerImages;