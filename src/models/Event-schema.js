const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
        username: String,
        event_name: String,
        event_desc: String,
        event_date: String,
        event_time: String,
        event_agree: String,
})

const EventPlan = module.exports = mongoose.model('Events', eventSchema )