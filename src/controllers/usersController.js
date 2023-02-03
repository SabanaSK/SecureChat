import db from '../../config/database.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const salt = bcrypt.genSaltSync(10);
const users = db.data.users

function createToken(username) {
  const payload = { username: username }
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
  payload.token = token
  console.log('createToken', payload)
  return payload
}

const getUsers = (req, res) => {
  console.log('getUsers', users)
  res.status(200).send({ users: users });
};


const login = async (req, res) => {
  const { username, password } = req.body
  const existingUser = users.find(u => u.username === username)
  if (!existingUser) {
    res.sendStatus(401)
    return
  }
  const passwordIsValid = bcrypt.compareSync(password, existingUser.password);
  if (passwordIsValid) {
    const user = createToken(username)
    console.log('userid:', existingUser.userId)
    res.status(200).json({ status: 'success', user, token: user.token, userId: existingUser.userId });
  } else {
    res.sendStatus(401)
  }
}

const register = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username)
  const passwordHash = bcrypt.hashSync(password, salt);
  let user = {
    userId: users.length + 1,
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


const autoLogin = (req, res) => {
  const token = req.headers['token'];
  console.log(`usercontroller AutoLogin:`, token)
  if (token !== 'null') {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      res.status(200).json({ status: 'success', username: decoded.username, token })
    } catch (error) {
      console.log('Catch! Invalid token', error.message);
      res.status(401).json({ status: 'failed', message: 'Invalid token' });
    }
  } else {
    console.log('No token  (No User is logged in) Token:', token);
  }

};

const verifyToken = (req, res) => {
  const token = req.headers['token'];
  if (token) {
    try {
      jwt.verify(token, JWT_KEY);
    } catch (error) {
      console.log('Catch! Invalid token!!');
      ;
    }
  } else {
    console.log('No token');
    ;
  }
};


export default { getUsers, login, register, verifyToken, autoLogin }
