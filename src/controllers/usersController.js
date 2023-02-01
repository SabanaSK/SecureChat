import db from '../../config/database.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const users = db.data.users
const salt = bcrypt.genSaltSync(10);



function createToken(username) {
  const payload = { username: username }
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
  payload.token = token
  console.log('createToken', payload)
  return payload
}

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
    const user = createToken(username)
    await db.write();
    res.status(200).json({ status: 'success', user, token: user.token });
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

/* const secret = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, process.env.JWT_KEY)

  if (payload) {
    res.status(200).json({ status: 'success', message: 'You have access to the secret' });
  } else {
    res.status(401).json({ status: 'failed', message: 'You are not authorized to access the secret' });
  }

}

 */

export default { login, register/* , secret */ }
