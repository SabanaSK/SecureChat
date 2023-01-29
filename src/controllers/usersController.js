import authConfig from '../../config/database.js'

const login = ((req, res) => {
  const { name, password } = req.body

  if (authenticateUser(name, password)) {
    res.sendStatus(200)

  } else {
    res.sendStatus(401)
    return
  }
})

function authenticateUser(username, password) {
  if (authConfig.data) {
    const found = authConfig.data.find(user => user.name === username && user.password === password)

    return Boolean(found)
  }

  return false
}



export default login;