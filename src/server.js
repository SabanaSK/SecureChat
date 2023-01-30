import express from 'express';
import bodyParser from 'body-parser';
import * as url from 'url';
import * as dotenv from 'dotenv';
import usersRoutes from './routes/users.js';
import channelsRoutes from './routes/channels.js';
// import messagesRoutes from './routes/messages.js';


const app = express();
dotenv.config();
const PORT = process.env.PORT;
const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))

const logger = (req, res, next) => {
  console.log(`${req.method}  ${req.url}`, req.body)
  next()
}

app.use(express.json())
app.use(logger)
app.use(bodyParser.json())
app.use('/api/users', usersRoutes)
/* app.use(cors()); */
// app.use('/api/messages', messagesRoutes);
app.use('/api/channels', channelsRoutes);
app.use(express.static(staticPath))
/* app.post('/login', (req, res) => {
  const { name, password } = req.body

}) */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app