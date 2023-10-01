import { Request, Response } from "express"
import { PrecioProducto } from "../model/precioProducto.model";
import { Producto } from "../model/producto.model";

export const getPrecioActualProducto = async (req: Request, res: Response) => {
    const { idProducto } = req.params;

    const fechaMax = await PrecioProducto.max('fechaDesde', { where: { idProducto: idProducto } });

    const precioActProduct: any = await PrecioProducto.findOne({
        where: { idProducto: idProducto, fechaDesde: fechaMax }
    });

    if (precioActProduct) {
        const idProducto = precioActProduct.idProducto;
        const fechaDesde = precioActProduct.fechaDesde;
        const precio = precioActProduct.precio;

        res.json({
            idProducto,
            fechaDesde,
            precio
        });
    } else {
        res.status(404).json({ error: 'No se encontraron precios para el producto' });
    }



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



    /*
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
        });*/

}