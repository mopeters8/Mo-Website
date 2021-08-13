
const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = DiscordUser.findById(id);
    if (user)
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'guilds', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try { 
        const user = await DiscordUser.findOne({ discordId: profile.id });
        if (user) { //User exiists
            console.log("User exists: "+user.id);
            done(null, user); //Going to serialize user in to the request.
        } 
        else { //If user doesn't exist.
            console.log("User does not exist. Creating user...")
            const newUser = await DiscordUser.create({ //create user
                discordId: profile.id,
                discordUsername: profile.username,
                discordEmail: profile.email
            });
            const savedUser = await newUser.save();
            done(null, savedUser); //Going to serialize user in to the request.
        }
    }
    catch(err) {
        console.log(err);
        done(err, null);
    }
}));