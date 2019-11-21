const user = require('./user')
const auth = require('./auth')
const product = require('./product')


module.exports = function(app) {
  user(app)
  product(app)
  auth(app)
}