import { Request, Response } from "express";
import { DetallePedido } from "../model/DetallePedido.model";

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