const mongoose = require("mongoose");
require('dotenv').config();

const mongoAtlasUri = process.env.MONGO_CONN_URI
mongoose.connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).catch(error => console.log(console.log(error.reason)));
  