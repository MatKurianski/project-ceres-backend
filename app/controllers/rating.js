const Rating = require('./../models/Rating')

async function addRate(req, res) {
  const { idProduto, idUsuario, nota, comentario } = req.body
  
  if(!nota) {
    res.send({status: 'De uma nota para esse produto!'})
  } else if(res.locals.id !== idProduto) {
    res.send({status: 'Produto invalido'})
  } else {
    const avaliacao = {idProduto, idUsuario, nota, comentario}
    Rating.addRate(avaliacao, (err, results) => {
      if(err) res.send({status: 'error'})
      else res.send({status: 'sucesso'})
    })
  }
}

async function removeRate(req,res) {
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

async function getRatebyID(req, res, id) {
  const option = { where: `WHERE Avaliacao.id = ${id}` }

  Rating.getAllRates(option, (err, results) => {
    if(err) res.send({status: 'error'})
    else res.send( results )
  })
}

async function getRatesByProduct(req, res, id){
  const options = {
    join: `INNER JOIN Produto ON Produto.idProduto = ${id}`
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