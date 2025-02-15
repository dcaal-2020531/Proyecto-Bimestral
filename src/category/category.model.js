import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        maxLength: [50, `Can't exceed 50 characters`]
    },
    description: {
        type: String,
        maxLength: [255, `Can't exceed 255 characters`]
    },
})

categorySchema.methods.toJSON = function () {
    const { __v, ...category } = this.toObject();
    return category;
}

export default model('Category', categorySchema);
