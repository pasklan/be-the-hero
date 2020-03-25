/**
 * importa a dependencia 'express' para a constante express
 */
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

/**
 * cria uma variavel para armazenar a aplicação
 */
const app = express();

/**  Método HTTP
 * GET -> Buscar/listar uma informação do back-end
 *  POST -> Criar uma informação no back-end
 *  PUT -> Alterar uma informação no back-end
 *  DELETE -> Apagar uma informação no back-end
 * *********************************************
 * Tipos de parâmetro:
 * Query: parâmetros nomeados enviados na rota após o "?"
 *   geralmente server para filtros, paginação,etc
 * Route: parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição utilizado para criar ou
 *   alterar recursos
 * ************************************************************
 * SQL -> Bancos relacionais: MySQL, SQLite, PostgreSQL, Oracle, 
 * Microsoft SQL Server
 * 
 * No-SQL -> Não usa SQL: MongoDB, CouchDB, etc
 * 
 * Para comunicação da aplicação com o DB:
 * Driver: Usa SQL puro. Ex: SELECT * FROM users
 * Query Builder: Usa cód. JavaScript para executar as query.
 *   Ex: table('users').select('*').where()
 * */

app.use(cors());

 /**
 * "Diz" para o express usar o formato JSON
 */
app.use(express.json());
app.use(routes);
 
 /**
 * Estabelece que a porta 3333 será usada para um servidor da aplicação
 * é necessário usar node <index.js> para iniciar a aplicação
 */
app.listen(3333);
