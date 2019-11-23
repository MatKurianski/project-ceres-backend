const Product = require('./../models/Product')

async function addProduct(req, res) {
  const {categorias: _categorias, usuario: _usuario, nome, preco, descricao} = req.body
  const usuario = parseInt(_usuario)
  const imagem = req.file.filename
  const categorias = JSON.parse(_categorias)
  
  if(!(usuario && nome && preco && descricao && imagem)) {
    res.send({status: 'faltando informações'})
  } else if(res.locals.id !== usuario) {
    res.send({status: 'usuario invalido'})
  } else {
    const produto = {nome, preco, descricao, usuario, categorias, imagem}
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

async function findProductsByCategoryId(req, res) {
  const { categoryId } = req.query
  Product.findProductByCategory(categoryId, (err, results) => {
    if(err) console.log(err)
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
  addProduct,
  findProductsByCategoryId
}