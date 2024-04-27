import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
        // unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
