import mongoose from "mongoose";    

const contactSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    contactType: { type: String, required: true},
    createdAt: { type: Date, default: Date.now() },
    userId: { type: mongoose.Schema.Types.ObjectId}
});

export const Contacts = mongoose.model('Contact', contactSchema);