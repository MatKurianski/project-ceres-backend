const Product = require('./../models/Product')

async function addProduct(req, res, product) {
  Product.addProduct(product, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
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


module.exports = {
  getAllProducts,
  getProductbyID,
  findProductByCategory,
  addProduct
}