const Rating = require('./../models/Rating')

async function addRate(req, res) {
  const { nota, comentario } = req.body
  const idUsuario = res.locals.id
  const { productId } = req.params
  
  if(!nota) {
    res.send({status: 'De uma nota para esse produto!'})
  } else {
    const avaliacao = {productId, idUsuario, nota, comentario}
    Rating.addRate(avaliacao, (err, results) => {
      if(err) {
        res.send({status: 'error'})
        console.log(err)
      }
      else res.send({status: 'sucesso'})
    })
  }
}

async function removeRate(req, res) {
    const { idProduto } = req.params
    const idUsuario = res.locals.id
    Rating.removeRate(idProduto, idUsuario, (err, results)=>{
        if(err) res.send({status: 'error'})
        else res.send({status: 'sucesso'})    
    })
}

async function getAllRates(req, res) {
  Rating.getAllRates({}, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send( results )
  })
}

async function getUserRate(req, res) {
  const { productId } = req.params
  const idUsuario = res.locals.id

  const option = {
    where: `WHERE Avaliacao.pk_idProduto = ${productId} AND Avaliacao.pk_idUsuario = ${idUsuario}`
  }
  Rating.getAllRates(option, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

async function getRatesByProduct(req, res){
  const { productId } = req.params
  const options = {
    where: `WHERE pk_idProduto = ${productId}`
  }
  
  Rating.getAllRates(options, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send( results )
  })
}

module.exports = {
  addRate,
  removeRate,
  getAllRates,
  getRatesByProduct,
  getUserRate
}