import {DataTypes} from "sequelize";
import sequelize from "../db/connection";
import { Cliente } from "./cliente.model";


export const Carrito = sequelize.define('carrito', {
    nroCarrito:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idCliente:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Cliente,
            key: "idCliente"
        }

    }

})