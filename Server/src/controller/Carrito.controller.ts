import { Request, Response } from "express";
import { Cliente } from "../model/cliente.model";
import { Producto } from "../model/producto.model";
import { Carrito } from "../model/carrito.producto";

export const getProductosCliente = async (req:Request, res:Response)=>{
    const {idCliente} = req.params;

    try{
      const listaCarritoCliente = await Carrito.findAll({where:{idCliente:idCliente}});

      if(!listaCarritoCliente){
          res.status(400).json({
              msg:"No se pudo obtener la lista del carrito"
          })
      }

    res.status(200).json(listaCarritoCliente)
  

    }catch(error){
      res.status(500).json({
        msg: "Error en el servidor"
      });
    }



}

export const patchProductoCliente = async (req: Request, res:Response) =>{
    const {idCliente, idProducto, cantidad} = req.body;

    const cliente = await Cliente.findOne({where: {idCliente:idCliente}});

    if(!cliente){
        res.status(400).json({
            msg: "No se encontro ningun cliente"
        })
        return
    }

    const producto = await Producto.findOne({where:{idProducto:idProducto}});

    if(!producto){
        res.status(400).json({
            msg: "No existe el producto"
        })
        return
    }
    const carrito:any = await Carrito.findOne({where:{idCliente:idCliente} && {idProducto:idProducto}});

    if(carrito){
      if(producto.stock <= 0 || (carrito.cantidad + cantidad) > producto.stock){
        res.status(400).json({
            msg:"No hay stock disponible por el momento"
        })
        return
    }
    }
        /*Puede el backEnd llamar a una funcion dentro de él? Por ejemplo quiero que no existe el producto dentro del carrito
    que lo cree, en ese caso, puedo llamar a una funcion postCarritoCliente que haga lo de abajo por ejemplo?
    */
    if (!carrito) {
        try {
          await Carrito.create({
            idProducto: producto.idProducto,
            idCliente: cliente.idCliente,
            cantidad: cantidad,
          });
      
          res.status(201).json({
            msg: "Producto agregado al carrito satisfactoriamente"
          });
        } catch (error) {
          res.status(400).json({
            msg: "Ocurrió un error al sumar el producto al carrito",
            error,
          });
        }
      } else {
        try {
          await Carrito.update(
            {
              cantidad: carrito.cantidad
            },
            {
              where: { idCliente: idCliente, idProducto: idProducto },
            }
          );
            
          res.status(200).json({ msg: "Carrito actualizado con éxito"});
        } catch (err) {
          res.status(400).json({
            msg: "No se pudo actualizar el carrito",
            err,
          });
        }
      }
      
}

export const patchAgregarCantidadProductosCliente = async (req:Request, res:Response)=>{
  const {idCliente, idProducto, cantidad} = req.body;

  try{
    
    const productoDeCarritoACambiar:any = await Carrito.findOne({where:{idCliente:idCliente} && {idProducto:idProducto}})

    if(!productoDeCarritoACambiar){
      res.status(400).json({
        msg: "No se encontró el producto dentro del carrito"
      })
    }
    const cantidadReal:Number = cantidad - productoDeCarritoACambiar.cantidad

    if((productoDeCarritoACambiar.cantidad + cantidadReal) < 0 ){
      res.status(400).json({
        msg:"No puede haber stock negativo"
      })
    }

    await Carrito.update(
    {
      cantidad: productoDeCarritoACambiar.cantidad + cantidadReal 
    },
    {
      where: { idCliente: idCliente, idProducto: idProducto },
    }
    );

    res.status(200).json({
      msg:"Carrito Actualizado"
    })
  }catch(err){
    res.status(500).json({
      msg:"Error del servidor"
    })
  }
  
}

export const deleteProductoCliente = async (req:Request, res:Response)=>{
    const {idCliente, idProducto} = req.params;

    const productoAremover = await Carrito.findOne({where:{idCliente:idCliente} && {idProducto:idProducto}});

    if(!productoAremover){
        res.status(400).json({
            msg:"No se pudo obtener la lista del carrito"
        })
    }

    try{
        await Carrito.destroy({
            where: {idCliente: productoAremover.idCliente} && {idProducto: productoAremover.idProducto}
        })
    } catch(error){
        res.status(400).json({
            msg: "No se encontro el producto a remover", error
        })
    }

    res.status(200).json({
        msg: "Producto removido correctamente"
    })
}


export const deleteAllProductoCliente = async (req:Request, res:Response)=>{
  const {idCliente} = req.params;

  const productoAremover:any = await Carrito.findOne({where:{idCliente:idCliente}});

  if(!productoAremover){
      res.status(400).json({
          msg:"No se pudo obtener la lista del carrito"
      })
  }

  try{
      await Carrito.destroy({
        where: {idCliente: productoAremover.idCliente}
      })
  } catch(error){
      res.status(400).json({
          msg: "No se encontro el producto a remover", error
      })
  }

  res.status(200).json({
      msg: "Producto removido correctamente"
  })
}