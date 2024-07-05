import { Request, Response } from "express";
import { Pedido } from "../model/pedido.model";
import { Cliente } from "../model/cliente.model";
import { DetallePedido } from "../model/DetallePedido.model";
import { Producto } from "../model/producto.model";
import { PrecioProducto } from "../model/precioProducto.model";

export const getPedidosCliente = async (req:Request, res:Response) =>{
    const {idCliente} = req.params

  try{
  const pedidosCompletos = await Pedido.findAll({
    where: {
      idCliente: idCliente
    },
    include: [{
      model: DetallePedido,
      as: 'dp',
      required: true,
      include: [{
        model: Producto,
        as: 'pro',
        required: true,
        include: [{
          model: PrecioProducto,
          as: 'precios',
          required: true
        }]
      }]
    }],
    order: [
      ['fechaPedido', 'DESC']
    ]
  });

    if(!pedidosCompletos){
        res.status(404).json({
            msg: "No se han encontrado los pedidos"
        })
        return
    }

    res.status(200).json(pedidosCompletos)

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

export const getPedidos = async (req:Request, res: Response) =>{
  /*Cuando sean demasiados pedidos usar un LIMIT*/
  const pedidosCompletos = await Pedido.findAll({
    include: {
      model: DetallePedido,
      as: 'dp',
      required: true,
      include: [{
        model: Producto,
        as: 'pro',
        required: true,
        include: [{
          model: PrecioProducto,
          as: 'precios',
          required: true
        }]
      }]
    },
    order: [
      ['fechaPedido', 'DESC']
    ]
  });

  if(!pedidosCompletos){
    res.status(400).json({
      msg:"No se encontraron pedidos"
    });
    return;
  }

  return res.status(200).json(pedidosCompletos);
  

}
