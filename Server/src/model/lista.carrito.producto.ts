import {DataTypes} from "sequelize";
import sequelize from "../db/connection";
import { Producto } from "./producto.model";
import { Carrito } from "./carrito.model";
import { Cliente } from "./cliente.model";


export const ListaCarritoProducto = sequelize.define('ListaCarritoProduto', {
    idProducto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model: Producto,
            key: 'idProducto'
        }
    },
    nroCarrito:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model:Carrito,
            key: 'nroCarrito'
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