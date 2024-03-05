import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Cliente } from "./cliente.model";

export const TipoUsuario = sequelize.define('TipoUsuario', {
    idTipoUsuario:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    descripcion:{
        type:DataTypes.STRING
    }
},{
    modelName: 'TipoUsuario'
})

