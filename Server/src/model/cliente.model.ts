import {DataTypes} from "sequelize";
import sequelize from "../db/connection";
import { TipoUsuario } from "./tipoUsuario.model";


export const Cliente = sequelize.define('cliente', {
    idCliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dni:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    },
    idTipoUsuario:{
        type:DataTypes.INTEGER,
        references:{
            model:TipoUsuario,
            key: 'idTipoUsuario'
        }
    },
    

},{
    modelName: 'Cliente'
})

Cliente.hasOne(TipoUsuario, {
    foreignKey: 'idTipoUsuario',
    as: 'tipoUsuario'
})