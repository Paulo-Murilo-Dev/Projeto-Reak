const Sequelize = require('sequelize');
const sequelize = require('./db');
const db = require('./db');

const mensagem = db.define('mensagens', { 
    token: {
        type: Sequelize.STRING,
        allowNull: false,
    },  
    mensagem: {
        type: Sequelize.STRING,
        allowNull: true,
    },  
    destruida: {
        type: Sequelize.NUMBER,
        allowNull: true,
    },  
});
module.exports = mensagem;