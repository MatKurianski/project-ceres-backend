const Product = require('./../models/Product')
const { userIsOnline } = require('./../models/online_users')

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
  Product.getAllProducts({}, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send( productFormat(results) )
  })
}

async function getProductbyID(req, res, id) {
  const option = { where: `WHERE Produto.id = ${id}` }

  Product.getAllProducts(option, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send( productFormat(results) )
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
  Product.getAllProducts({ where: ' INNER JOIN CatProd ON Produto.idProduto = CatProd.fk_idProduto WHERE CatProd.fk_idCategoria =' + categoryId }, (err, results) => {
    if(err) console.log(err)
    else res.send(productFormat(results))
  })
}

async function getAllCategories(req, res) {
  Product.getAllCategories((err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

function productFormat(produtos) {
  const vendedores = new Map()
  const produtosFormatados = produtos.map(_produto =>{
    let vendedor = undefined
    if(vendedores.has(_produto.idVendedor)) {
      vendedor = vendedores.get(_produto.idVendedor)
    } else {
      const online = userIsOnline(_produto.idVendedor)
      vendedor = {id: _produto.idVendedor, nome: _produto.nomeVendedor, online}
      vendedores.set(_produto.idVendedor, vendedor)
    }
    const produto = {
      idProduto: _produto.idProduto, 
      nome: _produto.nome, 
      preco: _produto.preco, 
      descricao: _produto.desc,
      imagem: _produto.imagem,
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