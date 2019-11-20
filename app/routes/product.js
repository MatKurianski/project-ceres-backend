const Product = require('./../controllers/product')
const auth = require('./../controllers/auth')

module.exports = function(app) {
  app.route('/products')
    .get(auth.protectRoute, Product.getAllProducts)
  app.route('/category?')
    .get(auth.protectRoute, Product.findProductByCategory)
    
  app.route('/product?')
    .get(auth.protectRoute, Product.getProductbyID)

  app.route('/new_product')
    .get(auth.protectRoute, Product.addProduct)
}