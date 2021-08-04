import mongoose from "mongoose";

const pasienSchema = mongoose.Schema({
    firstName: { type: String, required:  true },
    lastName: { type: String, required: true },
    bloodtype: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    id: { type: String },
    user_data:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    data_grafik:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Grafik"
        }
});

export default mongoose.model("Patient", pasienSchema);
