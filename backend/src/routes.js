const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();
/**
 * Rotas da tabela Ongs, listar e inserir dados
 */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
/**
 * Rotas da tabela incidents, listar e inserir dados
 */
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);
/**
 * Rota para exibir os incidents de uma única ONG
 */
routes.get('/profile', ProfileController.index);
/**
 * Rota para verificar se a ONG existe
 */
routes.post('/session', SessionController.create);



/**
 * Exporta este arquivo para ser usado em outro
 */
 module.exports = routes;
 
