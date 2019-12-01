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
    db.query(`SELECT Usuarios.id as id, Usuarios.nome as nomeVendedor, Usuarios.email, Usuarios.foto, Usuarios.telefone, 
        (
          SELECT AVG(nota) from Avaliacao
            INNER JOIN Produto ON Produto.idProduto = Avaliacao.pk_idProduto
                    INNER JOIN Usuarios ON Produto.fk_idUsuario = Usuarios.id
                    WHERE Usuarios.id = ${id}
        ) as notaVendedor,
        Produto.idProduto, Produto.nome, Produto.preco, Produto.descricao, Produto.imagem,
            Categoria.idCategoria, Categoria.nomecategoria as nomeCategoria
            FROM Usuarios
        LEFT JOIN Produto ON Produto.fk_idUsuario = Usuarios.id
            LEFT JOIN CatProd ON fk_idProduto = Produto.idProduto
            LEFT JOIN Categoria ON CatProd.fk_idCategoria = Categoria.idCategoria
    WHERE id = ${id} ORDER BY Produto.idProduto DESC;`, (err, res) => callback(err, res))
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