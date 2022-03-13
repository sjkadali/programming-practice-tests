const mongoose = require("mongoose");
require('dotenv').config();

const mongoAtlasUri = process.env.MONGODB_URI
mongoose.connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).catch(error => console.log(console.log(error.reason)));
  