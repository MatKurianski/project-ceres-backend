const auth = require('./../controllers/auth')
const multer = require('multer')

var storage = multer.diskStorage(
  {
      destination: 'uploads/vendedores',
      filename: function ( req, file, cb ) {
          cb( null, Date.now()+'.jpg');
      }
  }
)

const upload = multer({storage})

module.exports = function(app) {
  app.route('/login')
    .post(auth.login)
  app.route('/register')
    .post(upload.single('foto'), auth.registerUser)
}