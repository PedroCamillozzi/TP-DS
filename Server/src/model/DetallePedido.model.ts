import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Producto } from "./producto.model";
import { Pedido } from "./pedido.model";


export const DetallePedido = sequelize.define('DetallePedido', {
    idPedido:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Pedido,
            key: 'idPedido'
        }
    },
    idProducto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model: Producto,
            key: 'idProducto'
        }
    },
    cantidad:{
        type:DataTypes.INTEGER
    },
},{
    modelName: 'DetallePedido'
})