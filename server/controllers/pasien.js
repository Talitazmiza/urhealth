import Patient from '../models/pasien.js';
import UserModal from '../models/user.js';
import mongoose from "mongoose";
import Grafik from "../models/data.js";
import moment from 'moment';
// READ patients
export const getAllPatient = async (req, res) => {
    try {
        Patient.find().populate(
            {
                path: 'user_data',
                populate: {
                    path: 'role',
                },
            }
        ).populate(
            {
                path: 'data_grafik',
            }
        ).exec((err, patient) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!patient) {
                return res.status(404).json({message: "patient doesn't exist"});
            }
            res.status(200).send({
                result: patient
            });
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// CREATE patients
export const createPatient = async (req, res) => {
    const {email, weight, height, bloodtype, lastName, firstName, data_grafik} = req.body;
    try {
        const existingUser = await UserModal.findOne({email});
        if (!existingUser) return res.status(400).json({message: "User tidak ada"});
        const existingGrafik = await Grafik.findById(data_grafik);
        console.log(data_grafik);
        const result = await Patient.create({
            email,
            height,
            weight,
            firstName,
            lastName,
            bloodtype,
            user_data: existingUser._id,
            data_grafik: existingGrafik._id
        });
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});

        console.log(error);
    }
};

// UPDATE patients
export const updatePatient = async (req, res) => {
    const {id} = req.params;
    const {height, weight, firstName, lastName, bloodtype} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
    const updatedPatient = {height, weight, firstName, lastName, bloodtype};
    await Patient.findByIdAndUpdate(id, updatedPatient, {new: true});
    res.json(updatedPatient);
};
// UPDATE graph
export const updateGraph = (req, res) => {
    const {id} = req.params;
    const {data_grafik} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
    console.log(id.toString());
    // const updatedGraph = {height, weight, firstName, lastName, bloodtype};
    const data_terurut = data_grafik.sort((a,b)=> (a.metric > b.metric ? 1 : -1))
    const array_of_data = []

    // const arr_hr = data_grafik[data_grafik.findIndex(p => p.metric == "hr")].values;
    // const arr_pulse = data_grafik[data_grafik.findIndex(p => p.metric == "pulse")].values;
    // const arr_spo2 = data_grafik[data_grafik.findIndex(p => p.metric == "spo2")].values;
    // const arr_resp = data_grafik[data_grafik.findIndex(p => p.metric == "resp")].values;
    // const arr_temperature = data_grafik[data_grafik.findIndex(p => p.metric == "temperature")].values;
    // const arr_gsr = data_grafik[data_grafik.findIndex(p => p.metric == "gsr")].values;
    Grafik.findById(id).then(data=>{
        data_grafik.forEach(data_detail=>{
            let data2 = data_grafik[data_grafik.findIndex(p => p.metric == data_detail.metric)].values
            array_of_data.push({
                metric : data_detail.metric,
                values : data.data_grafik[data.data_grafik.findIndex(p => p.metric == data_detail.metric)].values.concat(data2)
            })
        })
        return array_of_data;
    }).then(data_baru=>{
        try {
            Grafik.findByIdAndUpdate(id, {$set : {data_grafik : data_baru}}, {new: true}).then(response=>{
                res.json({
                    message : 'Update grafik sukses',
                    data : response
                })
            });
        } catch (e) {
            res.json({
                message : 'Update grafik gagal',
                error : e
            })
        }

    });
};


// export const updatePatient = async (req, res) => {
//     const { id: _id } = req.params;
//     const patient = req.body;
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
//     const existingUser = await UserModal.findOne({ email });
//     const updatedPatient = { email, height, weight, firstName, lastName, bloodtype, user_data : existingUser._id, _id: id };
//     await Patient.findByIdAndUpdate(_id,{ ...patient, _id },{ new: true });
//     res.json(updatedPatient);
// }

// DELETE patients
export const deletePatient = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
    await Patient.findByIdAndRemove(id);
    res.json({message: "Patient deleted successfully."});
}


export const getGraph = (req, res) => {
    try {
        Grafik.find().then(data=>{
            let graphData = [];
            let data_detail = [];
            console.log(data)
            data[0].data_grafik.forEach(detail=>{
                let detail_value = [];
                detail.values.forEach(more_detail=>{
                    detail_value.push({
                        data : moment(more_detail.date).format('YYYY-MM-DD'),
                        value : more_detail.value
                    })
                })
                data_detail.push({
                    metric : detail.metric,
                    values : detail_value
                })
            })
            res.status(200).json({
                result: {
                    _id : data[0]._id,
                    data_grafik : data_detail
                }
            });
        })

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const addGraph = async (req, res) => {
    const {data_grafik} = req.body;
    try {
        const result = await Grafik.create({data_grafik});
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});

        console.log(error);
    }
}
export const patientProfile = async (req, res) => {
    const {id} = req.params;
    const user_data = id;
    try {
        Patient.findOne({user_data}).populate(
            {
                path: 'user_data',
                populate: {
                    path: 'role',
                }
            }
        ).populate(
                {
                    path: 'data_grafik',
                }
            ).
        exec((err, patient) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!patient) {
                return res.status(404).json({message: "patient doesn't exist"});
            }
            res.status(200).send({
                result: patient
            });
        });

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};
