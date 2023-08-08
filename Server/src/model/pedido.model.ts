import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Cliente } from "./cliente.model";


export const Pedido = sequelize.define('pedido', {
    idPedido:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    fechaPedido:{
        type: DataTypes.DATE,
    },
    fechaEntrega:{
        type: DataTypes.DATE
    },
    estado:{
        type: DataTypes.STRING
    },
    idCliente:{
        type: DataTypes.INTEGER,
        references:{
            model: Cliente,
            key: 'idCliente'
        }
    }

})