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
    res.send(req.user.id+" this is under a lot of work. Come back another time.")
});


module.exports = router;