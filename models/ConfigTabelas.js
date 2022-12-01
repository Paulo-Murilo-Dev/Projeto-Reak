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
        allowNull: false,
    }, 
    destruida: {
        type: Sequelize.STRING,
        allowNull: false,
    },  
});

//Coloque aqui quais tabelas quer configurar
async function Configurar(){
console.log("\nConfigurando tabelas...\n")

await mensagem.sync()


console.log("\n✔ Todas as tabelas foram configuradas!");

}

Configurar() //ativação da fução principal!





