import db from '../../config/database.js'

const users = db.data.users

const login = ((req, res) => {
  const { username, password } = req.body
  if (authenticateUser(username, password)) {
    res.status(200).json({ status: 'success' });
  } else {
    res.sendStatus(401)
    return
  }
})

/* From frontend: REGISTER TO db.data.users */
const register = ((req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    res.status(400).json({ status: 'failed', message: 'Username already taken' });
  } else {
    users.push({ username, password });
    res.status(201).json({ status: 'success' });
  }


})

function authenticateUser(username, password) {
  console.log(`authenticating user ${username} with password ${password}`)
  if (db.data) {
    const found = users.find(user => user.username === username && user.password === password)
    return Boolean(found)
  }
  return false
}

export default { login, register }
