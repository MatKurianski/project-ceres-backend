const user = require('./user')
const auth = require('./auth')

module.exports = function(app) {
  user(app)
  auth(app)
}