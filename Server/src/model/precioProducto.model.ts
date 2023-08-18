import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Producto } from "./producto.model";


export const PrecioProducto = sequelize.define('precioProducto',{
    idProducto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model: Producto,
            key: 'idProducto'
        }
    },
    fechaDesde:{
        type: DataTypes.DATE,
        primaryKey: true,
    },
    precio:{
        type: DataTypes.DECIMAL(17,4),      
    }
})