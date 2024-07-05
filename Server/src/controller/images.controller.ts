import {Request, Response } from "express";
import fs from 'fs';
import path from 'path'

export const postImageSingle = async (req:Request, res:Response) => {
    const file = req.file
    const {idCliente} = req.params

    const uploadDir = './uploads/perfiles/';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    const newPath = './uploads/perfiles/' + idCliente + '.png' 
    fs.renameSync(file?.path || '', newPath)
    
    res.status(200).json({
        msg: "Imágen modificada"
    })
}

export const postImageProductsMulti = async (req:Request, res:Response) =>{
    const files:any = req.files
    const {idProducto} = req.params
    const uploadDir = './uploads/products/';

    const order = fs.readdirSync(uploadDir);
    const productFiles = order.filter((order: any) => order.startsWith(idProducto));

    try{
        let i = 0
        if(productFiles.length === 0){
            const uploadDir = './uploads/products/';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            const newPath = './uploads/products/' + idProducto + '_principal' + '.png'
            fs.renameSync(files[0]?.path || '', newPath)

            for (let j = 1; j < files.length; j++){
                const uploadDir = './uploads/products/';
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir);
                }
                const newPath = './uploads/products/' + idProducto + '_' + j + '.png'
                fs.renameSync(files[j]?.path || '', newPath)

                i++
            }
                
            
        }else{
            i = productFiles.length
            files.forEach((file:any) => {
                const uploadDir = './uploads/products/';
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir);
                }
                const newPath = './uploads/products/' + idProducto + '_' + i + '.png'
                fs.renameSync(file?.path || '', newPath)
                i++
            })
        }
    
        res.status(200).json({
            msg: 'Imágenes subidas con Éxito'
        })
    }catch(err){
        res.status(500).json({
            msg:err
        })
    }
   
}


export const getImagePerfil = async(req:Request, res:Response) =>{
    const { idCliente } = req.params;
    const uploadDir = './uploads/perfiles/';

    try {
        const files = fs.readdirSync(uploadDir);
        const clientFiles = files.filter(file => file.startsWith(idCliente));

        if (clientFiles.length > 0) {
            const images = clientFiles.map(file => {
                const filePath = path.join(uploadDir, file);
                const fileData = fs.readFileSync(filePath);
                return {
                    filename: file,
                    data: fileData.toString('base64')
                };
            });

            res.status(200).json(images);
        } else {
            res.status(404).json({ msg: 'No se encontraron imágenes para este cliente' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error al leer las imágenes' });
    }
};

export const getImageProductsMulti = async (req:Request, res:Response) =>{
    const { idProducto } = req.params;
    const uploadDir = './uploads/products/';

    try {
        const files = fs.readdirSync(uploadDir);
        const productFiles = files.filter(file => file.startsWith(idProducto));

        if (productFiles.length > 0) {
            const images = productFiles.map(file => {
                const filePath = path.join(uploadDir, file);
                const fileData = fs.readFileSync(filePath);
                return {
                    filename: file,
                    data: fileData.toString('base64')
                };
            });

            res.status(200).json(images);
        } else {
            res.status(404).json({ msg: 'No se encontraron imágenes para este producto' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error al leer las imágenes' });
    }

}

export const getPrincipalImageProductsMulti = async (req:Request, res:Response) =>{
    const uploadDir = './uploads/products/';

    try {
        const files = fs.readdirSync(uploadDir);
        const productFiles = files.filter(file => file.includes('_principal'));

        if (productFiles.length > 0) {
            const images = productFiles.map(file => {
                const filePath = path.join(uploadDir, file);
                const fileData = fs.readFileSync(filePath);
                return {
                    filename: file,
                    data: fileData.toString('base64')
                };
            });

            res.status(200).json(images);
        } else {
            res.status(404).json({ msg: 'No se encontraron imágenes' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error al leer las imágenes' });
    }

}