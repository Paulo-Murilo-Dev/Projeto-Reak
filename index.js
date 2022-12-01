const express = require('express');
const app = express();
const porta = 3000;
const handlebars = require("express-handlebars");
const bodyparse = require('body-parser')
const tools = require("./routes/tools");
const path = require('path');
const favicon = require('serve-favicon');
const mensagemModel = require('./models/mensagemModel');
const axios = require("axios")
//config
    //body parser
    app.use(bodyparse.urlencoded({extended: false}))
    app.use(bodyparse.json())
    //template engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //public
    app.use(express.static(path.join(__dirname,"public")))
    app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
    //rotas
    app.use('/tools', tools)

    app.get('/', function(req,res){
        res.render('home')
    })


  
   //rotas da ferramenta de mensagens

   //rota de criação de mensagem
   app.post('/mensagemCriar', async (req,res)=>{  
    let checkbox = req.body.checkbox
    let token = req.body.token
    let mensagem = req.body.mensagem

    let retorno = await mensagemModel.findAll({
        where: {
            token: token
        }
    });  
    
    if (JSON.stringify(retorno, null) == '[]'){
        if(req.body.checkbox == undefined){checkbox = 0}
        if(req.body.checkbox == 1){checkbox = 3}
        console.log("Não existe essa mensagem, criando...")
        mensagemModel.create({
            token: token,
            mensagem: mensagem,
            destruida: checkbox
        })
        var msg = []
        msg.push(({msg: "Token criado!"}))
        res.render("tools/mensagem", {msg: msg})
    }
    else{
        var error = []
        error.push(({error: "Esse código já está sendo usado!"}))
        res.render("tools/mensagem", {error: error})
    }}
 )  

  //rota de descriptografia de mensagem
  
  app.post('/mensagemLer', async function(req,res){
    let token = req.body.token


    var retorno = await mensagemModel.findAll({
            where: {
                token: token
            }
        });  
        
   if (JSON.stringify(retorno, null) == '[]'){

    var errorD = []
        errorD.push(({errorD: "Esse código Não existe"}))
        res.render("tools/mensagem", {errorD: errorD})
   }
   else{          
        if(retorno[0].destruida == 3){
            let mensagem = []
            mensagem.push(({mensagem: retorno[0].mensagem}))

            let destruida = []
            destruida.push(({destruida: "Essa mensagem foi destruida!"}))
            res.render("tools/mensagem",{destruida: destruida, mensagem: mensagem})

            mensagemModel.update({
            destruida: 1                
            },
            {
                where: {
                    token: token
                }
            })

        }
        if(retorno[0].destruida == 1){
            let destruida = []
            destruida.push(({destruida: "Essa mensagem já foi destruida!"}))
            res.render("tools/mensagem",{destruida: destruida})

        }
        if(retorno[0].destruida == 0){

        let mensagem = []
        mensagem.push(({mensagem: retorno[0].mensagem}))
        res.render("tools//mensagem",{mensagem: mensagem})               
    }}
     
    res.render('tools/mensagem')
    })

    //rota do conversor de moedas
    app.post('/moedasCotar', async function(req,res){
        var im1 = req.body.inputm1     

        var moeda1 = req.body.moeda1
        var moeda2 = req.body.moeda2
        var moedas = ""+moeda1+"_"+moeda2+""
        var flag = 1

        console.log("convertendo"+moeda1+"para"+moeda2)
        if(moeda1 == moeda2 || moeda1 == null || moeda2 == null || moeda1 == undefined || moeda2 == undefined){
            let error = []
            error.push(({error: "Error"}))
            res.render("tools/moedas",{error: error})
        }
        //var token = "1844|pUcLFovCQs1x5Ojmvl3KtUlBw70a5F5M"
        else{
         var url = "https://api.invertexto.com/v1/currency/"+moedas+"?token=1844|pUcLFovCQs1x5Ojmvl3KtUlBw70a5F5M"
         let api =  await axios.get(url).then(resp => {
            var datas = resp.data;
            return datas;
        }).catch(err => {
            
            flag+1
            let error = []
            error.push(({error: "Conversão impossível!"}))
            res.render("tools/moedas",{error: error})

        })
        if(flag == 1){
        var moedadft =  ""+moeda1+"_BRL"
        var url2 = "https://api.invertexto.com/v1/currency/"+moedadft+"?token=1844|pUcLFovCQs1x5Ojmvl3KtUlBw70a5F5M"

        if(moedadft != "BRL_BRL"){

         let api2 =  await axios.get(url2).then(resp => {
            var dft = resp.data;
            return dft
        }).catch(err => {
            let error = []
            error.push(({error: "Conversão impossível!"}))
            res.render("tools/moedas",{error: error})
        })
        var dft = api2[moedadft].price
         }
         
         else{dft = 1}
        
        var convertidoFinal = api[moedas].price 
        convertidoFinal = convertidoFinal * im1        
        convertidoFinal = convertidoFinal.toFixed(2)

        let convertido = []
        convertido.push(({
            convertido: convertidoFinal,
            dft: dft,
            moeda1: moeda1,
            moeda2: moeda2
        }))
        res.render("tools/moedas",{convertido: convertido})
        
        res.render('tools/moedas')
    }}})


    //rota da api de cnpj
    app.post('/ApiCnpj', async (req,res)=>{  
        var cnpj = req.body.cnpj;
        var url = "https://api.invertexto.com/v1/cnpj/"+cnpj+"?token=1927|OC5Ytav6h7XOhBPqoRCD0QwakENb6RD3"
         let api =  await axios.get(url).then(resp => {
            var datas = resp.data;
            return datas;

         }).catch((err) => {console.log("CNPJ invalido")})

         if(api!=undefined){
         await console.log(api)
        
         var emailF = api.email 
         var cnpjF = api.cnpj
         var telefoneF = api.telefone1
         var fantasiaF = api.nome_fantasia
         var razaoF = api.razao_social 
         var tipoF = api.tipo 
         var capitalF = api.capital_social 
         var dataF = api.data_inicio
         var descF = api.atividade_principal.descricao
    
         //bloco de endereços 
         var logradouroF = (""+api.endereco.tipo_logradouro+" "+api.endereco.logradouro+" "+api.endereco.numero+"-"+api.endereco.bairro)
         
        let convertido = []
        convertido.push(({
            cnpj: cnpjF,
            email: emailF,
            telefone: telefoneF,
            fantasia: fantasiaF,
            razao: razaoF,
            tipo: tipoF,
            capital: capitalF,
            data: dataF,
            logradouro: logradouroF,
            descricao: descF
        }))
        res.render("tools/cnpjShow",{
            convertido: convertido
        })
    }
    else{
        let error = []
        error.push({error: "Cnpj inválido"})
            res.render("tools/cnpj",{
                error: error
            })
        }
});
app.listen(porta || 3000, ()=>{console.log('Reak No Ar!!')})