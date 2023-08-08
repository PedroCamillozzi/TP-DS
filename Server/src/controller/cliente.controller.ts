import { Request, Response } from "express";
import { Cliente } from "../model/cliente.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
            telefono: telefono
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

    res.json(token)
}
