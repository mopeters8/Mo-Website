const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    username: { type: String, required: true },
    useravatar: { type: String, required: false},
    email: { type: String, required: false },
    guilds: { type: Array, required: false }
});

const DiscordUser = module.exports = mongoose.model('User', UserSchema);