import { Schema, model } from 'mongoose';


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true,
        maxLength: [100, `Can't exceed 100 characters`]
    },
    description: {
        type: String,
        maxLength: [500, `Can't exceed 500 characters`],
        required: [true, 'Description is required']
        },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive value']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock must be a positive value']
     },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    status: {
        type: Boolean,
        default: true
    }
});

productSchema.methods.toJSON = function () {
    const { __v, ...product } = this.toObject();
    return product;
}

export default model('Product', productSchema)