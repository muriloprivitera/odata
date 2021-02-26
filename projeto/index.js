const express = require ('express')
const app = express()
const handlesbars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')


//config
   //Template engine
   app.engine('handlebars',handlesbars({defaultLayout: 'main'}))
    app.set('view engine','handlebars')
    //body parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
//rotas
app.get('/', function(req,res){
    Post.findAll().then(function(posts){
        let array = [];
        for (const postagem of posts) {
            array.push({ titulo: postagem.titulo, conteudo: postagem.conteudo });
        }
        res.render('home', { posts: array });
    })   
})

app.get('/comunidade',function(req,res){
    res.render('formulario')
})
app.post('/confirmacao',function(req,res){  
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
       res.redirect('/')
    }).catch(function(erro){
        res.send('Houve um erro;'+erro)
    })
  
})


app.listen(8080,function(){
    console.log('servidor rodando na url http:localhost:8080')
})