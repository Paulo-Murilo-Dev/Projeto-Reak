const Sequelize = require('sequelize');
const sequelize = require('./db');
const db = require('./db');



const post = db.sequelize.define('users', {

    email:{
        type: db.sequelize.STRING        
    },
    
    pwd:{
        type: db.sequelize.STRING        
    },

})

//Post.sync({force: true})
