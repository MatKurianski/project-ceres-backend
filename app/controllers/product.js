const Product = require('./../models/Product')

async function addProduct(req, res) {
  const {categorias, usuario, nome, preco, descricao} = req.body
  if(!(usuario && nome && preco && descricao)) {
    res.send({status: 'faltando informações'})
  } else if(res.locals.id !== usuario) {
    req.send({status: 'usuario invalido'})
  } else {
    const produto = {nome, preco, descricao, usuario, categorias}
    Product.addProduct(produto, (err, results) => {
      if(err) res.send({status: 'error'})
      else res.send({status: 'sucesso'})
    })
  }
}

async function getAllProducts(req, res) {
  Product.getAllProducts((err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

async function getProductbyID(req, res, id) {
  Product.getProductbyID(id, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

async function findProductByCategory(req, res, category) {
  Product.findProductByCategory(category, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

async function getAllCategories(req, res) {
  Product.getAllCategories((err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

module.exports = {
  getAllProducts,
  getProductbyID,
  findProductByCategory,
  getAllCategories,
  addProduct
}