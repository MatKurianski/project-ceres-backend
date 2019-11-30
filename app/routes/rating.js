const Rating = require('./../controllers/rating')
const auth = require('./../controllers/auth')

module.exports = function(app) {
  app.route('/products/rate/:productId/')
    .post(auth.protectRoute, Rating.addRate)
  app.route('/products/undo_rate/:rateId')
    .delete(auth.protectRoute, Rating.removeRate)
  app.route('/product/rate/:productId')
    .get(Rating.getRatesByProduct)
  app.route('/rate/:rateId')
    .get(Rating.getRatebyID)

}

// get - pega - pegar produtos
// post - envia dados - login, registrar
// put - atualiza - modificar algum produto
// delete - remove - deletar