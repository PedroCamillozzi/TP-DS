import { Request, Response } from "express";
import { Producto } from "../model/producto.model";
import { PrecioProducto } from "../model/precio.producto.model";
import { DATE, Model, where } from "sequelize";
import sequelize from "../db/connection";


export const getProductos = async (req:Request, res:Response) =>{
    const listaProductos = await Producto.findAll();
    res.json(
        listaProductos
    )
}

export const postProducto = async (req:Request, res:Response) =>{
    const {nombreProducto, descripcion, detallesGenerales,/*, imagen,*/ precio} = req.body;

    try{
        const producto =  await Producto.create({
            nombreProducto: nombreProducto,
            descripcion:descripcion,
            detallesGenerales:detallesGenerales,
            //imagen:imagen 
        })

        await PrecioProducto.create({
            idProducto: producto.idProducto,
            fechaDesde: new Date(),
            precio: precio
        })
        

        
    }catch(error){
        res.status(400).json({
            msg:"Ocurrió un error", error
        })

    }
    res.json({
        msg: "Producto "+ nombreProducto + " creado exitosamente",
        body: req.body
    })
}

export const putProducto = async (req:Request, res:Response) =>{
    const {idProducto, nombreProducto, descripcion, detallesGenerales, precio} = req.body;

    const producto = await Producto.findOne({where:{idProducto: idProducto}});

    if(!producto){
        res.status(400).json({
            msg:"No existe el producto"
        })
        return
    }

    const precioMax = await PrecioProducto.max('fechaDesde',{where:{idProducto:idProducto}})
    //Funciona hasta Acá


    // const precioAct = await Producto.findAll({where:{idProducto: idProducto},include:[{model:PrecioProducto, required:true, where:{fechaDesde:precioMax}}]}).then(posts => {/*...*/})
    
    // Select p.idProducto, nombreProducto, descripcion, detallesGenerales From productos p Inner Join PrecioProducto pp ON pp.idProducto = p.idProducto Where pp.fechaDesde = precioMax(es la fecha)
    return
    try{
        producto.set({
            nombreProducto: nombreProducto,
            descripcion: descripcion,
            detallesGenerales: detallesGenerales
        })
        if(precioMax !== precioAct.fechaDesde){
            PrecioProducto.create({
                idProducto: producto.idProducto,
                fechaDesde: precioAct.fechaDesde
            });
        }

    }catch(error){
        res.status(400).json({
            msg: "Ocurrio un error", error
        })
    }


}
   