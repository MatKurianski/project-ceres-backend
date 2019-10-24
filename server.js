const express = require('express');
const routes = require('./app/routes/index')

const PORT = 8080;

const app = express();

app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(express.urlencoded({ extended: true }))

routes(app) // define as rotas

app.listen(PORT);
console.log(`Executando servidor do Comidinhas EACH na porta `+PORT);