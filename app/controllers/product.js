const Product = require('./../models/Product')
const { userIsOnline } = require('./../models/online_users')  

async function addProduct(req, res) {
  const {categorias: _categorias, usuario: _usuario, nome, preco, descricao} = req.body
  const usuario = parseInt(_usuario)
  const categorias = JSON.parse(_categorias)
  
  if(!(usuario && nome && preco && descricao && req.file)) {
  
    if(!nome) res.send({status: 'Qual é nome desse produto?'})
    else if(!preco) res.send({status: 'Precisamos saber quanto custa.'})
    else if(!descricao) res.send({status: 'Precisamos de uma descrição para o seu produto'})
    else if(!req.file) res.send({status: 'De um gostinho com uma imagem!'})

  } else if(res.locals.id !== usuario) {
    res.send({status: 'usuario invalido'})
  } else {
    const imagem = req.file.filename
    const produto = {nome, preco, descricao, usuario, categorias, imagem}
    Product.addProduct(produto, (err, results) => {
      if(err) res.send({status: 'error'})
      else res.send({status: 'sucesso'})
    })
  }
}

async function getMostPopularProducts(req, res) {
  Product.getAllProducts({
    order: 'ORDER BY avaliacaoMedia DESC'
  }, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(productFormat(results, { ignoreOnline: true }))
  })
}

async function productsByOnlineSellers(req, res) {
  Product.getAllProducts({}, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(productFormat(results, { onlyOnline: true }))    
  })
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

async function findProductsByCategoryId(req, res) {
  const { categoryId } = req.params
  Product.getAllProducts({ where: ' WHERE CatProd.fk_idCategoria = ' + categoryId }, (err, results) => {
    if(err) {} //console.log(err)
    else res.send(productFormat(results))
  })
}

async function findProductsByVendedorId(req, res) {
  const { idVendedor } = req.params
  Product.getAllProducts({ where: ' WHERE Produto.fk_idUsuario = ' + idVendedor }, (err, results) => {
    if(err) console.log(err)
    else res.send(productFormat(results))
  })
}

async function searchProduct(req, res) {
  const { searchQuery } = req.params
  if(!searchProduct) res.send({status: 'error'})
  const searchQueryDecoded = decodeURI(searchQuery)
  Product.getAllProducts({ where: ` WHERE Produto.nome LIKE "%${searchQueryDecoded}%" OR Usuarios.nome LIKE "%${searchQueryDecoded}%" ` }, (err, results) => {
    if(err) console.log(err)
    else res.send(productFormat(results))
  })
}

async function deleteProductById(req, res) {
  const { idProduto } = req.params

  Product.getProductbyId(idProduto, (err, results) => {
    if(err) console.log(err)
    else {
      if(results.length < 1) {
        res.send({status: 'Produto inválido'})
      } else {
        const produto = results[0]
        const { fk_idUsuario } = produto
        
        if(fk_idUsuario === res.locals.id) {
          Product.deleteProductById(idProduto, (req, results) => {
            if(err) res.send({status: 'erro'})
            else res.send({status: "sucesso"})
          })
        } else res.send('Usuário sem permissão')
      }
    }
  })

}

async function getAllCategories(req, res) {
  Product.getAllCategories((err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

function productFormat(_produtos, options={}) {
  const vendedores = new Map()
  
  const _produtosFormatados = _produtos.reduce((map, _produto) =>{
    let vendedor = undefined
    if(options.vendedor) vendedor = {...options.vendedor}
    else if(vendedores.has(_produto.idVendedor)) {
      vendedor = vendedores.get(_produto.idVendedor)
    } else {
      const online = userIsOnline(_produto.idVendedor)
      vendedor = {id: _produto.idVendedor, nome: _produto.nomeVendedor, online, foto: _produto.fotoVendedor, telefone: _produto.telefone}
      vendedores.set(_produto.idVendedor, vendedor)
    }

    const idProduto = _produto.idProduto
    let produto = map.get(idProduto)

    if(!produto) {
      produto = {
        idProduto: _produto.idProduto, 
        nome: _produto.nome, 
        preco: _produto.preco, 
        descricao: _produto.descricao,
        imagem: _produto.imagem,
        vendedor: vendedor,
        categorias: [],
        avaliacaoMedia: _produto.avaliacaoMedia, 
      }
      map.set(idProduto, produto)
    }

    const { idCategoria, nomeCategoria } = _produto
    const { categorias } = produto

    if(idCategoria && nomeCategoria) {
      categorias.push({
        idCategoria,
        nomeCategoria
      })
    }
    return map
  }, new Map())

  let produtosFormatados = Array.from(_produtosFormatados.values())
  if (options.onlyOnline) {
    produtosFormatados = produtosFormatados.filter(produto => produto.vendedor.online)
  } else if(!options.ignoreOnline) {
    produtosFormatados.sort((a, b) => {
      if((a && b) && (a.vendedor && b.vendedor)) {
        const onlineA = a.vendedor.online
        const onlineB = b.vendedor.online

        if(onlineA && onlineB) return 0
        else if(onlineA && !onlineB) return -1
        else return 1
      }
      return 0
    })
  }
  return produtosFormatados
}

module.exports = {
  getAllProducts,
  getProductbyID,
  getAllCategories,
  addProduct,
  findProductsByCategoryId,
  findProductsByVendedorId,
  searchProduct,
  deleteProductById,
  productFormat,
  getMostPopularProducts,
  productsByOnlineSellers
}