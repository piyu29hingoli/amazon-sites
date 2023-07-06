let mongo = require('mongodb');
let {MongoClient} = require('mongodb');
let mongoUrl = "mongodb+srv://amazon:eikHxBQcfB34fEsy@amazon.w6cvh50.mongodb.net/?retryWrites=true&w=majority";

let client = new MongoClient(mongoUrl)


async function dbConnect(){
    await client.connect()
}

let db = client.db('amazon');

async function getData(colName,query){
    let output = [];
    try{
        const cursor = db.collection(colName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    } catch(err){
        output.push({"Error":"Error in getData"})
    }
    return output
}

module.exports = {
    dbConnect,
    getData
}