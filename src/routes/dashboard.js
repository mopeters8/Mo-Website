const router = require('express').Router();
const EventPlan = require('../models/Event-Schema')

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

    EventPlan.find({}, function(err, events) {
        res.render('friendcalendar', {
            username: req.user.username,
            avatarsrc: avatar,
            discordId: req.user.discordId,
            discordemail: avatar,
            guilds: req.user.guilds,
            eventList: events,
        });
    })

    
});

router.post('/submit_event', isAuthorized, (req, res, next) => {
    let newEvent = new EventPlan ({
        username: req.user.username,
        event_name: req.body.event_name,
        event_desc: req.body.event_desc,
        event_date: req.body.event_date,
        event_time: req.body.event_time,
        event_agree: req.body.event_agree
    });
    newEvent.save();
    console.log("Event added by" + req.user.username);
    res.redirect('./calendar');
});


router.get('/settings', isAuthorized, (req, res) => { //NOT /DASHBOARD BECAUSE WE ALREADY REGISTERED / DASHBOARD.
    res.send("oh you logged in my boy")
});


module.exports = router;