const mongoose = require('mongoose')

const uri = process.env.MONGO_DB_URI

const configParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl:true,
    sslValidate:false,
}

mongoose.connect(uri,configParams);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Mongo DB Connected successfully");
});

module.exports = mongoose