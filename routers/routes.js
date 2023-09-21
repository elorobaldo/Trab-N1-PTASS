const express = require('express');
const routes = express.Router();

const userController = require('../controllers/userController');

//EndPoint: rota - extremidade de conexão dessa API 

routes.get('/users', userController.findUsers);
routes.delete('/user/:id', userController.deleteUser);
routes.put('/user/:id', userController.updateUser);
routes.post('/user/authenticated', userController.authenticatedUser);
routes.post('/user', userController.createUser);

module.exports = routes;
