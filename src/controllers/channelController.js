import db from '../../config/database.js';

const getChannels = ((req, res) => {
    const channels = db.data.channels;
    res.status(200).send({ channels: channels })
})

export default getChannels;
