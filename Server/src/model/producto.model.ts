import {DataTypes} from "sequelize";
import sequelize from "../db/connection";


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
    /*imagen:{
        type: DataTypes.BLOB,
        allowNull: false
    },*/

})