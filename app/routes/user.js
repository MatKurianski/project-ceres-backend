const User = require('./../controllers/user')
const auth = require('./../controllers/auth')

module.exports = function(app) {
  app.route('/users')
    .get(auth.protectRoute, User.getAllUsers)
  app.route('/users/me')
    .get(auth.protectRoute, User.me)
}

// get - pega - pegar produtos
// post - envia dados - login, registrar
// put - atualiza - modificar algum produto
// delete - remove - deletar