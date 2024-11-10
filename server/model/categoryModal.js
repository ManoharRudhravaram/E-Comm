import mongoose from "mongoose";

//category schema for db
let categoryModal = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true,
        require: true
    }
}, { timestamps: true })

export default mongoose.model('category', categoryModal)