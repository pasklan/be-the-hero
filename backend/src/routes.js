const express = require('express');
const {celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();
/**
 * Rotas da tabela Ongs, listar e inserir dados
 */
routes.get('/ongs', OngController.index);

/**
 * Validações dos dados usando celebrate()
 */
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),OngController.create);
/**
 * Rotas da tabela incidents, listar e inserir dados
 */
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}),IncidentController.index);

routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}),IncidentController.delete);
/**
 * Rota para exibir os incidents de uma única ONG
 */
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);
/**
 * Rota para verificar se a ONG existe
 */
routes.post('/session', SessionController.create);



/**
 * Exporta este arquivo para ser usado em outro
 */
 module.exports = routes;
 
