const User = require('./../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { saltRounds, secretKey } = require('./../config')

async function login(req, res) {
  const { email, senha: senhaRecebida } = req.body
  User.findUserByEmail(email, (err, results) => {
    if(err || results.length === 0 || !senhaRecebida) {
      res.send({
        status: 'error',
        mensagem: "Usuário não existe"
      })
      console.log(err)
      return;
    }
    const user = results[0]
    const {id, nome, email, foto, senha: _SenhaArmazenadaCriptografada} = user
    const SenhaArmazenadaCriptografada =  _SenhaArmazenadaCriptografada.toString()
    if(bcrypt.compareSync(senhaRecebida, SenhaArmazenadaCriptografada)) {
      const token = User.genUserAuthToken(id)
      res.status(200).send({
        status: "sucesso",
        id,
        nome,
        email,
        foto,
        token,
      })
    } else {
      res.send({
        status: "erro",
        mensagem: "Senha incorreta"
      })
    }
  })
}

async function registerUser(req, res) {
  const {nome, email, senha} = req.body
  const foto = req.file.filename

  const error = {status: 'error'}
  if (!nome || !email || !senha || !foto) {
    res.send(error)
    return;
  }
  const senhaCriptografada = bcrypt.hashSync(senha, saltRounds)
  User.addUser({nome, email, foto, senhaCriptografada}, (err, results) => {
    if(err) res.send(error)
    else res.send({status: "sucesso"})
  })
}

function protectRoute(req, res, next) {
  const token = req.headers['token']
  if(!token) {
    res.send('Not logged')
    return;
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if(err) {
      res.send('Invalid token')
    } else {
      userId = decodedToken.id
      User.getUserbyID(userId, (err, results) => {
        if(err || results.length == 0) {
          res.send('Invalid user')
        } else {
          const { id, email } = results[0]
          res.locals.id = id
          res.locals.email = email
          next()
        }
      })
    }
  })
}

module.exports = {
  login,
  registerUser,
  protectRoute
}