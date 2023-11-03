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

  const pedido = await Pedido.findOne({where:{idPedido:idPedido}});

  if(pedido){
    const producto = await Producto.findOne({where:{idProducto:idProducto}});
    if(producto){

      DetallePedido.create({
        idPedido: pedido.idPedido,
        idProducto: producto.idProducto,
        cantidad: cantidad
      })

    }
  }
}