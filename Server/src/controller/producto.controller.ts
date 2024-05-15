import { Request, Response } from "express";
import { Producto } from "../model/producto.model";
import { PrecioProducto } from "../model/precioProducto.model";
import { DATE, Model, QueryTypes, where } from "sequelize";
import sequelize from "../db/connection";


export const getProductos = async (req:Request, res:Response) =>{
    try{
        const listaProductos = await Producto.findAll();

        if(listaProductos.length === 0){
           return res.status(404).json({msg:'No hay productos agregados'})
        }
        
        res.status(200).json(listaProductos)
    }
    catch(error){
        return res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
}

export const getProducto = async (req:Request, res:Response) =>{
    const {idProducto} = req.params

    try{
        const producto = await Producto.findOne({where:{idProducto:idProducto}});

        if(!producto){
            res.status(404).json({
                msg: "No se ha encontrado el producto"
            })
            return
        }
    
        res.status(200).json(producto)
    }catch(error){
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
}

export const postProducto = async (req:Request, res:Response) =>{
    const {nombreProducto, descripcion, detallesGenerales, stock, precio} = req.body;

    try{
        const producto:any =  await Producto.create({
            nombreProducto: nombreProducto,
            descripcion:descripcion,
            detallesGenerales:detallesGenerales,
            stock: stock
        })

        await PrecioProducto.create({
            idProducto: producto.idProducto,
            fechaDesde: new Date(),
            precio: precio
        })
        
        res.status(200).json({
            msg: "Producto "+ nombreProducto + " creado exitosamente",
            body: req.body
        })
        
    }catch(error){
        res.status(500).json({
            msg:"Ocurrió un error", error
        })

    }
}

export const putProducto = async (req:Request, res:Response) =>{
    const {idProducto, nombreProducto, descripcion, detallesGenerales, stock, fechaDesde, precio} = req.body;
   
    try{
        

        const producto:any = await Producto.findOne({where:{idProducto: idProducto}});
    
        if(!producto){
            res.status(400).json({
                msg:"No existe el producto"
            })
            return
        }
    
        const fechaMax = await PrecioProducto.max('fechaDesde',{where:{idProducto:idProducto}})
    
        const precioProducto:any = await PrecioProducto.findOne({where:{idProducto:idProducto}&&{fechaDesde:fechaMax}})
    
        if(producto.nombreProducto !== nombreProducto || producto.descripcion !== descripcion || producto.detallesGenerales !== detallesGenerales || producto.stock !== stock){
            await producto.update({
                nombreProducto: nombreProducto,
                descripcion: descripcion,
                detallesGenerales: detallesGenerales,
                stock: stock
            }, {
                where: {
                    idProducto: idProducto
                }
            })
        }
        if(fechaDesde !== undefined && fechaMax !== fechaDesde && precioProducto!.precio !== precio){
            await PrecioProducto.create({
                idProducto: producto.idProducto,
                fechaDesde: fechaDesde,
                precio: precio
            });
            res.status(200).json({
                msg:"Precio y Producto Actualizado"
            });
            return
        }
        res.status(200).json({
            msg:"Producto Actualizado"
        })

    }catch(error){
        res.status(500).json({
            msg: "Ocurrió un error", error
        })
    }


}

export const deleteProducto = async (req:Request, res:Response) =>{
    const {idProducto} = req.params

    try{
        const producto = await Producto.findOne({where:{idProducto: idProducto}});

        if(!producto){
            res.status(400).json({
                msg: "No se puedo encontrar en producto"
            })
            return
        }

        await Producto.destroy({
            where:{idProducto:idProducto}
        })

        return res.status(200).json({
            msg:"Producto removido"
        })

    }
    catch(error){
        res.status(500).json({
            msg:"Ocurrió un error"
        })
    }
}
   