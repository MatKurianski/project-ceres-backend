const user = require('./user')
const auth = require('./auth')
const product = require('./product')
const online = require('./online_users')

module.exports = function(app) {
  user(app)
  product(app)
  auth(app),
  online(app)
}