import mongoose from 'mongoose';

const SupplementSchema = new mongoose.Schema ({
    id: {
        type: Number,
        unique: true,
        required: 'ID is required'
    },
    name: {
        type: String,
        required: 'Name is required',
    },
    description: {
        type: String,
        required: 'Description is required',
    },
    price: {
        type: Number,
        required: 'Price is required',
    },
});

export default mongoose.model('Supplement', SupplementSchema);