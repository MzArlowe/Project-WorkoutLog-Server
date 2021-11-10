const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:2d2233dbb0e741cf9014e40264ac3f23@localhost:5432/workout-log-server");

module.exports = sequelize;