import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient

let db;
const mongoConnect = (cb) => {

    MongoClient.connect('mongodb+srv://Rahul:123%40Rahul@fastapi.k9cht.mongodb.net/')
        .then(client => {
            console.log('Connected');
            db = client.db()
            cb()

        })
        .catch(err => console.log('Error while connecting mongodb'))

}


export const getDb = () => {
    if(db){
        return db
    }
    throw 'No Database Found'
}

export default mongoConnect