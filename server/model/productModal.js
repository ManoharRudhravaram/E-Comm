import mongoose from "mongoose";

//product schema for db
let productModal = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    color:{
        require:true,
        type:String
    }
    ,
    slug: {
        require: true,
        type: String,
        lowercase: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: [
        {
            url: {
                type: String
            },
            public_id: {
                type: String
            }
        }
    ],
    category: {
        type: mongoose.ObjectId,
        ref: "category",
        require: true
    },
    shipping: {
        type: String,
        default: "yes"
    }
}, { timestamps: true })

export default mongoose.model("product", productModal);