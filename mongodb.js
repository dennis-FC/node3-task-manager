// CRUD create read update delete
//D:/自學/mongodb/bin/mongod.exe --dbpath=D:/自學/mongodb-data --> run db server
//C:/Users/denni/nodejs/mongodb/bin/mongod.exe --dbpath=C:/Users/denni/nodejs/mongodb-data

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const {MongoClient, ObjectID, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//const id = new ObjectID()
//console.log(id)
//console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => {
    if(error){
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)
    
    // db.collection('users').deleteMany({
    //     age:27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
   
    db.collection('tasks').deleteOne({
        description:'Clean the house'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    console.log("test")
})