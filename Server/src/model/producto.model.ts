import {DataTypes} from "sequelize";
import sequelize from "../db/connection";
import { PrecioProducto } from "./precioProducto.model";


export const Producto = sequelize.define('producto', {
    idProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
    },
    nombreProducto:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    detallesGenerales:{
        type: DataTypes.STRING,
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER
    }
    /*imagen:{
        type: DataTypes.BLOB,
        allowNull: false
    },*/

},{
    modelName: 'Producto'
})

Producto.hasMany(PrecioProducto, {
    foreignKey: 'idProducto',
    as: 'precios'
})