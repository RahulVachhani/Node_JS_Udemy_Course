import mongoose from "mongoose";

const Schema = mongoose.Schema

const orderSchema = new Schema({
    products: [
        {
            product: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
})


export default mongoose.model('Order', orderSchema)