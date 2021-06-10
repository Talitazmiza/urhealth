import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    name: { type: String, required:  true },
    id: { type: String },
});

export default mongoose.model("Role", roleSchema);
