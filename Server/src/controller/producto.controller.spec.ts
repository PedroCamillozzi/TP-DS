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
        .get('/productos/'+idProducto)
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

    it('should retur status 200 from the postProducto', async ()=>{
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

    it('should return status 400 if the creation of product throw error', async () => {
        jest.spyOn(Producto, 'findOne').mockImplementation(() => {
            throw new Error('Simulated error');
        });


        const response = await request(app)
            .post('/productos/')
            .send({});

        expect(response.status).toBe(400);

        expect(response.body.msg).toBe("Ocurrió un error");
    });

})