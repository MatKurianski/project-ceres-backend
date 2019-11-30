const user = require('./user')
const auth = require('./auth')
const product = require('./product')
const online = require('./online_users')
const rating = require('./rating')

module.exports = function(app) {
  user(app)
  product(app)
  auth(app),
  online(app)
  rating(app)
}