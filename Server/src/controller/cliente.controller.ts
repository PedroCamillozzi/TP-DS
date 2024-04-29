import { Request, Response } from "express";
import { Cliente } from "../model/cliente.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { where } from "sequelize";
import { TipoUsuario } from "../model/tipoUsuario.model";

export const newCliente = async (req: Request, res: Response) => {
    const { nombre, apellido, dni, email, contraseña, telefono } = req.body;

    try {
        const existingCliente:any = await Cliente.findOne({where: { dni: dni } || { email: email }}
        );

        if (existingCliente) {
            if (existingCliente.dni === dni) {
                return res.status(400).json({
                    msg: "Ya existe un usuario con ese dni"
                });
            }

            if (existingCliente.email === email) {
                return res.status(409).json({
                    msg: "El email ya está registrado en la base de datos." // NO ME TOMA EL EMAIL PERO SI EL DNI
                });
            }
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);


        await Cliente.create({
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            email: email,
            contraseña: hashedPassword,
            telefono: telefono,
            tipoUsuario: 2,
        });

        res.status(201).json({
            msg: "Cliente " + nombre + " creado exitosamente"
        });
    } catch (error) {
            res.status(500).json({
            msg: "Ocurrió un error en el servidor."
            
        });
    }
};

export const loginCliente = async (req:Request, res:Response)=>{
    const {email, contraseña} = req.body;

    const cliente:any = await Cliente.findOne({where:{ email: email }})

    if(!cliente){
        return res.status(400).json({
            msg: "El email "+ email + " no se encuentra registrado"
        })
    }

    const validaContraseña = await bcrypt.compare(contraseña, cliente.contraseña)

    if(!validaContraseña){
        return res.status(400).json({
            msg:"Password Incorrecta"
        })
    }

    const token = jwt.sign({
        email: email,
    }, process.env.SECRETKEY || '332211', {
        //expiresIn: '100000'
    }
    );

    const idCliente = cliente.idCliente

    const tipoUsuario:any = await TipoUsuario.findOne({where:{idTipoUsuario: cliente.idTipoUsuario}});
    
    const tipoUsuarioNombre = tipoUsuario.descripcion;

    res.json({token, idCliente, tipoUsuarioNombre})
}

export const getDatosCliente = async (req:Request, res:Response) => {
    const {idCliente} = req.params;

    try{
        const cliente:any = await Cliente.findOne({where: {idCliente:idCliente}});
        
        if(!cliente){
            return res.status(400).json({msg:"Cliente no encontrado"})
        }

        const tipoUsuarioCliente:any = await TipoUsuario.findOne({where:{idTipoUsuario: cliente.idTipoUsuario}})

        const clienteFiltrado = {
            idCliente: cliente.idCliente,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
            idTipoUsuario : cliente.idTipoUsuario,
            nombreTipoUsuario: tipoUsuarioCliente.descripcion
        }

        

        return res.status(200).json(clienteFiltrado)

    }catch(err){
        return res.status(500).json({msg:"Error de servidor"})
    }
}

export const cambiarDatosCliente = async (req:Request, res:Response)=>{
    const {idCliente, nombre, apellido, telefono} = req.body

    try{
        const clienteOriginal:any = await Cliente.findOne({where: {idCliente:idCliente}});

        if(!clienteOriginal){
            return res.status(400).json({msg:"Cliente no encontrado"})
        }

        Cliente.update({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono
        },
        {
            where: {idCliente: clienteOriginal.idCliente}
        })

        res.status(200).json({
            msg:"Modificado con éxito"
        })
    }catch(err){
        res.status(400).json({
            msg:"Error del Servidor"
        })
    }

}

export const cambiarContraseña = async (req:Request, res:Response)=>{
    const {idCliente, contraseñaVieja, contraseñaNueva, repeticionContraseñaNueva} = req.body;

    try{
        const cliente:any = await Cliente.findOne({where:{idCliente:idCliente}});

        if(!cliente){
            return res.status(400).json({
                msg:"Cliente inexistente"
            });
        }

        const validaContraseña = await bcrypt.compare(contraseñaVieja, cliente.contraseña)

        if(!validaContraseña){
           return  res.status(400).json({
                msg:"La contraseña actual no coincide"
            })
        }

        if(contraseñaNueva != repeticionContraseñaNueva){
            return res.status(400).json({
                msg:"Las nuevas contraseñas no coinciden"
            })

        }

        const hashedPassword = await bcrypt.hash(contraseñaNueva, 10);

        Cliente.update({
            contraseña: hashedPassword
        },
        {
            where: {idCliente:cliente.idCliente}
        })

        res.status(200).json({
            msg: "Cambio de contraseña exitoso"
        })
    }catch(err){
        res.status(400).json({
            msg:"Error del Servidor"
        })
    }

}
