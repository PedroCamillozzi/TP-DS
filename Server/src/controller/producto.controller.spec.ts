import express from "express";
import supertest from "supertest";
import request from 'supertest'
import routerProductos from "../routes/productos.routes";
import { expect, jest } from "@jest/globals";
import { Producto } from "../model/producto.model";
import { PrecioProducto } from "../model/precioProducto.model";


const app = express();
app.use(express.urlencoded({extended:false}));
app.use('/productos', routerProductos);
supertest(app);



describe('Test Carrito routes', ()=>{
    beforeEach(() => {
        jest.clearAllMocks()
        jest.resetAllMocks()
    })
    it('should return status 200 from the getProductos', async ()=>{

        const response = await request(app)
        .get('/productos/all')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idProducto: expect.any(Number),
                    nombreProducto: expect.any(String),
                    descripcion: expect.any(String),
                    detallesGenerales: expect.any(String),
                    stock: expect.any(Number)
                })
                
            ])
        )
    })

    it('should return status 404 from the getProductos', async ()=>{
        jest.spyOn(Producto, 'findAll').mockResolvedValue([]);

        const response = await request(app)
        .get('/productos/all')
        .expect('Content-Type', /json/)
        .expect(404);

        expect(response.body).toEqual({msg:'No hay productos agregados'})
    })

    it('should return status 500 from the getProductos', async ()=>{
        jest.spyOn(Producto, 'findAll').mockImplementation(() => {
            throw new Error('Simulated error');
        });
    
        const response = await request(app)
            .get('/productos/all')
            .expect('Content-Type', /json/)
            .expect(500);
    
        expect(response.body).toEqual({ msg: 'Error en el servidor' });
    })

    it('should return status 200 from getProducto', async ()=>{
        const idProducto = '1'
        const response = await request(app)
        .get('/productos/' + idProducto)
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                idProducto: expect.any(Number),
                nombreProducto: expect.any(String),
                descripcion: expect.any(String),
                detallesGenerales: expect.any(String),
                stock: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        )
    })

    it('should return status 404 from the getProducto', async ()=>{
        const idProducto = '1'

        jest.spyOn(Producto, 'findOne').mockResolvedValue(null);

        const response = await request(app)
        .get('/productos/'+idProducto)
        .expect('Content-Type', /json/)
        .expect(404);

        expect(response.body).toEqual({msg:'No se ha encontrado el producto'})
    })

    it('should return status 500 from the getProducto', async ()=>{
        const idProducto = '1'

        jest.spyOn(Producto, 'findOne').mockImplementation(() => {
            throw new Error('Simulated error');
        });
    
        const response = await request(app)
            .get('/productos/'+idProducto)
            .expect('Content-Type', /json/)
            .expect(500);
    
        expect(response.body).toEqual({ msg: 'Error en el servidor' });
    })

    it('should return status 200 from the postProducto', async ()=>{
        const dataMockProducto = {
            nombreProducto: 'funciona',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10',
            precio: 1000,
            idProducto: 1
        }

        const dataMockPrecioProducto = {
            idProducto: 1,
            fechaDesde: new Date('11-05-2024 15:54:36'),
            precio: '1000'
        }

        const spyProducto = jest.spyOn(Producto, 'create').mockResolvedValue(dataMockProducto)
        const spyPrecioProducto = jest.spyOn(PrecioProducto, 'create').mockResolvedValue(dataMockPrecioProducto)

        const response = await request(app)
        .post('/productos/')
        .type("form")
        .send(dataMockProducto)

        expect(response.status).toBe(200)

        

        expect(spyProducto).toHaveBeenCalledWith({
        nombreProducto: 'funciona',
        descripcion: 'todo',
        detallesGenerales: 'bien',
        stock: '10'});

        expect(spyPrecioProducto).toHaveBeenCalledWith({
            ...dataMockPrecioProducto,
            fechaDesde: expect.any(Date)    
            });
    })

    it('should return status 500 if the creation of product throw error', async () => {
        jest.spyOn(Producto, 'findOne').mockImplementation(() => {
            throw new Error('Simulated error');
        });


        const response = await request(app)
            .post('/productos/')
            .send({});

        expect(response.status).toBe(500);

        expect(response.body.msg).toBe("Ocurrió un error");
    });

    it("should return status 200 putProducto without PrecioProducto", async ()=>{

        const dataMockProducto:any = {
            idProducto: 1,
            nombreProducto: 'funciona',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10',
            precio: 1000,
            fechaDesde: new Date()
        }

        const producto:any = {
            idProducto: 1,
            nombreProducto: 'funciona',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10'
        }


        const spyProductoFindOne = jest.spyOn(Producto, 'findOne').mockResolvedValueOnce(dataMockProducto.idProducto);
        
        const spyPrecioProductoFechaMax = jest.spyOn(PrecioProducto, 'max').mockResolvedValueOnce(null);

        //const spyPrecioProductoFindOne = jest.spyOn(PrecioProducto, 'findOne').mockResolvedValueOnce(null);

        //const spyProductoUpdate = jest.spyOn(Producto, 'update').mockResolvedValueOnce(producto);

        const spyPrecioProductoCreate = jest.spyOn(PrecioProducto, 'create')

        const response = await request(app)
        .put('/productos/put')
        .send(dataMockProducto)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({msg: "Producto Actualizado"})

        expect(spyProductoFindOne).toHaveBeenCalled()
        expect(spyPrecioProductoFechaMax).toHaveBeenCalled()
        //expect(spyPrecioProductoFindOne).toHaveBeenCalled()
        //expect(spyProductoUpdate).toHaveBeenCalled()
        expect(spyPrecioProductoCreate).not.toHaveBeenCalled()
        

    })

    it("should return status 200 putProducto with PrecioProducto", async ()=>{
        const dataMockProducto:any = {
            idProducto: 1,
            nombreProducto: 'funciona',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10',
            precio: 1000,
            fechaDesde: new Date()
        }

        const dataMockPrecioProducto: any = {
            idProducto: 1,
            fechaDesde: new Date('11-05-2024 15:54:36'),
            precio: 1200
        }

        
        const producto:any = {
            idProducto: 1,
            nombreProducto: 'funciona',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10'
        }



        const spyProductoFindOne = jest.spyOn(Producto, 'findOne').mockResolvedValueOnce(dataMockProducto.idProducto);
        
        const spyPrecioProductoFechaMax = jest.spyOn(PrecioProducto, 'max').mockResolvedValueOnce(dataMockPrecioProducto.idProducto);

        const spyPrecioProductoFindOne = jest.spyOn(PrecioProducto, 'findOne').mockResolvedValueOnce(dataMockPrecioProducto);

        const spyPrecioProductoCreate = jest.spyOn(PrecioProducto, 'create').mockResolvedValue(null)

        const response = await request(app)
        .put('/productos/put')
        .send(dataMockProducto)

        expect(spyProductoFindOne).toHaveBeenCalled()
        expect(spyPrecioProductoFechaMax).toHaveBeenCalled()
        expect(spyPrecioProductoFindOne).toHaveBeenCalled()
       /* expect(spyPrecioProductoCreate).toHaveBeenCalledWith({
            idProducto: producto.idProducto,
            fechaDesde: dataMockPrecioProducto.fechaDesde,
            precio: dataMockPrecioProducto.precio
        })*/

        expect(response.status).toBe(200)
        //expect(response.body).toEqual({msg: "Precio y Producto Actualizado"})


    })

    it("should return status 400 non-exists product putProducto", async ()=>{
        const dataMockProducto:any = {
            idProducto: 1,
            nombreProducto: 'funciona',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10',
            precio: 1000,
            fechaDesde: new Date()
        }

        const spyProdcutoFindOne = jest.spyOn(Producto, 'findOne').mockResolvedValueOnce(null)

        const response = await request(app)
        .put('/productos/put')
        .send(dataMockProducto)

        expect(spyProdcutoFindOne).toHaveBeenCalled()
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({msg:"No existe el producto"})

    })

    it("should return status 500 error putProducto", async ()=>{
        const dataMockProducto:any = {
            idProducto: 1,
            nombreProducto: 'funciona',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10',
            precio: 1000,
            fechaDesde: new Date()
        }

        const spyProdcutoFindOne = jest.spyOn(Producto, 'findOne').mockImplementation(() => {
            throw new Error('Simulated error');
        });

        const response = await request(app)
        .put('/productos/put')
        .send(dataMockProducto)

        expect(spyProdcutoFindOne).toHaveBeenCalled()
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual({msg:"Ocurrió un error",error: {} })
    })

    it("should return status 200 deleteProductoCliente", async ()=>{

        const producto:any = {
            idProducto: 1,
            nombreProducto: 'productoExistente',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10'
        }

        const spyProdcutoFindOne = jest.spyOn(Producto, 'findOne').mockResolvedValueOnce(producto.idProducto)
        const spyProdcutoDestroy = jest.spyOn(Producto, 'destroy').mockResolvedValueOnce(1)

        const response = await request(app)
        .delete('/productos/'+producto.idProducto)

        expect(spyProdcutoFindOne).toHaveBeenCalled();
        expect(spyProdcutoDestroy).toHaveBeenCalled();

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({msg:"Producto removido"})
    })

    it("should return status 400 non-existent product deleteProductoCliente", async ()=>{

        const producto:any = {
            idProducto: 1,
            nombreProducto: 'productoExistente',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10'
        }

        const spyProdcutoFindOne = jest.spyOn(Producto, 'findOne').mockResolvedValueOnce(null)

        const response = await request(app)
        .delete('/productos/'+producto.idProducto)

        expect(spyProdcutoFindOne).toHaveBeenCalled();

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({msg:"No se puedo encontrar en producto"})
    })

    it("should return status 500 error deleteProductoCliente", async ()=>{
        const producto:any = {
            idProducto: 1,
            nombreProducto: 'productoExistente',
            descripcion: 'todo',
            detallesGenerales: 'bien',
            stock: '10'
        }

        jest.spyOn(Producto, 'findOne').mockImplementation(() => {
            throw new Error('Simulated error');
        });

        const response = await request(app)
        .delete('/productos/'+producto.idProducto)

        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual({msg:"Ocurrió un error"})
    })

})