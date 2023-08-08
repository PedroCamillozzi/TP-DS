import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Producto } from "./producto.model";
import { Pedido } from "./pedido.model";


export const Venta = sequelize.define('venta', {
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
    fechaVenta:{
        type: DataTypes.DATE,
        primaryKey: true
    },
    cantidad:{
        type:DataTypes.INTEGER
    },
})