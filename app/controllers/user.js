const User = require('./../models/User')
const { productFormat } = require('./../controllers/product')
const { userIsOnline } = require('./../models/online_users')

async function getAllUsers(req, res) {
  User.getAllUsers((err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

async function getUserInfoById(req, res) {
  const { idVendedor } = req.params
  User.getUserbyID(idVendedor, (err, result) => {
    if(err || result.length === 0) {
      res.send({status: 'Usuário não encontrado'})
    } else {
      const { id, nomeVendedor, email, foto, notaVendedor, telefone } = result[0]
      const vendedor = {
        id,
        nome: nomeVendedor,
        email,
        foto,
        telefone,
        notaVendedor
      }
      vendedor.online = userIsOnline(vendedor.id)
      const produtos = productFormat(result, { vendedor })
      if(produtos[0].idProduto !== null) vendedor.produtos = produtos
      else vendedor.produtos = []
      res.send(vendedor)
    }
  })
}

async function me(req, res) {
  User.getUserbyID(res.locals.id, (err, result) => {
    if(err || result.length == 0) res.status(404).send('user not found')
    else {
      res.status(200).send(result)
    }
  })
}

module.exports = {
  getAllUsers,
  me,
  getUserInfoById
}