import express, { Application } from 'express';
import routerCliente from '../routes/cliente.routes';
import { Cliente } from './cliente.model';

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

    }

    middlewares(){
        this.app.use(express.json());
    }

    async dbConnect(){
        try{
            await Cliente.sync();
        }
        catch(error){
            console.error('No fue posible conectarse a la base de datos', error)
        }
    }
}