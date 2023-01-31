import db from '../../config/database.js'
import bcrypt from 'bcryptjs';

const users = db.data.users
const salt = bcrypt.genSaltSync(10);

const login = async (req, res) => {
  const { username, password } = req.body
  const existingUser = users.find(u => u.username === username)
  if (!existingUser) {
    res.sendStatus(401)
    return
  }
  const passwordIsValid = bcrypt.compareSync(password, existingUser.password);
  if (passwordIsValid) {
    console.log(`2. logging in user ${username} with password ${password} ${existingUser.password}`)
    await db.write();
    res.status(200).json({ status: 'success' });
  } else {
    res.sendStatus(401)
  }
}

const register = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username)
  const passwordHash = bcrypt.hashSync(password, salt);
  let user = {
    id: users.length + 1,
    username,
    password: passwordHash
  }
  if (!existingUser) {
    console.log(`3. registering user ${user.username} with password ${user.password}`)
    users.push(user);
    await db.write();
    res.status(201).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failed', message: 'Username already taken' });
  }
}

export default { login, register }
