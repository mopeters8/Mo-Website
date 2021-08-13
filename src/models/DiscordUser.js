const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId: {type: String, required: true},
    discordUsername: {type: String, required: true},
    discordEmail: {type: String, required: true}
});

const DiscordUser = module.exports = mongoose.model('User', UserSchema);