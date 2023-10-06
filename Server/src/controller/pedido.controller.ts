import { Request, Response } from "express";
import { Pedido } from "../model/pedido.model";

export const getPedidosCliente = async (req:Request, res:Response) =>{
    const {idCliente} = req.params

  try{
    const pedidos = await Pedido.findAll({where:{idCliente:idCliente}});

    if(!pedidos){
        res.status(404).json({
            msg: "No se han encontrado los pedidos"
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
