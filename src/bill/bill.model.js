import { Schema, model } from 'mongoose';

const billSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    product:[{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    }],
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive value']
    },
    total: {
        type: Number,
        required: [true, 'Total price for this product is required'],
        min: [0, 'Total must be a positive value']
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount must be a positive value']
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }
})

billSchema.methods.toJSON = function () {
    const { __v, ...bill } = this.toObject();
    return bill;
}

export default model('Bill', billSchema);
