const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');


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

        const id = generateUniqueId();
    
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