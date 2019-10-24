const User = require('./../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { secretKey } = require('./../config')

async function login(req, res) {
  const { email, senha: senhaRecebida } = req.body
  User.findUserByEmail(email, (err, results) => {
    if(err || results.length === 0 || !senhaRecebida) {
      res.status(400).send({status: 'error'})
      console.log(err)
      return;
    }
    const user = results[0]
    const {id, senha: _SenhaArmazenadaCriptografada} = user
    const SenhaArmazenadaCriptografada =  _SenhaArmazenadaCriptografada.toString()
    if(bcrypt.compareSync(senhaRecebida, SenhaArmazenadaCriptografada)) {
      const token = User.genUserAuthToken(id)
      res.status(200).send({
        status: "sucesso",
        token
      })
    } else {
      res.status(404).send({
        status: "erro",
        mensagem: "Senhas não coincidem"
      })
    }
  })
}

function protectRoute(req, res, next) {
  const token = req.headers['token']
  if(!token) {
    res.status(404).send('Not logged')
    return;
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    userId = decodedToken.id
    if(err) {
      res.status(404).send('Invalid token')
    } else {
      User.getUserbyID(userId, (err, results) => {
        if(err) {
          res.status(404).send('Invalid user')
        } else {
          const { id, email } = results
          req.id = id
          req.email = email
        }
      })
      next()
    }
  })
}

module.exports = {
  login,
  protectRoute
}