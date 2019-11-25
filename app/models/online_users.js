const onlineUsers = new Map()

const MAXTIMEOUT = 1000 * 60 * 10

const setUserAsOnline = id => {
  onlineUsers.set(id, Date.now())
}

const isBeforeTimeOut = time => {
  return (Date.now() - time) < MAXTIMEOUT
}

const userIsOnline = id => {
  const _onlineUsers = getOnlineUsers()
  return _onlineUsers.includes(id)
}

const getOnlineUsers = () => {
  onlineUsers.forEach((value, key) => {
    if(!isBeforeTimeOut(value)) {
      onlineUsers.delete(key)
    }
  })
  return [...onlineUsers.keys()]
}

module.exports = {
  setUserAsOnline,
  userIsOnline,
  getOnlineUsers,
  onlineUsers
}