const db = require('./db')
const jwt = require('jsonwebtoken')
// const { secretKey } = require('./../config')

class Rating {
  static addRate(rate, callback) { 
      const { idProduto, nota, comentario } = rate

      db.query("INSERT INTO Avaliacao (fk_idProduto, nota, comentario) VALUES (?, ?, ?)", 
      [idProduto, nota, comentario], (err,res) => callback(err,res))
  }

  static removeRate(idRate, callback){
    db.query("DELETE FROM Avaliacao WHERE Avaliacao.idAvaliacao = ?", [idRate], (err,res) => callback(err,res))
  }

  static getAllRates(option, callback){
    let query = "SELECT * FROM Avaliacao"

    if(option.join) query += option.join
    if(option.where) query += option.where

    db.query(query, (err,res) => callback(err,res))
  }

}

module.exports = Rating