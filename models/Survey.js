const mongodb = require('../config/mongodb');

class Survey {
    static async saveAnswers(answers) {
        const db = mongodb.get();
        return await db.collection('survey').insertOne(answers);
    }

    static async getAll() {
        const db = mongodb.get();
        return await db.collection('survey').find({}).toArray();
    }
}

module.exports = Survey;