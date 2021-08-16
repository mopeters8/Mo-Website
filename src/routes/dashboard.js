const router = require('express').Router();

function isAuthorized(req, res, next) {
    if (req.user) {
        console.log("User is authorized.");
        next();
    } 
    else {
        console.log("User is not logged in.");
        res.redirect('/')
    }
}

router.get('/', isAuthorized, (req, res) => { //NOT /DASHBOARD BECAUSE WE ALREADY REGISTERED / DASHBOARD.
    var avatar;
    if(req.user.useravatar == null) {
        console.log("Warning: No Profile Picture for User, " + req.user.username);
        avatar = "https://imgur.com/DeIq43J.png";
    } else {
        avatar = "https://cdn.discordapp.com/avatars/"+req.user.discordId+"/"+req.user.useravatar+".png";
    }
    res.render('dashboard', {
        username: req.user.username,
        avatarsrc: avatar,
        discordId: req.user.discordId,
        discordemail: avatar,
        guilds: req.user.guilds
    });
});

router.get('/calendar', isAuthorized, (req, res) => {
    var avatar;
    if(req.user.useravatar == null) {
        console.log("Warning: No Profile Picture for User, " + req.user.username);
        avatar = "https://imgur.com/DeIq43J.png";
    } else {
        avatar = "https://cdn.discordapp.com/avatars/"+req.user.discordId+"/"+req.user.useravatar+".png";
    }
    res.render('friendcalendar', {
        username: req.user.username,
        avatarsrc: avatar,
        discordId: req.user.discordId,
        discordemail: avatar,
        guilds: req.user.guilds
    });
})

router.get('/settings', isAuthorized, (req, res) => { //NOT /DASHBOARD BECAUSE WE ALREADY REGISTERED / DASHBOARD.
    res.send("oh you logged in my boy")
});


module.exports = router;