import mongoose from "mongoose";

const pasienSchema = mongoose.Schema({
    firstName: { type: String, required:  true },
    lastName: { type: String, required: true },
    // ttl: { type: Date, required: true },
    goldar: { type: String, required: true },
    tinggi_badan: { type: Number, required: true },
    id: { type: String },
    user_data:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
});

export default mongoose.model("Patient", pasienSchema);
