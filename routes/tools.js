const express = require("express")
const router = express.Router()

router.get('/composto',(req,res) =>{
    res.render("tools/composto")
})
router.get('/simples', (req,res)=>{
    res.render("tools/simples")
})
router.get('/cartao', (req,res)=>{
    res.render("tools/cartao")
})
router.get('/desconto', (req,res)=>{
    res.render("tools/desconto")
})
router.get('/porcentagem2', (req,res)=>{
    res.render("tools/porcentagem2")
})
router.get('/hora', (req,res)=>{
    res.render("tools/hora")
})
router.get('/inss', (req,res)=>{
    res.render("tools/inss")
})
router.get('/lucro', (req,res)=>{
    res.render("tools/lucro")
})
router.get('/regra', (req,res)=>{
    res.render("tools/regra3")
})
router.get('/porcentagem1', (req,res)=>{
    res.render("tools/porcentagem1")
})
router.get('/mensagem', (req,res)=>{
    res.render("tools/mensagem")
})
router.get('/moedas', (req,res)=>{
    res.render("tools/moedas")
})
router.get('/cnpj', (req,res)=>{
    res.render("tools/cnpj")
})
router.get('/cnpjShow', (req,res)=>{
    res.render("tools/cnpjShow")
})


module.exports = router