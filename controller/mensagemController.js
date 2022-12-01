
const mensagens = require('../models/mensagemModel')



function tokenCreate(token) {
    var retorno = mensagem.findAll({
        where: {
            token: token
        }
    }).then( function (retorno) {
        while( retorno != undefined){
        return JSON.stringify(retorno, null, 2, 1)
    }
    } );;
    
    
 }

module.exports = {tokenCreate}