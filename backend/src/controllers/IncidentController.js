const connection = require('../database/connection');

//responsável por inserir novos dados na tabela Incident
module.exports = {
    //lista os incidentes
    async index(request, response){
        const { page = 1 } = request.query;

        //retorna o total de cadastros
        const [count] = await connection('incidents').count();
        
        //Retorna sempre 5 resultados por vez
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
            'incidents.*', 
             'ongs.name', 
             'ongs.email', 
             'ongs.whatsapp', 
             'ongs.city',
             'ongs.uf']);

            response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    

    //insere novos incidentes
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
    },
    //apaga incidents
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        //verifica se o id da ONG passado é o mesmo que o que está salvo no banco
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted!'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
};
