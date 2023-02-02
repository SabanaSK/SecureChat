import db from "../../config/database.js";
const messages = db.data.messages;

const getMessages = ((req, res) => {
  res.status(200).send({ messages: messages })
})

export default getMessages;