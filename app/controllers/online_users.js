const model = require('./../models/online_users')

const setUserAsOnline = (req, res) => {
  const userId = res.locals.id
  model.setUserAsOnline(userId)
  res.send({status: "sucesso"})
}

const getOnlineUsers = (req, res) => {
  res.send(model.getOnlineUsers())
}

module.exports = {
  setUserAsOnline,
  getOnlineUsers
}