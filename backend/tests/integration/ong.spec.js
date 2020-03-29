const app = require('../../src/app');

const request = require('supertest');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach(async ()=> {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterEach(async ()=>{
        await connection.destroy();
    });

    it('should be albe to create a new ONG', async ()=>{
        const response = await request(app).
        post('/ongs').
        send({
            name: "APAE",
            email: "contato@teste.com",
            whatsapp: "9899988956",
            city: "Sao Luis",
            uf: "MA"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});