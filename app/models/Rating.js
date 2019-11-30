const db = require('./db')
const jwt = require('jsonwebtoken')
// const { secretKey } = require('./../config')

class Rating {
  static addRate(rate, callback) { 
      const { idProduto, idUsuario, nota, comentario } = rate

      db.query("INSERT INTO Avaliacao (pk_idProduto, pk_idUsuario, nota, comentario) VALUES (?, ?, ?, ?)", 
      [idProduto, idUsuario, nota, comentario], (err,res) => callback(err,res))
  }

  static removeRate(idRate, callback){
    db.query("DELETE FROM Avaliacao WHERE Avaliacao.idAvaliacao = ?", [idRate], (err,res) => callback(err,res))
  }

  static getAllRates(options = {}, callback){
    let query = "SELECT pk_idProduto, nota, comentario FROM Avaliacao "

    if(options.join) query += options.join
    if(options.where) query += options.where
    query += ';'

    db.query(query, (err,res) => callback(err,res))
  }
}

module.exports = Rating