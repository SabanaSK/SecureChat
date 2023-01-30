import db from '../../config/database.js'

const login = ((req, res) => {
  const { username, password } = req.body
  if (authenticateUser(username, password)) {
    res.status(200).json({ status: 'success' });
  } else {
    res.sendStatus(401)
    return
  }
})

function authenticateUser(username, password) {
  console.log(`authenticating user ${username} with password ${password}`)
  if (db.data) {
    const users = db.data.users
    const found = users.find(user => user.username === username && user.password === password)
    return Boolean(found)
  }
  return false
}

export default login;
