const MongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://7leluk:pass7leluk@172.20.44.25:27017/7leluk';

const client = new MongoClient(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db;

function connect(callback) {
    client.connect(err => {
        db = client.db('7leluk');
        console.log('Successfuly connected.');
        return callback(err);
    });
}

function get() {
    return db;
}

function close() {
    db.close();
}

module.exports = {
    connect,
    get,
    close
};