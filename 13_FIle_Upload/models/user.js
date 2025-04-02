import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExp: Date,
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})


userSchema.methods.addToCart = function (product) {

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    })

    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1
        updatedCartItems[cartProductIndex].quantity = newQuantity
    }
    else {
        updatedCartItems.push({ productId: product._id, quantity: newQuantity })
    }
    console.log(updatedCartItems)
    this.cart.items = updatedCartItems
    return this.save()
}

userSchema.methods.deleteById = function (prodId) {
    const updatedCartItems = this.cart.items.filter(item => {
        // console.log(item.productId);
        // console.log(prodId);
        // console.log(item.productId.toString() !== prodId.toString());


        return item.productId.toString() !== prodId.toString()
    })
    console.log(updatedCartItems);

    this.cart.items = updatedCartItems
    return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart.items = []
    this.save()
}

export default mongoose.model('User', userSchema)