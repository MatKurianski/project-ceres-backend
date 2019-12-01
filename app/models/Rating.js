const db = require('./db')
const jwt = require('jsonwebtoken')
// const { secretKey } = require('./../config')

class Rating {
  static addRate(rate, callback) { 
      const { productId, idUsuario, nota, comentario } = rate
      db.query("INSERT INTO Avaliacao (pk_idProduto, pk_idUsuario, nota, comentario) VALUES (?, ?, ?, ?)", 
      [productId, idUsuario, nota, comentario], (err,res) => callback(err,res))
  }

  static removeRate(idRate, idUsuario, callback){
    db.query("DELETE FROM Avaliacao WHERE Avaliacao.pk_idProduto = ? AND Avaliacao.pk_idUsuario = ?", [idRate, idUsuario], (err,res) => callback(err,res))
  }

  static getAllRates(options = {}, callback){
    let query = "SELECT pk_idUsuario, pk_idProduto, nota, comentario FROM Avaliacao "

    if(options.join) query += options.join
    if(options.where) query += options.where
    query += ';'

    db.query(query, (err,res) => callback(err,res))
  }
}

module.exports = Rating