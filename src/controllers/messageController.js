import db from "../../config/database.js";

const getMessages = ((req, res) => {
  const messages = db.data.messages;
  res.status(200).send({ messages: messages })
})

export default getMessages;