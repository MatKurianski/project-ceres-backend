const onlineUsers = new Map()

const MAXTIMEOUT = 1000 * 60 * 10

const setUserAsOnline = id => {
  onlineUsers.set(id, Date.now())
  console.log(onlineUsers)
}

const isBeforeTimeOut = time => {
  return (Date.now() - time) < MAXTIMEOUT
}

const userIsOnline = id => {
  const userTimeOut = onlineUsers.get(id)
  if(userTimeOut) return isBeforeTimeOut(userIsOnline)
  return false
}

const getOnlineUsers = () => {
  onlineUsers.forEach((value, key) => {
    if(!isBeforeTimeOut(value)) {
      onlineUsers.delete(key)
      console.log('vish')
    }
  })
  return [...onlineUsers.keys()]
}

module.exports = {
  setUserAsOnline,
  userIsOnline,
  getOnlineUsers
}