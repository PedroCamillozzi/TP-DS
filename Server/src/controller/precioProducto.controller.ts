import { Request, Response } from "express"
import { PrecioProducto } from "../model/precioProducto.model";
import { Producto } from "../model/producto.model";

export const getPrecioActualProducto = async (req:Request, res:Response) =>{
    const {idProducto} = req.params;

    const fechaMax = await PrecioProducto.max('fechaDesde', {where: {idProducto: idProducto}})

   /* const precioActProduct = await Producto.findAll({
        include: [{
            model: PrecioProducto,
            as: 'precios',
            where: {
                fechaDesde: fechaMax
            },
            required:true
        }]
    })*/

    const precioActProduct = await PrecioProducto.findAll({
        where: {idProducto: idProducto} && {fechaDesde: fechaMax}
    })

    precioActProduct.forEach(p => {
        const idProducto = p.idProducto;
        const fechaDesde = p.fechaDesde;
        const precio = p.precio
        res.json({
            idProducto,
            fechaDesde,
            precio
        })
    });


    return


    /*if(!precioActProduct){
        return res.status(400).json({
            msg: "No existe el producto"
        })
    }
    if(!precioActProduct[0].precios){
        return res.status(400).json({
            msg: "No existe precio para el producto"
        })
    }*/
     // Crear un array para almacenar los atributos de los productos
    const preciosProducto = precioActProduct.map(producto => ({
        idProducto: producto.idProducto,
        fechaDesde: producto.fechaDesde,
        precio: producto.precio

            // Agrega más atributos aquí si es necesario
        }));
    
        // Enviar una sola respuesta JSON con todos los atributos de los productos
        res.json({
            preciosProducto
        });

}