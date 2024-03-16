import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const postImage = async (req:Request, res:Response, next:NextFunction) => {
    const {file} = req.params;

    if(!file){
        return res.status(400).json({
            msg:"No se puede guardar la imagen"
        });
        
    }

    res.send(file);
}