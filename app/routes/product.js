const Product = require('./../controllers/product')
const auth = require('./../controllers/auth')
const multer = require('multer')

var storage = multer.diskStorage(
  {
      destination: 'uploads/produtos',
      filename: function ( req, file, cb ) {
          cb( null, Date.now()+'.jpg');
      }
  }
)

const upload = multer({storage})

module.exports = function(app) {
  app.route('/products')
    .get(Product.getAllProducts)
  app.route('/category?')
    .get(Product.findProductByCategory)
    
  app.route('/product?')
    .get(Product.getProductbyID)

  app.route('/new_product')
    .post(auth.protectRoute, upload.single('imagem'), Product.addProduct)

  app.route('/categories')
    .get(Product.getAllCategories)
}