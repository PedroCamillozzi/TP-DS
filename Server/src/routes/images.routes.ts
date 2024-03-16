import { Router } from "express";
import { upload, uploadDirection } from "../controller/uploadImages.controller";
import { postImage } from "../controller/images.controller";

const routerImages = Router();

routerImages.post('guardar/', upload.single('file'), postImage )

export default routerImages;