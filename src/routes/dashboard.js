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
    res.render('dashboard', {
        username: req.user.username,
        useravatar: req.user.useravatar,
        discordId: req.user.discordId,
        discordemail: req.user.discordemail,
        guilds: req.user.guilds
    });
});

router.get('/settings', isAuthorized, (req, res) => { //NOT /DASHBOARD BECAUSE WE ALREADY REGISTERED / DASHBOARD.
    res.send("oh you logged in my boy")
});


module.exports = router;