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
    const user = createToken(username)
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

/* const sendErrorResponse = (res, message) => {
  res.status(401).json({ status: 'failed', message });
}; */

const autoLogin = (req, res) => {
  const token = req.headers['token'];
  console.log(`usercontroller AutoLogin:`, token)
  if (token !== 'null') {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      res.status(200).json({ status: 'success', username: decoded.username, token })
    } catch (error) {
      console.log('Catch! Invalid token!! ', error.message);
      res.status(401).json({ status: 'failed', message: 'Invalid token' });
    }
  } else {
    console.log('No token');
    /*  sendErrorResponse(res, 'Invalid token'); */
  }
};

const verifyToken = (req, res) => {
  const token = req.headers['token'];
  if (token) {
    try {
      jwt.verify(token, JWT_KEY);
    } catch (error) {
      console.log('Catch! Invalid token!!');
      sendErrorResponse(res, 'Invalid token');
    }
  } else {
    console.log('No token');
    sendErrorResponse(res, 'Invalid token');
  }
};


/* const secret = async (req, res) => {
  res.status(200).json({ status: 'success', message: 'You have access to the secret', user: req.user });
}; */

export default { login, register/* , secret */, verifyToken, autoLogin }
