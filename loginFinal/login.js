//declaração das constantes para utilização das dependencias necessarias;
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
//constante recebe todas as funções da dependencia express;
const app = express();
//todos arquivos estáticos devem constar na pasta public
app.use(express.static('public'));
//armazena os dados da conexao
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root99',
    database: 'controle_estoque'
});
//conexão com o bd
connection.connect(function(err){
    if(err) {
        console.error("Erro", err);
        return;
    }
    console.log("Conexão estabelecida!")
});

//capturar os dados do formulario html
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

//rota index
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
});

//rota esqueci
app.get('/esqueci', function(req, res){
    res.sendFile(__dirname+'/html/esqueci.html')
});

//rota redefinir
app.get('/redefinir', function(req, res){
    res.sendFile(__dirname+'/html/redefinir.html')
});

//rota sistema
app.get('/sistema', function(req, res){
    res.sendFile(__dirname+'/html/sistema.html')
});

//rota excluir
app.get('/excluir', function(req, res){
    res.sendFile(__dirname+'/html/excluir.html')
});

//rota listar
app.get('/listar', function(req, res){
    res.sendFile(__dirname+'/html/listar.html')
});

//rota cadastrar
app.get('/cadastrar', function(req, res){
    res.sendFile(__dirname+'/html/cadastrar.html')
});

//rota login
app.post('/login', function(req, res){
    const login = req.body.login;
    const senha = req.body.senha;

    connection.query('SELECT * FROM usuario WHERE email=? and senha=?',[login, senha], function(error, results, fields){
        if(error){
            console.error('Erro ao executar a consulta ', error);
            res.status(500).send('Erro interno ao verificar credenciais');
            return;
        }
        if(results.length > 0){
            res.redirect('/html/sistema.html');
         } else {
             res.status(401).send('Credenciais inválidas');
         }
    });
});


//configuracao da aplicacao rodando no localhost, ouvindo a porta 8008
app.listen(8008, function(){
    console.log('Servidor rodando na url http://localhost:8008');
});


