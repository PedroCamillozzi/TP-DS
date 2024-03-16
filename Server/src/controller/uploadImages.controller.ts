import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from 'path';


export const uploadDirection = async (next:NextFunction)=>{(express.static(path.join(__dirname, 'images'))); next();}

const storage = multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, 'images');
        },
        filename: (req, file, cb) =>{
            cb(null, file.originalname);
        }
    });

export const upload = multer({storage});