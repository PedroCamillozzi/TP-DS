import { Request, Response } from "express";
import { Pedido } from "../model/pedido.model";
import { Cliente } from "../model/cliente.model";

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

export const postPedidoCliente = async (req:Request, res:Response) =>{
  const {idCliente} = req.body;

  const cliente = await Cliente.findOne({where: {idCliente:idCliente}});

  if(cliente){
    try{
      const fechaEntrega = new Date();
      fechaEntrega.setDate(fechaEntrega.getDate() + 27);
      
      const pedido = await Pedido.create({
      fechaPedido: Date.now(),
      fechaEntrega: fechaEntrega,
      estado: "En preparacion",
      idCliente: cliente.idCliente

      })
      res.status(200).json(pedido);
    }catch(err){
      res.status(500).json({
        msg:"Error en el servidor"
      })
    }
    }
}
