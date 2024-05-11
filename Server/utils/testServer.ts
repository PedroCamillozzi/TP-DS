import express from 'express'
import supertest from 'supertest'



function testServer() {
    const app = express();
    return supertest(app);
}

export default testServer;
