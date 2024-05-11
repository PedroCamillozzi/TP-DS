import routerCarrito from '../routes/carrito.routes'
import request from 'supertest'
import express, { response } from 'express'
import supertest from 'supertest';
import testServer from '../../utils/testServer';
import { expect } from '@jest/globals';

const app = express();
supertest(app);

app.use(express.urlencoded({extended:false}));
app.use('/carrito', routerCarrito);

//const request = testServer()


describe('Test Carrito routes', ()=>{
    /*it("routerCarrito route works", ()=>{
    
        request(app)
        .get('/'+idCliente)
        .expect("Content-Type", /json/)
        .expect(200)

        
    })*/

    /*it('should return a response with status 200', async ()=>{
        const expected = 200

        const {status: result} = await request.get('/carrito')

        expect(result).toEqual(expected)
    })*/

    it("routerCarrito route works", async ()=>{
        const idCliente = '20'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBjQGdtYWlsLmNvbSIsImlhdCI6MTcxNTMwNzY3N30.3ipt0DJxUFwChFbKIxeYyNRxBx5xVSXUGNbFxhnrtoI'

        const response = await supertest(app)
        .get('/carrito/'+idCliente)
        .set('authorization', `Bearer ${token}`)
        /*.expect(200)
        .expect('Content-Type', /json/)*/

        expect(response.header['authorization']).toBe(token)
        expect(response.status).toBe(200)
        expect(response.headers['content-tipe']).toMatch(/json/)
        

        
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idProducto: expect.any(Number),
                    idCliente: expect.any(Number),
                    cantidad: expect.any(Number)
                })
                
            ])
        )

        
    })
})
