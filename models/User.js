const mongodb = require('../config/mongodb');

async function checkCredentials(credentials) {
    const db = mongodb.get();
    return await db.collection('user').findOne(credentials);
};

module.exports = checkCredentials;

