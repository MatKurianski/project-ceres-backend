const db = require('./db')
const jwt = require('jsonwebtoken')
const { secretKey } = require('./../config')

class Product {
  static addProduct(product, callback) {
    const {categorias, usuario, nome, imagem, preco, descricao} = product
    db.query("INSERT INTO Produto (fk_idUsuario, nome, preco, imagem, descricao) values(?, ?, ?, ?, ?)", 
	    [usuario, nome, preco, imagem, descricao], 
	
	    (err, results) => {
        if(err) {
          console.log(err)
          return
        }
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

  static getProductbyID(id, callback) {
    db.query("SELECT * FROM Produto WHERE id = ? limit 1", [id], (err, res) => callback(err, res))
  }

  static findProductByCategory(category, callback) {
    db.query("SELECT * FROM Produto INNER JOIN CatProd ON Produto.idProduto = CatProd.fk_idProduto" + 
            " WHERE CatProd.fk_idCategoria = ?", [category], (err, res) => callback(err, res))
  }

  static getProductsByCategoryId(categoryId, callback) {
    try {
      return  db.query("select * from Produto INNER JOIN CatProd on CatProd.fk_idCategoria = ? and CatProd.fk_idProduto = Produto.idProduto;", [categoryId], (err, res => callback(err, res)))
    }
    catch(e){}
  }

  static getAllCategories(callback){
    db.query("SELECT * FROM Categoria", (err, res) => callback(err, res))
  }

  static getAllProducts(options={}, callback){
    let query = "SELECT Produto.idProduto, Produto.nome, Produto.preco, Produto.descricao, Produto.imagem, Usuarios.nome as nomeVendedor, Usuarios.id as idVendedor, Usuarios.foto as fotoVendedor, CatProd.fk_idCategoria as idCategoria, Categoria.nomeCategoria " +
                " FROM Produto" +
                " INNER JOIN Usuarios ON Usuarios.id = Produto.fk_idUsuario " +
                " LEFT JOIN CatProd ON CatProd.fk_idProduto = Produto.idProduto  " +
                " LEFT JOIN Categoria ON Categoria.idCategoria = CatProd.fk_idCategoria "

    if(options.where) query += options.where
    query += ' ORDER BY Produto.idProduto DESC;'
  
    db.query(query, (err, res) => callback(err, res))
  }
  static genUserAuthToken(id) {
    return jwt.sign({id}, secretKey)
  }

  static checkUserAuthToken(token) {
    return jwt.checkUserAuthToken(token, secretKey)
  }
}

module.exports = Product