import { Request, Response } from "express";
import { Producto } from "../model/producto.model";
import { PrecioProducto } from "../model/precioProducto.model";
import { DATE, Model, QueryTypes, where } from "sequelize";
import sequelize from "../db/connection";


export const getProductos = async (req:Request, res:Response) =>{
    const listaProductos = await Producto.findAll();
    res.json(
        listaProductos
    )
}

export const getProducto = async (req:Request, res:Response) =>{
    const {idProducto} = req.params

    const producto = await Producto.findOne({where:{idProducto:idProducto}});

    if(!producto){
        res.status(400).json({
            msg: "No se ha encontrado el producto"
        })
        return
    }

    res.json(producto)
}

export const postProducto = async (req:Request, res:Response) =>{
    const {nombreProducto, descripcion, detallesGenerales, stock,/*, imagen,*/ precio} = req.body;

    try{
        const producto =  await Producto.create({
            nombreProducto: nombreProducto,
            descripcion:descripcion,
            detallesGenerales:detallesGenerales,
            stock: stock
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
    const {idProducto, nombreProducto, descripcion, detallesGenerales, stock, fechaDesde, precio} = req.body;

    const producto = await Producto.findOne({where:{idProducto: idProducto}});

    if(!producto){
        res.status(400).json({
            msg:"No existe el producto"
        })
        return
    }

    const fechaMax = await PrecioProducto.max('fechaDesde',{where:{idProducto:idProducto}})
    //Funciona hasta Acá
    console.log(fechaMax);

    const precioProducto = await PrecioProducto.findOne({where:{idProducto:idProducto}&&{fechaDesde:fechaMax}})


    

    // const precioAct = await Producto.findAll({where:{idProducto: idProducto},include:[{model:PrecioProducto, required:true, where:{fechaDesde:precioMax}}]}).then(posts => {/*...*/})
    
    // Select p.idProducto, nombreProducto, descripcion, detallesGenerales From productos p Inner Join PrecioProducto pp ON pp.idProducto = p.idProducto Where pp.fechaDesde = precioMax(es la fecha)

    /*const productos = await sequelize.query( //No me gusta usarla así por el SQLInyedction
        'Select p.idProducto, p.nombreProducto, p.descripcion, p.detallesGenerales, pp.fechaDesde From productos p Inner Join PrecioProductos pp ON pp.idProducto = p.idProducto Where Date(pp.fechaDesde) = Date(?)',
        {
            replacements:[fechaMax], //No se porque me toma 3hs distintas a lo que está cargado en la BBDD y tengo que usar la funcion Date() Para que ande
            type: QueryTypes.SELECT,
            
        }
    )
    console.log(productos);
    res.json({
        msg: productos.fechaDesde
    })*/

   
    try{
        if(producto.nombreProducto !== nombreProducto || producto.descripcion !== descripcion || producto.detallesGenerales !== detallesGenerales || producto.stock !== stock){
            producto.update({
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
            PrecioProducto.create({
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
        res.status(400).json({
            msg: "Ocurrio un error", error
        })
    }


}
   