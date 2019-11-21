const db = require('./db')
const jwt = require('jsonwebtoken')
const { secretKey } = require('./../config')

class Product {
  static addProduct(product, callback) {
    const {categorias, usuario, nome, preco, descricao} = product
    db.query("INSERT INTO Produto (fk_idUsuario, nome, preco, descricao) values(?, ?, ?, ?)", 
	    [usuario, nome, preco, descricao], 
	
	    (err, results) => {
        console.log(err)
        if(Array.isArray(categorias)) {
          categorias.forEach(categoria => {
            db.query("INSERT INTO CatProd (fk_idProduto, fk_idCategoria) VALUES (?,?)", [results.insertId, categoria], (err, res) => {
              if(err) console.log(err)
            })
          }, (err, results) => callback(err, results))
        }
		    callback(err, results)
	    }
    )
  }

  static getAllProducts(callback) {
    db.query("SELECT * FROM Produto", (err, res) => callback(err, res))
  }

  static getProductbyID(id, callback) {
    db.query("SELECT * FROM Produto WHERE id = ? limit 1", [id], (err, res) => callback(err, res))
  }

  static findProductByCategory(category, callback) {
    db.query("SELECT * FROM Produto INNER JOIN CatProd ON Produto.idProduto = CatProd.fk_idProduto" + 
            " WHERE CatProd.fk_idCategoria = ?", [category], (err, res) => callback(err, res))
  }

  static getAllCategories(callback){
    db.query("SELECT * FROM Categoria", (err, res) => callback(err, res))
  }

  static genUserAuthToken(id) {
    return jwt.sign({id}, secretKey)
  }

  static checkUserAuthToken(token) {
    return jwt.checkUserAuthToken(token, secretKey)
  }
}

module.exports = Product