import db from '../../config/database.js'
import bcrypt from 'bcryptjs';

const users = db.data.users
const salt = bcrypt.genSaltSync(10);

const login = ((req, res) => {
  const { username, password } = req.body
  const existingUser = users.find(u => u.username === username)
  const passwordIsValid = bcrypt.compareSync(password, existingUser.password);
  if (!existingUser) {
    res.sendStatus(401)
    return
  }

  if (passwordIsValid) {
    console.log(`2. logging in user ${username} with password ${password} ${existingUser.password}`)
    res.status(200).json({ status: 'success' });
  } else {
    res.sendStatus(401)
  }
})

const register = ((req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username)
  const passwordHash = bcrypt.hashSync(password, salt);
  let user = { username, password: passwordHash }
  if (!existingUser) {
    console.log(`3. registering user ${username} with password ${password}`)
    users.push(user);
    console.log(`users: ${users}`)
    console.log(`4. registering user ${username} with password ${password}`)
    res.status(201).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failed', message: 'Username already taken' });
  }
})


export default { login, register }
