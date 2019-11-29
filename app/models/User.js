const db = require('./db')
const jwt = require('jsonwebtoken')
const { secretKey } = require('./../config')

class User {
  static addUser(user, callback) {
    const {nome, email, foto, senhaCriptografada, telefone} = user
    db.query("INSERT INTO Usuarios(nome, email, senha, foto, telefone) values (?, ?, ?, ?, ?)", [nome, email, senhaCriptografada, foto, telefone], (err, results) => {
      console.log(results.insertId)
      callback(err, results)
    })
  }

  static getAllUsers(callback) {
    db.query("SELECT * FROM Usuarios", (err, res) => callback(err, res))
  }

  static getUserbyID(id, callback) {
    db.query("SELECT id, nome, foto, fk_idLocal FROM Usuarios WHERE id = ? limit 1", [id], (err, res) => callback(err, res))
  }

  static findUserByEmail(email, callback) {
    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, res) => callback(err, res))
  }

  static genUserAuthToken(id) {
    return jwt.sign({id}, secretKey)
  }

  static checkUserAuthToken(token) {
    return jwt.checkUserAuthToken(token, secretKey)
  }
}

module.exports = User