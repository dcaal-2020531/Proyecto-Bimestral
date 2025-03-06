import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
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
    totalAmount: {
        type: Number,
        required: true,
        min: [0, 'Total amount must be a positive value'],
        default: 0
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'ORDERED'],
        default: 'ACTIVE'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { strict: false }); // Permite agregar campos dinámicamente

cartSchema.methods.toJSON = function () {
    const { __v, ...cart } = this.toObject();
    return cart;
};

export default model('Cart', cartSchema);
