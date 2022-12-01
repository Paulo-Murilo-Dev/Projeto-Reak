const Sequelize = require('sequelize');
// etec
const sequelize = new Sequelize("reak","root","wasd", {
    host: 'localhost',
    dialect: 'mysql',
});


sequelize.authenticate()
.then(function(){
    console.log("Banco conectado");
}).catch(function(){
    console.log("Não conectou ao banco de dados");
})



module.exports = sequelize