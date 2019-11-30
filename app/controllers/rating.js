const Rating = require('./../models/Rating')

async function addRate(req, res) {
  const { idProduto, nota, comentario } = req.body
  const idUsuario = res.locals.id
  
  if(!nota) {
    res.send({status: 'De uma nota para esse produto!'})
  } else {
    const avaliacao = {idProduto, idUsuario, nota, comentario}
    Rating.addRate(avaliacao, (err, results) => {
      if(err) res.send({status: 'error'})
      else res.send({status: 'sucesso'})
    })
  }
}

async function removeRate(req, res) {
    const { idAvaliacao } = req.body
    Rating.removeRate(idAvaliacao, (err, results)=>{
        if(err) res.send({status: 'error'})
        else res.send( productFormat(results))    
    })
}

async function getAllRates(req, res) {
  Rating.getAllRates({}, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send( results )
  })
}

async function getRatebyID(req, res) {
  const { rateId } = req.params
  const option = { where: `WHERE Avaliacao.idAvaliacao = ${rateId}` }

  Rating.getAllRates(option, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send( results )
  })
}

async function getRatesByProduct(req, res){
  const { productId } = req.params
  const options = {
    join: `INNER JOIN Produto ON Produto.idProduto = ${productId}`
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
  getRatebyID,
  getRatesByProduct

}