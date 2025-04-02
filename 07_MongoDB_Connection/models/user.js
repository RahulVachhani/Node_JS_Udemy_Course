import { ObjectId } from "mongodb"
import { getDb } from "../utils/database.js"

class User {
    constructor(username, email, cart, _id) {
        this.username = username
        this.email = email
        this.cart = cart // {items : []}
        this._id = _id
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    addToCart(product) {
        if (!this.cart) {
            this.cart = { items: [] };  // Initialize cart if undefined
        }
        const cartProductIndex = this.cart.items.findIndex(cp => {
            // console.log(cp);
            // console.log(cp.productId === product._id.toString())
            return cp.productId.toString() === product._id.toString()
        })
        // console.log(cartProductIndex);

        let newQuantity = 1
        const updatedCartItems = [...this.cart.items]
        // console.log(updatedCartItems)
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = newQuantity
        }
        else {
            updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity })
        }

        const db = getDb()
        return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, {
            $set: { cart: { items: updatedCartItems } }
        })
    }

    static findById(userId) {
        const db = getDb()
        return db.collection('users').findOne({ _id: new ObjectId(userId) })
    }

    getCart() {
        const db = getDb()
        if (!this.cart) {
            return []
        }
        const productIds = this.cart.items.map(obj => obj.productId);
        return db.collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(obj => {
                            return obj.productId.toString() === p._id.toString()
                        }).quantity
                    }
                })
            })
    }

    deleteById(prodId) {
        const db = getDb()
        const updatedCart = this.cart.items.filter(obj => {

            return obj.productId.toString() !== prodId
        })
        this.cart.items = updatedCart
        return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { "cart.items": this.cart.items } })

    }

    addOrder() {
        const db = getDb()
        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new ObjectId(this._id),
                        username: this.username
                    }
                }
                return db.collection('orders')
                    .insertOne(order)
            })
            .then(result => {
                this.cart = { items: [] }
                return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { "cart.items": [] } })
            })
    }

    getOrders() {
        const db = getDb()
        return db.collection('orders').find({ "user._id": new ObjectId(this._id) })
            .toArray()
    }
}

export default User

