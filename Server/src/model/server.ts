import express, { Application, NextFunction } from 'express';
import routerCliente from '../routes/cliente.routes';
import { Cliente } from './cliente.model';
import routerProductos from '../routes/productos.routes';
import { Producto } from './producto.model';
import cors from 'cors';
import { PrecioProducto } from './precioProducto.model';
import { DetallePedido } from './DetallePedido.model';
import { Pedido } from './pedido.model';

import routerPrecioProductos from '../routes/precioProducto.routes';
import routerCarrito from '../routes/carrito.routes';
import { Carrito } from './carrito.producto';
import routerPedido from '../routes/pedido.routes';
import routerDetallePedido from '../routes/detallePedido.routes';
import { TipoUsuario } from './tipoUsuario.model';
import routerImages from '../routes/images.routes';
import path from 'path';
import multer from 'multer';

export class Server{
    private app:Application;
    private port:string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();




    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('PcParts corriendo en el puerto: ' + this.port)
        })
    }

    routes(){
        this.app.use('/client',routerCliente);
        this.app.use('/productos', routerProductos);
        this.app.use('/precioProductos', routerPrecioProductos);
        this.app.use('/carrito', routerCarrito);
        this.app.use('/pedido', routerPedido);
        this.app.use('/detallePedido', routerDetallePedido);
        this.app.use('/images', routerImages);

        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        
        const storage = multer.diskStorage({
            destination:(req, file, cb)=>{
                cb(null, 'uploads');
            },
            filename: (req, file, cb) =>{
                cb(null, file.originalname);
            }
        });

        const upload = multer({storage});

        this.app.post('/file', upload.single('file'), (req:Request, res:Response, next:NextFunction))=>{ 
        }
    }

    middlewares(){
        this.app.use(express.json());

        this.app.use(cors());

  


    }

    async dbConnect(){
        try{
            await TipoUsuario.sync();
            await Cliente.sync();
            await Producto.sync();
            await PrecioProducto.sync();
            await Pedido.sync();
            await DetallePedido.sync();
            await Carrito.sync();
            
        }
        catch(error){
            console.error('No fue posible conectarse a la base de datos', error)
        }
    }

    
}