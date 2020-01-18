const mongodb = require('../config/mongodb');

class User {
    static async checkCredentials(credentials) {
        const db = mongodb.get();
        return await db.collection('user').findOne(credentials);
    };
    
    static async registerInDatabase(credentials) {
        const db = mongodb.get();
        await db.collection('user').insertOne(credentials);
    }
    
    static async findByLogin(userLogin) {
        const db = mongodb.get();
        return await db.collection('user').findOne({login: userLogin});
    }
}

module.exports = User;

