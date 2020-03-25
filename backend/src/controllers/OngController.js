const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  
 /*
 * estabelece a primeira ROTA padrão usando GET, '/', primeiro parâmetro é a raiz, segundo
 * é uma função que contém a depencendia express
 */
    //lista as ONGs
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    //insere novas ONGs
    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
    
        return response.json({ id });
    }
};