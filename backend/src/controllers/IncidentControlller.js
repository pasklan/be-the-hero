const connection = require('../database/connection');

//responsável por inserir novos dados na tabela Incident
module.exports = {
    async create(request, respose){
        const { title, description, value } = request.body;
        request.headers;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return respose.json({ id });
    }
};
