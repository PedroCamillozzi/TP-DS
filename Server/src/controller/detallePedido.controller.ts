import { Request, Response } from "express";
import { DetallePedido } from "../model/DetallePedido.model";
import { Producto } from "../model/producto.model";
import { Pedido } from "../model/pedido.model";

export const getDetallePedidosCliente = async (req:Request, res:Response)=>{
    const {idPedido} = req.params

    try{
      const pedidos = await DetallePedido.findAll({where:{idPedido:idPedido}});
  
      if(!pedidos){
          res.status(404).json({
              msg: "No se han encontrado los detalles de los pedidos"
          })
          return
      }
  
      res.status(200).json(pedidos)
  
    }catch(err){
      res.status(500).json({
          msg:"Error del servidor"
      })
    }

}

export const postDetallePedido = async (req:Request, res:Response) =>{
  const {idPedido, idProducto, cantidad} = req.body;

  try{
    const pedido:any = await Pedido.findOne({where:{idPedido:idPedido}});

    if(!pedido){
      res.status(400).json({
        msg:"No existe el pedido"
      })
      return
    }

    const producto:any = await Producto.findOne({where:{idProducto:idProducto}});
    if(!producto){
      res.status(400).json({
        msg:"No existe el producto"
      })
      return
    }

    
    await DetallePedido.create({
      idPedido: pedido.idPedido,
      idProducto: producto.idProducto,
      cantidad: cantidad
    })

    await Producto.update(
    {
      stock: producto.stock - cantidad
    },
    {
      where: {idProducto: idProducto}
    })
    
    res.status(200).json({
      msg:"Ok"
    })

  }catch(err){
    res.status(500).json({
      msg: "Ocurrió un error", err
    })
  }
}