const config = require("../../config.json");
const { MongoClient } = require('mongodb');

class DB {

    #clientDb;

    constructor() {
        // Connect to database
        
        const uri = config.database.uri;
        const clientDb = new MongoClient(uri);
        clientDb.connect();
        this.clientDb = clientDb;
    }

    // R�cuperer tout les utilisateurs
    async getUsers() {
        return await this.clientDb.db("dev").collection("users").find().toArray();
    }

    // R�cuperer un utilisateur de la db
    async getUserByUuid(uuid) {
        return await this.clientDb.db("dev").collection("users").findOne({ uuid: uuid });
    }

    // Cr�er un utilisateur dans la db
    createUser(uuid, name) {
        const db = this.clientDb.db("dev");
        const newUser = {
            uuid: uuid,
            mc_username: name,
            score: 0
        }
        db.collection("users").insertOne(newUser, function (err, res) {
            if (err) throw err;
            console.log(`user ${name} (${uuid}) has been registered !`);
        })
    }
}

module.exports = new DB();