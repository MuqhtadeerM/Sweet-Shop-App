import mongoose from "mongoose";


const sweetSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    quantity: Number,
});

export default mongoose.model("Sweet", sweetSchema)