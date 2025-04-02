
import { getDb } from "../utils/database.js"
import { ObjectId } from 'mongodb';

class Product{
    constructor(title,price, imageUrl,description, _id, userId){
        this.title = title,
        this.price = price,
        this.imageUrl = imageUrl,
        this.description = description,
        this._id = _id,
        this.userId = userId
    }

    save(){
        const db = getDb()
        let dbOp;
        if(this._id){
            console.log('yes')
            dbOp = db.collection('products').updateOne(
                { _id: new ObjectId(this._id) }, 
                { 
                    $set: {
                        title: this.title,
                        price: this.price,
                        imageUrl: this.imageUrl,
                        description: this.description
                    }
                }
            );
        }
        else{
            console.log('no')
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp.then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log('Error in Product save',err);            
        })
    }

    static fetchAll(){
        const db = getDb()
        return db.collection('products')
        .find()
        .toArray()
        .then(products => {
            // console.log(products);
            return products
        } )
        .catch(err => {
            console.log('Error in fetch all', err)            
        })
    }

    static findById(prodId){
        const db = getDb();
        return db.collection('products').findOne({ _id: new ObjectId(prodId) })
        .then(product => {
            // console.log(product);
            return product; // usually one product since _id is unique
        })
        .catch(err => {
            console.log('Error in find by id', err);            
        });
    }

    static delete(prodId){
        const db = getDb()
        return db.collection('products').deleteOne({_id: new ObjectId(prodId)})
        .then(result => {
            console.log(result); 
        })
        .catch(err => console.log('Error in delete product',err))
    }
    
}


export default Product