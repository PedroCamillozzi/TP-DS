import { Request, Response } from "express";
import { Cliente } from "../model/cliente.model";
import { Producto } from "../model/producto.model";
import { ListaCarritoProducto } from "../model/lista.carrito.producto";

export const getProductosCliente = async (req:Request, res:Response)=>{
    const {idCliente, nroCarrito} = req.params;

    const listaCarritoCliente = await ListaCarritoProducto.findAll({where:{idCliente:idCliente} && {nroCarrito:nroCarrito}});

    if(!listaCarritoCliente){
        res.status(400).json({
            msg:"No se pudo obtener la lista del carrito"
        })
    }

    res.json({
        listaCarritoCliente
    })


}

export const postProductoCliente = async (req: Request, res:Response) =>{
    const {idCliente, idProducto, cantidad} = req.params;

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

    if(producto.stock <= 0 || cantidad > producto.stock){
        res.status(400).json({
            msg:"No hay stock disponible por el momento"
        })
        return
    }

    try{
        await  ListaCarritoProducto.create({
            idProducto: producto.idProducto,
            nroCarrito: 1,
            idCliente: cliente.idCliente,
            cantidad: cantidad
    
        })
    } catch(error){
        res.status(400).json({
            msg:"Ocurrio un error al sumar el producto al carrito",
            error
        })
    }
    res.status(200).json({
        msg: "Producto agregado al carrito satisfactoriamente"
    })
}

export const deleteProductoCliente = async (req:Request, res:Response)=>{
    const {idCliente, nroCarrito, idProducto} = req.params;

    const productoAremover = await ListaCarritoProducto.findOne({where:{idCliente:idCliente} && {nroCarrito:nroCarrito} && {idProducto:idProducto}});

    if(!productoAremover){
        res.status(400).json({
            msg:"No se pudo obtener la lista del carrito"
        })
    }

    try{
        await ListaCarritoProducto.destroy({
            where: {idCliente: productoAremover.idCliente} && {nroCarrito:productoAremover.nroCarrito} && {idProducto: productoAremover.idProducto}
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