const express = require('express');
const routes = require('./app/routes/index')
const path = require('path')
const PORT = 3000;

const app = express();

app.use('/uploads', express.static(path.join(__dirname,'uploads')))

app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(express.urlencoded({ extended: true }))

routes(app) // define as rotas

app.listen(PORT);
console.log(`Executando servidor do Comidinhas EACH na porta `+PORT);
