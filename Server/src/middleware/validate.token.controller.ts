import { NextFunction, Request, Response, json } from "express";
import jtw from 'jsonwebtoken';

const validateToken = (req:Request, res:Response, next:NextFunction)=>{
    const headerToken = req.headers['authorization'];
    console.log(headerToken);

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        //Tiene token
        try{
            const bearerToken = headerToken.slice(7)
            jtw.verify(bearerToken, process.env.SECRETKEY || '332211')

        }catch(error){
            return res.status(401).json({
                msg:"Token no Valido"
            })

        }


        next();
    }
    else{
        return res.status(401).json({
            msg: "Acceso Denegado"
        })
    }
}

export default validateToken;