// import mongoose from "mongoose";
//
// export default mongoose.model("graphdata", new mongoose.Schema({}), "graphdata");

import mongoose from "mongoose";
var object_grafik_inner = mongoose.Schema( {
    date: { type: Date, default: Date.now, required: true },
    value: {type: Number, required: true},
}, { _id : false });
var data_object_grafik = mongoose.Schema( {
    metric: {type: String, required: true},
    values: [object_grafik_inner],
}, { _id : false });

const grafikSchema = mongoose.Schema({
        id: {type: String},
        data_grafik: [data_object_grafik],
    },
    {timestamps: true}
);
export default mongoose.model("Grafik", grafikSchema);
