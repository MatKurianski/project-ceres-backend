const Product = require('./../models/Product')

async function getAllUsers(req, res) {
  User.getAllUsers((err, results) => {
    if(err) res.send({status: 'error'})
    else res.send(results)
  })
}

async function me(req, res) {
  User.getUserbyID(res.locals.id, (err, result) => {
    if(err || result.length == 0) res.status(404).send('user not found')
    else {
      res.status(200).send(result)
    }
  })
}

module.exports = {
  getAllUsers,
  me
}