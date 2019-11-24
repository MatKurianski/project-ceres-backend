const Product = require('./../models/Product')

async function addProduct(req, res) {
  const {categorias: _categorias, usuario: _usuario, nome, preco, descricao} = req.body
  const usuario = parseInt(_usuario)
  const imagem = req.file.filename
  const categorias = JSON.parse(_categorias)
  
  if(!(usuario && nome && preco && descricao && imagem)) {
  
    if(!nome) res.send({status: 'Qual é nome desse produto?'})
    if(!preco) res.send({status: 'Precisamos saber quanto custa.'})
    if(!descricao) res.send({status: 'Precisamos de uma descrição para o seu produto'})
    if(!imagem) res.send({status: 'De um gostinho com uma imagem!'})

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
  Product.getAllProducts(async (err, results) => {
    if(err) res.send({status: 'error'})
    else {
      const produtosFormatados = await productFormat(results)
      res.send(produtosFormatados)
    }
  })
}

async function getProductbyID(req, res, id) {
  const option = { where: `WHERE Produto.id = ${id}` }

  Product.getAllProducts(option, async (err, results) => {
    if(err) res.send({status: 'error'})
    else {
      const produtosFormatados = await productFormat(results)
      res.send(produtosFormatados)
    }
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

async function productFormat(produtos){
  const produtosFormatados = produtos.map(_produto =>{
    const vendedor = {id: _produto.idVendedor, nome: _produto.nomeVendedor} 
    
    const produto = {
      id: _produto.idProduto, 
      nome: _produto.nome, 
      preco: _produto.preco, 
      descricao: _produto.desc, 
      vendedor: vendedor
    }

    return produto
  })
  return produtosFormatados
}



module.exports = {
  getAllProducts,
  getProductbyID,
  findProductByCategory,
  getAllCategories,
  addProduct,
  findProductsByCategoryId
}