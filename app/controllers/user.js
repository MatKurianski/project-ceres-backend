const User = require('./../models/User')
const bcrypt = require('bcrypt')
const {saltRounds} = require('./../config')

async function getAllUsers(req, res) {
  User.getAllUsers((err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

async function addUser(req, res) {
  const {nome, email, senha} = req.body
  const error = {status: 'error'}
  if (!nome || !email || !senha) {
    res.send(error)
    return;
  }
  const senhaCriptografada = bcrypt.hashSync(senha, saltRounds)
  User.addUser({nome, email, senhaCriptografada}, (err, results) => {
    if(err) res.send(error)
    else res.send({status: "sucesso"})
  })
}

async function me(req, res) {
  console.log('boa')
}

module.exports = {
  getAllUsers,
  addUser,
  me
}