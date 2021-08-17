const mongoose = require('mongoose');
module.exports = mongoose.connect(process.env.MONGO_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true });

//using cloud now.
