const auth = require('./../controllers/auth')

module.exports = function(app) {
  app.route('/login')
    .post(auth.login)
  app.route('/register')
    .post(auth.registerUser)
}