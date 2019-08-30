const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');


const app = express();

// Configurando views engine EJS
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Configurando arquivos estaticos
app.use(express.static('./app/public'));

// Configurando body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Efetua o auto load das rotas, models e controllers para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)



// Exporta o objeto app
module.exports = app;