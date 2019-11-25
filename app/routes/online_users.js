const onlineController = require('./../controllers/online_users')
const { protectRoute } = require('./../controllers/auth')

module.exports = function(app) {
  app.route('/online')
    .get(onlineController.getOnlineUsers)
    .post(protectRoute, onlineController.setUserAsOnline)
}