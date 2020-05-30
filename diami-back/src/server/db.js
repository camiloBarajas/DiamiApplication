const mongoose = require('mongoose');

class MongoConnection {

    constructor() {
        this.url = process.env.ENV_URL_MONGO || 'mongodb://localhost:27017';
        this.nameDB = process.env.ENV_NAMEDB_MONGO || 'DiamiDB';
    }

    start() {
        mongoose.connect(
            this.url,
            {
                dbName: this.nameDB,
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: true
            }, (err) => {
                if (err) {
                    throw err;
                }

                console.log('Base de datos mongo conectada');
            }
        );
    }

}

module.exports = MongoConnection;