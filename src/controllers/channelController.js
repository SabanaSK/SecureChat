import db from '../../config/database.js';

const channels = db.data.channels
const getChannels = ((req, res) => {
    const channels = db.data.channels;
    res.status(200).send({ channels: channels })
})

const createChannel = async (req, res) => {
    const { channelName, privacy } = req.body;
    if (!channelName) {
        return res.status(400).json({ success: false, error: 'Please provide a channel name' });
    }

    try {
        const newChannel = {
            channelId: channels.length + 1,
            channelName: channelName,
            privacy: privacy,
        };
        channels.push(newChannel);
        await db.write();

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'An error occurred while creating the channel' });
    }
};




export default { getChannels, createChannel };
