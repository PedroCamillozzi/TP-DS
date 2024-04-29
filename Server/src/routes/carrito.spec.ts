import testServer  from '../../utils/testServer'
import {expect, jest} from '@jest/globals'
import app from '../routes/carrito.routes'



describe("[ routes / carrito ]", () => {

    const carritoControllerMock = {
        getProductosCliente: jest.fn(() => ["producto1",'producto2']),
        patchProductoCliente: jest.fn(),
        patchAgregarCantidadProductosCliente: jest.fn(),
        deleteProductoCliente: jest.fn(),
        deleteAllProductoCliente: jest.fn(),
    };
    
    jest.mock('../controller/Carrito.controller', () => ({
        getProductosCliente: carritoControllerMock.getProductosCliente,
        patchProductoCliente: carritoControllerMock.patchProductoCliente,
        patchAgregarCantidadProductosCliente: carritoControllerMock.patchAgregarCantidadProductosCliente,
        deleteProductoCliente: carritoControllerMock.deleteProductoCliente,
        deleteAllProductoCliente: carritoControllerMock.deleteAllProductoCliente,
    }));

    it("should return a response with status 200", async () =>{
        const idCliente = '20'
        const expected:any = 200

        const response = await testServer(app).get('/carrito/'+idCliente);

        const result = response.status

        expect(result).toEqual(expected)
    })

    it("should return all client carrito products", async () =>{
        const idCliente = '1';
        const expected = ['producto1', 'producto2']

        const {body : result } = await testServer(app).get('carrito/'+idCliente);

        expect(carritoControllerMock.getProductosCliente).toHaveBeenCalledWith({ params: { idCliente } });
        expect(result).toEqual(expected)
    })  
})