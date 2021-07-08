import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    sip: { type: String, required: true },
    category: { type: String, required: true },
    practicePlace: { type: String, required: true },
    totalPatient: { type: Number, required: true },
    id: { type: String },
    user_data:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
});

export default mongoose.model("Doctor", doctorSchema);
