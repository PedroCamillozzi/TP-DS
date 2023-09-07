import {DataTypes} from "sequelize";
import sequelize from "../db/connection";
import { Producto } from "./producto.model";
import { Cliente } from "./cliente.model";


export const Carrito = sequelize.define('Carrito', {
    idProducto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model: Producto,
            key: 'idProducto'
        }
    },
    idCliente:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model:Cliente,
            key: 'idCliente'
        }
    },
    cantidad:{
        type: DataTypes.INTEGER
    }

})