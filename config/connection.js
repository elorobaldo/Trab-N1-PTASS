const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();


const sequelize = new Sequelize(config.development);

try {
  sequelize.authenticate();
  console.log('Deu certo');
} catch (error) {
  console.error('Erroo', error);
}

module.exports = { Sequelize, sequelize };
